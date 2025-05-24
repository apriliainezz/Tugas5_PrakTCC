import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { BASE_URL } from "../utils";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Yakin ingin logout?",
      text: "Anda akan keluar dari sistem.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#a0522d",
      cancelButtonColor: "#d2b48c",
      confirmButtonText: "Ya, logout",
      cancelButtonText: "Batal"
    });

    if (result.isConfirmed) {
      const token = localStorage.getItem("accessToken");
      try {
        await axios.delete(`${BASE_URL}/logout`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true
        });
      } catch (error) {
        console.warn("Logout error:", error?.response?.data || error.message);
      } finally {
        localStorage.removeItem("accessToken");
        delete axios.defaults.headers.common["Authorization"];
        Swal.fire({
          icon: "success",
          title: "Logout Berhasil",
          text: "Anda telah keluar dari sistem.",
          timer: 1500,
          showConfirmButton: false
        });
        navigate("/");
      }
    }
  };

  return (
    <nav
      className={`navbar ${scrolled ? 'is-fixed-top' : ''}`}
      role="navigation"
      aria-label="main navigation"
      style={{
        backgroundColor: '#f4e9dc', // coklat pastel sangat terang
        boxShadow: scrolled
          ? '0 3px 8px rgba(160, 82, 45, 0.3)'
          : 'none',
        padding: '0.5rem 1rem',
        transition: 'box-shadow 0.3s ease',
        borderBottomLeftRadius: scrolled ? 0 : 10,
        borderBottomRightRadius: scrolled ? 0 : 10,
        color: '#6b4c3b',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
      }}
    >
      <div className="container is-flex is-align-items-center is-justify-content-space-between" style={{ gap: '1rem' }}>
        {/* Logo */}
        <div
          className="navbar-item"
          style={{
            fontWeight: '700',
            fontSize: '1.7rem',
            letterSpacing: '0.6px',
            color: '#6b4c3b',
            userSelect: 'none',
            cursor: 'default',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <i className="fas fa-book-open"></i>
          NotesApp
        </div>

        {/* Burger menu untuk mobile */}
        <button
          className={`navbar-burger ${isActive ? 'is-active' : ''}`}
          aria-label="menu"
          aria-expanded={isActive}
          onClick={() => setIsActive(!isActive)}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: '#6b4c3b',
            display: 'none', // default sembunyikan, pakai CSS media query untuk tampil di mobile
          }}
          id="burger-button"
        >
          <span style={{ backgroundColor: '#6b4c3b' }}></span>
          <span style={{ backgroundColor: '#6b4c3b' }}></span>
          <span style={{ backgroundColor: '#6b4c3b' }}></span>
        </button>

        {/* Menu Items */}
        <div className={`navbar-menu ${isActive ? 'is-active' : ''}`} style={{ flexGrow: 1 }}>
          <div className="navbar-start" style={{ display: 'flex', gap: '1rem' }}>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? 'is-active' : '')}
              style={({ isActive }) => ({
                padding: '0.5rem 1rem',
                borderRadius: 6,
                fontWeight: isActive ? '700' : '500',
                color: isActive ? '#a0522d' : '#6b4c3b',
                backgroundColor: isActive ? '#f0d9b5' : 'transparent',
                textDecoration: 'none',
                transition: 'all 0.25s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              })}
            >
              <i className="fas fa-home"></i> Home
            </NavLink>

            <NavLink
              to="/add"
              className={({ isActive }) => (isActive ? 'is-active' : '')}
              style={({ isActive }) => ({
                padding: '0.5rem 1rem',
                borderRadius: 6,
                fontWeight: isActive ? '700' : '500',
                color: isActive ? '#a0522d' : '#6b4c3b',
                backgroundColor: isActive ? '#f0d9b5' : 'transparent',
                textDecoration: 'none',
                transition: 'all 0.25s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              })}
            >
              <i className="fas fa-plus"></i> Tambah Catatan
            </NavLink>
          </div>

          {/* Logout button di kanan */}
          <div className="navbar-end" style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: '#a0522d',
                color: '#f4e9dc',
                border: 'none',
                padding: '0.45rem 1rem',
                borderRadius: 20,
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 3px 6px rgba(160, 82, 45, 0.3)',
                transition: 'background-color 0.3s ease, transform 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                userSelect: 'none'
              }}
              onMouseOver={e => {
                e.currentTarget.style.backgroundColor = '#8b3d1a';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.backgroundColor = '#a0522d';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <i className="fas fa-sign-out-alt"></i> Log Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
