import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import { motion } from 'framer-motion';
import './Chart.css';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="tooltip-label">{label}</p>
        <p className="tooltip-value">
          ${payload[0].value.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}
        </p>
      </div>
    );
  }
  return null;
};

const Chart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="chart-no-data">
        No chart data available
      </div>
    );
  }

  // Determine if the trend is positive or negative
  const firstPrice = data[0]?.price || 0;
  const lastPrice = data[data.length - 1]?.price || 0;
  const isPositive = lastPrice >= firstPrice;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="chart-container"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop 
                offset="5%" 
                stopColor={isPositive ? "var(--success)" : "var(--danger)"} 
                stopOpacity={0.4}
              />
              <stop 
                offset="95%" 
                stopColor={isPositive ? "var(--success)" : "var(--danger)"} 
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="rgba(0, 212, 255, 0.1)" 
            vertical={false}
          />
          
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'rgba(240, 248, 255, 0.6)', fontSize: 12 }}
            tickMargin={10}
          />
          
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'rgba(240, 248, 255, 0.6)', fontSize: 12 }}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
            domain={['dataMin', 'dataMax']}
          />
          
          <Tooltip content={<CustomTooltip />} />
          
          <Area
            type="monotone"
            dataKey="price"
            stroke={isPositive ? "var(--success)" : "var(--danger)"}
            strokeWidth={3}
            fill="url(#colorPrice)"
            activeDot={{
              r: 6,
              fill: isPositive ? "var(--success)" : "var(--danger)",
              stroke: "var(--light)",
              strokeWidth: 2
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default Chart;