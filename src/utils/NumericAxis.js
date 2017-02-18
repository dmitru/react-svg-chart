import _max from 'lodash/max';
import _min from 'lodash/min';

import computeTickPositions from './computeTickPositions';
import computeTickValues from './computeTickValues';

class NumericAxis {
  constructor({ data, outputFrom, outputTo }) {
    this.dataMin = _min(data);
    this.dataMax = _max(data);
    this.dataRange = this.dataMax - this.dataMin;

    this.outputMin = outputFrom;
    this.outputMax = outputTo;
    this.outputRange = Math.abs(outputTo - outputFrom);

    this._tickValues = computeTickValues({
      min: this.dataMin,
      max: this.dataMax
    });
    this._tickPositions = computeTickPositions({
      min: this.outputMin,
      max: this.outputMax,
      nTicks: this._tickValues.length
    });
  }

  get tickPositions() {
    return this._tickPositions;
  }

  get tickValues() {
    return this._tickValues;
  }

  scale(value) {
    const { dataRange, dataMin, outputMin, outputRange } = this;
    const scaledValue = (value - dataMin) / dataRange * outputRange + outputMin;
    return scaledValue;
  }
}

export default NumericAxis;
