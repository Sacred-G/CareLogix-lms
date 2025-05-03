
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CourseTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const CourseTabs: React.FC<CourseTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <section className="border-b">
      <div className="container px-4 py-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue="all">
          <TabsList className="grid grid-cols-4 max-w-xl">
            <TabsTrigger value="all">All Courses</TabsTrigger>
            <TabsTrigger value="dsp">DSP Courses</TabsTrigger>
            <TabsTrigger value="micro">Micro Learning</TabsTrigger>
            <TabsTrigger value="general">General</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </section>
  );
};

export default CourseTabs;
