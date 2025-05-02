import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const LineChart = ({ data, width = 600, height = 400, margin = { top: 20, right: 30, bottom: 40, left: 60 } }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || !svgRef.current) return;

    // Clear any existing chart
    d3.select(svgRef.current).selectAll('*').remove();

    // Set up dimensions
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create scales
    const x = d3.scaleTime()
      .domain(d3.extent(data, d => new Date(d.date)))
      .range([0, innerWidth]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) * 1.1]) // Add 10% padding
      .nice()
      .range([innerHeight, 0]);

    // Add X axis
    svg.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x).ticks(5))
      .selectAll('text')
      .attr('fill', '#a5b4fc'); // indigo-300

    // Add Y axis
    svg.append('g')
      .call(d3.axisLeft(y))
      .selectAll('text')
      .attr('fill', '#a5b4fc'); // indigo-300

    // Add grid lines
    svg.append('g')
      .attr('class', 'grid')
      .call(d3.axisLeft(y)
        .tickSize(-innerWidth)
        .tickFormat('')
      )
      .selectAll('line')
      .attr('stroke', 'rgba(99, 102, 241, 0.2)'); // indigo-600 with opacity

    // Define line generator
    const line = d3.line()
      .x(d => x(new Date(d.date)))
      .y(d => y(d.value))
      .curve(d3.curveMonotoneX);

    // Add line path
    const path = svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#6366f1') // indigo-600
      .attr('stroke-width', 2)
      .attr('d', line);

    // Animate the line
    const pathLength = path.node().getTotalLength();
    path
      .attr('stroke-dasharray', pathLength)
      .attr('stroke-dashoffset', pathLength)
      .transition()
      .duration(1500)
      .attr('stroke-dashoffset', 0);

    // Add dots
    svg.selectAll('.dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', d => x(new Date(d.date)))
      .attr('cy', d => y(d.value))
      .attr('r', 4)
      .attr('fill', '#6366f1') // indigo-600
      .on('mouseover', function(event, d) {
        d3.select(this)
          .attr('r', 6)
          .attr('fill', '#4f46e5'); // indigo-700
        
        // Add tooltip
        svg.append('text')
          .attr('class', 'tooltip')
          .attr('x', x(new Date(d.date)))
          .attr('y', y(d.value) - 10)
          .attr('text-anchor', 'middle')
          .attr('fill', 'white')
          .text(d.value);
      })
      .on('mouseout', function() {
        d3.select(this)
          .attr('r', 4)
          .attr('fill', '#6366f1');
        svg.select('.tooltip').remove();
      });

    // Add title
    svg.append('text')
      .attr('x', innerWidth / 2)
      .attr('y', -margin.top / 2)
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .attr('font-size', '16px')
      .text('Line Chart');

  }, [data, width, height, margin]);

  return (
    <div className="bg-indigo-900/30 backdrop-blur-sm rounded-xl border border-indigo-500/20 p-4">
      <svg ref={svgRef} className="w-full h-full"></svg>
    </div>
  );
};

export default LineChart;