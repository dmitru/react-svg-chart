import _max from 'lodash/max';
import _min from 'lodash/min';

import computeTickPositions from './computeTickPositions';
import computeTickValues from './computeTickValues';
import computeDateTickValues from './computeDateTickValues';

class Axis {
  constructor({ data, outputFrom, outputTo }) {
    this.dataMin = _min(data);
    this.dataMax = _max(data);
    this.dataRange = this.dataMax - this.dataMin;

    this.outputMin = outputFrom;
    this.outputMax = outputTo;
    this.outputRange = Math.abs(outputTo - outputFrom);

    this._tickValues = null;
    this._tickPositions = null;
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

export class NumericAxis extends Axis {
  constructor({ data, outputFrom, outputTo }) {
    super({ data, outputFrom, outputTo });

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
}

export class DateAxis extends Axis {
  constructor({ data, outputFrom, outputTo }) {
    const dataTransformed = data.map((d) => d.getTime());
    super({ data: dataTransformed, outputFrom, outputTo });

    this._tickValues = computeDateTickValues({
      min: this.dataMin,
      max: this.dataMax
    });
    this._tickPositions = computeTickPositions({
      min: this.outputMin,
      max: this.outputMax,
      nTicks: this._tickValues.length
    });
  }

  scale(value) {
    const transformedValue = value.getTime();
    return super.scale(transformedValue);
  }
}
