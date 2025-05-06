
export type ScormProcessingStatus = 'pending' | 'processing' | 'processed' | 'error';
export type ScormModuleStatus = 'not_started' | 'in_progress' | 'completed';

export interface ScormModule {
  id: string;
  title: string;
  description?: string;
  course_id: string;
  file_path: string;
  launch_path: string;
  status?: ScormProcessingStatus;
  public_url?: string;
  created_at?: string;
  processed_at?: string;
  created_by?: string;
  position?: number;
  manifest_data?: any;
  domain?: string;
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

export interface ScormModuleWithProgress extends ScormModule {
  progress?: ScormProgress;
}

export interface ScormProgressUpdate {
  status?: ScormModuleStatus;
  percentage?: number;
  score?: number;
  suspendData?: string;
}
