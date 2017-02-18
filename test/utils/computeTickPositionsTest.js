/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import computeTickPositions from 'utils/computeTickPositions';

describe('computeTickPositions', function () {

  it('should compute 3 tick positions', function () {
    expect(computeTickPositions({
      min: 0.5,
      max: 1.5,
      nTicks: 3
    })).to.deep.equal([0.5, 1.0, 1.5]);
  });

  it('should compute 5 tick positions', function () {
    expect(computeTickPositions({
      min: 0,
      max: 1.0,
      nTicks: 5
    })).to.deep.equal([0, 0.25, 0.5, 0.75, 1.0]);
  });
});
