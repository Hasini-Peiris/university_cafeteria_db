import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import { Navigate, Link } from 'react-router-dom';
import { RefreshCw, Trash2, Edit2, Check, X } from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({ users: 0, menu: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [editPickupTime, setEditPickupTime] = useState('');

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [ordersRes, usersRes, menuRes] = await Promise.all([
        api.get('/orders'),
        api.get('/users'),
        api.get('/menu')
      ]);
      setOrders(ordersRes.data);
      setStats({
        users: usersRes.data.length,
        menu: menuRes.data.length
      });
    } catch (err) {
      console.error('Error fetching dashboard data', err);
      setError('Could not fetch data. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await api.patch(`/orders/${orderId}/status`, { status: newStatus });
      setOrders(orders.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
    } catch (err) {
      alert('Failed to update status.');
    }
  };

  const handleDelete = async (orderId) => {
    if (!window.confirm('Delete this order permanently?')) return;
    try {
      await api.delete(`/orders/${orderId}`);
      setOrders(orders.filter(o => o._id !== orderId));
    } catch (err) {
      alert('Failed to delete order.');
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
    } catch (err) {
      alert('Failed to update order pickup time.');
    }
  };

  if (!user || user.role !== 'admin') return <Navigate to="/auth" />;

  const pendingCount = orders.filter(o => o.status?.toLowerCase() === 'pending').length;

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ margin: 0 }}>Admin Panel</h1>
        <button className="btn btn-outline" onClick={fetchDashboardData} disabled={loading}>
          <RefreshCw size={18} /> Refresh
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
          <h3 style={{ color: 'var(--gray)', margin: 0 }}>Total Users</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0 0 0', color: 'var(--primary)' }}>{stats.users}</p>
        </div>
        <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
          <h3 style={{ color: 'var(--gray)', margin: 0 }}>Menu Items</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0 0 0', color: 'var(--secondary)' }}>{stats.menu}</p>
        </div>
        <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
          <h3 style={{ color: 'var(--gray)', margin: 0 }}>Total Orders</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0 0 0' }}>{orders.length}</p>
        </div>
        <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
          <h3 style={{ color: 'var(--gray)', margin: 0 }}>Pending</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0 0 0', color: '#ffa502' }}>{pendingCount}</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <Link to="/admin/menu" className="btn btn-primary">Manage Menu</Link>
        <Link to="/admin/users" className="btn btn-secondary">Manage Users</Link>
      </div>

      <div className="glass-panel" style={{ padding: '2rem', overflowX: 'auto' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>Recent Orders</h2>
        {error && <p style={{ color: 'var(--primary)' }}>{error}</p>}
        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p style={{ color: 'var(--gray)' }}>No orders found.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>User</th>
                <th>Items</th>
                <th>Total</th>
                <th>Pickup Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td>{order._id.substring(0, 8)}</td>
                  <td>{order.userId?.name || 'Unknown User'}</td>
                  <td>{order.items?.reduce((acc, i) => acc + i.quantity, 0)} items</td>
                  <td>Rs. {order.totalPrice?.toFixed(2)}</td>
                  <td>
                    {editingOrderId === order._id ? (
                      <input 
                        type="time" 
                        className="form-control" 
                        style={{ padding: '0.2rem', width: 'auto' }}
                        value={editPickupTime} 
                        onChange={e => setEditPickupTime(e.target.value)} 
                      />
                    ) : (
                      order.pickupTime
                    )}
                  </td>
                  <td>
                    <select 
                      className="form-control"
                      value={order.status || 'Pending'}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      style={{ padding: '0.4rem', width: 'auto', margin: 0 }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Preparing">Preparing</option>
                      <option value="Ready">Ready</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {editingOrderId === order._id ? (
                        <>
                          <button className="btn btn-secondary" style={{ padding: '0.4rem' }} onClick={() => saveEdit(order._id)}><Check size={16} /></button>
                          <button className="btn btn-outline" style={{ padding: '0.4rem' }} onClick={() => setEditingOrderId(null)}><X size={16} /></button>
                        </>
                      ) : (
                        <button className="btn btn-outline" style={{ padding: '0.4rem' }} onClick={() => startEdit(order)}><Edit2 size={16} /></button>
                      )}
                      <button className="btn btn-danger" style={{ padding: '0.4rem' }} onClick={() => handleDelete(order._id)}><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
