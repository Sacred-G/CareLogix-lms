import React from 'react';
import InteractiveMindmap from './InteractiveMindmap';
import { dspRoleMindMapData, communicationMindMapData } from './dspMindMapData';

interface MindmapSectionProps {
  type: 'dsp-role' | 'communication' | string;
  title?: string;
  description?: string;
}

/**
 * A component that displays an interactive mindmap for course content
 * Can be used in the InteractiveTab of CourseContent
 */
const MindmapSection: React.FC<MindmapSectionProps> = ({ 
  type, 
  title,
  description 
}) => {
  // Select the appropriate data based on type
  const getMindmapData = () => {
    switch (type) {
      case 'dsp-role':
        return {
          data: dspRoleMindMapData,
          defaultTitle: 'DSP Roles & Developmental Disabilities',
          defaultDescription: 'Explore the multifaceted role of Direct Support Professionals and understand developmental disabilities'
        };
      case 'communication':
        return {
          data: communicationMindMapData,
          defaultTitle: 'Communication Strategies',
          defaultDescription: 'Explore effective communication strategies for supporting individuals with developmental disabilities'
        };
      default:
        return {
          data: dspRoleMindMapData,
          defaultTitle: 'Course Concept Map',
          defaultDescription: 'Explore key concepts covered in this course'
        };
    }
  };

  const { data, defaultTitle, defaultDescription } = getMindmapData();
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium border-l-4 border-primary pl-3 py-1">
        Interactive Mind Map
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        This interactive visualization helps you understand how concepts connect. 
        Click nodes to expand or collapse them. Double-click for more information.
      </p>
      
      <InteractiveMindmap 
        data={data} 
        title={title || defaultTitle}
        description={description || defaultDescription}
      />
    </div>
  );
};

export default MindmapSection;
