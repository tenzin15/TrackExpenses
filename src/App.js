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
      // for MVP, week's day, date are static
      // later, i can edit to keep adding new week as time goes on
      week: '01/16/17 - 01/22/17',
      weekName: '2017_week3',        // this week is third week of the 2017
      total: 0,
      day: ['Monday', 'Tuesday', 'Wednasday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      date: ['01/16/17', '01/17/17', '01/18/17', '01/19/17', '01/20/17', '01/21/17', '01/22/17'],
      mondayExpense: [],
      tuesdayExpense: [],
      wednasdayExpense: [],
      thursdayExpense: [],
      fridayExpense: [],
      saturdayExpense: [],
      sundayExpense: []
    }
    this.createNewItem = this.createNewItem.bind(this);
    this.updateStateWithCurrentDay = this.updateStateWithCurrentDay.bind(this);
  }

  updateStateWithCurrentDay(day, newItem) {
      switch(day) {
         case("Monday"):
          let mondayItems = this.state.mondayExpense;
          mondayItems.push(newItem);
          this.setState({
            mondayExpense: mondayItems
          })
         break;

         case("Tuesday"):
          let tuesdayItems = this.state.TuesdayExpense;
          tuesdayItems.push(newItem);
          this.setState({
            tuesdayExpense: tuesdayItems
          })
         break;

         case("Wednasday"):
          let wednasdayItems = this.state.wednasdayExpense;
          wednasdayItems.push(newItem);
          this.setState({
            wednasdayExpense: wednasdayItems
          })
         break;

         case("Thursday"):
          let thursdayItems = this.state.thursdayExpense;
          thursdayItems.push(newItem);
          this.setState({
            thursdayExpense: thursdayItems
          })
         break;

         case("Friday"):
          let fridayItems = this.state.fridayExpense;
          fridayItems.push(newItem);
          this.setState({
            fridayExpense: fridayItems
          })
         break;

         case("Saturday"):
          let saturdayItems = this.state.saturdayExpense;
          saturdayItems.push(newItem);
          this.setState({
            saturdayExpense: saturdayItems
          })
         break;

         case("Sunday"):
          let sundayItems = this.state.sundayExpense;
          sundayItems.push(newItem);
          this.setState({
            sundayExpense: sundayItems
          })
         break;
      }
  }

  createNewItem(itemTitle, itemAmount, itemCreationDay) {
    console.log(itemTitle, itemAmount, itemCreationDay);
    let newItem = {
      title: itemTitle,
      amount: itemAmount,
      createdAt: new Date };
    axios({
      url: `/expenseList/${this.state.weekName}/${itemCreationDay}/expense.json`,
      baseURL: 'https://trackexpenses-4bcf1.firebaseio.com/',
      method: "POST",
      data: newItem
    }).then((response) => {
      // let todos = this.state.todos;
      // let newItemId = response.data.name;
      // todos[newItemId] = newItem;
      // this.setState({ todos: todos });
      this.updateStateWithCurrentDay(itemCreationDay, newItem);

    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Week week={this.state.week} total={this.state.total} />
          <Day
            day={this.state.day[0]}
            date={this.state.date[0]}
            createNewItem = {this.createNewItem}
          />
          {this.state.mondayExpense.length}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
