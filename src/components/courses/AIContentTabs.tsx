import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

type AIContentTabsProps = {
  course: {
    quizContent?: string | null;
    moduleContent?: string | null;
    objectives?: string | null;
    assessmentCriteria?: string | null;
    scenarioContent?: string | null;
    lessonPlan?: string | null;
  };
  isLoading?: boolean;
};

export default function AIContentTabs({ course, isLoading = false }: AIContentTabsProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const hasContent = [
    course.quizContent,
    course.moduleContent,
    course.objectives,
    course.assessmentCriteria,
    course.scenarioContent,
    course.lessonPlan,
  ].some(Boolean);

  if (!hasContent) {
    return (
      <Card className="mt-4">
        <CardContent className="p-6 text-center text-muted-foreground">
          No AI-generated content available for this course.
        </CardContent>
      </Card>
    );
  }

  // Helper component to render markdown content with proper formatting
  const MarkdownContent = ({ content }: { content?: string | null }) => {
    if (!content) return null;
    
    return (
      <div className="prose dark:prose-invert max-w-none">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    );
  };

  return (
    <Tabs defaultValue="objectives" className="mt-6">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {course.objectives && (
          <TabsTrigger value="objectives">Learning Objectives</TabsTrigger>
        )}
        {course.moduleContent && (
          <TabsTrigger value="modules">Module Outline</TabsTrigger>
        )}
        {course.quizContent && (
          <TabsTrigger value="quizzes">Quiz Questions</TabsTrigger>
        )}
        {course.assessmentCriteria && (
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
        )}
        {course.scenarioContent && (
          <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
        )}
        {course.lessonPlan && (
          <TabsTrigger value="lessonPlan">Lesson Plan</TabsTrigger>
        )}
      </TabsList>

      <div className="mt-6">
        {course.objectives && (
          <TabsContent value="objectives">
            <Card>
              <CardContent className="p-6">
                <MarkdownContent content={course.objectives} />
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {course.moduleContent && (
          <TabsContent value="modules">
            <Card>
              <CardContent className="p-6">
                <MarkdownContent content={course.moduleContent} />
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {course.quizContent && (
          <TabsContent value="quizzes">
            <Card>
              <CardContent className="p-6">
                <MarkdownContent content={course.quizContent} />
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {course.assessmentCriteria && (
          <TabsContent value="assessments">
            <Card>
              <CardContent className="p-6">
                <MarkdownContent content={course.assessmentCriteria} />
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {course.scenarioContent && (
          <TabsContent value="scenarios">
            <Card>
              <CardContent className="p-6">
                <MarkdownContent content={course.scenarioContent} />
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {course.lessonPlan && (
          <TabsContent value="lessonPlan">
            <Card>
              <CardContent className="p-6">
                <MarkdownContent content={course.lessonPlan} />
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </div>
    </Tabs>
  );
}
