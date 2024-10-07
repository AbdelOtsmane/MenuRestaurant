import React from 'react'
import { Edit, Trash2 } from 'lucide-react'
import { MenuItem } from '../App'

interface MenuListProps {
  menuItems: MenuItem[]
  onEdit: (item: MenuItem) => void
  onDelete: (id: number) => void
}

const MenuList: React.FC<MenuListProps> = ({ menuItems, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {menuItems.map((item) => (
        <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
            <p className="text-gray-600 mb-2">{item.description}</p>
            <p className="text-lg font-bold mb-2">${item.price.toFixed(2)}</p>
            <p className="text-sm text-gray-500 mb-4">{item.category}</p>
            <div className="flex justify-end">
              <button
                onClick={() => onEdit(item)}
                className="text-blue-500 hover:text-blue-700 mr-2"
              >
                <Edit size={18} />
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MenuList