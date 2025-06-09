import { Signature, SignatureUpload } from '@/data/signatureTypes';
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';

const SIGNATURES_BUCKET = 'signatures';
const SIGNATURES_TABLE = 'signatures';

// Import the Database type to get type-safety for our table
import { Database } from '@/integrations/supabase/types';

// Use the existing DB types instead of redefining
type SignatureRow = Database['public']['Tables']['signatures']['Row'];

// Map database row to our application model
const mapRowToSignature = (row: SignatureRow): Signature => ({
  id: row.id,
  name: row.name,
  title: row.title,
  imageUrl: row.image_url,
  organizationId: row.organization_id,
  default: row.is_default,
  createdAt: row.created_at,
  updatedAt: row.updated_at
});

// Initialize the signatures bucket if it doesn't exist
export const initializeSignaturesStorage = async (): Promise<void> => {
  try {
    // Check if bucket exists
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === SIGNATURES_BUCKET);
    
    if (!bucketExists) {
      // Create bucket for signatures
      await supabase.storage.createBucket(SIGNATURES_BUCKET, {
        public: false, // Private bucket for security
      });
      console.log(`Created ${SIGNATURES_BUCKET} bucket`);
    }
  } catch (error) {
    console.error('Error initializing signature storage:', error);
    throw error;
  }
};

// Upload a signature image to storage
export const uploadSignatureImage = async (imageData: string, signatureId: string): Promise<string> => {
  try {
    // Ensure bucket exists
    await initializeSignaturesStorage();
    
    // Decode base64 image data
    const byteCharacters = atob(imageData.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/png' }); // Assuming PNG for signature pad output
    
    // Generate a unique file path
    const filePath = `${signatureId}.png`; // Assuming PNG format
    
    // Upload the blob
    const { error } = await supabase.storage
      .from(SIGNATURES_BUCKET)
      .upload(filePath, blob, {
        cacheControl: '3600',
        upsert: true,
      });
      
    if (error) throw error;
    
    // Get the public URL
    const { data } = supabase.storage
      .from(SIGNATURES_BUCKET)
      .getPublicUrl(filePath);
      
    return data.publicUrl;
  } catch (error) {
    console.error('Error uploading signature image:', error);
    throw error;
  }
};

// Create a new signature
export const createSignature = async (signatureData: SignatureUpload): Promise<Signature> => {
  try {
    const signatureId = uuidv4();
    const now = new Date().toISOString();
    
    // Upload the signature image
    const imageUrl = await uploadSignatureImage(signatureData.imageData, signatureId);
    
    // If this is the default signature, update any existing defaults to false
    if (signatureData.default) {
      // Use raw SQL for now since the table might not exist in TypeScript definitions
      const { error } = await supabase.rpc('set_other_signatures_non_default');
      if (error) throw error;
    }
    
    // Create the record with snake_case for database columns
    const record = {
      id: signatureId,
      name: signatureData.name,
      title: signatureData.title,
      image_url: imageUrl,
      organization_id: signatureData.organizationId,
      is_default: signatureData.default || false,
      created_at: now,
      updated_at: now,
    };
    
    // Insert the signature into the properly typed table
    const { data, error } = await supabase
      .from(SIGNATURES_TABLE)
      .insert([record])
      .select();
      
    if (error) throw error;
    if (!data || data.length === 0) throw new Error('No data returned after insert');
    
    // Map the returned database row to our application model
    return mapRowToSignature(data[0] as SignatureRow);
  } catch (error) {
    console.error('Error creating signature:', error);
    throw error;
  }
};

// Get all signatures
export const getSignatures = async (): Promise<Signature[]> => {
  try {
    // Get all signatures from the properly typed table
    const { data, error } = await supabase
      .from(SIGNATURES_TABLE)
      .select('*')
      .order('name');
      
    if (error) throw error;
    if (!data) return [];
    
    // Map the database rows to our application model
    return data.map((row) => mapRowToSignature(row));
  } catch (error) {
    console.error('Error getting signatures:', error);
    return [];
  }
};

// Get default signature
export const getDefaultSignature = async (): Promise<Signature | null> => {
  try {
    // Get default signature from the properly typed table
    const { data, error } = await supabase
      .from(SIGNATURES_TABLE)
      .select('*')
      .eq('is_default', true)
      .single();
      
    if (error) {
      if (error.code === 'PGRST116') {
        // No default signature found
        return null;
      }
      throw error;
    }
    
    if (!data) return null;
    
    // Map the database row to our application model
    return mapRowToSignature(data as SignatureRow);
  } catch (error) {
    console.error('Error getting default signature:', error);
    return null;
  }
};

// Get signature by ID
export const getSignatureById = async (id: string): Promise<Signature | null> => {
  try {
    const { data, error } = await supabase
      .from(SIGNATURES_TABLE)
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    if (!data) return null;
    
    // Map the database row to our application model
    return mapRowToSignature(data);
  } catch (error) {
    console.error('Error getting signature by ID:', error);
    return null;
  }
};

// Update a signature
export const updateSignature = async (
  id: string, 
  updates: Partial<SignatureUpload>
): Promise<Signature | null> => {
  try {
    const now = new Date().toISOString();
    let imageUrl: string | undefined;
    
    // If there's new image data, upload it
    if (updates.imageData) {
      imageUrl = await uploadSignatureImage(updates.imageData, id);
    }
    
    // If updating to be default, update any existing defaults to false
    if (updates.default) {
      // Use SQL compatible field names
      const { error } = await supabase
        .from(SIGNATURES_TABLE)
        .update({ is_default: false })
        .eq('is_default', true)
        .neq('id', id);
        
      if (error) throw error;
    }
    
    // Create the update object with SQL compatible field names
    const updateData: Record<string, any> = {
      updated_at: now,
    };
    
    if (updates.name !== undefined) updateData.name = updates.name;
    if (updates.title !== undefined) updateData.title = updates.title;
    if (imageUrl) updateData.image_url = imageUrl;
    if (updates.organizationId !== undefined) updateData.organization_id = updates.organizationId;
    if (updates.default !== undefined) updateData.is_default = updates.default;
    
    // Update the signature
    const { data, error } = await supabase
      .from(SIGNATURES_TABLE)
      .update(updateData)
      .eq('id', id)
      .select();
      
    if (error) throw error;
    if (!data || data.length === 0) return null;
    
    // Map the database row to our application model
    return mapRowToSignature(data[0]);
  } catch (error) {
    console.error('Error updating signature:', error);
    return null;
  }
};

// Delete a signature
export const deleteSignature = async (id: string): Promise<boolean> => {
  try {
    // Get the signature to find the image URL
    const { data: signature, error: getError } = await supabase
      .from(SIGNATURES_TABLE)
      .select('image_url') // Use SQL compatible field name
      .eq('id', id)
      .single();
      
    if (getError) throw getError;
    
    // Delete the signature record
    const { error: deleteError } = await supabase
      .from(SIGNATURES_TABLE)
      .delete()
      .eq('id', id);
      
    if (deleteError) throw deleteError;
    
    // Delete the signature image if it exists
    // Delete the signature image if it exists
    if (signature?.image_url) {
      const urlParts = signature.image_url.split('/');
      const filePath = urlParts[urlParts.length - 1]; // Get the file name from the URL
      if (filePath) {
        await supabase.storage
          .from(SIGNATURES_BUCKET)
          .remove([filePath]);
      }
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting signature:', error);
    return false;
  }
};
