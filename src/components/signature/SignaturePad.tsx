import React, { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface SignaturePadProps {
  onSave: (signatureData: string) => void;
  onCancel?: () => void;
  width?: number;
  height?: number;
  defaultValue?: string;
}

const SignaturePad: React.FC<SignaturePadProps> = ({
  onSave,
  onCancel,
  width = 400,
  height = 200,
  defaultValue
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Set up the canvas
    context.lineWidth = 2;
    context.lineCap = 'round';
    context.strokeStyle = '#000';
    setCtx(context);

    // Load default value if provided
    if (defaultValue) {
      const img = new Image();
      img.onload = () => {
        context.drawImage(img, 0, 0);
        setIsEmpty(false);
      };
      img.src = defaultValue;
    }

    // Clear canvas on resize
    const handleResize = () => {
      if (canvas && context) {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        context.lineWidth = 2;
        context.lineCap = 'round';
        context.strokeStyle = '#000';
        
        // Redraw default value if provided
        if (defaultValue) {
          const img = new Image();
          img.onload = () => {
            context.drawImage(img, 0, 0);
          };
          img.src = defaultValue;
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [defaultValue]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!ctx) return;
    
    setIsDrawing(true);
    setIsEmpty(false);
    
    // Get coordinates
    let x, y;
    if ('touches' in e) {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.nativeEvent.offsetX;
      y = e.nativeEvent.offsetY;
    }
    
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !ctx) return;
    
    // Get coordinates
    let x, y;
    if ('touches' in e) {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.nativeEvent.offsetX;
      y = e.nativeEvent.offsetY;
    }
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!ctx) return;
    setIsDrawing(false);
    ctx.closePath();
  };

  const clearCanvas = () => {
    if (!ctx || !canvasRef.current) return;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setIsEmpty(true);
  };

  const saveSignature = () => {
    if (!canvasRef.current) return;
    const signatureData = canvasRef.current.toDataURL('image/png');
    onSave(signatureData);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Draw Your Signature</CardTitle>
      </CardHeader>
      <CardContent>
        <div 
          className="border border-gray-300 rounded-md bg-white"
          style={{ width: '100%', height: `${height}px` }}
        >
          <canvas
            ref={canvasRef}
            width={width}
            height={height}
            className="w-full h-full cursor-crosshair"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>
          <Button variant="outline" onClick={clearCanvas}>
            Clear
          </Button>
        </div>
        <div className="flex gap-2">
          {onCancel && (
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button onClick={saveSignature} disabled={isEmpty}>
            Save Signature
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SignaturePad;
