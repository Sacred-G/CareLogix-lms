
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Control } from 'react-hook-form';

type CourseFormValues = {
  title: string;
  description: string;
  thumbnail: string;
  videoUrl?: string;
  audioUrl?: string;
  transcript?: string;
  quizContent?: string;
  moduleContent?: string;
  objectives?: string;
  assessmentCriteria?: string;
  scenarioContent?: string;
  lessonPlan?: string;
};

interface CourseFormFieldsProps {
  control: Control<CourseFormValues>;
}

export default function CourseFormFields({ control }: CourseFormFieldsProps) {
  return (
    <>
      <FormField
        control={control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Course Title</FormLabel>
            <FormControl>
              <Input placeholder="Enter course title" {...field} />
            </FormControl>
            <FormDescription>
              Be specific and clear about what the course teaches
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Course Description</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Enter course description" 
                className="min-h-32" 
                {...field} 
              />
            </FormControl>
            <FormDescription>
              Describe what students will learn in this course
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="thumbnail"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Thumbnail URL</FormLabel>
            <FormControl>
              <Input placeholder="Enter image URL" {...field} />
            </FormControl>
            <FormDescription>
              Provide a URL to an image that represents this course
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="videoUrl"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Video URL</FormLabel>
            <FormControl>
              <Input placeholder="Enter video URL" {...field} value={field.value || ''} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="audioUrl"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Audio URL</FormLabel>
            <FormControl>
              <Input placeholder="Enter audio URL" {...field} value={field.value || ''} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Hidden fields for AI-generated content */}
      <FormField
        control={control}
        name="quizContent"
        render={({ field }) => <input type="hidden" {...field} />}
      />
      <FormField
        control={control}
        name="moduleContent"
        render={({ field }) => <input type="hidden" {...field} />}
      />
      <FormField
        control={control}
        name="objectives"
        render={({ field }) => <input type="hidden" {...field} />}
      />
      <FormField
        control={control}
        name="assessmentCriteria"
        render={({ field }) => <input type="hidden" {...field} />}
      />
      <FormField
        control={control}
        name="scenarioContent"
        render={({ field }) => <input type="hidden" {...field} />}
      />
      <FormField
        control={control}
        name="lessonPlan"
        render={({ field }) => <input type="hidden" {...field} />}
      />
      <FormField
        control={control}
        name="transcript"
        render={({ field }) => <input type="hidden" {...field} />}
      />
    </>
  );
}
