import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import { Shield, User as UserIcon } from 'lucide-react';

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser } = useAuth();
  
  const [isRegister, setIsRegister] = useState(true);

  useEffect(() => {
    if (location.state && typeof location.state.isRegister === 'boolean') {
      setIsRegister(location.state.isRegister);
    }
  }, [location.state]);
  const [formData, setFormData] = useState({ name: '', email: '', address: '' });
  const [isAdminLogin, setIsAdminLogin] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        const payload = { ...formData };
        if (isAdminLogin) payload.role = 'admin';
        else payload.role = 'user';
        
        const res = await api.post('/users', payload);
        loginUser({ ...res.data });
        navigate(isAdminLogin ? '/admin' : '/dashboard');
      } else {
        // Login logic via fetching
        api.defaults.headers.common['role'] = 'admin';
        const res = await api.get('/users');
        delete api.defaults.headers.common['role'];
        
        const existingUser = res.data.find(u => u.email === formData.email);
        if (existingUser) {
          if (isAdminLogin && existingUser.role !== 'admin') {
            alert('This email is not an Admin account. Please login as a student.');
            return;
          }
          loginUser({ ...existingUser });
          navigate(isAdminLogin ? '/admin' : '/dashboard');
        } else {
          alert('User not found. Please register.');
        }
      }
    } catch (err) {
      console.error(err);
      alert('Authentication failed. Check if email is already registered.');
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <div className="glass-panel" style={{ padding: '2.5rem', width: '100%', maxWidth: '400px' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
          <button 
            className={`btn ${!isAdminLogin ? 'btn-primary' : 'btn-outline'}`} 
            style={{ flex: 1 }} 
            onClick={() => setIsAdminLogin(false)}
          >
            <UserIcon size={18} /> Student
          </button>
          <button 
            className={`btn ${isAdminLogin ? 'btn-secondary' : 'btn-outline'}`} 
            style={{ flex: 1 }} 
            onClick={() => setIsAdminLogin(true)}
          >
            <Shield size={18} /> Admin
          </button>
        </div>

        <h2 style={{ textAlign: 'center' }}>
          {isAdminLogin ? 'Admin Access' : (isRegister ? 'Register Account' : 'Student Login')}
        </h2>

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                className="form-control" 
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})} 
                required 
              />
            </div>
          )}
          
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              className="form-control" 
              value={formData.email} 
              onChange={e => setFormData({...formData, email: e.target.value})} 
              required 
            />
          </div>

          {isRegister && (
            <div className="form-group">
              <label>Address / Dorm Room</label>
              <input 
                type="text" 
                className="form-control" 
                value={formData.address} 
                onChange={e => setFormData({...formData, address: e.target.value})} 
                required 
              />
            </div>
          )}

          <button type="submit" className={`btn ${isAdminLogin ? 'btn-secondary' : 'btn-primary'}`} style={{ width: '100%', marginTop: '1rem', justifyContent: 'center' }}>
            {isAdminLogin ? (isRegister ? 'Register as Admin' : 'Login as Admin') : (isRegister ? 'Register' : 'Login')}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--gray)', cursor: 'pointer' }} onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? 'Already have an account? Login' : 'Need an account? Register'}
        </p>
      </div>
    </div>
  );
};

export default Auth;
