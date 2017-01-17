import React, { Component } from 'react';
import '../styles/Day.css';
import Expense from './Expense'

class Day extends Component {
  render() {
    const returnContentWhenDefined = () => {
      if (this.props.expenseList) {
        return (
          this.props.expenseList.reverse().map(oneExpenseObject =>
              <Expense key={oneExpenseObject.createdAt}
                     itemTitle={oneExpenseObject.title}
                     itemAmount={oneExpenseObject.amount}
                     createdAt={oneExpenseObject.createdAt}
              />
          )
        )
      }
    }
    return (
      <div className="Day" id={this.props.day}>
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
          onClick={() =>
            this.props.createNewItem(this.itemTitleInput.value,
              this.itemAmountInput.value,
              this.props.day,
              this.props.date)
          }>
          Add New Item
        </button>
        {/* All the current expenses in the list for a day will render below */}
        <ul className="Day" id={this.props.day}>
          {returnContentWhenDefined()}
        </ul>
      </div>
    );
  }
}

export default Day;
