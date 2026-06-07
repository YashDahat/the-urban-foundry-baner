import { useState, useEffect } from 'react';
import { useAdminMenu } from '@/hooks/useAdminMenu';
import type { CreateMenuItemRequest } from '@/services/adminMenuService';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  isAvailable: boolean;
  isVegetarian: boolean;
  imageUrl?: string;
}

const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  description: z.string().optional(),
  price: z.number().min(0.01, { message: 'Price must be greater than 0.' }),
  category: z.string().min(1, { message: 'Category is required.' }),
  isAvailable: z.boolean().default(true),
  isVegetarian: z.boolean().default(false),
  imageUrl: z.string().optional(),
});

type MenuItemFormValues = z.infer<typeof formSchema>;

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
      isAvailable: true,
      isVegetarian: false,
      imageUrl: '',
    },
  });

  useEffect(() => {
    if (isDialogOpen) {
      if (editingItem) {
        form.reset({
          name: editingItem.name,
          description: editingItem.description || '',
          price: editingItem.price,
          category: editingItem.category,
          isAvailable: editingItem.isAvailable,
          isVegetarian: editingItem.isVegetarian,
          imageUrl: editingItem.imageUrl || '',
        });
      } else {
        form.reset({
          name: '',
          description: '',
          price: 0.01,
          category: '',
          isAvailable: true,
          isVegetarian: false,
          imageUrl: '',
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
        },
      });
    }
  };

  const onSubmit = (values: MenuItemFormValues) => {
    const requestData: CreateMenuItemRequest = {
      name: values.name,
      description: values.description,
      price: values.price,
      category: values.category,
      isAvailable: values.isAvailable,
      isVegetarian: values.isVegetarian,
      imageUrl: values.imageUrl,
    };
    if (editingItem) {
      updateItem.mutate(
        { id: editingItem.id, data: requestData },
        {
          onSuccess: () => {
            setIsDialogOpen(false);
            setEditingItem(null);
          },
        }
      );
    } else {
      createItem.mutate(requestData, {
        onSuccess: () => {
          setIsDialogOpen(false);
        },
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
        <button
          onClick={handleCreateNewItem}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Create New Item
        </button>
      </div>

      <div className="border rounded-md overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left p-3 font-medium">Name</th>
              <th className="text-left p-3 font-medium">Category</th>
              <th className="text-right p-3 font-medium">Price</th>
              <th className="text-center p-3 font-medium">Available</th>
              <th className="text-center p-3 font-medium">Vegetarian</th>
              <th className="text-center p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {menuItems.length === 0 ? (
              <tr>
                <td colSpan={6} className="h-24 text-center p-3">
                  No menu items found.
                </td>
              </tr>
            ) : (
              menuItems.map((item) => (
                <tr key={item.id} className="border-b last:border-b-0">
                  <td className="p-3 font-medium">{item.name}</td>
                  <td className="p-3">{item.category}</td>
                  <td className="p-3 text-right">${Number(item.price).toFixed(2)}</td>
                  <td className="p-3 text-center">{item.isAvailable ? 'Yes' : 'No'}</td>
                  <td className="p-3 text-center">{item.isVegetarian ? 'Yes' : 'No'}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleEditItem(item as unknown as MenuItem)}
                      className="mr-2 px-3 py-1 text-sm border rounded hover:bg-gray-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Create/Edit Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">
                {editingItem ? 'Edit Menu Item' : 'Create New Menu Item'}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {editingItem
                  ? 'Make changes to the menu item here.'
                  : 'Add a new menu item to your menu.'}
              </p>
            </div>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  className="w-full border rounded px-3 py-2 text-sm"
                  placeholder="Item Name"
                  {...form.register('name')}
                />
                {form.formState.errors.name && (
                  <p className="text-red-500 text-xs mt-1">{form.formState.errors.name.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <input
                  className="w-full border rounded px-3 py-2 text-sm"
                  placeholder="A brief description"
                  {...form.register('description')}
                />
                {form.formState.errors.description && (
                  <p className="text-red-500 text-xs mt-1">{form.formState.errors.description.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Price</label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full border rounded px-3 py-2 text-sm"
                  {...form.register('price', { valueAsNumber: true })}
                />
                {form.formState.errors.price && (
                  <p className="text-red-500 text-xs mt-1">{form.formState.errors.price.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                  className="w-full border rounded px-3 py-2 text-sm"
                  {...form.register('category')}
                >
                  <option value="">Select a category</option>
                  {CATEGORY_OPTIONS.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {form.formState.errors.category && (
                  <p className="text-red-500 text-xs mt-1">{form.formState.errors.category.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <input
                  className="w-full border rounded px-3 py-2 text-sm"
                  placeholder="https://example.com/image.jpg"
                  {...form.register('imageUrl')}
                />
              </div>
              <div className="flex flex-row items-start space-x-3 rounded-md border p-4">
                <input
                  type="checkbox"
                  id="isAvailable"
                  className="mt-1"
                  {...form.register('isAvailable')}
                />
                <div className="space-y-1 leading-none">
                  <label htmlFor="isAvailable" className="text-sm font-medium">Available</label>
                  <p className="text-xs text-gray-500">Is this item currently available on the menu?</p>
                </div>
              </div>
              <div className="flex flex-row items-start space-x-3 rounded-md border p-4">
                <input
                  type="checkbox"
                  id="isVegetarian"
                  className="mt-1"
                  {...form.register('isVegetarian')}
                />
                <div className="space-y-1 leading-none">
                  <label htmlFor="isVegetarian" className="text-sm font-medium">Vegetarian</label>
                  <p className="text-xs text-gray-500">Is this item suitable for vegetarians?</p>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setIsDialogOpen(false)}
                  className="px-4 py-2 text-sm border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isMutationPending}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {isMutationPending ? 'Saving...' : editingItem ? 'Save Changes' : 'Create Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {isDeleteDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Are you absolutely sure?</h2>
              <p className="text-sm text-gray-500 mt-1">
                This action cannot be undone. This will permanently delete the menu item.
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsDeleteDialogOpen(false)}
                disabled={isDeletePending}
                className="px-4 py-2 text-sm border rounded hover:bg-gray-100 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteItem}
                disabled={isDeletePending}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
              >
                {isDeletePending ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
