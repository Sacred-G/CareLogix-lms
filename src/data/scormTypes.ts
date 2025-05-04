
export type ScormModuleStatus = 'not_started' | 'in_progress' | 'completed';
export type ScormProcessingStatus = 'pending' | 'processing' | 'processed' | 'error';

export interface ScormModule {
  id: string;
  title: string;
  description?: string;
  course_id: string;
  file_path: string;
  launch_path: string;
  position: number;
  created_at?: string;
  created_by?: string;
  processed_at?: string;
  status?: ScormProcessingStatus;
  public_url?: string;
  manifest_data?: ScormManifest;
}

export interface ScormManifest {
  title: string;
  identifier: string;
  version: string;
  organizations: ScormOrganization[];
  resources: ScormResource[];
}

export interface ScormOrganization {
  id: string;
  items: ScormItem[];
}

export interface ScormItem {
  id: string;
  title: string;
  resourceId: string;
}

export interface ScormResource {
  id: string;
  type: string;
  href: string;
}

export interface ScormProgress {
  id: string;
  user_id: string;
  scorm_module_id: string;
  status: ScormModuleStatus;
  completion_percentage: number;
  score?: number;
  suspend_data?: string; 
  created_at?: string;
  updated_at?: string;
}

export interface ScormPackageUpload {
  file: File;
  courseId: string;
  title: string;
  description?: string;
  position?: number;
}

export interface ScormModuleWithProgress extends ScormModule {
  progress?: ScormProgress;
}

export interface ScormProgressUpdate {
  status?: ScormModuleStatus;
  percentage?: number;
  score?: number;
  suspendData?: string;
}
