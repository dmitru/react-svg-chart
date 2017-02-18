/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import computeTickValues from 'utils/computeTickValues';

describe('computeTickValues', function () {

  it('should compute 3 ticks for small positive values', function () {
    expect(computeTickValues({
      min: 1,
      max: 3
    })).to.deep.equal([1, 2, 3]);
  });

  it('should compute 3 ticks for small negative values', function () {
    expect(computeTickValues({
      min: -3.3,
      max: -1.4
    })).to.deep.equal([-4, -3, -2, -1]);
  });

  it('should compute 4 ticks for small mixed-sign values', function () {
    expect(computeTickValues({
      min: -9.5,
      max: 16.2
    })).to.deep.equal([-10, 0, 10, 20]);
  });

  it('should compute 4 ticks for small mixed-sign values', function () {
    expect(computeTickValues({
      min: -1.3,
      max: 18.2
    })).to.deep.equal([-10, 0, 10, 20]);
  });

  it('should compute ticks for mixed values', function () {
    expect(computeTickValues({
      min: -1,
      max: 3909
    })).to.deep.equal([-1000, 0, 1000, 2000, 3000, 4000]);
  });
});
