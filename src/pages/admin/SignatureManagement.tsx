import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getSignatures, 
  createSignature, 
  updateSignature, 
  deleteSignature 
} from '@/services/signatureService';
import { Signature, SignatureUpload } from '@/data/signatureTypes';
import SignaturePad from '@/components/signature/SignaturePad';
import AdminLayout from '@/components/layouts/AdminLayout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Pencil, 
  Trash2, 
  MoreVertical, 
  Plus, 
  Check, 
  X 
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Switch } from '@/components/ui/switch';

const SignatureManagement: React.FC = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedSignature, setSelectedSignature] = useState<Signature | null>(null);
  const [newSignature, setNewSignature] = useState<Partial<SignatureUpload>>({
    name: '',
    title: '',
    default: false,
    organizationId: 'default'
  });
  const [signatureImage, setSignatureImage] = useState<string | null>(null);

  const queryClient = useQueryClient();

  // Fetch signatures
  const { data: signatures, isLoading } = useQuery({
    queryKey: ['signatures'],
    queryFn: getSignatures
  });

  // Create signature mutation
  const createMutation = useMutation({
    mutationFn: (data: SignatureUpload) => createSignature(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['signatures'] });
      setIsAddDialogOpen(false);
      resetForm();
      toast({
        title: 'Signature created',
        description: 'The signature has been created successfully.',
      });
    },
    onError: (error) => {
      console.error('Error creating signature:', error);
      toast({
        title: 'Error',
        description: 'Failed to create signature. Please try again.',
        variant: 'destructive',
      });
    }
  });

  // Update signature mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<SignatureUpload> }) => 
      updateSignature(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['signatures'] });
      setIsEditDialogOpen(false);
      setSelectedSignature(null);
      toast({
        title: 'Signature updated',
        description: 'The signature has been updated successfully.',
      });
    },
    onError: (error) => {
      console.error('Error updating signature:', error);
      toast({
        title: 'Error',
        description: 'Failed to update signature. Please try again.',
        variant: 'destructive',
      });
    }
  });

  // Delete signature mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteSignature(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['signatures'] });
      setIsDeleteDialogOpen(false);
      setSelectedSignature(null);
      toast({
        title: 'Signature deleted',
        description: 'The signature has been deleted successfully.',
      });
    },
    onError: (error) => {
      console.error('Error deleting signature:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete signature. Please try again.',
        variant: 'destructive',
      });
    }
  });

  const resetForm = () => {
    setNewSignature({
      name: '',
      title: '',
      default: false,
      organizationId: 'default'
    });
    setSignatureImage(null);
  };

  const handleAddSignature = () => {
    if (!signatureImage || !newSignature.name || !newSignature.title) {
      toast({
        title: 'Missing information',
        description: 'Please fill in all fields and draw a signature.',
        variant: 'destructive',
      });
      return;
    }

    const signatureData: SignatureUpload = {
      name: newSignature.name,
      title: newSignature.title,
      default: newSignature.default || false,
      organizationId: newSignature.organizationId || 'default',
      imageData: signatureImage
    };

    createMutation.mutate(signatureData);
  };

  const handleEditSignature = () => {
    if (!selectedSignature) return;

    const updates: Partial<SignatureUpload> = {
      name: newSignature.name,
      title: newSignature.title,
      default: newSignature.default
    };

    if (signatureImage) {
      updates.imageData = signatureImage;
    }

    updateMutation.mutate({ 
      id: selectedSignature.id, 
      data: updates 
    });
  };

  const handleDeleteSignature = () => {
    if (!selectedSignature) return;
    deleteMutation.mutate(selectedSignature.id);
  };

  const openEditDialog = (signature: Signature) => {
    setSelectedSignature(signature);
    setNewSignature({
      name: signature.name,
      title: signature.title,
      default: signature.default,
      organizationId: signature.organizationId
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (signature: Signature) => {
    setSelectedSignature(signature);
    setIsDeleteDialogOpen(true);
  };

  return (
    <AdminLayout>
      <div className="container py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Signature Management</h1>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Signature
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Signatures</CardTitle>
            <CardDescription>
              Manage signatures used for certificates and other documents.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : signatures && signatures.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Preview</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Default</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {signatures.map((signature) => (
                    <TableRow key={signature.id}>
                      <TableCell>
                        <div className="h-16 w-32 border rounded flex items-center justify-center p-2">
                          <img 
                            src={signature.imageUrl} 
                            alt={`${signature.name}'s signature`}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                      </TableCell>
                      <TableCell>{signature.name}</TableCell>
                      <TableCell>{signature.title}</TableCell>
                      <TableCell>
                        {signature.default ? (
                          <Check className="h-5 w-5 text-green-500" />
                        ) : (
                          <X className="h-5 w-5 text-gray-300" />
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openEditDialog(signature)}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => openDeleteDialog(signature)}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No signatures found. Add your first signature to get started.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Add Signature Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Signature</DialogTitle>
              <DialogDescription>
                Create a new signature for certificates and documents.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={newSignature.name}
                    onChange={(e) => setNewSignature({...newSignature, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="CEO"
                    value={newSignature.title}
                    onChange={(e) => setNewSignature({...newSignature, title: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="default"
                  checked={newSignature.default}
                  onCheckedChange={(checked) => setNewSignature({...newSignature, default: checked})}
                />
                <Label htmlFor="default">Set as default signature</Label>
              </div>
              <div className="pt-4">
                <SignaturePad onSave={setSignatureImage} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddSignature} disabled={!signatureImage}>
                Save Signature
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Signature Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Signature</DialogTitle>
              <DialogDescription>
                Update the signature information.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Name</Label>
                  <Input
                    id="edit-name"
                    placeholder="John Doe"
                    value={newSignature.name}
                    onChange={(e) => setNewSignature({...newSignature, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-title">Title</Label>
                  <Input
                    id="edit-title"
                    placeholder="CEO"
                    value={newSignature.title}
                    onChange={(e) => setNewSignature({...newSignature, title: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-default"
                  checked={newSignature.default}
                  onCheckedChange={(checked) => setNewSignature({...newSignature, default: checked})}
                />
                <Label htmlFor="edit-default">Set as default signature</Label>
              </div>
              <div className="pt-4">
                <SignaturePad 
                  onSave={setSignatureImage} 
                  defaultValue={selectedSignature?.imageUrl}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditSignature}>
                Update Signature
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this signature? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              {selectedSignature && (
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-32 border rounded flex items-center justify-center p-2">
                    <img 
                      src={selectedSignature.imageUrl} 
                      alt={`${selectedSignature.name}'s signature`}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{selectedSignature.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedSignature.title}</p>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteSignature}>
                Delete Signature
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default SignatureManagement;
