require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import Chart from './chart/ChartComponent';
import generateTestData from '../data/testDataGenerator';

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: generateTestData()
    };
  }

  render() {
    return (
      <div className="index">
        <h1>SVG Timeseries Chart</h1>
        <Chart data={this.state.data} />
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
