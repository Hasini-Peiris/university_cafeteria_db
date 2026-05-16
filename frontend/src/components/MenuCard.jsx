import React from 'react';
import { useCart } from '../context/CartContext';
import { Plus } from 'lucide-react';

const MenuCard = ({ item }) => {
  const { addToCart } = useCart();

  const isAvailable = item.availability !== false; // defaults to true if undefined

  return (
    <div className="glass-panel animate-fade-in" style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <div>
            <h3 style={{ margin: 0, marginBottom: '0.2rem' }}>{item.name}</h3>
            <span style={{ 
              fontSize: '0.8rem', 
              padding: '0.2rem 0.5rem', 
              borderRadius: '12px', 
              background: isAvailable ? 'rgba(46, 213, 115, 0.2)' : 'rgba(255, 71, 87, 0.2)', 
              color: isAvailable ? '#2ed573' : '#ff4757',
              border: `1px solid ${isAvailable ? '#2ed573' : '#ff4757'}`
            }}>
              {isAvailable ? 'Available' : 'Sold Out'}
            </span>
          </div>
          <span style={{ fontWeight: 'bold', color: 'var(--primary)', fontSize: '1.2rem' }}>
            Rs. {item.price.toFixed(2)}
          </span>
        </div>
        <p style={{ color: 'var(--gray)', fontSize: '0.9rem', marginBottom: '1rem', flex: 1 }}>
          Category: {item.category}
        </p>
        <button 
          className="btn btn-primary" 
          style={{ width: '100%', justifyContent: 'center', opacity: isAvailable ? 1 : 0.5 }}
          onClick={() => addToCart(item)}
          disabled={!isAvailable}
        >
          <Plus size={18} /> {isAvailable ? 'Add to Cart' : 'Unavailable'}
        </button>
      </div>
    </div>
  );
};

export default MenuCard;
