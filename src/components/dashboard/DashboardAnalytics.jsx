import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as d3 from 'd3';
import { portfolioData, transactionsData } from '../../data/dashboardData';

const DashboardAnalytics = () => {
  const [timeframe, setTimeframe] = useState('month');
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Refs for D3 charts
  const lineChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const barChartRef = useRef(null);

  useEffect(() => {
    try {
      if (!portfolioData || !portfolioData.summary || !portfolioData.properties) {
        throw new Error('Required data is not available');
      }

      // Clear previous charts
      d3.select(lineChartRef.current).selectAll('*').remove();
      d3.select(pieChartRef.current).selectAll('*').remove();
      d3.select(barChartRef.current).selectAll('*').remove();

      createLineChart();
      createPieChart();
      createBarChart();
      
      setIsLoading(false);
      setError(null);
    } catch (err) {
      console.error('Error processing dashboard data:', err);
      setError('Failed to load analytics data');
      setIsLoading(false);
    }
  }, [timeframe]);

  const createLineChart = () => {
    const margin = { top: 20, right: 30, bottom: 30, left: 60 };
    const width = 600 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    // Create sample performance data if not available
    const performanceData = portfolioData.summary.monthlyPerformance || [
      { date: '2023-01', value: portfolioData.summary.totalValue * 0.9 },
      { date: '2023-02', value: portfolioData.summary.totalValue * 0.95 },
      { date: '2023-03', value: portfolioData.summary.totalValue }
    ];

    const svg = d3.select(lineChartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleTime()
      .domain(d3.extent(performanceData, d => new Date(d.date)))
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(performanceData, d => d.value)])
      .range([height, 0]);

    const line = d3.line()
      .x(d => x(new Date(d.date)))
      .y(d => y(d.value))
      .curve(d3.curveMonotoneX);

    svg.append('path')
      .datum(performanceData)
      .attr('fill', 'none')
      .attr('stroke', '#818cf8')
      .attr('stroke-width', 2)
      .attr('d', line);

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .attr('color', '#818cf8');

    svg.append('g')
      .call(d3.axisLeft(y))
      .attr('color', '#818cf8');
  };

  const createPieChart = () => {
    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    // Create sample allocation data if not available
    const allocationData = portfolioData.properties.reduce((acc, property) => {
      const type = property.type || 'Unknown';
      acc[type] = (acc[type] || 0) + property.currentValue;
      return acc;
    }, {});

    const svg = d3.select(pieChartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal()
      .domain(Object.keys(allocationData))
      .range(d3.schemeSet2);

    const pie = d3.pie()
      .value(d => d[1]);

    const arc = d3.arc()
      .innerRadius(radius * 0.3) // Added inner radius for donut chart
      .outerRadius(radius * 0.8);

    const arcs = svg.selectAll('arc')
      .data(pie(Object.entries(allocationData)))
      .enter()
      .append('g');

    arcs.append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data[0]))
      .attr('stroke', '#1e1b4b')
      .style('stroke-width', '2px')
      .style('transition', 'all 0.3s');

    arcs.append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .style('font-size', '12px')
      .text(d => `${((d.data[1] / d3.sum(Object.values(allocationData))) * 100).toFixed(1)}%`);
  };

  const createBarChart = () => {
    const margin = { top: 20, right: 30, bottom: 40, left: 60 };
    const width = 600 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    // Create sample category data if not available
    const categoryData = portfolioData.properties.reduce((acc, property) => {
      const category = property.category || 'Other';
      acc[category] = (acc[category] || 0) + property.currentValue;
      return acc;
    }, {});

    const svg = d3.select(barChartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .domain(Object.keys(categoryData))
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(Object.values(categoryData))])
      .range([height, 0]);

    svg.selectAll('rect')
      .data(Object.entries(categoryData))
      .enter()
      .append('rect')
      .attr('x', d => x(d[0]))
      .attr('y', d => y(d[1]))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d[1]))
      .attr('fill', '#818cf8')
      .style('transition', 'all 0.3s');

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .attr('color', '#818cf8')
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end');

    svg.append('g')
      .call(d3.axisLeft(y))
      .attr('color', '#818cf8');
  };

  return (
    <div className="py-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h2 className="text-2xl font-bold text-white mb-4">Analytics Dashboard</h2>
        <div className="flex space-x-4 mb-6">
          {['week', 'month', 'year'].map((period) => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${timeframe === period 
                  ? 'bg-indigo-600/50 text-white shadow-lg shadow-indigo-500/20' 
                  : 'text-indigo-200 hover:text-white hover:bg-indigo-800/40'}`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </motion.div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : error ? (
        <div className="text-red-400 p-4 rounded-lg bg-red-900/20 border border-red-500/20">
          {error}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="dashboard-card">
            <h3 className="text-lg font-medium text-white mb-4">Portfolio Performance</h3>
            <div ref={lineChartRef} className="w-full overflow-x-auto" />
          </div>

          <div className="dashboard-card">
            <h3 className="text-lg font-medium text-white mb-4">Asset Allocation</h3>
            <div ref={pieChartRef} className="w-full" />
          </div>

          <div className="dashboard-card lg:col-span-2">
            <h3 className="text-lg font-medium text-white mb-4">Asset Categories</h3>
            <div ref={barChartRef} className="w-full overflow-x-auto" />
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardAnalytics;