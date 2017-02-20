require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import moment from 'moment';

import Chart from './chart/ChartComponent';
import generateTestData from '../data/testDataGenerator';

import momentRuLocale from 'moment/locale/ru';
moment.locale('ru', momentRuLocale);

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: generateTestData(),
      theme: 'light'
    };

    this.regenerateData = this.regenerateData.bind(this);
    this.handleRefreshLotsOfData = this.handleRefreshLotsOfData.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleThemeChange = this.handleThemeChange.bind(this);
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

  handleThemeChange(event) {
    this.setState({ theme: event.target.value });
  }

  render() {
    const { theme } = this.state;
    return (
      <div className={`index theme-${theme}`}>
        <h1>SVG Timeseries Chart</h1>
        <div className="chart-component-wrapper">
          <Chart data={this.state.data} />
        </div>
        <div className="controls">
            <select onChange={this.handleThemeChange} value={theme}>
              <option value="light">Light theme</option>
              <option value="dark">Dark theme</option>
            </select>
            <button onClick={this.handleRefresh}>
              Refresh
            </button>
            <button onClick={this.handleRefreshLotsOfData}>
              Refresh (10k points)
            </button>
        </div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
