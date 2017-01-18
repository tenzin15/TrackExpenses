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
      weeklyTotal: 0,
      day: ['Monday', 'Tuesday', 'Wednasday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      date: ['01/16/17', '01/17/17', '01/18/17', '01/19/17', '01/20/17', '01/21/17', '01/22/17'],
      mondayExpense: [],  // has list of { itemTitle: '', amount: '', createdAt: '', unqiueKey: '' }
      tuesdayExpense: [], // same for the rest
      wednasdayExpense: [],
      thursdayExpense: [],
      fridayExpense: [],
      saturdayExpense: [],
      sundayExpense: [],
      placeholderForItemTitle: ' What did you spend your money on?',
      placeholderForItemAmount: ' How much you spend?',
      addEditButtonText: 'Add New Item',
      dailyTotal: [0, 0, 0, 0, 0, 0, 0]       // daily total for 7 days of the week
    }
    this.createNewItem = this.createNewItem.bind(this);
    this.deleteAnItem = this.deleteAnItem.bind(this);
    this.updateStateWithCurrentDayItem = this.updateStateWithCurrentDayItem.bind(this);
    this.downloadDailyExpense = this.downloadDailyExpense.bind(this);
    this.updateStateAfterDelete = this.updateStateAfterDelete.bind(this);
    this.editExpenseItem = this.editExpenseItem.bind(this);
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
      const data = [];
      Object.values(response.data).map((key) => {
        data.push(Object.values(key)[0]);
      })
      let dailyTotal = this.state.dailyTotal;
      let total = 0;    // will store the total amount for each day from the firebase
      data.map((el) => {
        total += parseFloat(el.amount);
      })

      switch(day) {
           case("Monday"):
            dailyTotal[0] = total;
            this.setState({
              mondayExpense: data,
              dailyTotal: dailyTotal,
            })
           break;

           case("Tuesday"):
            dailyTotal[1] = total;
            this.setState({
              tuesdayExpense: data,
              dailyTotal: dailyTotal
            })
           break;

           case("Wednasday"):
            dailyTotal[2] = total;
            this.setState({
              wednasdayExpense: data,
              dailyTotal: dailyTotal
            })
           break;

           case("Thursday"):
            dailyTotal[3] = total;
            this.setState({
              thursdayExpense: data,
              dailyTotal: dailyTotal
            })
           break;

           case("Friday"):
            dailyTotal[4] = total;
            this.setState({
              fridayExpense: data,
              dailyTotal: dailyTotal
            })
           break;

           case("Saturday"):
            dailyTotal[5] = total;
            this.setState({
              saturdayExpense: data,
              dailyTotal: dailyTotal
            })
           break;

           case("Sunday"):
            dailyTotal[6] = total;
            this.setState({
              sundayExpense: data,
              dailyTotal: dailyTotal
            })
           break;
        }

        // here all down with daily amount update
        // now update weekly amount
        let weeklyTotal = 0;
        this.state.dailyTotal.forEach((el) => {
          weeklyTotal += el;
        })
        this.setState({
          weeklyTotal: weeklyTotal
        })
    }
  }

  updateStateWithCurrentDayItem(day, newItem) {
      switch(day) {
         case("Monday"):
          let mondayItems = this.state.mondayExpense;
          mondayItems.push(newItem);
          let dailyTotal = this.state.dailyTotal;
          dailyTotal[0] += parseFloat(newItem.amount);
          this.setState({
            mondayExpense: mondayItems,
            dailyTotal: dailyTotal,
          })
         break;

         case("Tuesday"):
          let tuesdayItems = this.state.tuesdayExpense;
          tuesdayItems.push(newItem);
          let dailyTotal1 = this.state.dailyTotal;
          dailyTotal1[1] += parseFloat(newItem.amount);
          this.setState({
            tuesdayExpense: tuesdayItems,
            dailyTotal: dailyTotal1
          })
         break;

         case("Wednasday"):
          let wednasdayItems = this.state.wednasdayExpense;
          wednasdayItems.push(newItem);
          let dailyTotal2 = this.state.dailyTotal;
          dailyTotal2[2] += parseFloat(newItem.amount);
          this.setState({
            wednasdayExpense: wednasdayItems,
            dailyTotal: dailyTotal2
          })
         break;

         case("Thursday"):
          let thursdayItems = this.state.thursdayExpense;
          thursdayItems.push(newItem);
          let dailyTotal3 = this.state.dailyTotal;
          dailyTotal3[3] += parseFloat(newItem.amount);
          this.setState({
            thursdayExpense: thursdayItems,
            dailyTotal: dailyTotal3
          })
         break;

         case("Friday"):
          let fridayItems = this.state.fridayExpense;
          fridayItems.push(newItem);
          let dailyTotal4 = this.state.dailyTotal;
          dailyTotal4[4] += parseFloat(newItem.amount);
          this.setState({
            fridayExpense: fridayItems,
            dailyTotal: dailyTotal4
          })
         break;

         case("Saturday"):
          let saturdayItems = this.state.saturdayExpense;
          saturdayItems.push(newItem);
          let dailyTotal5 = this.state.dailyTotal;
          dailyTotal5[5] += parseFloat(newItem.amount);
          this.setState({
            saturdayExpense: saturdayItems,
            dailyTotal: dailyTotal5
          })
         break;

         case("Sunday"):
          let sundayItems = this.state.sundayExpense;
          sundayItems.push(newItem);
          let dailyTotal6 = this.state.dailyTotal;
          dailyTotal6[6] += parseFloat(newItem.amount);
          this.setState({
            sundayExpense: sundayItems,
            dailyTotal: dailyTotal6
          })
         break;
      }

        // here all down with daily amount update
        // now update weekly amount
        let weeklyTotal = 0;
        this.state.dailyTotal.forEach((el) => {
          weeklyTotal += el;
        })
        this.setState({
          weeklyTotal: weeklyTotal
        })
  }

  createNewItem(itemTitle, itemAmount, itemCreationDay) {
    this.setState({
      addEditButtonText: 'Add New Item',
      placeholderForItemTitle: ' What did you spend your money on?',
      placeholderForItemAmount: ' How much you spend?'
    })
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
    axios({
      url: `/expenseList/${this.state.weekName}/${itemCreationDay}/expense/${listUniqueKey}/.json`,
      baseURL: 'https://trackexpenses-4bcf1.firebaseio.com/',
      method: "DELETE"
    })
    .then((response) => {
      this.updateStateAfterDelete(itemCreationDay, listUniqueKey);
    })
  }

  editExpenseItem(itemCreationDay, listUniqueKey, title, amount) {
    this.deleteAnItem(itemCreationDay, listUniqueKey);
    this.setState({
      placeholderForItemTitle: title,
      placeholderForItemAmount: amount,
      addEditButtonText: 'Finish Editing'
    })
  }

  render() {
    return (
        <div className="App">
          <Week week={this.state.week} weeklyTotal={this.state.weeklyTotal} />
          <Day
            day={this.state.day[0]}
            date={this.state.date[0]}
            createNewItem = {this.createNewItem}
            expenseList = {this.state.mondayExpense}
            deleteAnItem = {this.deleteAnItem}
            editExpenseItem = {this.editExpenseItem}
            placeholderForItemTitle = {this.state.placeholderForItemTitle}
            placeholderForItemAmount = {this.state.placeholderForItemAmount}
            addEditButtonText = {this.state.addEditButtonText}
            dailyTotal = {this.state.dailyTotal[0]}
          />
          <Day
            day={this.state.day[6]}
            date={this.state.date[6]}
            createNewItem = {this.createNewItem}
            expenseList = {this.state.sundayExpense}
            deleteAnItem = {this.deleteAnItem}
            editExpenseItem = {this.editExpenseItem}
            placeholderForItemTitle = {this.state.placeholderForItemTitle}
            placeholderForItemAmount = {this.state.placeholderForItemAmount}
            addEditButtonText = {this.state.addEditButtonText}
            dailyTotal = {this.state.dailyTotal[6]}
          />
        </div>
    );
  }
}

export default App;
