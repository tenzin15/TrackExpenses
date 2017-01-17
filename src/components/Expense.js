import React from 'react';
import '../styles/Expense.css';

class Expense extends React.Component {
  render() {
    return (
        <li>
          <span className="wrapInOneLi">{this.props.itemTitle}</span>
          <span className="wrapInOneLi">{this.props.itemAmount}</span>
          <span className="wrapInOneLi">{this.props.createdAt}</span>
        </li>
    )
  }
}

export default Expense;
