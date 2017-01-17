import React, { Component } from 'react';
import '../styles/Day.css';

class Day extends Component {
  render() {
    return (
      <div className={this.props.day}>
        <header id="day_total_header">
          <button id="addButton">Add New Item</button>
          <h3 id="h3_day_date">{this.props.day} ({this.props.date})</h3>
        </header>
        <ol>
          <li>
            Gas
            <button id="deleteButton">Delete</button>
            <button id="editButton">Edit</button>
          </li>
        </ol>
      </div>
    );
  }
}

export default Day;
