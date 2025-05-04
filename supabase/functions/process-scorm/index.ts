
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";
import { basename } from "https://deno.land/std@0.168.0/path/mod.ts";
import { ensureDir } from "https://deno.land/std@0.168.0/fs/ensure_dir.ts";
import { copy, emptyDir } from "https://deno.land/std@0.168.0/fs/mod.ts";
import { resolve, dirname, join } from "https://deno.land/std@0.168.0/path/posix.ts";
import { JSZip } from "https://deno.land/x/jszip@0.11.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const TEMP_DIR = "/tmp/scorm-processing";
const WRAPPER_FOLDER = "scorm-wrapper";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create a Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      }
    );

    // Get the request body
    const { scormPackageUrl, moduleId } = await req.json();

    if (!scormPackageUrl || !moduleId) {
      return new Response(
        JSON.stringify({
          error: "Missing required parameters: scormPackageUrl and moduleId",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    // Get the module information
    const { data: moduleData, error: moduleError } = await supabaseClient
      .from("scorm_modules")
      .select("*")
      .eq("id", moduleId)
      .single();

    if (moduleError || !moduleData) {
      return new Response(
        JSON.stringify({
          error: "Failed to retrieve SCORM module information",
          details: moduleError?.message,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        }
      );
    }

    console.log("Processing SCORM package:", scormPackageUrl);
    console.log("Module ID:", moduleId);

    // Create storage bucket if it doesn't exist
    const { data: bucketData, error: bucketError } = await supabaseClient
      .storage
      .listBuckets();

    const hasBucket = bucketData?.some(bucket => bucket.name === "scorm-content");
    if (!hasBucket) {
      await supabaseClient.storage.createBucket("scorm-content", {
        public: true,
        allowedMimeTypes: ['application/zip', 'text/html', 'text/javascript', 'text/css', 'image/png', 'image/jpeg', 'application/json'],
        fileSizeLimit: 50000000, // 50MB 
      });
      console.log("Created scorm-content bucket");
    }

    // 1. Download the ZIP file from the URL
    console.log("Downloading ZIP file...");
    const response = await fetch(scormPackageUrl);
    if (!response.ok) {
      throw new Error(`Failed to download ZIP file: ${response.statusText}`);
    }
    const zipBuffer = await response.arrayBuffer();

    // 2. Extract it to a temporary location
    console.log("Extracting ZIP file...");
    const extractPath = `${TEMP_DIR}/${moduleId}`;
    await ensureDir(extractPath);
    await emptyDir(extractPath);

    // Extract the zip file
    const zip = await JSZip.loadAsync(zipBuffer);
    const files = zip.files;

    // Track the manifest file path
    let manifestPath = "";

    // Extract all files
    for (const [filePath, file] of Object.entries(files)) {
      if (file.dir) {
        await ensureDir(`${extractPath}/${filePath}`);
      } else {
        const content = await file.async("arraybuffer");
        const fullPath = `${extractPath}/${filePath}`;
        await ensureDir(dirname(fullPath));
        await Deno.writeFile(fullPath, new Uint8Array(content));

        // Find the manifest file
        if (filePath.toLowerCase().includes("imsmanifest.xml")) {
          manifestPath = filePath;
        }
      }
    }

    // 3. Parse the imsmanifest.xml file to get course structure
    console.log("Parsing manifest file...");
    let manifestData = {
      title: moduleData.title,
      identifier: moduleId,
      version: "1.0",
      organizations: [],
      resources: []
    };

    if (manifestPath) {
      try {
        const manifestContent = await Deno.readTextFile(`${extractPath}/${manifestPath}`);
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(manifestContent, "text/xml");

        if (xmlDoc) {
          // Try to get title from manifest
          const titleElement = xmlDoc.querySelector("title, imscp\\:title");
          if (titleElement && titleElement.textContent) {
            manifestData.title = titleElement.textContent.trim() || moduleData.title;
          }

          // Get identifier
          const manifestElement = xmlDoc.querySelector("manifest");
          if (manifestElement) {
            manifestData.identifier = manifestElement.getAttribute("identifier") || moduleId;
          }

          // Get organizations
          const orgs = xmlDoc.querySelectorAll("organization");
          if (orgs.length > 0) {
            orgs.forEach(org => {
              const orgId = org.getAttribute("identifier") || "default";
              const orgItems = [];
              const items = org.querySelectorAll("item");
              
              items.forEach(item => {
                const itemId = item.getAttribute("identifier") || "";
                const itemTitle = item.querySelector("title")?.textContent || "Untitled";
                const itemRef = item.getAttribute("identifierref") || "";
                
                orgItems.push({
                  id: itemId,
                  title: itemTitle,
                  resourceId: itemRef
                });
              });

              manifestData.organizations.push({
                id: orgId,
                items: orgItems
              });
            });
          }

          // Get resources
          const resources = xmlDoc.querySelectorAll("resource");
          if (resources.length > 0) {
            resources.forEach(resource => {
              const resourceId = resource.getAttribute("identifier") || "";
              const resourceType = resource.getAttribute("type") || "";
              const resourceHref = resource.getAttribute("href") || "";
              
              manifestData.resources.push({
                id: resourceId,
                type: resourceType,
                href: resourceHref
              });
            });
          }
        }
      } catch (error) {
        console.error("Error parsing manifest file:", error);
      }
    }

    // 4. Create any necessary wrapper files for SCORM API integration
    console.log("Creating SCORM API wrapper files...");
    const wrapperDir = `${extractPath}/${WRAPPER_FOLDER}`;
    await ensureDir(wrapperDir);

    // Create the SCORM API bridge file
    const scormApiJs = `
// SCORM API Implementation
let apiConnected = false;
let suspendData = "";
let lessonStatus = "incomplete";
let score = 0;
let completionStatus = "incomplete";
let sessionTime = "0000:00:00.00";
let totalTime = "0000:00:00.00";

window.API = {
  LMSInitialize: function(parameter) {
    console.log("LMSInitialize called with: " + parameter);
    apiConnected = true;
    return "true";
  },
  
  LMSFinish: function(parameter) {
    console.log("LMSFinish called with: " + parameter);
    apiConnected = false;
    saveScormData();
    return "true";
  },
  
  LMSGetValue: function(element) {
    console.log("LMSGetValue called for: " + element);
    switch(element) {
      case "cmi.core.lesson_status":
        return lessonStatus;
      case "cmi.suspend_data":
        return suspendData;
      case "cmi.core.score.raw":
        return score.toString();
      case "cmi.completion_status":
        return completionStatus;
      case "cmi.core.session_time":
        return sessionTime;
      case "cmi.core.total_time":
        return totalTime;
      default:
        return "";
    }
  },
  
  LMSSetValue: function(element, value) {
    console.log("LMSSetValue called: " + element + " = " + value);
    switch(element) {
      case "cmi.core.lesson_status":
        lessonStatus = value;
        break;
      case "cmi.suspend_data":
        suspendData = value;
        break;
      case "cmi.core.score.raw":
        score = parseFloat(value);
        break;
      case "cmi.completion_status":
        completionStatus = value;
        break;
      case "cmi.core.session_time":
        sessionTime = value;
        break;
      default:
        break;
    }
    saveScormData();
    return "true";
  },
  
  LMSCommit: function(parameter) {
    console.log("LMSCommit called with: " + parameter);
    saveScormData();
    return "true";
  },
  
  LMSGetLastError: function() {
    return "0";
  },
  
  LMSGetErrorString: function(errorCode) {
    return "No error";
  },
  
  LMSGetDiagnostic: function(errorCode) {
    return "No error";
  }
};

// This is for SCORM 2004
window.API_1484_11 = {
  Initialize: function(parameter) {
    return window.API.LMSInitialize(parameter);
  },
  
  Terminate: function(parameter) {
    return window.API.LMSFinish(parameter);
  },
  
  GetValue: function(element) {
    return window.API.LMSGetValue(element);
  },
  
  SetValue: function(element, value) {
    return window.API.LMSSetValue(element, value);
  },
  
  Commit: function(parameter) {
    return window.API.LMSCommit(parameter);
  },
  
  GetLastError: function() {
    return window.API.LMSGetLastError();
  },
  
  GetErrorString: function(errorCode) {
    return window.API.LMSGetErrorString(errorCode);
  },
  
  GetDiagnostic: function(errorCode) {
    return window.API.LMSGetDiagnostic(errorCode);
  }
};

function saveScormData() {
  if (window.parent && window.parent.updateScormProgress) {
    try {
      // Determine status - completed or incomplete
      let status = "in_progress";
      if (lessonStatus === "completed" || lessonStatus === "passed" || 
          completionStatus === "completed") {
        status = "completed";
      }
      
      // Estimate completion percentage - can be refined based on course
      let percentage = 0;
      if (status === "completed") {
        percentage = 100;
      } else if (suspendData && suspendData.length > 0) {
        // Simple heuristic - can be improved based on specific SCORM package format
        percentage = Math.min(Math.floor((suspendData.length / 100) * 25), 99);
      }

      window.parent.updateScormProgress({
        status: status,
        percentage: percentage,
        score: score,
        suspendData: suspendData
      });
    } catch(e) {
      console.error("Error saving SCORM data to parent frame:", e);
    }
  }
}

// Handle window unload
window.addEventListener('beforeunload', function() {
  if (apiConnected) {
    window.API.LMSFinish('');
  }
});

console.log("SCORM API bridge loaded");
`;

    await Deno.writeTextFile(`${wrapperDir}/scorm-api.js`, scormApiJs);

    // Create the wrapper index.html template
    const launchPath = moduleData.launch_path || 'index.html';
    const wrapperHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${manifestData.title}</title>
  <script src="./${WRAPPER_FOLDER}/scorm-api.js"></script>
  <style>
    html, body, iframe {
      margin: 0;
      padding: 0;
      border: none;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
  </style>
</head>
<body>
  <iframe id="scorm-content" src="./${launchPath}" allowfullscreen></iframe>
  <script>
    window.onload = function() {
      // Wait for iframe to load and initialize API
      document.getElementById('scorm-content').onload = function() {
        console.log('SCORM content loaded');
      };
    };
  </script>
</body>
</html>
`;

    // Create a wrapper index.html in the root of the extracted directory
    await Deno.writeTextFile(`${extractPath}/index.html`, wrapperHtml);

    // 5. Upload the processed files back to Storage
    console.log("Uploading processed files to storage...");

    // Create a unique folder name for this module
    const storageFolderName = `modules/${moduleId}`;

    // Get all files from the extracted directory
    async function* getFiles(dir: string): AsyncGenerator<string> {
      const entries = Deno.readDir(dir);
      for await (const entry of entries) {
        const fullPath = join(dir, entry.name);
        if (entry.isDirectory) {
          yield* getFiles(fullPath);
        } else {
          yield fullPath;
        }
      }
    }

    // Upload all files
    const uploadedFiles = [];
    for await (const filePath of getFiles(extractPath)) {
      const relativePath = filePath.replace(extractPath, "").replace(/^\//, "");
      const storagePath = `${storageFolderName}/${relativePath}`;
      
      try {
        const fileContent = await Deno.readFile(filePath);
        const { error } = await supabaseClient.storage
          .from("scorm-content")
          .upload(storagePath, fileContent, {
            contentType: getContentType(relativePath),
            upsert: true
          });
          
        if (error) {
          console.error(`Error uploading file ${relativePath}:`, error);
        } else {
          uploadedFiles.push(storagePath);
        }
      } catch (error) {
        console.error(`Error processing file ${relativePath}:`, error);
      }
    }

    console.log(`Uploaded ${uploadedFiles.length} files`);

    // Get the public URL for the wrapper index.html
    const { data: publicUrlData } = supabaseClient.storage
      .from("scorm-content")
      .getPublicUrl(`${storageFolderName}/index.html`);

    // Update the module with processing results
    const { error: updateError } = await supabaseClient
      .from("scorm_modules")
      .update({ 
        processed_at: new Date().toISOString(),
        manifest_data: manifestData,
        status: "processed",
        public_url: publicUrlData.publicUrl
      })
      .eq("id", moduleId);

    if (updateError) {
      console.error("Error updating SCORM module:", updateError);
      return new Response(
        JSON.stringify({
          error: "Failed to update SCORM module information",
          details: updateError.message
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500
        }
      );
    }

    // Clean up temporary files
    try {
      await emptyDir(extractPath);
      await Deno.remove(extractPath, { recursive: true });
    } catch (err) {
      console.error("Error cleaning up temporary files:", err);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "SCORM package processed successfully",
        moduleId,
        packageUrl: scormPackageUrl,
        publicUrl: publicUrlData.publicUrl,
        manifestData,
        filesUploaded: uploadedFiles.length
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error processing SCORM package:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        stack: error.stack
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});

// Helper function to determine content type based on file extension
function getContentType(filePath: string): string {
  const ext = filePath.split('.').pop()?.toLowerCase() || '';
  const contentTypes: Record<string, string> = {
    'html': 'text/html',
    'htm': 'text/html',
    'js': 'text/javascript',
    'css': 'text/css',
    'json': 'application/json',
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'gif': 'image/gif',
    'svg': 'image/svg+xml',
    'xml': 'application/xml',
    'pdf': 'application/pdf',
    'zip': 'application/zip',
    'txt': 'text/plain',
  };
  
  return contentTypes[ext] || 'application/octet-stream';
}
