import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import { Navigate } from 'react-router-dom';

const Profile = () => {
  const { user, loginUser } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', address: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        address: user.address || ''
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await api.put(`/users/${user._id}`, formData);
      // Update local state and context
      loginUser({ ...user, ...res.data });
      setMessage('Profile updated successfully!');
    } catch (err) {
      console.error('Failed to update profile', err);
      setMessage('Failed to update profile. Ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <Navigate to="/auth" />;

  return (
    <div className="animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1>Edit Profile</h1>
      <div className="glass-panel" style={{ padding: '2rem' }}>
        {message && <div style={{ padding: '1rem', marginBottom: '1rem', background: message.includes('success') ? 'rgba(46, 213, 115, 0.2)' : 'rgba(255, 71, 87, 0.2)', color: message.includes('success') ? '#2ed573' : '#ff4757', borderRadius: '8px' }}>{message}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input 
              type="text" 
              className="form-control" 
              value={formData.name} 
              onChange={e => setFormData({...formData, name: e.target.value})} 
            />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              className="form-control" 
              value={formData.email} 
              onChange={e => setFormData({...formData, email: e.target.value})} 
            />
          </div>
          <div className="form-group">
            <label>Address / Dorm Room</label>
            <input 
              type="text" 
              className="form-control" 
              value={formData.address} 
              onChange={e => setFormData({...formData, address: e.target.value})} 
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
