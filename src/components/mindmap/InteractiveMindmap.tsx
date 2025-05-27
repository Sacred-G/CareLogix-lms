import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, Home } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { MindMapNode } from './dspMindMapData';

interface InteractiveMindmapProps {
  data: MindMapNode;
  title?: string;
  description?: string;
}

const InteractiveMindmap: React.FC<InteractiveMindmapProps> = ({ 
  data, 
  title = 'Interactive Mind Map',
  description = 'Explore concepts by clicking on nodes to expand or collapse them'
}) => {
  // Define mindmap container size - extreme size to prevent overlapping
  const mapWidth = 3000;
  const mapHeight = 1500;

  // For panning & zooming
  const [scale, setScale] = useState(0.6); // Start even more zoomed out to show full map
  const [position, setPosition] = useState({ x: 0, y: 100 }); // Start with a slight upward offset
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set([data.id]));
  const [selectedNode, setSelectedNode] = useState<MindMapNode | null>(null);

  // Pan functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) { // Left mouse button
      setDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragging) {
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      setPosition({
        x: position.x + dx,
        y: position.y + dy
      });
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  // Zoom functionality
  const handleZoomIn = () => {
    setScale(scale * 1.2);
  };

  const handleZoomOut = () => {
    setScale(scale / 1.2);
  };

  const resetView = () => {
    setScale(0.6);
    setPosition({ x: 0, y: 100 });
  };

  // Node expansion
  const toggleNode = (nodeId: string) => {
    const newExpandedNodes = new Set(expandedNodes);
    
    if (newExpandedNodes.has(nodeId)) {
      newExpandedNodes.delete(nodeId);
    } else {
      newExpandedNodes.add(nodeId);
    }
    
    setExpandedNodes(newExpandedNodes);
  };

  // Find a node by ID (used for selection)
  const findNodeById = (root: MindMapNode, id: string): MindMapNode | null => {
    if (root.id === id) return root;
    
    if (root.children) {
      for (const child of root.children) {
        const found = findNodeById(child, id);
        if (found) return found;
      }
    }
    
    return null;
  };

  // Select a node to show info
  const handleNodeSelect = (nodeId: string) => {
    const node = findNodeById(data, nodeId);
    setSelectedNode(node);
  };
  
  // Helper function to wrap text
  const wrapText = (text: string, maxLength: number = 12) => {
    if (!text || text.length <= maxLength) return text;
    
    const parts = [];
    let currentLine = "";
    const words = text.split(" ");
    
    for (const word of words) {
      if ((currentLine + " " + word).length <= maxLength) {
        currentLine += (currentLine ? " " : "") + word;
      } else {
        if (currentLine) parts.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine) parts.push(currentLine);
    
    return parts.join("\n");
  };

  // Recursive function to render nodes
  const renderNode = (node: MindMapNode, x: number, y: number, level: number = 0, index: number = 0, parentX?: number, parentY?: number) => {
    const nodeColor = node.color || '#4CAF50'; // Default green color
    const nodeBgColor = `${nodeColor}33`; // Add transparency
    
    // Extremely large node sizes to prevent text overflow
    const baseWidth = 320; // Even larger base width
    const levelIncrement = 50; // Even larger increment per level
    const nodeWidth = baseWidth + level * levelIncrement;
    
    // Very tall nodes
    const nodeHeight = 120; // Even taller nodes
    
    // Extreme spacing between nodes to prevent any overlap
    // Increased vertical spacing to prevent overlap between top, middle, and bottom nodes
    const childSpacing = 650; // Significantly increased vertical spacing
    const horizontalSpacing = 800; // Extreme horizontal spacing
    
    // Calculate vertical spacing based on expanded children
    const childrenToRender: JSX.Element[] = [];
    let totalChildHeight = 0;
    
    if (expandedNodes.has(node.id) && node.children && node.children.length > 0) {
      // Calculate total height needed for children and adjust spacing
      const totalHeight = node.children.length * childSpacing;
      totalChildHeight = totalHeight;
      
      // Create more vertical space for the top and bottom nodes
      const childrenCount = node.children.length;
      const verticalOffset = childrenCount > 2 ? 350 : 0; // Increased vertical offset
      const childY = y - totalHeight / 2 + childSpacing / 2 - verticalOffset; // Move everything up more
      
      node.children.forEach((child, childIndex) => {
        const childX = x + horizontalSpacing; // Increased horizontal spacing
        
        // Apply additional vertical spacing to create more distance between nodes
        let positionMultiplier = 1.0;
        let additionalOffset = 0;
        
        // Apply additional spacing for top and bottom nodes
        if (childrenCount > 2) {
          if (childIndex === 0) { // Top node
            positionMultiplier = 0.7; // Moves it even higher
            additionalOffset = -200; // Additional upward offset for top node
          } else if (childIndex === 1) { // Middle node
            additionalOffset = 100; // Push middle node down a bit
          } else if (childIndex === childrenCount - 1) { // Bottom node
            positionMultiplier = 1.3; // Moves it even lower
            additionalOffset = 200; // Additional downward offset for bottom node
          }
        }
        
        const newChildY = childY + (childIndex * childSpacing * positionMultiplier) + additionalOffset;
        
        childrenToRender.push(
          renderNode(child, childX, newChildY, level + 1, childIndex, x, y)
        );
      });
    }
    
    // Wrap text for node label
    const wrappedText = wrapText(node.label, 20); // Adjust max length as needed
    
    return (
      <g key={`node-${node.id}`}>
        {/* Connection line to parent */}
        {parentX !== undefined && parentY !== undefined && (
          <line 
            x1={parentX + nodeWidth / 2} 
            y1={parentY} 
            x2={x - nodeWidth / 2} 
            y2={y}
            stroke={nodeColor} 
            strokeWidth="2"
            strokeDasharray={level > 1 ? "5,5" : undefined}
          />
        )}
        
        {/* Node rectangle */}
        <g 
          onClick={() => toggleNode(node.id)}
          onDoubleClick={() => handleNodeSelect(node.id)}
          style={{ cursor: 'pointer' }}
        >
          <rect
            x={x - nodeWidth / 2}
            y={y - nodeHeight / 2}
            width={nodeWidth}
            height={nodeHeight}
            rx={8}
            ry={8}
            fill={nodeBgColor}
            stroke={nodeColor}
            strokeWidth="2"
          />
          
          {/* Render multi-line text */}
          {wrappedText.split("\n").map((line, lineIndex) => {
            const lineCount = wrappedText.split("\n").length;
            const lineHeight = 16; // Height per line of text
            const yOffset = (lineIndex - (lineCount - 1) / 2) * lineHeight;
            
            return (
              <text
                key={`text-${node.id}-${lineIndex}`}
                x={x}
                y={y + yOffset}
                textAnchor="middle"
                fontSize="12"
                fontWeight="500"
                fill="#333"
              >
                {line}
              </text>
            );
          })}
          
          {/* Expand/collapse button */}
          {node.children && node.children.length > 0 && (
            <g 
              transform={`translate(${nodeWidth / 2 + 15}, 0)`}
              onClick={(e) => {
                e.stopPropagation();
                toggleNode(node.id);
              }}
              style={{ cursor: 'pointer' }}
            >
              <circle 
                r="10" 
                fill="white"
                stroke={nodeColor}
                strokeWidth="1.5"
              />
              <text
                x="0"
                y="4"
                textAnchor="middle"
                fontSize="14"
                fontWeight="bold"
                fill={nodeColor}
              >
                {expandedNodes.has(node.id) ? '-' : '+'}
              </text>
            </g>
          )}
          
          {/* Info indicator */}
          {node.description && (
            <g transform={`translate(${x - nodeWidth / 2 + 15}, ${y})`}>
              <circle
                r="8"
                fill="#fff"
                stroke="#3b82f6"
                strokeWidth="1"
              />
              <text
                x="0"
                y="4"
                textAnchor="middle"
                fontSize="10"
                fontWeight="bold"
                fill="#3b82f6"
              >
                i
              </text>
            </g>
          )}
        </g>
        
        {/* Render children */}
        {childrenToRender}
      </g>
    );
  };
  
  return (
    <Card className="w-full overflow-hidden border shadow-md">
      <div className="p-4 border-b bg-muted/20">
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      
      <div 
        className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 overflow-hidden" 
        style={{
          width: '100%',
          height: '1000px', // Even taller container
          position: 'relative',
        }}
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={handleZoomIn}>
                  <ZoomIn size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Zoom In</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={handleZoomOut}>
                  <ZoomOut size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Zoom Out</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={resetView}>
                  <Home size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Reset View</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        {/* SVG mindmap with much more space */}
        <svg 
          ref={svgRef}
          width="100%" 
          height="100%"
          style={{ 
            cursor: dragging ? 'grabbing' : 'grab',
          }}
        >
          <g transform={`translate(${position.x + 800}, ${position.y + 350}) scale(${scale})`}>
            {renderNode(data, 0, 0)}
          </g>
        </svg>
        
        {/* Node info panel */}
        {selectedNode && (
          <div className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-lg shadow-lg border max-w-md">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">{selectedNode.label}</h4>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6" 
                onClick={() => setSelectedNode(null)}
              >
                <span className="sr-only">Close</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">{selectedNode.description || 'No additional information available.'}</p>
          </div>
        )}
        
        {/* Helper text */}
        <div className="absolute bottom-4 right-4 text-xs text-muted-foreground bg-white p-2 rounded-md shadow-sm border">
          <p>Click nodes to expand/collapse. Double-click for details.</p>
          <p>Drag to pan. Use controls to zoom.</p>
        </div>
      </div>
    </Card>
  );
};

export default InteractiveMindmap;
