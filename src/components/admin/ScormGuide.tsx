import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle2, FileUp, Upload, RefreshCw, Link, ExternalLink } from 'lucide-react';

export default function ScormGuide() {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>SCORM Package Guide</CardTitle>
        <CardDescription>
          Learn how to work with SCORM packages in your courses
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Important</AlertTitle>
          <AlertDescription>
            SCORM packages must be properly structured ZIP files following the SCORM 1.2 or 2004 standards.
          </AlertDescription>
        </Alert>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="upload-process">
            <AccordionTrigger>Standard Upload Process</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <div className="bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-medium">Prepare Your SCORM Package</h4>
                    <p className="text-muted-foreground">
                      Ensure your SCORM package is exported correctly from your authoring tool (Articulate Storyline, Adobe Captivate, etc.)
                      as a standard SCORM 1.2 or 2004 package.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-medium">Upload the Package</h4>
                    <p className="text-muted-foreground">
                      Go to the SCORM Uploader page, fill in the details, and upload your .zip file.
                      The system will automatically process the package.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-medium">Check Processing Status</h4>
                    <p className="text-muted-foreground">
                      Go to SCORM Manager to check the status of your upload. Successfully processed packages will show as "Ready"
                      and can be previewed.
                    </p>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="troubleshooting">
            <AccordionTrigger>Troubleshooting Processing Issues</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <p>If your SCORM package has issues during processing, you have several options:</p>
                
                <div className="border rounded-md p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="h-5 w-5 text-blue-600" />
                    <div>
                      <h4 className="font-medium">Retry Processing</h4>
                      <p className="text-muted-foreground">
                        Click the <span className="text-blue-600">⟳</span> icon in the SCORM Manager to attempt processing again. 
                        This may resolve temporary server issues.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Link className="h-5 w-5 text-green-600" />
                    <div>
                      <h4 className="font-medium">Mark as Processed Manually</h4>
                      <p className="text-muted-foreground">
                        Click the <span className="text-green-600">⛓</span> icon to manually mark the SCORM package as processed. 
                        This will create a URL for the package, assuming you have uploaded a valid SCORM package.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <ExternalLink className="h-5 w-5 text-purple-600" />
                    <div>
                      <h4 className="font-medium">Download & Fix Manually</h4>
                      <p className="text-muted-foreground">
                        Click the <span className="text-purple-600">↗</span> icon to download the original package. 
                        You can fix any issues and re-upload it.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-md p-4 space-y-3 mt-6">
                  <h4 className="font-medium text-amber-800">About Local Mode</h4>
                  <p className="text-amber-700">
                    If you see a <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-xs font-medium">Local Mode</span> badge, this means the system detected 
                    storage configuration issues and has switched to local mode. In this mode:
                  </p>
                  <ol className="list-decimal pl-5 space-y-2 text-amber-700">
                    <li>You'll need to place your SCORM content in the public folder</li>
                    <li>Extract the ZIP file to <code className="bg-amber-100 px-1 py-0.5 rounded">public/scorm/[module-name]/</code></li>
                    <li>The system will look for common launch files like index.html, training.htm, etc.</li>
                  </ol>
                  <p className="text-amber-700">
                    This is a fallback option when the cloud storage is unavailable or misconfigured.
                  </p>
                </div>
                
                <div className="border border-green-200 bg-green-50 rounded-md p-4 space-y-3 mt-4">
                  <h4 className="font-medium text-green-800 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    Recommended: Using the public/scorm Directory
                  </h4>
                  <p className="text-green-700">
                    For the most reliable experience, follow these steps:
                  </p>
                  <ol className="list-decimal pl-5 space-y-2 text-green-700">
                    <li>Download your SCORM package ZIP file</li>
                    <li>Extract the contents to <code className="bg-green-100 px-1 py-0.5 rounded">public/scorm/[module-name]/</code></li>
                    <li>The viewer will automatically try to find your content at paths like:</li>
                    <ul className="list-disc pl-8 space-y-1 text-xs mt-1">
                      <li>/scorm/[module-name]/index.html</li>
                      <li>/scorm/[module-name]/training.htm</li>
                      <li>/scorm/[module-name]/dir1/training.htm</li>
                    </ul>
                  </ol>
                  <p className="text-green-700 text-sm">
                    This approach keeps your SCORM content within your project, eliminating the need for external storage services.
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="common-issues">
            <AccordionTrigger>Common SCORM Issues</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="border-l-4 border-orange-500 pl-4 py-2">
                  <h4 className="font-medium">Missing imsmanifest.xml</h4>
                  <p className="text-muted-foreground">
                    The imsmanifest.xml file must be in the root of your SCORM package, not inside a subfolder.
                  </p>
                </div>
                
                <div className="border-l-4 border-orange-500 pl-4 py-2">
                  <h4 className="font-medium">Incorrect Launch Path</h4>
                  <p className="text-muted-foreground">
                    The launch path should point to the main HTML file (usually index.html), and must match the file path in your zip.
                  </p>
                </div>
                
                <div className="border-l-4 border-orange-500 pl-4 py-2">
                  <h4 className="font-medium">Package Too Large</h4>
                  <p className="text-muted-foreground">
                    SCORM packages should ideally be less than 50MB. Large video or image files may cause loading issues.
                  </p>
                </div>
                
                <div className="border-l-4 border-orange-500 pl-4 py-2">
                  <h4 className="font-medium">Processing Timeout</h4>
                  <p className="text-muted-foreground">
                    Complex SCORM packages may timeout during processing. Try using the "Mark as Processed Manually" option.
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="best-practices">
            <AccordionTrigger>Best Practices</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-1" />
                  <p>Keep SCORM packages under 50MB by optimizing images and videos</p>
                </div>
                
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-1" />
                  <p>Use relative paths in your SCORM content files</p>
                </div>
                
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-1" />
                  <p>Test SCORM packages in a SCORM cloud or test LMS before uploading</p>
                </div>
                
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-1" />
                  <p>Use SCORM 1.2 for maximum compatibility if you have a choice</p>
                </div>
                
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-1" />
                  <p>Keep file and folder names simple - avoid special characters or spaces</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
