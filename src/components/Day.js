import React, { Component } from 'react';
import '../styles/Day.css';

class Day extends Component {
  render() {
    return (
      <div className="Day">
         <header id="day_total_header">
          <button id="addButton">Add New Item</button>
          <h3 id="h3_day_date">{this.props.day} ({this.props.date})</h3>
        </header>
        <ol>
          <li>
            Gas
            <button id="editButton">Edit</button>
            <button id="deleteButton">Delete</button>
          </li>
        </ol>
      </div>
    );
  }
}

export default Day;
