'use strict';

import React, { PropTypes } from 'react';

require('styles/chart/LineChart.css');

class LineChart extends React.Component {
  render() {
    return null;
  }
}

LineChart.displayName = 'LineChartComponent';

LineChart.propTypes = {
  data: PropTypes.array.isRequired
}

export default LineChart;
