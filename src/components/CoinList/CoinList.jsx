import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FiTrendingUp, 
  FiTrendingDown,
  FiStar,
  FiInfo
} from 'react-icons/fi';
import { fetchMarketData } from '../../utils/api';
import { formatCurrency, formatPercentage } from '../../utils/formatters';
import './CoinList.css';

const CoinList = ({ currency = 'usd' }) => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [sortConfig, setSortConfig] = useState({ key: 'market_cap', direction: 'desc' });

  useEffect(() => {
    loadCoins();
    const interval = setInterval(loadCoins, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [currency]);

  const loadCoins = async () => {
    try {
      setLoading(true);
      const data = await fetchMarketData(currency);
      setCoins(data);
      setError(null);
    } catch (err) {
      setError('Failed to load cryptocurrency data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const handleSort = (key) => {
    let direction = 'desc';
    if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }
    setSortConfig({ key, direction });
  };

  const sortedCoins = [...coins].sort((a, b) => {
    if (sortConfig.key === 'name') {
      return sortConfig.direction === 'asc' 
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
    
    const aValue = a[sortConfig.key] || 0;
    const bValue = b[sortConfig.key] || 0;
    
    return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
  });

  if (loading && coins.length === 0) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading cryptocurrency data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={loadCoins} className="retry-btn">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="coin-list-container">
      <div className="list-header">
        <h2 className="list-title">
          <FiTrendingUp />
          Live Cryptocurrency Prices
        </h2>
        <div className="stats">
          <span className="stat-item">
            Total Coins: <strong>{coins.length}</strong>
          </span>
          <span className="stat-item">
            Total Market Cap: <strong>{formatCurrency(coins.reduce((sum, coin) => sum + coin.market_cap, 0))}</strong>
          </span>
        </div>
      </div>

      <div className="table-container">
        <table className="coin-table">
          <thead>
            <tr>
              <th className="favorite-col"></th>
              <th 
                className="rank-col sortable"
                onClick={() => handleSort('market_cap_rank')}
              >
                Rank
                {sortConfig.key === 'market_cap_rank' && (
                  <span className="sort-indicator">
                    {sortConfig.direction === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th 
                className="name-col sortable"
                onClick={() => handleSort('name')}
              >
                Name
                {sortConfig.key === 'name' && (
                  <span className="sort-indicator">
                    {sortConfig.direction === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th 
                className="price-col sortable"
                onClick={() => handleSort('current_price')}
              >
                Price
                {sortConfig.key === 'current_price' && (
                  <span className="sort-indicator">
                    {sortConfig.direction === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th 
                className="change-col sortable"
                onClick={() => handleSort('price_change_percentage_24h')}
              >
                24h Change
                {sortConfig.key === 'price_change_percentage_24h' && (
                  <span className="sort-indicator">
                    {sortConfig.direction === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th 
                className="market-cap-col sortable"
                onClick={() => handleSort('market_cap')}
              >
                Market Cap
                {sortConfig.key === 'market_cap' && (
                  <span className="sort-indicator">
                    {sortConfig.direction === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th className="action-col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedCoins.map((coin, index) => (
              <motion.tr
                key={coin.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="coin-row"
              >
                <td className="favorite-cell">
                  <button
                    onClick={(e) => toggleFavorite(coin.id, e)}
                    className={`favorite-btn ${favorites.has(coin.id) ? 'active' : ''}`}
                  >
                    <FiStar />
                  </button>
                </td>
                <td className="rank-cell">
                  <span className="rank-badge">#{coin.market_cap_rank}</span>
                </td>
                <td className="name-cell">
                  <Link to={`/coin/${coin.id}`} className="coin-link">
                    <img 
                      src={coin.image} 
                      alt={coin.name}
                      className="coin-image"
                    />
                    <div className="coin-name-wrapper">
                      <span className="coin-name">{coin.name}</span>
                      <span className="coin-symbol">{coin.symbol.toUpperCase()}</span>
                    </div>
                  </Link>
                </td>
                <td className="price-cell">
                  <span className="price-value">
                    {formatCurrency(coin.current_price)}
                  </span>
                </td>
                <td className="change-cell">
                  <span className={`change-badge ${coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}`}>
                    {coin.price_change_percentage_24h >= 0 ? (
                      <FiTrendingUp />
                    ) : (
                      <FiTrendingDown />
                    )}
                    {formatPercentage(coin.price_change_percentage_24h)}
                  </span>
                </td>
                <td className="market-cap-cell">
                  <span className="market-cap-value">
                    {formatCurrency(coin.market_cap)}
                  </span>
                </td>
                <td className="action-cell">
                  <Link to={`/coin/${coin.id}`} className="details-btn">
                    <FiInfo />
                    Details
                  </Link>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="list-footer">
        <p className="last-updated">
          Last updated: {new Date().toLocaleTimeString()}
        </p>
        <div className="pagination">
          <button className="pagination-btn" disabled>
            Previous
          </button>
          <span className="page-info">Page 1 of 10</span>
          <button className="pagination-btn">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoinList;