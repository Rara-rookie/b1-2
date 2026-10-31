import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';

export function Navbar() {
  const [theme, setTheme] = useState(() => localStorage.getItem('b1_2_theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('b1_2_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backgroundColor: 'var(--header-bg)',
      backdropFilter: 'blur(8px)',
      borderBottom: '1px solid var(--card-border)'
    }}>
      <div class="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '4.5rem'
      }}>
        <Link to="/" style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--accent-color)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <i class="fa-solid fa-list-check"></i> TaskTracker SPA
        </Link>

        <nav>
          <ul style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <li>
              <NavLink to="/" end style={({ isActive }) => ({ color: isActive ? 'var(--accent-color)' : 'var(--text-secondary)', fontWeight: isActive ? 700 : 500 })}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/items" end style={({ isActive }) => ({ color: isActive ? 'var(--accent-color)' : 'var(--text-secondary)', fontWeight: isActive ? 700 : 500 })}>
                Tasks
              </NavLink>
            </li>
            <li>
              <NavLink to="/items/new" style={({ isActive }) => ({ color: isActive ? 'var(--accent-color)' : 'var(--text-secondary)', fontWeight: isActive ? 700 : 500 })}>
                + New Task
              </NavLink>
            </li>
          </ul>
        </nav>

        <button
          onClick={toggleTheme}
          style={{
            background: 'transparent',
            border: 'none',
            fontSize: '1.2rem',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            padding: '0.5rem',
            borderRadius: '50%'
          }}
          aria-label="Theme toggle"
        >
          <i class={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
        </button>
      </div>
    </header>
  );
}

export function Layout({ children }) {
  return (
    <div class="app-layout">
      <Navbar />
      <main class="main-content">
        <div class="container">{children}</div>
      </main>
      <footer style={{ borderTop: '1px solid var(--card-border)', padding: '2rem 0', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
        <div class="container">&copy; 2026 TaskTracker SPA. Built for Assignment b1-2.</div>
      </footer>
    </div>
  );
}
