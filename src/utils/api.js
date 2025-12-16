import axios from 'axios';

const API_KEY = import.meta.env.VITE_COINGECKO_API_KEY;
const BASE_URL = 'https://api.coingecko.com/api/v3';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'x-cg-demo-api-key': API_KEY,
    'Accept': 'application/json',
  },
});

export const fetchMarketData = async (currency = 'usd', page = 1) => {
  try {
    const response = await api.get('/coins/markets', {
      params: {
        vs_currency: currency,
        order: 'market_cap_desc',
        per_page: 100,
        page: page,
        sparkline: false,
        price_change_percentage: '1h,24h,7d',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching market data:', error);
    throw error;
  }
};

export const fetchCoinData = async (id) => {
  try {
    const response = await api.get(`/coins/${id}`, {
      params: {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: false,
        developer_data: false,
        sparkline: false,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching coin data:', error);
    throw error;
  }
};

export const fetchCoinChartData = async (id, currency = 'usd', days = 10) => {
  try {
    const response = await api.get(`/coins/${id}/market_chart`, {
      params: {
        vs_currency: currency,
        days: days,
        interval: 'daily',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching chart data:', error);
    throw error;
  }
};

export const searchCoins = async (query) => {
  try {
    const response = await api.get('/search', {
      params: {
        query: query,
      },
    });
    return response.data.coins.slice(0, 10);
  } catch (error) {
    console.error('Error searching coins:', error);
    throw error;
  }
};