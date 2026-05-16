import React, { useEffect, useState } from 'react';
import api from '../api';
import MenuCard from '../components/MenuCard';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [categories, setCategories] = useState(['All']);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMenu(category);
  }, [category]);

  const fetchMenu = async (selectedCategory) => {
    setLoading(true);
    setError(null);
    try {
      let res;
      if (selectedCategory === 'All') {
        res = await api.get('/menu');
        // Extract unique categories from all items to populate tabs
        const cats = ['All', ...new Set(res.data.map(item => item.category).filter(Boolean))];
        if (categories.length === 1 && res.data.length > 0) {
          setCategories(cats);
        }
      } else {
        res = await api.get(`/menu/category/${selectedCategory}`);
      }
      setMenuItems(res.data);
    } catch (err) {
      console.error('Error fetching menu', err);
      setError('Could not fetch menu data.');
      setMenuItems([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Cafeteria Menu</h1>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
        {categories.map(cat => (
          <button
            key={cat}
            className={`btn ${category === cat ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setCategory(cat)}
            style={{ borderRadius: '20px' }}
          >
            {cat}
          </button>
        ))}
      </div>

      {error && <p style={{ color: 'var(--primary)' }}>{error}</p>}

      {loading ? (
        <p>Loading menu...</p>
      ) : menuItems.length === 0 ? (
        <p style={{ color: 'var(--gray)' }}>No items found in this category.</p>
      ) : (
        <div className="grid-menu">
          {menuItems.map(item => (
            <MenuCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;
