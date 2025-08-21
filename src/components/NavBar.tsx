import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

interface NavBarProps {
  onAddEventClick: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ onAddEventClick }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Define main navigation links (routes)
  const navLinks = [
    { to: "/", label: "Главная" },
    { to: "/timeline", label: "Линии" },
    { to: "/about", label: "О проекте" },
    { to: "/contacts", label: "Контакты" },
    { to: "/search", label: "Поиск" }
  ];

  // Handle clicking a nav link (close mobile menu if open)
  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <nav className="bg-white border-b px-4 py-3">
      {/* Top bar with brand and burger menu button */}
      <div className="flex items-center justify-between">
        {/* Brand name / Logo */}
        <Link to="/" className="text-xl font-bold text-gray-800">
          Histoline
        </Link>
        {/* Mobile menu toggle button (hamburger icon) */}
        <button
          className="md:hidden text-gray-800 text-2xl"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          &#9776; {/* Unicode hamburger menu symbol ☰ */}
        </button>
        {/* Desktop menu links (visible on md and up) */}
        <ul className="hidden md:flex md:items-center md:gap-6">
          {navLinks.map(link => (
            <li key={link.to}>
              <NavLink 
                to={link.to} 
                className="text-gray-700 hover:text-blue-600"
                onClick={handleLinkClick}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
          <li>
            <button 
              onClick={() => { handleLinkClick(); onAddEventClick(); }} 
              className="text-gray-700 hover:text-blue-600"
            >
              Добавить событие
            </button>
          </li>
        </ul>
      </div>
      {/* Mobile menu dropdown (visible on small screens when toggled) */}
      <ul className={`md:hidden mt-2 pb-3 space-y-2 ${mobileOpen ? 'block' : 'hidden'}`}>
        {navLinks.map(link => (
          <li key={link.to}>
            <NavLink 
              to={link.to} 
              className="block px-2 py-1 text-gray-700 hover:text-blue-600"
              onClick={handleLinkClick}
            >
              {link.label}
            </NavLink>
          </li>
        ))}
        <li>
          <button 
            onClick={() => { handleLinkClick(); onAddEventClick(); }} 
            className="block w-full text-left px-2 py-1 text-gray-700 hover:text-blue-600"
          >
            Добавить событие
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
