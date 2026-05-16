import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import { Navigate } from 'react-router-dom';
import { Trash2, Edit2, Plus } from 'lucide-react';

const AdminManageMenu = () => {
  const { user } = useAuth();
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({ name: '', price: '', category: '', availability: true });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchMenu();
    }
  }, [user]);

  const fetchMenu = async () => {
    try {
      const res = await api.get('/menu');
      setMenuItems(res.data);
    } catch (err) {
      console.error(err);
      setMenuItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.price < 0) {
      alert("Price cannot be negative");
      return;
    }
    
    try {
      if (editingId) {
        const res = await api.put(`/menu/${editingId}`, formData);
        setMenuItems(menuItems.map(item => item._id === editingId ? res.data : item));
        setEditingId(null);
        alert('Menu item updated successfully');
      } else {
        const res = await api.post('/menu', formData);
        setMenuItems([...menuItems, res.data]);
        alert('Menu item added successfully');
      }
      setFormData({ name: '', price: '', category: '', availability: true });
    } catch (err) {
      alert('Failed to save menu item. Check backend logs.');
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setFormData({
      name: item.name,
      price: item.price,
      category: item.category,
      availability: item.availability !== false
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this menu item?')) return;
    try {
      await api.delete(`/menu/${id}`);
      setMenuItems(menuItems.filter(m => m._id !== id));
    } catch (err) {
      alert('Failed to delete item.');
    }
  };

  const toggleAvailability = async (item) => {
    try {
      const newStatus = item.availability === false ? true : false;
      const res = await api.put(`/menu/${item._id}`, { ...item, availability: newStatus });
      setMenuItems(menuItems.map(m => m._id === item._id ? res.data : m));
    } catch (err) {
      alert('Failed to update availability.');
    }
  };

  if (!user || user.role !== 'admin') return <Navigate to="/auth" />;

  return (
    <div className="animate-fade-in">
      <h1 style={{ marginBottom: '2rem' }}>Manage Menu</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        <div className="glass-panel" style={{ padding: '2rem', height: 'fit-content' }}>
          <h2>{editingId ? 'Edit Item' : 'Add New Item'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Food Name</label>
              <input type="text" className="form-control" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input type="number" step="0.01" min="0" className="form-control" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Category</label>
              <input type="text" className="form-control" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} required />
            </div>
            <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
              <input type="checkbox" id="avail" checked={formData.availability} onChange={e => setFormData({...formData, availability: e.target.checked})} style={{ width: '18px', height: '18px' }} />
              <label htmlFor="avail" style={{ margin: 0, cursor: 'pointer' }}>Available</label>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                {editingId ? 'Update Item' : <><Plus size={18}/> Add Item</>}
              </button>
              {editingId && (
                <button type="button" className="btn btn-outline" onClick={() => { setEditingId(null); setFormData({ name: '', price: '', category: '', availability: true }); }}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="glass-panel" style={{ padding: '2rem', overflowX: 'auto' }}>
          <h2>Menu List</h2>
          {loading ? (
            <p>Loading menu...</p>
          ) : menuItems.length === 0 ? (
            <p>No items found.</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {menuItems.map(item => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>Rs. {item.price?.toFixed(2)}</td>
                    <td>
                      <button 
                        className={`btn ${item.availability !== false ? 'btn-secondary' : 'btn-outline'}`}
                        style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }}
                        onClick={() => toggleAvailability(item)}
                      >
                        {item.availability !== false ? 'Available' : 'Sold Out'}
                      </button>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="btn btn-outline" style={{ padding: '0.4rem' }} onClick={() => handleEdit(item)}>
                          <Edit2 size={16} />
                        </button>
                        <button className="btn btn-danger" style={{ padding: '0.4rem' }} onClick={() => handleDelete(item._id)}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminManageMenu;
