require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import moment from 'moment';

import Chart from './chart/ChartComponent';
import generateTestData from '../data/testDataGenerator';

moment.locale('ru', {
  months: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
  ]
});

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: generateTestData()
    };

    this.regenerateData = this.regenerateData.bind(this);
    this.handleRefreshLotsOfData = this.handleRefreshLotsOfData.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  regenerateData(lotsOfPoints = false) {
    const minDate = new Date(
      2015,
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28)
    );
    const maxDate = moment(minDate).add(3 + Math.random() * 24, 'M').toDate();
    this.setState({
      data: generateTestData({
        n: lotsOfPoints ? 10000 : (30 + Math.random() * 100),
        minDate,
        maxDate
      })
    });
  }

  handleRefresh() {
    this.regenerateData();
  }

  handleRefreshLotsOfData() {
    this.regenerateData(true);
  }

  render() {
    return (
      <div className="index">
        <h1>SVG Timeseries Chart</h1>
        <div className="chart-component-wrapper">
          <Chart data={this.state.data} />
        </div>
        <button onClick={this.handleRefresh}>
          Refresh
        </button>
        <button onClick={this.handleRefreshLotsOfData}>
          Refresh (10k points)
        </button>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
