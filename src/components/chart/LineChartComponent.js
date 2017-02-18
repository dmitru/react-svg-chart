'use strict';

import React, { PropTypes } from 'react';

require('styles/chart/LineChart.scss');

class LineChart extends React.Component {
  render() {
    const { data, xAxis, yAxis } = this.props;
    const segments = [];
    const points = [];
    for (let i = 1; i < data.length; ++i) {
      const x1 = xAxis.scale(data[i - 1].x);
      const x2 = xAxis.scale(data[i].x);
      const y1 = yAxis.scale(data[i - 1].y);
      const y2 = yAxis.scale(data[i].y);
      segments.push(
        <line key={x1.valueOf()} x1={x1} x2={x2} y1={y1} y2={y2} />
      );
    }
    return (
      <g className="line-chart">
        {segments}
      </g>
    );
  }
}

LineChart.displayName = 'LineChartComponent';

LineChart.propTypes = {
  data: PropTypes.array.isRequired,
  xAxis: PropTypes.object.isRequired,
  yAxis: PropTypes.object.isRequired
}

export default LineChart;
