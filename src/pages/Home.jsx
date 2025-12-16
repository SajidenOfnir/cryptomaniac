import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar/SearchBar';
import CoinList from '../components/CoinList/CoinList';
import { 
  FiZap, 
  FiShield, 
  FiGlobe, 
  FiTrendingUp,
  FiBarChart2,
  FiClock
} from 'react-icons/fi';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleCoinSelect = (coin) => {
    navigate(`/coin/${coin.id}`);
  };

  const features = [
    {
      icon: <FiZap />,
      title: 'Real-time Data',
      description: 'Live cryptocurrency prices updated every minute from global exchanges.',
      color: 'var(--primary)'
    },
    {
      icon: <FiShield />,
      title: 'Secure Tracking',
      description: 'Bank-level security for tracking your crypto portfolio without storing assets.',
      color: 'var(--secondary)'
    },
    {
      icon: <FiGlobe />,
      title: 'Global Coverage',
      description: 'Track over 10,000 cryptocurrencies across 500+ exchanges worldwide.',
      color: 'var(--accent)'
    },
    {
      icon: <FiTrendingUp />,
      title: 'Advanced Analytics',
      description: 'In-depth charts, trends, and predictive analytics for informed decisions.',
      color: 'var(--success)'
    },
    {
      icon: <FiBarChart2 />,
      title: 'Portfolio Management',
      description: 'Track your investments with detailed performance analytics.',
      color: 'var(--primary)'
    },
    {
      icon: <FiClock />,
      title: '24/7 Monitoring',
      description: 'Round-the-clock monitoring with instant price alerts.',
      color: 'var(--secondary)'
    }
  ];

  const stats = [
    { value: '10,000+', label: 'Cryptocurrencies' },
    { value: '500+', label: 'Exchanges' },
    { value: '$1.2T', label: 'Total Market Cap' },
    { value: '2M+', label: 'Active Users' }
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-content"
        >
          <h1 className="hero-title">
            Welcome to <span className="gradient-text">Cryptomaniac</span>
          </h1>
          <p className="hero-subtitle">
            Track, analyze, and stay ahead in the cryptocurrency market with our 
            futuristic real-time tracking platform.
          </p>
          
          <div className="search-section">
            <SearchBar 
              onSelectCoin={handleCoinSelect}
              placeholder="Search for any cryptocurrency (e.g., Bitcoin, Ethereum...)"
            />
          </div>

          <div className="hero-stats">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="stat-card"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.5 }}
              >
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`
            }}
          />
        ))}
      </section>

      {/* Features Section */}
      <section className="features-section">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-title"
        >
          Why Choose Cryptomaniac?
        </motion.h2>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div 
                className="feature-icon"
                style={{ color: feature.color }}
              >
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <div className="feature-glow" style={{ background: feature.color }} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Market Overview Section */}
      <section className="market-section">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="market-header"
        >
          <h2 className="section-title">Live Cryptocurrency Market</h2>
          <p className="section-subtitle">
            Real-time prices, market caps, and trading volumes for top cryptocurrencies
          </p>
        </motion.div>
        
        <CoinList />
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="cta-content"
        >
          <h2 className="cta-title">Ready to Dive In?</h2>
          <p className="cta-description">
            Join thousands of crypto enthusiasts and start tracking 
            the market like never before.
          </p>
          <div className="cta-buttons">
            <button className="cta-btn primary">
              Get Started Free
            </button>
            <button className="cta-btn secondary">
              Explore Features
            </button>
          </div>
        </motion.div>

        {/* Holographic Effect */}
        <div className="cta-holographic"></div>
      </section>
    </div>
  );
};

export default Home;