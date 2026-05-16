import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import api from '../api';
import { useAuth } from '../context/AuthContext';

const TrackOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [statusData, setStatusData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    if (id && user) {
      fetchStatus(id);
    }
  }, [id, user]);

  const fetchStatus = async (orderId) => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    try {
      // To strictly enforce that a user can ONLY view THEIR OWN orders,
      // and to allow searching by the "short" 8-character ID:
      const res = await api.get(`/orders/user/${user._id}`);
      
      const foundOrder = res.data.find(o => o._id.startsWith(orderId) || o._id === orderId);
      
      if (foundOrder) {
        setStatusData({ orderId: foundOrder._id, status: foundOrder.status });
      } else {
        setError('Error: Order not found or you do not have permission to view it.');
        setStatusData(null);
      }
    } catch (err) {
      console.error(err);
      setError('Error fetching order status.');
      setStatusData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/track/${searchInput.trim()}`);
    }
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return 'status-pending';
      case 'preparing': return 'status-preparing';
      case 'ready': return 'status-ready';
      case 'completed': return 'status-completed';
      default: return 'status-pending';
    }
  };

  if (!user) {
    return (
      <div className="animate-fade-in" style={{ textAlign: 'center', paddingTop: '4rem' }}>
        <h2 style={{ color: 'var(--primary)' }}>Access Denied</h2>
        <p>You must be logged in to view your order status.</p>
        <Link to="/auth" className="btn btn-primary" style={{ marginTop: '1rem' }}>Login to Track Orders</Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', paddingTop: '2rem' }}>
      <h1>Order Tracking</h1>
      
      {!id && !statusData && (
        <form onSubmit={handleSearch} className="glass-panel" style={{ padding: '2rem', display: 'flex', gap: '1rem' }}>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Enter Order ID (e.g. short ID from dashboard)..." 
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary"><Search size={18} /> Search</button>
        </form>
      )}

      {(id || statusData || loading || error) && (
        <div className="glass-panel" style={{ padding: '3rem 2rem', marginTop: '2rem' }}>
          {loading ? (
            <p>Loading status...</p>
          ) : error ? (
            <div>
              <p style={{ color: 'var(--primary)', marginBottom: '2rem' }}>{error}</p>
              <Link to="/track" className="btn btn-outline" onClick={() => setError(null)}>Try Again</Link>
            </div>
          ) : statusData ? (
            <div>
              <h2 style={{ marginBottom: '1rem' }}>Order #{statusData.orderId.substring(0, 8)}</h2>
              <div style={{ fontSize: '2rem', marginBottom: '2rem' }}>
                <span className={`status-badge ${getStatusClass(statusData.status)}`} style={{ padding: '1rem 2rem', fontSize: '1.5rem', borderRadius: '40px' }}>
                  {statusData.status}
                </span>
              </div>
              <p style={{ color: 'var(--gray)', marginBottom: '2rem' }}>
                We will notify you when your order is ready for pickup!
              </p>
              
              <Link to="/track" className="btn btn-outline" style={{ marginRight: '1rem' }} onClick={() => setStatusData(null)}>Track Another</Link>
              <Link to="/dashboard" className="btn btn-primary">Back to Dashboard</Link>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default TrackOrder;
