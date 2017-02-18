/*
 Generates an array of test data.
 Each element is an object of the following format:
 {
  x: Date,
  y: Number,
 }
*/
function generateTestData(options = {}) {
  const n = options.n || 100;
  const minDate = options.minDate || new Date(2015, 0, 1);
  const maxDate = options.maxDate || new Date(2016, 0, 1);
  const minValue = typeof options.minValue === 'undefined' ? 10 : options.minValue;
  const maxValue = typeof options.maxValue === 'undefined' ? 90 : options.maxValue;

  const datePoints = [];
  for (let i = 0; i < n; ++i) {
    datePoints.push(new Date(minDate.getTime() + Math.random() * (maxDate - minDate)));
  }
  datePoints.sort();

  const data = [];
  let nextValue = Math.random() * (maxValue - minValue) + minValue;
  for (let i = 0; i < n; ++i) {
    data[i] = { x: datePoints[i], y: nextValue };
    nextValue += (Math.random() > 0.5 ? 1 : -1) * (Math.random() * (maxValue - minValue) / 10);
    nextValue = Math.min(nextValue, maxValue);
    nextValue = Math.max(nextValue, minValue);
  }
  return data;
}

export default generateTestData;
