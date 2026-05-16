import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Utensils, Clock, ShieldCheck, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      
      {/* Hero Section */}
      <div className="hero-section" style={{ 
        width: '100%', 
        height: '400px', 
        position: 'relative', 
        overflow: 'hidden', 
        borderRadius: '0 0 2rem 2rem',
        marginBottom: '3rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=2000") center/cover no-repeat'
      }}>
        <div style={{ zIndex: 1, padding: '2rem' }}>
          <h1 style={{ fontSize: '4rem', fontWeight: '800', marginBottom: '0.5rem', textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
            Freshness <span style={{ color: 'var(--primary)' }}>Preordered.</span>
          </h1>
          <p style={{ fontSize: '1.4rem', maxWidth: '700px', margin: '0 auto 2rem auto', opacity: 0.9, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            Experience the future of campus dining. Preorder, skip the queue, and enjoy your meal on your own schedule.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/menu" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem', borderRadius: '50px' }}>
              Order Now <ArrowRight size={20} />
            </Link>
            {!user && (
              <Link to="/auth" state={{ isRegister: true }} className="btn btn-outline" style={{ padding: '1rem 2rem', fontSize: '1.1rem', borderRadius: '50px', background: 'rgba(255,255,255,0.1)', color: 'white', border: '2px solid white' }}>
                Join UniCafe
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '3rem', width: '90%', maxWidth: '1000px', marginBottom: '3rem', background: 'rgba(255, 71, 87, 0.05)', border: '1px solid rgba(255, 71, 87, 0.2)' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>
          University Cafeteria Preorder
        </h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--gray)', maxWidth: '600px', margin: '0 auto' }}>
          Skip the Line. Savor the Time. Your favorite campus meals, ready when you are.
        </p>
      </div>
      
      <h2 style={{ marginBottom: '2rem' }}>Quick Links</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', width: '100%' }}>
        
        <Link to="/menu" className="glass-panel" style={{ padding: '2rem', textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'transform 0.3s' }}>
          <div style={{ background: 'rgba(255, 71, 87, 0.2)', padding: '1rem', borderRadius: '50%', marginBottom: '1rem', color: 'var(--primary)' }}>
            <Utensils size={32} />
          </div>
          <h3>Navigate to Menu</h3>
          <p style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>Browse food items and categories.</p>
        </Link>

        {user ? (
          <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="glass-panel" style={{ padding: '2rem', textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'transform 0.3s' }}>
            <div style={{ background: 'rgba(46, 213, 115, 0.2)', padding: '1rem', borderRadius: '50%', marginBottom: '1rem', color: 'var(--secondary)' }}>
              <Clock size={32} />
            </div>
            <h3>Navigate to Orders</h3>
            <p style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>Track your active food orders.</p>
          </Link>
        ) : (
          <Link to="/auth" className="glass-panel" style={{ padding: '2rem', textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'transform 0.3s' }}>
            <div style={{ background: 'rgba(164, 176, 190, 0.2)', padding: '1rem', borderRadius: '50%', marginBottom: '1rem', color: 'var(--light)' }}>
              <UserPlus size={32} />
            </div>
            <h3>User Registration</h3>
            <p style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>Create a new student account.</p>
          </Link>
        )}

        <Link to="/auth" className="glass-panel" style={{ padding: '2rem', textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'transform 0.3s' }}>
          <div style={{ background: 'rgba(255, 165, 2, 0.2)', padding: '1rem', borderRadius: '50%', marginBottom: '1rem', color: '#ffa502' }}>
            <ShieldCheck size={32} />
          </div>
          <h3>Navigate to Admin</h3>
          <p style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>Staff access and management.</p>
        </Link>

      </div>
    </div>
  );
};

export default Home;
