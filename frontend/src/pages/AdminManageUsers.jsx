import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import { Navigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';

const AdminManageUsers = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', email: '', address: '', role: '' });

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchUsers();
    }
  }, [user]);

  const fetchUsers = async () => {
    try {
      const res = await api.get('/users');
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (u) => {
    setEditingId(u._id);
    setEditFormData({ name: u.name, email: u.email, address: u.address, role: u.role || 'user' });
  };

  const handleSaveEdit = async (id) => {
    try {
      const res = await api.put(`/users/${id}`, editFormData);
      setUsers(users.map(u => u._id === id ? res.data : u));
      setEditingId(null);
      alert('User updated successfully');
    } catch (err) {
      alert('Failed to update user.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await api.delete(`/users/${id}`);
      setUsers(users.filter(u => u._id !== id));
    } catch (err) {
      alert('Failed to delete user.');
    }
  };

  if (!user || user.role !== 'admin') return <Navigate to="/auth" />;

  return (
    <div className="animate-fade-in">
      <h1 style={{ marginBottom: '2rem' }}>Manage Users</h1>
      <div className="glass-panel" style={{ padding: '2rem', overflowX: 'auto' }}>
        {loading ? (
          <p>Loading users...</p>
        ) : users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id}>
                  <td>{u._id.substring(0, 8)}</td>
                  <td>
                    {editingId === u._id ? (
                      <input type="text" className="form-control" style={{padding:'0.2rem'}} value={editFormData.name} onChange={e=>setEditFormData({...editFormData, name: e.target.value})} />
                    ) : u.name}
                  </td>
                  <td>
                    {editingId === u._id ? (
                      <input type="email" className="form-control" style={{padding:'0.2rem'}} value={editFormData.email} onChange={e=>setEditFormData({...editFormData, email: e.target.value})} />
                    ) : u.email}
                  </td>
                  <td>
                    {editingId === u._id ? (
                      <input type="text" className="form-control" style={{padding:'0.2rem'}} value={editFormData.address} onChange={e=>setEditFormData({...editFormData, address: e.target.value})} />
                    ) : u.address}
                  </td>
                  <td>
                    {editingId === u._id ? (
                      <select className="form-control" style={{padding:'0.2rem', width:'auto'}} value={editFormData.role} onChange={e=>setEditFormData({...editFormData, role: e.target.value})}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    ) : (u.role || 'user')}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {editingId === u._id ? (
                        <>
                          <button className="btn btn-secondary" style={{ padding: '0.4rem' }} onClick={() => handleSaveEdit(u._id)}>Save</button>
                          <button className="btn btn-outline" style={{ padding: '0.4rem' }} onClick={() => setEditingId(null)}>Cancel</button>
                        </>
                      ) : (
                        <button className="btn btn-outline" style={{ padding: '0.4rem' }} onClick={() => handleEditClick(u)}>Edit</button>
                      )}
                      {u.role !== 'admin' && (
                        <button className="btn btn-danger" style={{ padding: '0.4rem' }} onClick={() => handleDelete(u._id)}>
                          Delete
                        </button>
                      )}
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

export default AdminManageUsers;
