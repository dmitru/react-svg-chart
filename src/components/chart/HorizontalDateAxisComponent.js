'use strict';

import React, { PropTypes } from 'react';
import moment from 'moment';

require('styles/chart/HorizontalDateAxis.scss');

class HorizontalDateAxisComponent extends React.PureComponent {
  render() {
    const { axis } = this.props;
    const { tickValues, tickPositions } = axis;
    const nTicks = tickValues.length;

    const widthPerTick = axis.outputRange / nTicks;
    const minWidth = 100;
    const showEveryNthTick = Math.max(1, Math.ceil(minWidth / widthPerTick));

    const displayedTicks = tickValues.map((tickValue, index) => {
      const tickMonth = new Date(tickValue).getMonth();
      const shouldShowTick = index === 0 ||
        index % showEveryNthTick === 0;

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
          <g key={index}>
            <text x={tickPositions[index]} y={0}>
              { moment(tickValue).format('MMMM') }
            </text>
          </g>
        )
      }
    }).filter((x) => x);

    return (
      <g className="axis-horizontal">
        {displayedTicks}
      </g>
    );
  }
}

HorizontalDateAxisComponent.displayName = 'ChartHorizontalDateAxisComponent';

HorizontalDateAxisComponent.propTypes = {
  axis: PropTypes.object.isRequired
}

export default HorizontalDateAxisComponent;
