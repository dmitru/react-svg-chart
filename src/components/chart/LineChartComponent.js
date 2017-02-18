'use strict';

import React, { PropTypes } from 'react';

require('styles/chart/LineChart.scss');

class LineChart extends React.Component {
  render() {
    const { data, xAxis, yAxis } = this.props;
    const segments = [];
    for (let i = 1; i < data.length; ++i) {
      segments.push({
        x1: xAxis.scale(data[i - 1].x),
        x2: xAxis.scale(data[i].x),
        y1: yAxis.scale(data[i - 1].y),
        y2: yAxis.scale(data[i].y)
      });
    }
    return (
      <g className="line-chart">
        {segments.map((s) => (
          <line key={s.x1.valueOf()} x1={s.x1} x2={s.x2} y1={s.y1} y2={s.y2} />
        ))}
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
