'use strict';

import React, { PropTypes } from 'react';

require('styles/chart/Chart.scss');

import { NumericAxis, DateAxis } from '../../utils/axis';

import HorizontalDateAxis from './HorizontalDateAxisComponent';
import VerticalAxis from './VerticalAxisComponent';
import GridLinesComponent from './GridLinesComponent';
import LineChart from './LineChartComponent';

class ChartComponent extends React.Component {
  render() {
    const { width, height, data } = this.props;

    const yData = data.map((d) => d.y);
    const xData = data.map((d) => d.x);

    const padding = {
      left: 20,
      right: 20,
      top: 20,
      bottom: 30,
      chartLeft: 20,
      chartBottom: 20
    };

    const yAxis = new NumericAxis({
      data: yData,
      outputFrom: height - padding.bottom - padding.top - padding.chartBottom,
      outputTo: 0
    });

    const xAxis = new DateAxis({
      data: xData,
      outputFrom: 0,
      outputTo: width - padding.left - padding.right - padding.chartLeft
    });

    return (
      <svg className="chart-component" width={width} height={height}>
        <rect className="background" x={0} width={width} y={0} height={height} />

        <g transform={`translate(${padding.left}, ${padding.top})`}>
          <g transform={`translate(${padding.chartLeft}, 0)`}>
            <GridLinesComponent
              yAxis={yAxis}
              width={width - padding.left - padding.right - padding.chartLeft}
            />
          </g>

          <VerticalAxis axis={yAxis} />
        </g>

        <g transform={`translate(${padding.left + padding.chartLeft}, ${height - padding.bottom})`}>
          <HorizontalDateAxis axis={xAxis} />
        </g>

        <g transform={`translate(${padding.left + padding.chartLeft}, ${padding.top})`}>
          <LineChart
            data={data}
            xAxis={xAxis}
            yAxis={yAxis}
          />
        </g>
      </svg>
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
  width: 1300
};

export default ChartComponent;
