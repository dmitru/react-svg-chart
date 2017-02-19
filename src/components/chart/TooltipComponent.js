'use strict';

import React, { PropTypes } from 'react';
import moment from 'moment';

export function TooltipLine({ x, y1, y2 }) {
  return (
    <line
      className="tooltip-line"
      strokeDasharray="5, 5"
      x1={x}
      x2={x}
      y1={y1}
      y2={y2}
    />
  );
}

TooltipLine.propTypes = {
  x: PropTypes.number.isRequired,
  y1: PropTypes.number.isRequired,
  y2: PropTypes.number.isRequired
}

export function TooltipPoint({ x, y, r }) {
  return (
    <circle
      className="tooltip-point"
      cx={x}
      cy={y}
      r={r}
    />
  );
}

TooltipPoint.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  r: PropTypes.number.isRequired
};

export function TooltipBox({ x, y, date, currentValue, previousValue }) {
  let differenceView;
  if (previousValue != null) {
    const difference = currentValue - previousValue;
    const differenceSign = difference >= 0 ? 'positive' : 'negative';
    differenceView = (
      <span className={`tooltip-difference tooltip-difference-${differenceSign}`}>
        {difference >= 0 ? '▲' : '▼'}
        {`${difference.toFixed(2).replace('.', ',')}`}
      </span>
    );
  }
  return (
    <div
      className="tooltip-box"
      style={{ left: x, top: y }}
    >
      <div className="tooltip-date">
        {moment(date).format('DD MMMM YYYY')}
      </div>
      <div className="tooltip-value">
        {`$ ${currentValue.toFixed(2).replace('.', ',')}`}
        {differenceView}
      </div>
    </div>
  );
}

TooltipBox.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  date: PropTypes.number.isRequired,
  currentValue: PropTypes.number.isRequired,
  previousValue: PropTypes.number
};
