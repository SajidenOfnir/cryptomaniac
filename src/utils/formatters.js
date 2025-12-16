export const formatCurrency = (value, currency = 'USD') => {
  if (value === null || value === undefined) return '-';
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  
  return formatter.format(value);
};

export const formatPercentage = (value) => {
  if (value === null || value === undefined) return '-';
  
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
};

export const formatLargeNumber = (value) => {
  if (value === null || value === undefined) return '-';
  
  const absValue = Math.abs(value);
  
  if (absValue >= 1e12) {
    return `$${(value / 1e12).toFixed(2)}T`;
  }
  if (absValue >= 1e9) {
    return `$${(value / 1e9).toFixed(2)}B`;
  }
  if (absValue >= 1e6) {
    return `$${(value / 1e6).toFixed(2)}M`;
  }
  if (absValue >= 1e3) {
    return `$${(value / 1e3).toFixed(2)}K`;
  }
  
  return `$${value.toFixed(2)}`;
};

export const formatNumber = (value, decimals = 2) => {
  if (value === null || value === undefined) return '-';
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

export const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};