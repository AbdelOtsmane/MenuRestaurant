import React, { useState, useEffect } from 'react'
import { Menu, PlusCircle, Users } from 'lucide-react'
import MenuList from './components/MenuList'
import AddEditMenuItem from './components/AddEditMenuItem'
import ClientMenu from './components/ClientMenu'

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
}

const API_URL = 'http://localhost:3000/api';

const App: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isClientView, setIsClientView] = useState(false);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await fetch(`${API_URL}/menu`);
      const data = await response.json();
      setMenuItems(data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const handleAddItem = () => {
    setIsAddingItem(true);
    setEditingItem(null);
  };

  const handleEditItem = (item: MenuItem) => {
    setEditingItem(item);
    setIsAddingItem(true);
  };

  const handleDeleteItem = async (id: number) => {
    try {
      await fetch(`${API_URL}/menu/${id}`, { method: 'DELETE' });
      setMenuItems(menuItems.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
  };

  const handleSaveItem = async (item: Omit<MenuItem, 'id'>, file: File | null) => {
    try {
      let imageUrl = item.image_url;
      if (file) {
        // Here you would typically upload the file to a storage service
        // and get back a URL. For now, we'll just use a placeholder.
        imageUrl = URL.createObjectURL(file);
      }

      const response = await fetch(`${API_URL}/menu${editingItem ? `/${editingItem.id}` : ''}`, {
        method: editingItem ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...item, image_url: imageUrl }),
      });

      const savedItem = await response.json();

      if (editingItem) {
        setMenuItems(menuItems.map(menuItem => 
          menuItem.id === editingItem.id ? savedItem : menuItem
        ));
      } else {
        setMenuItems([...menuItems, savedItem]);
      }
      setIsAddingItem(false);
      setEditingItem(null);
    } catch (error) {
      console.error('Error saving menu item:', error);
    }
  };

  const toggleView = () => {
    setIsClientView(!isClientView);
  };

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center">
          <Menu className="mr-2" /> Restaurant Menu Dashboard
        </h1>
        <div>
          <button
            onClick={toggleView}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center mr-2"
          >
            <Users className="mr-2" /> {isClientView ? 'Admin View' : 'Client View'}
          </button>
          {!isClientView && (
            <button
              onClick={handleAddItem}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center"
            >
              <PlusCircle className="mr-2" /> Add Item
            </button>
          )}
        </div>
      </header>
      {isClientView ? (
        <ClientMenu menuItems={menuItems} />
      ) : (
        <>
          <MenuList
            menuItems={menuItems}
            onEdit={handleEditItem}
            onDelete={handleDeleteItem}
          />
          {isAddingItem && (
            <AddEditMenuItem
              item={editingItem}
              onSave={handleSaveItem}
              onCancel={() => {
                setIsAddingItem(false);
                setEditingItem(null);
              }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;