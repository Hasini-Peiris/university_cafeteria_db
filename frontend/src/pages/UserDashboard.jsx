import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import { Navigate, Link } from 'react-router-dom';
import { Eye, Edit2, Trash2, Check, X } from 'lucide-react';

const UserDashboard = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editingOrderId, setEditingOrderId] = useState(null);
  const [editPickupTime, setEditPickupTime] = useState('');

  useEffect(() => {
    if (user && user.role !== 'admin') {
      fetchUserOrders();
    }
  }, [user]);

  const fetchUserOrders = async () => {
    try {
      const res = await api.get(`/orders/user/${user._id}`);
      setOrders(res.data);
    } catch (err) {
      console.error('Error fetching orders', err);
      setError('Could not fetch order history.');
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (order) => {
    setEditingOrderId(order._id);
    setEditPickupTime(order.pickupTime || '');
  };

  const saveEdit = async (orderId) => {
    try {
      const res = await api.put(`/orders/${orderId}`, { pickupTime: editPickupTime });
      setOrders(orders.map(o => o._id === orderId ? { ...o, pickupTime: editPickupTime } : o));
      setEditingOrderId(null);
      alert('Pickup time updated successfully.');
    } catch (err) {
      alert('Failed to update order pickup time.');
    }
  };

  const handleDelete = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel and delete this order?')) return;
    try {
      await api.delete(`/orders/${orderId}`);
      setOrders(orders.filter(o => o._id !== orderId));
      alert('Order deleted successfully.');
    } catch (err) {
      alert('Failed to delete order.');
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

  if (!user) return <Navigate to="/auth" />;
  if (user.role === 'admin') return <Navigate to="/admin" />;

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ margin: 0 }}>My Orders</h1>
        <p style={{ margin: 0, color: 'var(--gray)' }}>Track, update, or cancel your recent orders</p>
      </div>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        {error && <p style={{ color: 'var(--primary)' }}>{error}</p>}
        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p style={{ color: 'var(--gray)' }}>No order history found.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {orders.map(order => (
              <div key={order._id} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.2)' }}>
                <div>
                  <h3 style={{ margin: 0, marginBottom: '0.5rem' }}>Order #{order._id.substring(0, 8)}</h3>
                  <p style={{ margin: 0, color: 'var(--gray)' }}>
                    {order.items?.map(i => i.menuId?.name || 'Item').join(', ')}
                  </p>
                  
                  <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--gray)' }}>Pickup Time:</span>
                    {editingOrderId === order._id ? (
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <input 
                          type="time" 
                          className="form-control" 
                          style={{ padding: '0.2rem', width: 'auto' }}
                          value={editPickupTime} 
                          onChange={e => setEditPickupTime(e.target.value)} 
                        />
                        <button className="btn btn-secondary" style={{ padding: '0.3rem' }} onClick={() => saveEdit(order._id)}><Check size={14} /></button>
                        <button className="btn btn-outline" style={{ padding: '0.3rem' }} onClick={() => setEditingOrderId(null)}><X size={14} /></button>
                      </div>
                    ) : (
                      <span style={{ fontWeight: 'bold' }}>{order.pickupTime || 'Not set'}</span>
                    )}
                  </div>

                  <p style={{ margin: 0, marginTop: '0.5rem', fontWeight: 'bold' }}>
                    Total: Rs. {order.totalPrice?.toFixed(2) || '0.00'}
                  </p>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem' }}>
                  <span className={`status-badge ${getStatusClass(order.status)}`}>
                    {order.status || 'Pending'}
                  </span>
                  
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Link to={`/track/${order._id}`} className="btn btn-outline" style={{ padding: '0.3rem 0.6rem', fontSize: '0.9rem' }}>
                      <Eye size={14} /> Track
                    </Link>
                    {order.status?.toLowerCase() === 'pending' && (
                      <>
                        <button className="btn btn-outline" style={{ padding: '0.3rem 0.6rem', fontSize: '0.9rem' }} onClick={() => startEdit(order)}>
                          <Edit2 size={14} /> Edit Time
                        </button>
                        <button className="btn btn-danger" style={{ padding: '0.3rem 0.6rem', fontSize: '0.9rem' }} onClick={() => handleDelete(order._id)}>
                          <Trash2 size={14} /> Cancel
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
