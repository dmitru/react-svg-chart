'use strict';

import React, { PropTypes } from 'react';

require('styles/chart/Chart.scss');

import NumericAxis from '../../utils/NumericAxis';

import VerticalAxis from './VerticalAxisComponent';
import GridLinesComponent from './GridLinesComponent';
import LineChart from './LineChartComponent';

class ChartComponent extends React.Component {
  render() {
    const { width, height, data } = this.props;

    const yData = data.map((d) => d.y);

    const padding = {
      left: 20,
      right: 20,
      top: 20,
      bottom: 20,
      gridLinesLeft: 20,
      yAxisBottom: 20
    };

    const yAxis = new NumericAxis({
      data: yData,
      outputFrom: height - padding.bottom - padding.top - padding.yAxisBottom,
      outputTo: 0
    });

    return (
      <div className="chart-component-wrapper">
        <svg className="chart-component" width={width} height={height}>
          <rect className="background" x={0} width={width} y={0} height={height} />

          <g transform={`translate(${padding.left}, ${padding.top})`}>
            <g transform={`translate(${padding.gridLinesLeft}, 0)`}>
              <GridLinesComponent
                yAxis={yAxis}
                width={width - padding.left - padding.right - padding.gridLinesLeft}
              />
            </g>

            <VerticalAxis
              axis={yAxis}
            />
          </g>

          <LineChart data={data} />
        </svg>
      </div>
    );
  }
}

ChartComponent.displayName = 'ChartComponent';

ChartComponent.propTypes = {
  data: PropTypes.array,
  height: PropTypes.number,
  width: PropTypes.number
};
ChartComponent.defaultProps = {
  data: [],
  height: 400,
  width: 1000
};

export default ChartComponent;
