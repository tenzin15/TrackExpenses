import React, { Component } from 'react';
import '../styles/Monday.css';

class Monday extends Component {
  render() {
    return (
      <div className="Monday">
        <header id="week_total_header">
          <button id="h3_addButton">Add New Item</button>
          <h3 id="h3_monday_date">Monday (01/09/17)</h3>
        </header>
      </div>
    );
  }
}

export default Monday;
