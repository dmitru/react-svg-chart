require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import moment from 'moment';

import Chart from './chart/ChartComponent';
import generateTestData from '../data/testDataGenerator';

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: generateTestData()
    };

    this.regenerateData = this.regenerateData.bind(this);
  }

  regenerateData() {
    const minDate = new Date(
      2015,
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28)
    );
    const maxDate = moment(minDate).add(3 + Math.random() * 24, 'M').toDate();
    this.setState({
      data: generateTestData({
        n: 30 + Math.random() * 100,
        minDate,
        maxDate
      })
    });
  }

  render() {
    return (
      <div className="index">
        <h1>SVG Timeseries Chart</h1>
        <div className="chart-component-wrapper">
          <Chart data={this.state.data} />
        </div>
        <button onClick={this.regenerateData}>
          Refresh
        </button>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
