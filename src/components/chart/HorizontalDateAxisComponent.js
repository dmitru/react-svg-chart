'use strict';

import React, { PropTypes } from 'react';
import moment from 'moment';

require('styles/chart/HorizontalDateAxis.scss');

class HorizontalDateAxisComponent extends React.Component {
  render() {
    const { axis } = this.props;
    const { tickValues, tickPositions } = axis;
    const nTicks = tickValues.length;
    return (
      <g className="axis-horizontal">
        {tickValues.map((tickValue, index) => {
          const tickMonth = new Date(tickValue).getMonth();
          const shouldShowTick = nTicks <= 12 ? true :
            nTicks <= 2 * 12 ? tickMonth % 3 === 0 :
            nTicks <= 3 * 12 ? tickMonth % 4 === 0 :
            nTicks <= 4 * 12 ? tickMonth % 6 === 0 :
              tickMonth === 0;
          if (!shouldShowTick) {
            return null;
          }

          if (tickMonth === 0 || index === 0) {
            return (
              <g key={index}>
                <text x={tickPositions[index]} y={0}>
                  { moment(tickValue).format('MMMM') }
                </text>
                <text x={tickPositions[index]} y="1.2em">
                  { moment(tickValue).format('YYYY') }
                </text>
              </g>
            )
          } else {
            return (
              <text key={index} x={tickPositions[index]} y={0}>
                { moment(tickValue).format('MMMM') }
              </text>
            )
          }
        })}
      </g>
    );
  }
}

HorizontalDateAxisComponent.displayName = 'ChartHorizontalDateAxisComponent';

HorizontalDateAxisComponent.propTypes = {
  axis: PropTypes.object.isRequired
}

export default HorizontalDateAxisComponent;
