import React, { Component } from 'react';
import '../styles/Day.css';
import Expense from './Expense'
import moment from 'moment'

class Day extends Component {
  render() {
    const returnContentWhenDefined = () => {
      if (this.props.expenseList) {
        return (
          this.props.expenseList.reverse().map(oneExpenseObject =>
              <Expense
                     uniqueKey={oneExpenseObject.uniqueKey}
                     itemTitle={oneExpenseObject.title}
                     itemAmount={oneExpenseObject.amount}
                     createdAt={moment(oneExpenseObject.createdAt).format('LT')}
                     deleteAnItem={this.props.deleteAnItem}
                     day={this.props.day}
                     editExpenseItem={this.props.editExpenseItem}
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
          placeholder={this.props.placeholderForItemTitle}
          value={this.props.editItemTitle}
          ref={(input) => { this.itemTitleInput = input; }}
        />
        <span id="itemAmountLabel"> Item Amount: $</span>
        <input
          id="itemAmount"
          type="number"
          placeholder={this.props.placeholderForItemAmount}
          value={this.props.editItemAmount}
          ref={(input) => { this.itemAmountInput = input; }}
        />
        <button
          id="addButton"
          onClick={() =>
            this.props.createNewItem
            (
              this.itemTitleInput.value,
              this.itemAmountInput.value,
              this.props.day,
              this.props.date
            )
          }>
          Add New Item
        </button>
        {/* All the current expenses in the list for a day will render below */}
        <ul id={this.props.day}>
          {returnContentWhenDefined()}
        </ul>
      </div>
    );
  }
}

export default Day;
