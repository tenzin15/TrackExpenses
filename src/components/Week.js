import React, { Component } from 'react';
import '../Week.css';

class Week extends Component {
  constructor() {
    super();
    this.state = {
      total: 0.00
    }
  }
  render() {
    return (
      <div className="week">
        <div id="week_total_header">
          <h3 id="h3_week">Week: 01/16/17 - 01/22/17</h3>
          <h3 id="h3_total">TOTAL: ${this.state.total}</h3>
        </div>
      </div>
    );
  }
}

export default Week;
