export const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'United States Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka' },
];

export const TIME_RANGES = [
  { label: '1D', value: '1' },
  { label: '7D', value: '7' },
  { label: '1M', value: '30' },
  { label: '3M', value: '90' },
  { label: '1Y', value: '365' },
  { label: 'All', value: 'max' },
];

export const API_CONFIG = {
  baseURL: 'https://api.coingecko.com/api/v3',
  apiKey: import.meta.env.VITE_COINGECKO_API_KEY,
};

export const DEFAULT_COIN_LIST_PARAMS = {
  vs_currency: 'usd',
  order: 'market_cap_desc',
  per_page: 100,
  page: 1,
  sparkline: false,
  price_change_percentage: '1h,24h,7d',
};