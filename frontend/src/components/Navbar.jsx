import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, LogOut, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-link" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
        UniCafe
      </Link>
      
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/menu" className="nav-link">Menu</Link>
        <Link to="/track" className="nav-link">Order Status</Link>
        
        {user ? (
          <>
            {user.role === 'admin' ? (
              <>
                <Link to="/admin" className="nav-link btn btn-outline" style={{ padding: '0.4rem 0.8rem', border: 'none' }}>Admin Panel</Link>
                <Link to="/admin/users" className="nav-link btn btn-outline" style={{ padding: '0.4rem 0.8rem', border: 'none' }}>Users</Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="nav-link btn btn-outline" style={{ padding: '0.4rem 0.8rem', border: 'none' }}>
                  My Orders
                </Link>
              </>
            )}
            
            <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem' }}>
              <LogOut size={16} /> Logout
            </button>
          </>
        ) : (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Link to="/auth" state={{ isRegister: false }} className="btn btn-outline" style={{ padding: '0.4rem 1.2rem' }}>Login</Link>
            <Link to="/auth" state={{ isRegister: true }} className="btn btn-primary" style={{ padding: '0.4rem 1.2rem' }}>Register</Link>
          </div>
        )}

        {(!user || user.role !== 'admin') && (
          <Link to="/cart" className="nav-link cart-icon-container btn btn-outline" style={{ padding: '0.4rem 0.8rem', display: 'flex', gap: '0.5rem', border: 'none' }}>
            <ShoppingBag size={18} /> Create Order
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
