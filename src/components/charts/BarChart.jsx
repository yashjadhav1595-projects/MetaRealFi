import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data, width = 600, height = 400, margin = { top: 20, right: 30, bottom: 40, left: 60 } }) => {
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
    const x = d3.scaleBand()
      .domain(data.map(d => d.label))
      .range([0, innerWidth])
      .padding(0.2);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .nice()
      .range([innerHeight, 0]);

    // Add X axis
    svg.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('fill', '#a5b4fc') // indigo-300
      .style('text-anchor', 'middle');

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

    // Add bars
    svg.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.label))
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', d => innerHeight - y(d.value))
      .attr('fill', '#6366f1') // indigo-600
      .attr('rx', 4) // rounded corners
      .on('mouseover', function(event, d) {
        d3.select(this).attr('fill', '#4f46e5'); // indigo-700 on hover
        
        // Add tooltip
        svg.append('text')
          .attr('class', 'tooltip')
          .attr('x', x(d.label) + x.bandwidth() / 2)
          .attr('y', y(d.value) - 10)
          .attr('text-anchor', 'middle')
          .attr('fill', 'white')
          .text(d.value);
      })
      .on('mouseout', function() {
        d3.select(this).attr('fill', '#6366f1');
        svg.select('.tooltip').remove();
      });

    // Add title
    svg.append('text')
      .attr('x', innerWidth / 2)
      .attr('y', -margin.top / 2)
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .attr('font-size', '16px')
      .text('Bar Chart');

  }, [data, width, height, margin]);

  return (
    <div className="bg-indigo-900/30 backdrop-blur-sm rounded-xl border border-indigo-500/20 p-4">
      <svg ref={svgRef} className="w-full h-full"></svg>
    </div>
  );
};

export default BarChart;