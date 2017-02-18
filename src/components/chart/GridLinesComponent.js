'use strict';

import React, { PropTypes } from 'react';

require('styles/chart/GridLines.scss');

class GridLinesComponent extends React.PureComponent {
  render() {
    const { width, yAxis } = this.props;
    const tickPositions = yAxis.tickPositions;
    return (
      <g className="grid-lines-horizontal">
        {tickPositions.map((tickPosition, index) => {
          return (
            <line
              key={index}
              x1={0}
              x2={width}
              y1={tickPosition}
              y2={tickPosition}
            />
          )
        })}
      </g>
    );
  }
}

GridLinesComponent.displayName = 'GridLinesComponent';

GridLinesComponent.propTypes = {
  yAxis: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired
}

export default GridLinesComponent;
