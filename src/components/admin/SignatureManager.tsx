import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Signature } from '@/data/signatureTypes';
import { 
  getSignatures, 
  createSignature, 
  updateSignature, 
  deleteSignature 
} from '@/services/signatureService';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Pencil, Trash2, Upload, Check, Edit3, Image } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SignaturePad from '@/components/signature/SignaturePad';

const SignatureManager: React.FC = () => {
  const [signatures, setSignatures] = useState<Signature[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSignature, setSelectedSignature] = useState<Signature | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  // Form states
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [signatureFile, setSignatureFile] = useState<File | null>(null);
  const [isDefault, setIsDefault] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [canvasSignatureData, setCanvasSignatureData] = useState<string | null>(null);
  const [signatureInputMethod, setSignatureInputMethod] = useState<'upload' | 'draw'>('upload');

  useEffect(() => {
    loadSignatures();
  }, []);

  const loadSignatures = async () => {
    setIsLoading(true);
    try {
      const data = await getSignatures();
      setSignatures(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load signatures',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setTitle('');
    setSignatureFile(null);
    setIsDefault(false);
    setPreviewUrl(null);
    setCanvasSignatureData(null);
    setSignatureInputMethod('upload');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file type
      if (!file.type.includes('image/')) {
        toast({
          title: 'Invalid file',
          description: 'Please upload an image file (PNG, JPG, GIF)',
          variant: 'destructive',
        });
        return;
      }
      
      setSignatureFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSignature = async () => {
    if (!name || !title) {
      toast({
        title: 'Missing fields',
        description: 'Please fill out name and title fields',
        variant: 'destructive',
      });
      return;
    }

    // Check if we have either a file upload or a canvas signature
    if (signatureInputMethod === 'upload' && !signatureFile) {
      toast({
        title: 'Missing signature',
        description: 'Please upload a signature image',
        variant: 'destructive',
      });
      return;
    }

    if (signatureInputMethod === 'draw' && !canvasSignatureData) {
      toast({
        title: 'Missing signature',
        description: 'Please draw your signature',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      if (signatureInputMethod === 'upload') {
        if (signatureFile) {
          const reader = new FileReader();
          reader.onload = async (event) => {
            const base64Data = event.target?.result as string;
            await createSignature({
              name,
              title,
              imageData: base64Data,
              default: isDefault,
            });
          };
          reader.readAsDataURL(signatureFile);
        }
      } else {
        // For canvas signatures, we already have the base64 data
        if (canvasSignatureData) {
          await createSignature({
            name,
            title,
            imageData: canvasSignatureData,
            default: isDefault,
          });
        }
      }
      
      await loadSignatures();
      setIsAddDialogOpen(false);
      resetForm();
      
      toast({
        title: 'Signature added',
        description: 'The signature has been successfully added',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add signature',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditSignature = (signature: Signature) => {
    setSelectedSignature(signature);
    setName(signature.name);
    setTitle(signature.title);
    setIsDefault(signature.default);
    setPreviewUrl(signature.imageUrl);
    setIsEditDialogOpen(true);
  };

  const handleUpdateSignature = async () => {
    if (!selectedSignature || !name || !title) {
      toast({
        title: 'Missing fields',
        description: 'Please fill out all required fields',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      if (signatureFile) {
        const reader = new FileReader();
        reader.onload = async (event) => {
          const base64Data = event.target?.result as string;
          await updateSignature(selectedSignature.id, {
            name,
            title,
            imageData: base64Data,
            default: isDefault,
          });
        };
        reader.readAsDataURL(signatureFile);
      } else {
        // If no new file is uploaded, just update the other fields
        await updateSignature(selectedSignature.id, {
          name,
          title,
          default: isDefault,
        });
      }
      
      await loadSignatures();
      setIsEditDialogOpen(false);
      resetForm();
      
      toast({
        title: 'Signature updated',
        description: 'The signature has been successfully updated',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update signature',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = (signature: Signature) => {
    setSelectedSignature(signature);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteSignature = async () => {
    if (!selectedSignature) return;
    
    setIsSubmitting(true);
    try {
      await deleteSignature(selectedSignature.id);
      await loadSignatures();
      setIsDeleteDialogOpen(false);
      
      toast({
        title: 'Signature deleted',
        description: 'The signature has been successfully deleted',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete signature',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Certificate Signatures</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Add New Signature
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Signature</DialogTitle>
              <DialogDescription>
                Add a signature to use on certificates. You can upload an image or draw your signature.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Dr. Sarah Johnson"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Program Director"
                />
              </div>
              
              <Tabs value={signatureInputMethod} onValueChange={(value) => setSignatureInputMethod(value as 'upload' | 'draw')}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upload" className="flex items-center">
                    <Image className="mr-2 h-4 w-4" />
                    Upload Image
                  </TabsTrigger>
                  <TabsTrigger value="draw" className="flex items-center">
                    <Edit3 className="mr-2 h-4 w-4" />
                    Draw Signature
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="upload" className="mt-4">
                  <div className="grid gap-2">
                    <Label htmlFor="signature">Signature Image</Label>
                    <Input
                      id="signature"
                      type="file"
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                    {previewUrl && (
                      <div className="border rounded p-2 bg-gray-50">
                        <p className="text-sm text-gray-500 mb-1">Preview:</p>
                        <img
                          src={previewUrl}
                          alt="Signature Preview"
                          className="max-h-20 object-contain bg-white p-2"
                        />
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="draw" className="mt-4">
                  <div className="grid gap-2">
                    <Label>Draw Your Signature</Label>
                    <SignaturePad 
                      onSave={setCanvasSignatureData}
                      height={150}
                    />
                    {canvasSignatureData && (
                      <div className="border rounded p-2 bg-gray-50">
                        <p className="text-sm text-gray-500 mb-1">Preview:</p>
                        <img
                          src={canvasSignatureData}
                          alt="Drawn Signature"
                          className="max-h-20 object-contain bg-white p-2"
                        />
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
              <div className="flex items-center space-x-2">
                <Switch
                  id="default"
                  checked={isDefault}
                  onCheckedChange={setIsDefault}
                />
                <Label htmlFor="default">Set as default signature</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddSignature} disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save Signature'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="text-center py-10">
          <p className="text-gray-500">Loading signatures...</p>
        </div>
      ) : signatures.length === 0 ? (
        <Card>
          <CardContent className="text-center py-10">
            <p className="text-gray-500">No signatures found. Add a signature to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {signatures.map((signature) => (
            <Card key={signature.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{signature.name}</span>
                  {signature.default && (
                    <span className="flex items-center text-sm font-normal text-lms-teal-600">
                      <Check className="h-4 w-4 mr-1" />
                      Default
                    </span>
                  )}
                </CardTitle>
                <CardDescription>{signature.title}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded p-4 bg-white">
                  <img
                    src={signature.imageUrl}
                    alt={`${signature.name}'s signature`}
                    className="h-24 w-full object-contain"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditSignature(signature)}
                >
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteClick(signature)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Signature Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Signature</DialogTitle>
            <DialogDescription>
              Update the signature details or upload a new image.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-signature">Signature Image</Label>
              <Input
                id="edit-signature"
                type="file"
                onChange={handleFileChange}
                accept="image/*"
              />
              {previewUrl && (
                <div className="border rounded p-2 bg-gray-50">
                  <p className="text-sm text-gray-500 mb-1">Current Signature:</p>
                  <img
                    src={previewUrl}
                    alt="Signature Preview"
                    className="max-h-20 object-contain bg-white p-2"
                  />
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="edit-default"
                checked={isDefault}
                onCheckedChange={setIsDefault}
              />
              <Label htmlFor="edit-default">Set as default signature</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateSignature} disabled={isSubmitting}>
              {isSubmitting ? 'Updating...' : 'Update Signature'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Signature</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this signature? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {selectedSignature && (
              <div className="flex items-center space-x-4">
                <img
                  src={selectedSignature.imageUrl}
                  alt={`${selectedSignature.name}'s signature`}
                  className="h-12 object-contain bg-white p-1 border rounded"
                />
                <div>
                  <p className="font-medium">{selectedSignature.name}</p>
                  <p className="text-sm text-gray-500">{selectedSignature.title}</p>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteSignature} disabled={isSubmitting}>
              {isSubmitting ? 'Deleting...' : 'Delete Signature'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SignatureManager;
