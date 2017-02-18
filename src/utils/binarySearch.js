
function lessThan(a, b) {
  return a < b;
}

/**
 * Returns the first element from sorted array for
 * which !cmp(element, key)
 */
export function lowerBound(array, key, cmp=lessThan) {
  let count = array.length;
  let first = 0;
  let it;
  while (count > 0) {
    it = first;
    const step = Math.floor(count / 2);
    it += step;
    if (cmp(array[it], key)) {
      first = it + 1;
      it++;
      count -= step + 1;
    } else {
      count = step;
    }
  }
  return first === array.length ? null : first;
}
