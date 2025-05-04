
export interface ScormModule {
  id: string;
  title: string;
  description?: string;
  course_id: string;
  file_path: string;
  launch_path: string;
  position: number;
  created_at?: string;
}

export interface ScormProgress {
  id: string;
  user_id: string;
  scorm_module_id: string;
  status: 'not_started' | 'in_progress' | 'completed';
  completion_percentage: number;
  score?: number;
  suspend_data?: string; 
}
