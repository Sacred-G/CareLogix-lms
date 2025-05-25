import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, RotateCcw } from 'lucide-react';

// Configure the worker source for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = '/js/pdf.worker.mjs'; // Using local worker

interface PdfViewerProps {
  filePath: string;
  title?: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ filePath, title }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [rotation, setRotation] = useState<number>(0);

  function onDocumentLoadSuccess({ numPages: loadedNumPages }: { numPages: number }) {
    setNumPages(loadedNumPages);
    setPageNumber(1); // Reset to first page on new PDF load
    setScale(1.0);
    setRotation(0);
  }

  const goToPreviousPage = () => {
    setPageNumber(prevPageNumber => Math.max(prevPageNumber - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber(prevPageNumber => Math.min(prevPageNumber + 1, numPages || 1));
  };

  const handleZoomIn = () => setScale(prevScale => prevScale + 0.2);
  const handleZoomOut = () => setScale(prevScale => Math.max(prevScale - 0.2, 0.5));
  const handleRotate = () => setRotation(prevRotation => (prevRotation + 90) % 360);

  return (
    <div className="pdf-viewer-container bg-muted/30 p-4 rounded-lg shadow-inner">
      {title && <h3 className="text-lg font-semibold mb-3 text-center text-primary">{title}</h3>}
      <div className="pdf-controls flex flex-wrap items-center justify-center gap-2 mb-4 p-3 bg-card rounded-md shadow">
        <Button onClick={goToPreviousPage} disabled={pageNumber <= 1} variant="outline" size="sm">
          <ChevronLeft className="h-4 w-4 mr-1" /> Prev
        </Button>
        <span className="text-sm font-medium mx-2">
          Page {pageNumber} of {numPages || '--'}
        </span>
        <Button onClick={goToNextPage} disabled={pageNumber >= (numPages || 0)} variant="outline" size="sm">
          Next <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
        <Button onClick={handleZoomIn} variant="outline" size="sm" className="ml-4">
          <ZoomIn className="h-4 w-4 mr-1" /> Zoom In
        </Button>
        <Button onClick={handleZoomOut} variant="outline" size="sm">
          <ZoomOut className="h-4 w-4 mr-1" /> Zoom Out
        </Button>
        <Button onClick={handleRotate} variant="outline" size="sm">
          <RotateCcw className="h-4 w-4 mr-1" /> Rotate
        </Button>
        <a href={filePath} download target="_blank" rel="noopener noreferrer" className="ml-auto">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" /> Download PDF
          </Button>
        </a>
      </div>

      <div className="pdf-document-wrapper overflow-auto flex justify-center items-center bg-white p-2 rounded shadow" style={{ minHeight: '60vh' }}>
        <Document
          file={filePath}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={(error) => {
            console.error('Error loading PDF:', error.message);
            // Potentially display an error message to the user here
          }}
          loading={<div className="text-center p-10">Loading PDF...</div>}
          error={<div className="text-center p-10 text-red-600">Failed to load PDF. Please ensure the path is correct and the file is accessible.</div>}
        >
          <Page 
            pageNumber={pageNumber} 
            scale={scale} 
            rotate={rotation} 
            renderAnnotationLayer={true}
            renderTextLayer={true}
          />
        </Document>
      </div>
    </div>
  );
};

export default PdfViewer;
