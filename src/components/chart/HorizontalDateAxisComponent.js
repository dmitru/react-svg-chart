'use strict';

import React, { PropTypes } from 'react';

require('styles/chart/HorizontalDateAxis.css');

class HorizontalDateAxisComponent extends React.Component {
  render() {
    return null;
  }
}

HorizontalDateAxisComponent.displayName = 'ChartHorizontalDateAxisComponent';

HorizontalDateAxisComponent.propTypes = {
  ticks: PropTypes.object.isRequired,
  y: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired
}

export default HorizontalDateAxisComponent;
