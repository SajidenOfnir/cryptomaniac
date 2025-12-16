import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiHome, 
  FiTrendingUp, 
  FiDollarSign, 
  FiGlobe,
  FiMenu,
  FiX
} from 'react-icons/fi';
import { FaBitcoin } from 'react-icons/fa';
import './Navbar.css';

const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(CURRENCIES[0]);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const navigate = useNavigate();

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
    setIsCurrencyOpen(false);
    // Here you would typically update context/state for currency
  };

  const menuItems = [
    { path: '/', icon: <FiHome />, label: 'Home' },
    { path: '#features', icon: <FiTrendingUp />, label: 'Features' },
    { path: '#pricing', icon: <FiDollarSign />, label: 'Pricing' },
    { path: '#blog', icon: <FiGlobe />, label: 'Blog' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <motion.div 
          className="logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/" className="logo-link">
            <FaBitcoin className="logo-icon" />
            <span className="logo-text">
              CRYPTO<span className="text-primary">MANIAC</span>
            </span>
          </Link>
        </motion.div>

        {/* Desktop Menu */}
        <div className="desktop-menu">
          {menuItems.map((item) => (
            <motion.div
              key={item.label}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <Link to={item.path} className="nav-link">
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </motion.div>
          ))}

          {/* Currency Selector */}
          <div className="currency-selector">
            <motion.button
              className="currency-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
            >
              <FiDollarSign />
              <span>{selectedCurrency.code}</span>
            </motion.button>

            {isCurrencyOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="currency-dropdown"
              >
                {CURRENCIES.map((currency) => (
                  <button
                    key={currency.code}
                    className={`currency-option ${
                      selectedCurrency.code === currency.code ? 'active' : ''
                    }`}
                    onClick={() => handleCurrencyChange(currency)}
                  >
                    <span className="symbol">{currency.symbol}</span>
                    <span className="code">{currency.code}</span>
                    <span className="name">{currency.name}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          {/* Sign Up Button */}
          <motion.button
            className="signup-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign Up
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mobile-menu"
        >
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="mobile-nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
          
          <div className="mobile-currency-selector">
            <select
              value={selectedCurrency.code}
              onChange={(e) => {
                const currency = CURRENCIES.find(c => c.code === e.target.value);
                handleCurrencyChange(currency);
              }}
              className="mobile-currency-select"
            >
              {CURRENCIES.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} - {currency.name}
                </option>
              ))}
            </select>
          </div>

          <button className="mobile-signup-btn">
            Sign Up
          </button>
        </motion.div>
      )}

      {/* Scan Line Effect */}
      <div className="scan-line"></div>
    </nav>
  );
};

export default Navbar;