
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Control } from 'react-hook-form';

type CourseFormValues = {
  title: string;
  description: string;
  thumbnail: string;
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
    </>
  );
}
