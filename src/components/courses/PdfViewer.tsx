import React, { useState, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/components/ui/use-toast';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, RotateCcw, ExternalLink, Save, Database, HardDrive } from 'lucide-react';
import { useFormSubmissions } from '@/hooks/useFormSubmissions';

// Configure the worker source for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = '/js/pdf.worker.mjs'; // Using local worker

interface PdfViewerProps {
  filePath: string;
  title?: string;
  isEditable?: boolean;
  courseId?: string;
  formType?: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ 
  filePath, 
  title, 
  isEditable = true, 
  courseId = 'risk-management-incident-reporting', 
  formType = 'incident-report' 
}) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [rotation, setRotation] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<string>('view');
  const [formData, setFormData] = useState<any>(null);
  const [isFormEditable, setIsFormEditable] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveMethod, setSaveMethod] = useState<'local' | 'database'>('local');
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // Use our form submissions hook
  const { submitForm, isLoading, error } = useFormSubmissions();
  const { toast } = useToast();

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

  // Function to toggle edit mode
  const toggleEditMode = () => {
    setIsFormEditable(!isFormEditable);
  };
  
  // Function to open PDF in new tab if needed
  const openInNewTab = () => {
    window.open(filePath, '_blank');
  };
  
  // Function to handle form field changes
  const handleFormFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Function to extract form data from iframe
  const extractFormData = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        // Attempt to access form fields in the PDF
        const iframe = iframeRef.current;
        const formFields = iframe.contentWindow.document.querySelectorAll('input, textarea, select');
        
        const extractedData: Record<string, string> = {};
        formFields.forEach((field: any, index) => {
          const fieldName = field.name || field.id || `field_${index}`;
          extractedData[fieldName] = field.value || '';
        });
        
        setFormData(extractedData);
        return extractedData;
      } catch (error) {
        console.error('Error extracting form data:', error);
        return {};
      }
    }
    return {};
  };
  
  // Function to save form data to localStorage
  const saveToLocalStorage = (data: Record<string, string>) => {
    const storageKey = `pdf_form_${filePath.split('/').pop()?.replace('.pdf', '') || 'unknown'}`;
    localStorage.setItem(storageKey, JSON.stringify(data));
  };
  
  // Function to download form data as JSON
  const downloadAsJson = (data: Record<string, string>) => {
    const fileName = `${filePath.split('/').pop()?.replace('.pdf', '')}_data.json` || 'form_data.json';
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  
  // Save form data to Supabase
  const saveToSupabase = async (data: Record<string, string>) => {
    setIsSaving(true);
    try {
      const result = await submitForm(courseId, formType, data);
      
      if (result.success) {
        toast({
          title: 'Form Saved to Database',
          description: 'Your form submission has been saved to the database.',
          variant: 'default',
        });
        return true;
      } else {
        toast({
          title: 'Error Saving Form',
          description: result.error || 'There was an error saving your form data.',
          variant: 'destructive',
        });
        return false;
      }
    } catch (err) {
      console.error('Error saving to Supabase:', err);
      toast({
        title: 'Error Saving Form',
        description: 'There was an unexpected error saving your form data.',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsSaving(false);
    }
  };
  
  // Main save function
  const saveFormData = async () => {
    const data = extractFormData();
    if (Object.keys(data).length === 0) {
      toast({
        title: 'No Data Found',
        description: 'No form data was detected. Make sure you have filled out some fields in the form.',
        variant: 'destructive',
      });
      return;
    }
    
    // Save based on selected method
    if (saveMethod === 'local') {
      // Save to localStorage for persistence
      saveToLocalStorage(data);
      
      toast({
        title: 'Form Saved Locally',
        description: 'Your form data has been saved to your browser storage.',
        variant: 'default',
      });
      
      // For practice purposes, also offer to download the data
      if (window.confirm('Form data has been saved locally! Would you like to download a copy of your responses as a JSON file?')) {
        downloadAsJson(data);
      }
    } else {
      // Save to Supabase
      await saveToSupabase(data);
    }
    
    console.log('Form data saved:', data);
  };
  
  // Load the iframe with the PDF when in edit mode
  useEffect(() => {
    if (activeTab === 'edit' && iframeRef.current) {
      iframeRef.current.src = filePath;
    }
  }, [activeTab, filePath]);

  return (
    <div className="pdf-viewer-container bg-muted/30 p-2 sm:p-4 rounded-lg shadow-inner w-full max-w-full overflow-hidden">
      {title && <h3 className="text-lg font-semibold mb-3 text-center text-primary">{title}</h3>}
      
      {isEditable ? (
        <Tabs defaultValue="view" onValueChange={setActiveTab} className="w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4 w-full">
            <TabsList className="w-full sm:w-auto overflow-x-auto no-scrollbar">
              <TabsTrigger value="view" className="text-xs sm:text-sm px-3 py-1.5">View PDF</TabsTrigger>
              <TabsTrigger value="edit" className="text-xs sm:text-sm px-3 py-1.5">Edit Form</TabsTrigger>
            </TabsList>
            
            <div className="w-full sm:w-auto flex justify-end">
              <a href={filePath} download target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                  <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1" />
                  <span className="text-xs sm:text-sm">Download</span>
                </Button>
              </a>
            </div>
          </div>
          
          <TabsContent value="view" className="mt-0">
            <div className="pdf-controls">
        <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mb-2">
          {/* Navigation Buttons */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Button 
              onClick={goToPreviousPage} 
              disabled={pageNumber <= 1} 
              variant="outline" 
              size="sm"
              className="h-8 px-2 text-xs sm:text-sm"
            >
              <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-0.5" />
              <span className="hidden sm:inline">Prev</span>
            </Button>
            
            <div className="text-xs sm:text-sm font-medium bg-muted/50 px-2 py-1.5 rounded-md">
              {pageNumber} / {numPages || '--'}
            </div>
            
            <Button 
              onClick={goToNextPage} 
              disabled={pageNumber >= (numPages || 0)} 
              variant="outline" 
              size="sm"
              className="h-8 px-2 text-xs sm:text-sm"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 ml-0.5" />
            </Button>
          </div>
          
          {/* Zoom Controls */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Button 
              onClick={handleZoomIn} 
              variant="outline" 
              size="sm"
              className="h-8 px-2 text-xs sm:text-sm"
              aria-label="Zoom in"
            >
              <ZoomIn className="h-3 w-3 sm:h-4 sm:w-4 mr-0.5" />
              <span className="hidden sm:inline">Zoom In</span>
            </Button>
            
            <Button 
              onClick={handleZoomOut} 
              variant="outline" 
              size="sm"
              className="h-8 px-2 text-xs sm:text-sm"
              aria-label="Zoom out"
            >
              <ZoomOut className="h-3 w-3 sm:h-4 sm:w-4 mr-0.5" />
              <span className="hidden sm:inline">Zoom Out</span>
            </Button>
            
            <Button 
              onClick={handleRotate} 
              variant="outline" 
              size="sm"
              className="h-8 px-2 text-xs sm:text-sm"
              aria-label="Rotate"
            >
              <RotateCcw className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </div>
            </div>

            <div className="pdf-document-wrapper w-full overflow-auto flex justify-center items-center bg-white p-1 sm:p-2 rounded shadow" style={{ minHeight: '50vh', maxHeight: '70vh' }}>
              <Document
                file={filePath}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={(error) => {
                  console.error('Error loading PDF:', error.message);
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
          </TabsContent>
          
          <TabsContent value="edit" className="mt-0">
            <div className="edit-controls flex flex-wrap items-center justify-between gap-2 mb-4 p-3 bg-card rounded-md shadow">
              <div className="flex items-center">
                <span className="text-sm font-medium">Edit Mode: Fill out the form directly</span>
              </div>
              <div className="flex gap-2 items-center">
                <div className="flex border rounded-md overflow-hidden mr-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button 
                          onClick={() => setSaveMethod('local')} 
                          className={`px-2 py-1 text-xs flex items-center ${saveMethod === 'local' ? 'bg-blue-100 text-blue-700' : 'bg-gray-50'}`}
                        >
                          <HardDrive className="h-3 w-3 mr-1" /> Local
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Save to browser storage</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button 
                          onClick={() => setSaveMethod('database')} 
                          className={`px-2 py-1 text-xs flex items-center ${saveMethod === 'database' ? 'bg-blue-100 text-blue-700' : 'bg-gray-50'}`}
                        >
                          <Database className="h-3 w-3 mr-1" /> Database
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Save to Supabase database</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                
                <Button 
                  onClick={saveFormData} 
                  variant="outline" 
                  size="sm" 
                  className="bg-green-600 hover:bg-green-700 text-white"
                  disabled={isSaving || isLoading}
                >
                  {isSaving || isLoading ? (
                    <>
                      <span className="animate-pulse mr-1">Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-1" /> Save Form Data
                    </>
                  )}
                </Button>
              </div>
            </div>
            
            <div className="pdf-edit-wrapper bg-white rounded shadow" style={{ minHeight: '70vh', width: '100%' }}>
              <iframe 
                ref={iframeRef}
                title="Editable PDF Form"
                className="w-full h-full border-0"
                style={{ minHeight: '70vh' }}
              />
              <div className="p-4 bg-blue-50 border-t border-blue-100 text-sm text-gray-800">
                <p className="font-medium text-gray-900">Instructions:</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Click on any form field to start typing</li>
                  <li>Use Tab key to navigate between fields</li>
                  <li>Click the Save Form Data button when finished</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        // Non-editable view (fallback to original viewer)
        <>
          <div className="pdf-controls">
            <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mb-2">
              {/* Navigation Buttons */}
              <div className="flex items-center gap-1 sm:gap-2">
                <Button 
                  onClick={goToPreviousPage} 
                  disabled={pageNumber <= 1} 
                  variant="outline" 
                  size="sm"
                  className="h-8 px-2 text-xs sm:text-sm"
                >
                  <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-0.5" />
                  <span className="hidden sm:inline">Prev</span>
                </Button>
                
                <div className="text-xs sm:text-sm font-medium bg-muted/50 px-2 py-1.5 rounded-md">
                  {pageNumber} / {numPages || '--'}
                </div>
                
                <Button 
                  onClick={goToNextPage} 
                  disabled={pageNumber >= (numPages || 0)} 
                  variant="outline" 
                  size="sm"
                  className="h-8 px-2 text-xs sm:text-sm"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 ml-0.5" />
                </Button>
              </div>
              
              {/* Zoom Controls */}
              <div className="flex items-center gap-1 sm:gap-2">
                <Button 
                  onClick={handleZoomIn} 
                  variant="outline" 
                  size="sm"
                  className="h-8 px-2 text-xs sm:text-sm"
                  aria-label="Zoom in"
                >
                  <ZoomIn className="h-3 w-3 sm:h-4 sm:w-4 mr-0.5" />
                  <span className="hidden sm:inline">Zoom In</span>
                </Button>
                
                <Button 
                  onClick={handleZoomOut} 
                  variant="outline" 
                  size="sm"
                  className="h-8 px-2 text-xs sm:text-sm"
                  aria-label="Zoom out"
                >
                  <ZoomOut className="h-3 w-3 sm:h-4 sm:w-4 mr-0.5" />
                  <span className="hidden sm:inline">Zoom Out</span>
                </Button>
                
                <Button 
                  onClick={handleRotate} 
                  variant="outline" 
                  size="sm"
                  className="h-8 px-2 text-xs sm:text-sm"
                  aria-label="Rotate"
                >
                  <RotateCcw className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
                
                <a href={filePath} download target="_blank" rel="noopener noreferrer">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="h-8 px-2 text-xs sm:text-sm"
                  >
                    <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-0.5" />
                    <span className="hidden sm:inline">Download</span>
                  </Button>
                </a>
              </div>
            </div>
          </div>

          <div className="pdf-document-wrapper w-full overflow-auto flex justify-center items-center bg-white p-1 sm:p-2 rounded shadow" style={{ minHeight: '50vh', maxHeight: '70vh' }}>
            <Document
              file={filePath}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={(error) => {
                console.error('Error loading PDF:', error.message);
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
        </>
      )}
    </div>
  );
};

export default PdfViewer;
