
function computeTickPositions({ min, max, nTicks }) {
  const result = [];
  const increment = (max - min) / (nTicks - 1);
  for (let i = 0; i < nTicks; ++i) {
    result.push(min + i * increment);
  }
  return result;
}

export default computeTickPositions;
