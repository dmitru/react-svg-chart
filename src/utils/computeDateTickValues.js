import moment from 'moment';

function computeDateTickValues({ min, max }) {
  const minMoment = moment(min);
  const maxMoment = moment(max);
  let currentValue = moment(new Date(minMoment.year(), minMoment.month()));
  const result = [];
  while (currentValue <= maxMoment) {
    result.push(currentValue.toDate());
    currentValue = currentValue.add(1, 'M');
  }
  return result;
}

export default computeDateTickValues;
