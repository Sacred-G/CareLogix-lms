export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          message: string
          type: 'success' | 'error' | 'info' | 'warning'
          read: boolean
          action: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          message: string
          type?: 'success' | 'error' | 'info' | 'warning'
          read?: boolean
          action?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          message?: string
          type?: 'success' | 'error' | 'info' | 'warning'
          read?: boolean
          action?: string | null
          created_at?: string
        }
      },
      certificates: {
        Row: {
          certificate_number: string
          completion_date: string
          course_id: string
          course_title: string
          id: string
          issue_date: string
          organization_logo: string | null
          organization_name: string | null
          user_id: string
          user_name: string
          valid_until: string | null
        }
        Insert: {
          certificate_number: string
          completion_date?: string
          course_id: string
          course_title: string
          id?: string
          issue_date?: string
          organization_logo?: string | null
          organization_name?: string | null
          user_id: string
          user_name: string
          valid_until?: string | null
        }
        Update: {
          certificate_number?: string
          completion_date?: string
          course_id?: string
          course_title?: string
          id?: string
          issue_date?: string
          organization_logo?: string | null
          organization_name?: string | null
          user_id?: string
          user_name?: string
          valid_until?: string | null
        }
        Relationships: []
      }
      courses: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          domain: string | null
          id: string
          thumbnail: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          domain?: string | null
          id?: string
          thumbnail?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          domain?: string | null
          id?: string
          thumbnail?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "courses_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      enrollments: {
        Row: {
          completed: boolean | null
          course_id: string
          created_at: string
          id: string
          progress: number | null
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          course_id: string
          created_at?: string
          id?: string
          progress?: number | null
          user_id: string
        }
        Update: {
          completed?: boolean | null
          course_id?: string
          created_at?: string
          id?: string
          progress?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          content: string | null
          id: string
          position: number
          section_id: string | null
          title: string
        }
        Insert: {
          content?: string | null
          id?: string
          position?: number
          section_id?: string | null
          title: string
        }
        Update: {
          content?: string | null
          id?: string
          position?: number
          section_id?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "lessons_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "sections"
            referencedColumns: ["id"]
          },
        ]
      }
      media: {
        Row: {
          id: string
          lesson_id: string | null
          title: string | null
          type: string | null
          url: string | null
        }
        Insert: {
          id?: string
          lesson_id?: string | null
          title?: string | null
          type?: string | null
          url?: string | null
        }
        Update: {
          id?: string
          lesson_id?: string | null
          title?: string | null
          type?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "media_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          email: string | null
          email_domain: string | null
          full_name: string | null
          id: string
          role: string | null
          failed_attempts: number
          is_locked: boolean
        }
        Insert: {
          avatar_url?: string | null
          email?: string | null
          email_domain?: string | null
          full_name?: string | null
          id: string
          role?: string | null
          failed_attempts?: number
          is_locked?: boolean
        }
        Update: {
          avatar_url?: string | null
          email?: string | null
          email_domain?: string | null
          full_name?: string | null
          id?: string
          role?: string | null
          failed_attempts?: number
          is_locked?: boolean
        }
        Relationships: []
      }
      quiz_questions: {
        Row: {
          correct_option: string | null
          id: string
          options: Json | null
          question: string
          quiz_id: string | null
        }
        Insert: {
          correct_option?: string | null
          id?: string
          options?: Json | null
          question: string
          quiz_id?: string | null
        }
        Update: {
          correct_option?: string | null
          id?: string
          options?: Json | null
          question?: string
          quiz_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_questions_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      quizzes: {
        Row: {
          id: string
          section_id: string | null
        }
        Insert: {
          id?: string
          section_id?: string | null
        }
        Update: {
          id?: string
          section_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quizzes_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "sections"
            referencedColumns: ["id"]
          },
        ]
      }
      scorm_modules: {
        Row: {
          course_id: string
          created_at: string | null
          created_by: string | null
          description: string | null
          domain: string | null
          file_path: string
          id: string
          launch_path: string
          manifest_data: Json | null
          position: number | null
          processed_at: string | null
          public_url: string | null
          status: string | null
          title: string
        }
        Insert: {
          course_id: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          domain?: string | null
          file_path: string
          id?: string
          launch_path?: string
          manifest_data?: Json | null
          position?: number | null
          processed_at?: string | null
          public_url?: string | null
          status?: string | null
          title: string
        }
        Update: {
          course_id?: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          domain?: string | null
          file_path?: string
          id?: string
          launch_path?: string
          manifest_data?: Json | null
          position?: number | null
          processed_at?: string | null
          public_url?: string | null
          status?: string | null
          title?: string
        }
        Relationships: []
      }
      signatures: {
        Row: {
          id: string
          name: string
          title: string
          image_url: string
          organization_id: string | null
          is_default: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          title: string
          image_url: string
          organization_id?: string | null
          is_default?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          title?: string
          image_url?: string
          organization_id?: string | null
          is_default?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      scorm_progress: {
        Row: {
          completion_percentage: number | null
          created_at: string | null
          id: string
          score: number | null
          scorm_module_id: string
          status: string
          suspend_data: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          completion_percentage?: number | null
          created_at?: string | null
          id?: string
          score?: number | null
          scorm_module_id: string
          status?: string
          suspend_data?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          completion_percentage?: number | null
          created_at?: string | null
          id?: string
          score?: number | null
          scorm_module_id?: string
          status?: string
          suspend_data?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "scorm_progress_scorm_module_id_fkey"
            columns: ["scorm_module_id"]
            isOneToOne: false
            referencedRelation: "scorm_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      sections: {
        Row: {
          course_id: string | null
          id: string
          position: number
          title: string
        }
        Insert: {
          course_id?: string | null
          id?: string
          position?: number
          title: string
        }
        Update: {
          course_id?: string | null
          id?: string
          position?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "sections_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      user_progress: {
        Row: {
          completed: boolean | null
          created_at: string
          id: string
          lesson_id: string | null
          quiz_id: string | null
          score: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          created_at?: string
          id?: string
          lesson_id?: string | null
          quiz_id?: string | null
          score?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          completed?: boolean | null
          created_at?: string
          id?: string
          lesson_id?: string | null
          quiz_id?: string | null
          score?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_progress_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      user_belongs_to_domain: {
        Args: { course_domain: string }
        Returns: boolean
      }
      set_other_signatures_non_default: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      user_role: "admin" | "student"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: ["admin", "student"],
    },
  },
} as const
