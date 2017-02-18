'use strict';

import React, { PropTypes } from 'react';

require('styles/chart/VerticalAxis.scss');

class VerticalAxisComponent extends React.PureComponent {
  render() {
    const { axis } = this.props;
    const { tickValues, tickPositions } = axis;
    return (
      <g className="axis-vertical">
        {tickValues.map((tickValue, index) => (
          <text key={index} x={0} y={tickPositions[index]}>
            { tickValue }
          </text>
        ))}
      </g>
    );
  }
}

VerticalAxisComponent.displayName = 'VerticalAxisComponent';

VerticalAxisComponent.propTypes = {
  axis: PropTypes.object.isRequired
}

export default VerticalAxisComponent;
