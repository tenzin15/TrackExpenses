import React from 'react';
import '../styles/Expense.css';

class Expense extends React.Component {
  render() {
    return (
        <li>
          <span className="wrapInOneLi" id="wrapInOneLi0">{this.props.itemTitle}</span>
          <span className="wrapInOneLi" id="wrapInOneLi1">$ {this.props.itemAmount}</span>
          <span className="wrapInOneLi" id="wrapInOneLi2">@ {this.props.createdAt}</span>
          <button
            className="editButton"
            onClick={() => {
                            this.props.editExpenseItem(
                              this.props.day,
                              this.props.uniqueKey,
                              this.props.itemTitle,
                              this.props.itemAmount,
                              this.props.createdAt
                            )
                          }
                    }
            >
            Edit
          </button>
          <button
            className="deleteButton"
            onClick={() => {this.props.deleteAnItem(this.props.day, this.props.uniqueKey)}}>
            Delete
          </button>
        </li>
    )
  }
}

export default Expense;
