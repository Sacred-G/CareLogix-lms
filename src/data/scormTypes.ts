
export interface ScormModule {
  id: string;
  title: string;
  description?: string;
  course_id: string;
  file_path: string;
  launch_path: string;
  public_url?: string;
  status: ScormProcessingStatus;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  domain?: string | null;
  position?: number;
}

export type ScormProcessingStatus = 'pending' | 'processing' | 'processed' | 'error' | 'local_mode';

export interface ScormProgress {
  id: string;
  user_id: string;
  scorm_module_id: string;
  status: 'not_started' | 'in_progress' | 'completed';
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
  moduleId: string;
  status?: 'not_started' | 'in_progress' | 'completed';
  percentage?: number;
  score?: number;
  suspendData?: string;
}
