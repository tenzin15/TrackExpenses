import React, { Component } from 'react';
import { BrowserRouter, Match, Miss } from 'react-router';
import './styles/App.css';
import Day from './components/Day';
import Week from './components/Week';
import Login from './components/Login';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      week: '01/16/17 - 01/22/17',
      total: 0,
      day: ['Monday', 'Tuesday', 'Wednasday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      date: ['01/16/17', '01/17/17', '01/18/17', '01/19/17', '01/20/17', '01/21/17', '01/22/17'],
      mondayExpense: {},
      tuesdayExpense: {},
      wednasdayExpense: {},
      thursdayExpense: {},
      fridayExpense: {},
      saturdayExpense: {},
      sundayExpense: {}
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Week week={this.state.week} total={this.state.total} />
          <Day day={this.state.day[0]} date={this.state.date[0]} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
