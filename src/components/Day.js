import React, { Component } from 'react';
import '../styles/Day.css';

class Day extends Component {
  render() {
    return (
      <div className={this.props.day}>
        <header id="day_total_header">
          <h3 id="h3_day_date">{this.props.day} ({this.props.date})</h3>
        </header>
        <span id="itemNameLabel"> Item Name: </span>
        <input
          id="itemTitle"
          type="text"
          placeholder="Enter a new item here to add to the list."
          ref={(input) => { this.itemTitleInput = input; }}
        />
        <span id="itemAmountLabel"> Item Amount: </span>
        <input
          id="itemAmount"
          type="number"
          placeholder="Enter the $ amount for this item"
          ref={(input) => { this.itemAmountInput = input; }}
        />
        <button
          id="addButton"
          onClick={() =>  this.props.createNewItem(this.itemTitleInput.value, this.itemAmountInput.value, this.props.day, this.props.date) }>
          Add New Item
        </button>
        <ol>


        </ol>
      </div>
    );
  }
}

export default Day;
