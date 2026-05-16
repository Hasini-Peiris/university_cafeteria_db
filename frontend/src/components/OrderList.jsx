import React from 'react';

const OrderList = ({ orders, isAdmin, onStatusChange }) => {
  if (!orders || orders.length === 0) {
    return <p style={{ color: 'var(--gray)' }}>No orders found.</p>;
  }

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return 'status-pending';
      case 'preparing': return 'status-preparing';
      case 'ready': return 'status-ready';
      case 'completed': return 'status-completed';
      default: return 'status-pending';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {orders.map(order => (
        <div key={order._id} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ margin: 0, marginBottom: '0.5rem' }}>Order #{order._id?.substring(0, 8) || 'Mock'}</h3>
            <p style={{ margin: 0, color: 'var(--gray)' }}>
              Items: {order.items?.map(i => i.menuItem?.name || 'Item').join(', ')}
            </p>
            <p style={{ margin: 0, marginTop: '0.5rem', fontWeight: 'bold' }}>
              Total: ${order.totalAmount?.toFixed(2) || '0.00'}
            </p>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem' }}>
            {isAdmin ? (
              <select 
                className={`form-control ${getStatusClass(order.status)}`}
                value={order.status || 'Pending'}
                onChange={(e) => onStatusChange(order._id, e.target.value)}
                style={{ width: 'auto', fontWeight: 'bold' }}
              >
                <option value="Pending">Pending</option>
                <option value="Preparing">Preparing</option>
                <option value="Ready">Ready</option>
                <option value="Completed">Completed</option>
              </select>
            ) : (
              <span className={`status-badge ${getStatusClass(order.status)}`}>
                {order.status || 'Pending'}
              </span>
            )}
            <span style={{ fontSize: '0.85rem', color: 'var(--gray)' }}>
              {new Date(order.createdAt || Date.now()).toLocaleString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
