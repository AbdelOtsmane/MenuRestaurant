import React from 'react'
import { MenuItem } from '../App'

interface ClientMenuProps {
  menuItems: MenuItem[]
}

const ClientMenu: React.FC<ClientMenuProps> = ({ menuItems }) => {
  const categories = [...new Set(menuItems.map(item => item.category))]

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Our Menu</h1>
      {categories.map(category => (
        <div key={category} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems
              .filter(item => item.category === category)
              .map(item => (
                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                    <p className="text-gray-600 mb-2">{item.description}</p>
                    <p className="text-lg font-bold">${item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ClientMenu