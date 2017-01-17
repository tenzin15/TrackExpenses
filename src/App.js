import React, { Component } from 'react';
import './styles/App.css';
import Day from './components/Day';
import Week from './components/Week';
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
      mondayExpense: [],  // has list of { itemTitle: '', itemAmount: '', createdAt: '' }
      tuesdayExpense: [], // same for the rest
      wednasdayExpense: [],
      thursdayExpense: [],
      fridayExpense: [],
      saturdayExpense: [],
      sundayExpense: []
    }
    this.createNewItem = this.createNewItem.bind(this);
    this.deleteAnItem = this.deleteAnItem.bind(this);
    this.updateStateWithCurrentDayItem = this.updateStateWithCurrentDayItem.bind(this);
    this.downloadDailyExpense = this.downloadDailyExpense.bind(this);
    this.updateStateAfterDelete = this.updateStateAfterDelete.bind(this);
  }

  componentDidMount() {
    this.state.day.forEach((day) => {
      let dayExpense = day[0].toLowerCase() + day.slice(1) + 'Expense';
      axios({
        url: `/expenseList/${this.state.weekName}/${day}/expense.json`,
        baseURL: 'https://trackexpenses-4bcf1.firebaseio.com/',
        method: "GET",
      })
      .then((response) => {
        this.downloadDailyExpense(day, response);
      })
    })
  }

  downloadDailyExpense(day, response) {
    if (response.data !== null) {
      const data = Object.values(response.data);
      switch(day) {
           case("Monday"):
            this.setState({
              mondayExpense: data,
            })
           break;

           case("Tuesday"):
            this.setState({
              tuesdayExpense: data,
            })
           break;

           case("Wednasday"):
            this.setState({
              wednasdayExpense: data,
            })
           break;

           case("Thursday"):
            this.setState({
              thursdayExpense: data,
            })
           break;

           case("Friday"):
            this.setState({
              fridayExpense: data,
            })
           break;

           case("Saturday"):
            this.setState({
              saturdayExpense: data,
            })
           break;

           case("Sunday"):
            this.setState({
              sundayExpense: data,
            })
           break;
        }
    }
  }

  updateStateWithCurrentDayItem(day, newItem) {
      switch(day) {
         case("Monday"):
          let mondayItems = this.state.mondayExpense;
          mondayItems.push(newItem);
          this.setState({
            mondayExpense: mondayItems
          })
         break;

         case("Tuesday"):
          let tuesdayItems = this.state.tuesdayExpense;
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
    const timestamp = Date.now();
    let newItem = {
      uniqueKey: timestamp,
      title: itemTitle,
      amount: itemAmount,
      createdAt: new Date
    };
    axios({
      url: `/expenseList/${this.state.weekName}/${itemCreationDay}/expense/${timestamp}/.json`,
      baseURL: 'https://trackexpenses-4bcf1.firebaseio.com/',
      method: "POST",
      data: newItem
    })
    .then((response) => {
      this.updateStateWithCurrentDayItem(itemCreationDay, newItem);
      itemTitle = '';
    })
    .catch((error) => {
      console.log(error);
    });
  }

  updateStateAfterDelete(day, listUniqueKey) {
      let temp = [];
      switch(day) {
         case("Monday"):
           this.state.mondayExpense.forEach((el) => {
            if (el.uniqueKey !== listUniqueKey) {
              temp.push(el);
              }
            })
            this.setState({
              mondayExpense: temp
            })
         break;

         case("Tuesday"):
         this.state.tuesdayExpense.forEach((el) => {
          if (el.uniqueKey !== listUniqueKey) {
            temp.push(el);
            }
          })
           this.setState({
            tuesdayExpense: temp
          })
         break;

         case("Wednasday"):
         this.state.wednasdayExpense.forEach((el) => {
          if (el.uniqueKey !== listUniqueKey) {
              temp.push(el);
            }
          })
          this.setState({
            wednasdayExpense: temp
          })
         break;

         case("Thursday"):
         this.state.thursdayExpense.forEach((el) => {
          if (el.uniqueKey !== listUniqueKey) {
            temp.push(el);
            }
          })
          this.setState({
            thursdayExpense: temp
          })
         break;

         case("Friday"):
         this.state.fridayExpense.forEach((el) => {
          if (el.uniqueKey !== listUniqueKey) {
            temp.push(el);
            }
          })
          this.setState({
            fridayExpense: temp
          })
         break;

         case("Saturday"):
         this.state.saturdayExpense.forEach((el) => {
          if (el.uniqueKey !== listUniqueKey) {
            temp.push(el);
            }
          })
          this.setState({
            saturdayExpense: temp
          })
         break;

         case("Sunday"):
         this.state.sundayExpense.forEach((el) => {
          if (el.uniqueKey !== listUniqueKey) {
            temp.push(el);
            }
          })
          this.setState({
            sundayExpense: temp
          })
         break;
      }
  }

  deleteAnItem(itemCreationDay, listUniqueKey) {
    console.log(itemCreationDay, listUniqueKey);
    axios({
      url: `/expenseList/${this.state.weekName}/${itemCreationDay}/expense/${listUniqueKey}/.json`,
      baseURL: 'https://trackexpenses-4bcf1.firebaseio.com/',
      method: "DELETE"
    })
    .then((response) => {
      this.updateStateAfterDelete(itemCreationDay, listUniqueKey);
    })
  }

  render() {
    return (
        <div className="App">
          <Week week={this.state.week} total={this.state.total} />
          <Day
            day={this.state.day[0]}
            date={this.state.date[0]}
            createNewItem = {this.createNewItem}
            expenseList = {this.state.mondayExpense}
            deleteAnItem = {this.deleteAnItem}
          />
        </div>
    );
  }
}

export default App;
