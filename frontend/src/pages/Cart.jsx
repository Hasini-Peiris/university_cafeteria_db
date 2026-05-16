import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Trash2, CreditCard } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pickupTime, setPickupTime] = useState('');
  const [manualUserId, setManualUserId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleCheckout = async () => {
    setErrorMsg('');
    const finalUserId = user?._id || manualUserId;
    
    if (!finalUserId) {
      setErrorMsg('User ID is required. Please login or enter your User ID.');
      return;
    }
    if (!pickupTime) {
      setErrorMsg('Pickup time is required.');
      return;
    }
    if (cartItems.length === 0) {
      setErrorMsg('Your cart is empty.');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const orderData = {
        userId: finalUserId,
        items: cartItems.map(item => ({
          menuId: item._id,
          quantity: item.quantity
        })),
        totalPrice: cartTotal * 1.08, // Including tax
        pickupTime: pickupTime
      };
      
      const res = await api.post('/orders', orderData);
      clearCart();
      alert('Order created successfully!');
      navigate(`/track/${res.data._id}`);
    } catch (error) {
      console.error('Checkout failed', error);
      setErrorMsg('Checkout failed. Make sure backend is running and valid.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="animate-fade-in" style={{ textAlign: 'center', paddingTop: '4rem' }}>
        <h2>Your Cart is Empty</h2>
        <p style={{ color: 'var(--gray)', marginBottom: '2rem' }}>Looks like you haven't added anything to your order yet.</p>
        <Link to="/menu" className="btn btn-primary">Browse Menu</Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <h1 style={{ marginBottom: '2rem' }}>Review Your Order</h1>
      
      {errorMsg && <div style={{ padding: '1rem', background: 'rgba(255, 71, 87, 0.2)', color: '#ff4757', borderRadius: '8px', marginBottom: '1rem' }}>{errorMsg}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h2>Items</h2>
          {cartItems.map(item => (
            <div key={item._id} style={{ display: 'flex', alignItems: 'center', padding: '1rem 0', borderBottom: '1px solid var(--glass-border)', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: 0, marginBottom: '0.5rem' }}>{item.name}</h3>
                <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Rs. {item.price.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <input 
                  type="number" 
                  min="1" 
                  value={item.quantity} 
                  onChange={(e) => updateQuantity(item._id, parseInt(e.target.value) || 1)}
                  className="form-control"
                  style={{ width: '70px', padding: '0.4rem' }}
                />
                <button onClick={() => removeFromCart(item._id)} style={{ background: 'none', border: 'none', color: '#ff4757', cursor: 'pointer' }}>
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h2>Checkout Details</h2>
          
          {!user && (
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label>User ID <span style={{color: 'var(--primary)'}}>*</span></label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Enter your User ID"
                value={manualUserId} 
                onChange={e => setManualUserId(e.target.value)} 
                required
              />
            </div>
          )}

          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <label>Pickup Time <span style={{color: 'var(--primary)'}}>*</span></label>
            <input 
              type="time" 
              className="form-control" 
              value={pickupTime} 
              onChange={e => setPickupTime(e.target.value)} 
              required
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--gray)' }}>
            <span>Subtotal</span>
            <span>Rs. {cartTotal.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--gray)' }}>
            <span>Tax (8%)</span>
            <span>Rs. {(cartTotal * 0.08).toFixed(2)}</span>
          </div>
          <hr style={{ border: 'none', borderTop: '1px solid var(--glass-border)', margin: '1rem 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontSize: '1.2rem', fontWeight: 'bold' }}>
            <span>Total</span>
            <span style={{ color: 'var(--secondary)' }}>Rs. {(cartTotal * 1.08).toFixed(2)}</span>
          </div>
          
          <button 
            className="btn btn-primary" 
            style={{ width: '100%', justifyContent: 'center', padding: '1rem', fontSize: '1.1rem' }}
            onClick={handleCheckout}
            disabled={isSubmitting}
          >
            <CreditCard size={20} /> 
            {isSubmitting ? 'Processing...' : 'Confirm Order'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
