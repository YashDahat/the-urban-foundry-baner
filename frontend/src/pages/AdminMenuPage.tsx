import React, { useState, useEffect } from 'react';
import { useAdminMenu } from '@/hooks/useAdminMenu';

// shadcn/ui components
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

// react-hook-form and zod
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Infer MenuItem structure from useAdminMenu and form fields
interface MenuItem {
  id: string; // Assuming UUID or similar string ID
  name: string;
  description?: string;
  price: number;
  category: string;
  available: boolean;
  vegetarian: boolean;
}

// Zod schema for form validation
const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  description: z.string().optional(),
  price: z.preprocess(
    (val) => {
      if (typeof val === 'string') {
        return parseFloat(val);
      }
      return val;
    },
    z.number().min(0.01, { message: 'Price must be greater than 0.' })
  ),
  category: z.string().min(1, { message: 'Category is required.' }),
  available: z.boolean().default(true),
  vegetarian: z.boolean().default(false),
});

type MenuItemFormValues = z.infer<typeof formSchema>;

// Define category options
const CATEGORY_OPTIONS = ['Appetizer', 'Main Course', 'Dessert', 'Drink', 'Side'];

export default function AdminMenuPage() {
  const { menuItems, isLoading, createItem, updateItem, deleteItem } = useAdminMenu();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState<string | null>(null);

  const form = useForm<MenuItemFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0.01,
      category: '',
      available: true,
      vegetarian: false,
    },
  });

  // Effect to reset form when dialog opens/closes or editingItem changes
  useEffect(() => {
    if (isDialogOpen) {
      if (editingItem) {
        form.reset({
          name: editingItem.name,
          description: editingItem.description || '',
          price: editingItem.price,
          category: editingItem.category,
          available: editingItem.available,
          vegetarian: editingItem.vegetarian,
        });
      } else {
        form.reset({
          name: '',
          description: '',
          price: 0.01,
          category: '',
          available: true,
          vegetarian: false,
        });
      }
    }
  }, [isDialogOpen, editingItem, form]);

  const handleCreateNewItem = () => {
    setEditingItem(null);
    setIsDialogOpen(true);
  };

  const handleEditItem = (item: MenuItem) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  const handleDeleteItem = (itemId: string) => {
    setItemToDeleteId(itemId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteItem = () => {
    if (itemToDeleteId) {
      deleteItem.mutate(itemToDeleteId, {
        onSuccess: () => {
          setIsDeleteDialogOpen(false);
          setItemToDeleteId(null);
        }
      });
    }
  };

  const onSubmit = (values: MenuItemFormValues) => {
    if (editingItem) {
      updateItem.mutate(
        { id: editingItem.id, data: values },
        {
          onSuccess: () => {
            setIsDialogOpen(false);
            setEditingItem(null);
          }
        }
      );
    } else {
      createItem.mutate(values, {
        onSuccess: () => {
          setIsDialogOpen(false);
        }
      });
    }
  };

  const isMutationPending = createItem.isPending || updateItem.isPending;
  const isDeletePending = deleteItem.isPending;

  if (isLoading) {
    return <div className="p-4 text-center">Loading menu items...</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Menu Management</h1>
        <Button onClick={handleCreateNewItem}>Create New Item</Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-center">Available</TableHead>
              <TableHead className="text-center">Vegetarian</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {menuItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No menu items found.
                </TableCell>
              </TableRow>
            ) : (
              menuItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                  <TableCell className="text-center">{item.available ? 'Yes' : 'No'}</TableCell>
                  <TableCell className="text-center">{item.vegetarian ? 'Yes' : 'No'}</TableCell>
                  <TableCell className="text-center">
                    <Button variant="ghost" size="sm" onClick={() => handleEditItem(item)} className="mr-2">
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteItem(item.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingItem ? 'Edit Menu Item' : 'Create New Menu Item'}</DialogTitle>
            <DialogDescription>
              {editingItem ? 'Make changes to the menu item here.' : 'Add a new menu item to your menu.'}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Item Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="A brief description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} onChange={e => field.onChange(e.target.value)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CATEGORY_OPTIONS.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="available"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Available</FormLabel>
                      <FormDescription>
                        Is this item currently available on the menu?
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="vegetarian"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Vegetarian</FormLabel>
                      <FormDescription>
                        Is this item suitable for vegetarians?
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" disabled={isMutationPending}>
                  {isMutationPending ? 'Saving...' : editingItem ? 'Save Changes' : 'Create Item'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the menu item.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeletePending}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteItem} disabled={isDeletePending}>
              {isDeletePending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}