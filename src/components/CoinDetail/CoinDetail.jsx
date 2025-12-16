import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiArrowLeft,
  FiTrendingUp,
  FiTrendingDown,
  FiGlobe,
  FiTwitter,
  FiLink,
  FiBarChart2
} from 'react-icons/fi';
import { 
  fetchCoinData,
  fetchCoinChartData 
} from '../../utils/api';
import { 
  formatCurrency, 
  formatPercentage,
  formatLargeNumber 
} from '../../utils/formatters';
import Chart from '../Chart/Chart';
import './CoinDetail.css';

const CoinDetail = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('10');

  useEffect(() => {
    loadCoinData();
  }, [id]);

  const loadCoinData = async () => {
    try {
      setLoading(true);
      const [coinData, chartDataResponse] = await Promise.all([
        fetchCoinData(id),
        fetchCoinChartData(id, 'usd', 10)
      ]);
      
      setCoin(coinData);
      
      // Format chart data for recharts
      const formattedChartData = chartDataResponse.prices.map(([timestamp, price]) => ({
        date: new Date(timestamp).toLocaleDateString(),
        price: price,
        timestamp: timestamp
      }));
      setChartData(formattedChartData);
      
      setError(null);
    } catch (err) {
      setError('Failed to load coin data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTimeRangeChange = async (days) => {
    setTimeRange(days);
    try {
      const response = await fetchCoinChartData(id, 'usd', days);
      const formattedChartData = response.prices.map(([timestamp, price]) => ({
        date: new Date(timestamp).toLocaleDateString(),
        price: price,
        timestamp: timestamp
      }));
      setChartData(formattedChartData);
    } catch (err) {
      console.error('Failed to update chart:', err);
    }
  };

  if (loading) {
    return (
      <div className="coin-detail-loading">
        <div className="loader"></div>
        <p>Loading coin data...</p>
      </div>
    );
  }

  if (error || !coin) {
    return (
      <div className="coin-detail-error">
        <h3>{error || 'Coin not found'}</h3>
        <Link to="/" className="back-btn">
          <FiArrowLeft /> Back to Home
        </Link>
      </div>
    );
  }

  const priceChange = coin.market_data.price_change_percentage_24h;
  const isPositive = priceChange >= 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="coin-detail-container"
    >
      {/* Header */}
      <div className="coin-header">
        <Link to="/" className="back-link">
          <FiArrowLeft /> Back to Market
        </Link>
        
        <div className="coin-basic-info">
          <div className="coin-icon-wrapper">
            <img 
              src={coin.image.large} 
              alt={coin.name}
              className="coin-icon-large"
            />
            <div className="coin-rank-badge">
              Rank #{coin.market_cap_rank}
            </div>
          </div>
          
          <div className="coin-title">
            <h1 className="coin-name">{coin.name}</h1>
            <div className="coin-symbol-wrapper">
              <span className="coin-symbol">{coin.symbol.toUpperCase()}</span>
              <span className={`price-change-badge ${isPositive ? 'positive' : 'negative'}`}>
                {isPositive ? <FiTrendingUp /> : <FiTrendingDown />}
                {formatPercentage(priceChange)}
              </span>
            </div>
          </div>
          
          <div className="coin-price-display">
            <span className="current-price">
              {formatCurrency(coin.market_data.current_price.usd)}
            </span>
            <div className="price-range">
              24h Range: {formatCurrency(coin.market_data.low_24h.usd)} - {formatCurrency(coin.market_data.high_24h.usd)}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="coin-detail-content">
        {/* Left Column - Chart */}
        <div className="chart-section">
          <div className="chart-header">
            <h3><FiBarChart2 /> Price Chart</h3>
            <div className="time-range-selector">
              {['1', '7', '10', '30', '90', '365'].map(days => (
                <button
                  key={days}
                  className={`time-range-btn ${timeRange === days ? 'active' : ''}`}
                  onClick={() => handleTimeRangeChange(days)}
                >
                  {days === '365' ? '1Y' : `${days}D`}
                </button>
              ))}
            </div>
          </div>
          
          <div className="chart-wrapper">
            <Chart data={chartData} />
          </div>
          
          <div className="chart-stats">
            <div className="stat-card">
              <span className="stat-label">Market Cap</span>
              <span className="stat-value">
                {formatCurrency(coin.market_data.market_cap.usd)}
              </span>
            </div>
            <div className="stat-card">
              <span className="stat-label">24h Volume</span>
              <span className="stat-value">
                {formatCurrency(coin.market_data.total_volume.usd)}
              </span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Circulating Supply</span>
              <span className="stat-value">
                {formatLargeNumber(coin.market_data.circulating_supply)}
              </span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Total Supply</span>
              <span className="stat-value">
                {formatLargeNumber(coin.market_data.total_supply)}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="details-section">
          {/* Market Stats */}
          <div className="market-stats">
            <h3>Market Statistics</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-label">All Time High</span>
                <span className="stat-value">
                  {formatCurrency(coin.market_data.ath.usd)}
                </span>
                <span className="stat-change">
                  {formatPercentage(coin.market_data.ath_change_percentage.usd)}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">All Time Low</span>
                <span className="stat-value">
                  {formatCurrency(coin.market_data.atl.usd)}
                </span>
                <span className="stat-change">
                  {formatPercentage(coin.market_data.atl_change_percentage.usd)}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Market Cap Rank</span>
                <span className="stat-value">#{coin.market_cap_rank}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Fully Diluted Valuation</span>
                <span className="stat-value">
                  {formatCurrency(coin.market_data.fully_diluted_valuation?.usd || 0)}
                </span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="links-section">
            <h3>Community Links</h3>
            <div className="links-grid">
              {coin.links.homepage[0] && (
                <a 
                  href={coin.links.homepage[0]} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="link-btn"
                >
                  <FiGlobe /> Official Website
                </a>
              )}
              {coin.links.twitter_screen_name && (
                <a 
                  href={`https://twitter.com/${coin.links.twitter_screen_name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-btn"
                >
                  <FiTwitter /> Twitter
                </a>
              )}
              {coin.links.subreddit_url && (
                <a 
                  href={coin.links.subreddit_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-btn"
                >
                  <FiLink /> Reddit
                </a>
              )}
              {coin.links.repos_url.github[0] && (
                <a 
                  href={coin.links.repos_url.github[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-btn"
                >
                  <FiLink /> GitHub
                </a>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="description-section">
            <h3>About {coin.name}</h3>
            <div 
              className="description-content"
              dangerouslySetInnerHTML={{ __html: coin.description.en }}
            />
          </div>
        </div>
      </div>

      {/* Tags */}
      {coin.categories.length > 0 && (
        <div className="tags-section">
          <h4>Categories</h4>
          <div className="tags-container">
            {coin.categories.map((category, index) => (
              <span key={index} className="tag">
                {category}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="coin-detail-footer">
        <p className="last-updated">
          Last updated: {new Date(coin.last_updated).toLocaleString()}
        </p>
      </div>
    </motion.div>
  );
};

export default CoinDetail;