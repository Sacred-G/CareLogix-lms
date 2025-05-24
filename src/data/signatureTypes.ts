export interface Signature {
  id: string;
  name: string;           // Name of the person (instructor, director, etc.)
  title: string;          // Position/title (e.g., "Program Director")
  imageUrl: string;       // Path to the signature image
  organizationId?: string; // Optional organization ID if you have multiple orgs
  default: boolean;       // Whether this is the default signature for certificates
  createdAt: string;
  updatedAt: string;
}

export interface SignatureUpload {
  name: string;
  title: string;
  signatureFile: File;
  organizationId?: string;
  default?: boolean;
}
