'use strict';

import React, { PropTypes } from 'react';

require('styles/chart/Chart.scss');

import { NumericAxis, DateAxis } from '../../utils/axis';
import { lowerBound } from '../../utils/binarySearch';

import HorizontalDateAxis from './HorizontalDateAxisComponent';
import VerticalAxis from './VerticalAxisComponent';
import GridLinesComponent from './GridLinesComponent';
import LineChart from './LineChartComponent';
import { TooltipBox, TooltipPoint, TooltipLine } from './TooltipComponent';

class ChartComponent extends React.Component {
  constructor(props) {
    super(props);

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);

    this._recomputeAxes = this._recomputeAxes.bind(this);
    this._getCursor = this._getCursor.bind(this);
    this._compare = this._compare.bind(this);
    this._distance = this._distance.bind(this);

    const padding = {
      left: 20,
      right: 20,
      top: 20,
      bottom: 30,
      chartLeft: 20,
      chartBottom: 20
    };

    this.state = {
      tooltipPointIndex: null,
      padding
    };
  }

  componentWillMount() {
    this._recomputeAxes(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this._recomputeAxes(nextProps);
  }

  _recomputeAxes(props) {
    const { data, width, height } = props;
    const { padding } = this.state;
    const xData = data.map((d) => d.x);
    const yData = data.map((d) => d.y);
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

    this.setState({ xAxis, yAxis });
  }

  _getCursor(evt) {
    const svg = this._svg;
    const point = svg.createSVGPoint();
    point.x = evt.clientX;
    point.y = evt.clientY;
    return point.matrixTransform(this._inverseSvgTransform);
  }

  handleMouseMove(evt) {
    const svg = this._svg;
    if (!svg) {
      return;
    }

    const { data } = this.props;
    const cursorLocation = this._getCursor(evt);
    const nextPointIndex = lowerBound(data, cursorLocation, this._compare);
    const prevPointIndex = nextPointIndex > 0 ? nextPointIndex - 1 : null;
    const nextPoint = nextPointIndex && data[nextPointIndex];
    const prevPoint = prevPointIndex && data[prevPointIndex];

    if (nextPoint || prevPoint) {
      const nextDistance = nextPoint && this._distance(nextPoint, cursorLocation);
      const prevDistance = prevPoint && this._distance(prevPoint, cursorLocation);
      let tooltipPointIndex;
      if (nextDistance != null && prevDistance != null) {
        tooltipPointIndex = (nextDistance < prevDistance) ?
          nextPointIndex : prevPointIndex;
      } else if (nextDistance != null) {
        tooltipPointIndex = nextPointIndex;
      } else {
        tooltipPointIndex = prevPointIndex;
      }
      this.setState({ tooltipPointIndex });
    }
  }

  handleMouseOut() {
    this.setState({ tooltipPointIndex: null });
  }

  _compare(dataPoint, cursorPoint) {
    const { xAxis, padding } = this.state;
    const chartSvgOffset = padding.chartLeft + padding.left;
    return xAxis.scale(dataPoint.x) <= cursorPoint.x - chartSvgOffset;
  }

  _distance(dataPoint, cursorPoint) {
    const { xAxis, padding } = this.state;
    const chartSvgOffset = padding.chartLeft + padding.left;
    return Math.abs(xAxis.scale(dataPoint.x) - (cursorPoint.x - chartSvgOffset));
  }

  render() {
    const { width, height, data } = this.props;
    const { xAxis, yAxis, tooltipPointIndex, padding } = this.state;

    const tooltipPoint = tooltipPointIndex != null && data[tooltipPointIndex];
    const tooltipPrevPoint = tooltipPointIndex > 0 && data[tooltipPointIndex - 1];

    return (
      <div className="chart-wrapper">
        <svg
          className="chart-component"
          width={width}
          height={height}
          ref={svg => {
            this._svg = svg;
            if (svg) {
              this._inverseSvgTransform = svg.getScreenCTM().inverse();
            }
          }}
        >
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
              onMouseMove={this.handleMouseMove}
              onMouseOut={this.handleMouseOut}
            />
            {tooltipPoint && (
              <TooltipLine
                x={xAxis.scale(tooltipPoint.x)}
                y1={yAxis.scale(tooltipPoint.y)}
                y2={height - padding.bottom - padding.top - padding.chartBottom}
              />
            )}
            {tooltipPoint && (
              <TooltipPoint
                x={xAxis.scale(tooltipPoint.x)}
                y={yAxis.scale(tooltipPoint.y)}
                r={7}
              />
            )}
          </g>
        </svg>
        {tooltipPoint && (
          <TooltipBox
            x={xAxis.scale(tooltipPoint.x) + padding.left + padding.chartLeft + 10}
            y={yAxis.scale(tooltipPoint.y) - 50}
            date={tooltipPoint.x}
            currentValue={tooltipPoint.y}
            previousValue={tooltipPrevPoint ? tooltipPrevPoint.y : null}
          />
        )}
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
  width: 1300
};

export default ChartComponent;
