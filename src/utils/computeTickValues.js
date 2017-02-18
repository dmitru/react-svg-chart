import ceil from 'lodash/ceil';
import floor from 'lodash/floor';

function computeTickValues({ min, max }) {
  const maxAbs = Math.max(Math.abs(min), Math.abs(max));
  const maxAbsExponent = Math.ceil(Math.log10(maxAbs + 1)) - 1;
  const maxRounded = ceil(max, -maxAbsExponent);
  const minRounded = floor(min, -maxAbsExponent);
  const result = [];
  const increment = Math.pow(10, maxAbsExponent);
  let currentValue = minRounded;
  while (currentValue <= maxRounded) {
    result.push(currentValue);
    currentValue += increment;
  }
  return result;
}

export default computeTickValues;
