import React, { Component } from 'react';
import '../styles/Week.css';

class Week extends Component {
  render() {
    return (
      <div className="Week">
        <header id="week_total_header">
          {/*<h3 id="h3_week">Week: {this.props.week}</h3>*/}
          <h3 id="h3_week"><button id="downloadButton"onClick={this.props.downloadToExcel}>Download File</button></h3>
          <span id="intro_msg">Track Your Credit Card Bills Weekly</span>
          <h3 id="h3_total">Total For Week: ${this.props.weeklyTotal}</h3>
        </header>
      </div>
    );
  }
}

export default Week;

