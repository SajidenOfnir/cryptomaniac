import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX } from 'react-icons/fi';
import { searchCoins } from '../../utils/api';
import { useDebounce } from '../../hooks/useDebounce';
import './SearchBar.css';

const SearchBar = ({ onSelectCoin, placeholder = "Search cryptocurrencies..." }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery.length >= 2) {
      searchCoins(debouncedQuery)
        .then(data => {
          setResults(data);
          setIsLoading(false);
          setIsOpen(true);
        })
        .catch(error => {
          console.error('Search error:', error);
          setIsLoading(false);
        });
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [debouncedQuery]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (e.target.value.length >= 2) {
      setIsLoading(true);
    }
  };

  const handleSelectCoin = (coin) => {
    onSelectCoin(coin);
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div className="search-bar-container">
      <div className="search-input-wrapper">
        <FiSearch className="search-icon" />
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="search-input"
          onFocus={() => results.length > 0 && setIsOpen(true)}
        />
        {query && (
          <button onClick={clearSearch} className="clear-btn">
            <FiX />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="search-results"
          >
            {isLoading ? (
              <div className="loading">Loading...</div>
            ) : results.length > 0 ? (
              results.map((coin) => (
                <motion.div
                  key={coin.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="search-result-item"
                  onClick={() => handleSelectCoin(coin)}
                >
                  <img 
                    src={coin.thumb} 
                    alt={coin.name}
                    className="coin-thumb"
                  />
                  <div className="coin-info">
                    <span className="coin-name">{coin.name}</span>
                    <span className="coin-symbol">{coin.symbol}</span>
                  </div>
                  <div className="coin-rank">#{coin.market_cap_rank}</div>
                </motion.div>
              ))
            ) : query.length >= 2 ? (
              <div className="no-results">No cryptocurrencies found</div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Holographic Effect */}
      <div className="holographic-effect"></div>
    </div>
  );
};

export default SearchBar;