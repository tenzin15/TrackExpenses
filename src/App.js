import React, { Component } from 'react';
import './styles/App.css';
import Day from './components/Day';
import Week from './components/Week';
import axios from 'axios';
import jsonfile from 'jsonfile';
import FileSaver from 'file-saver';
import moment from 'moment';

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
      // date: ['01/16/17', '01/17/17', '01/18/17', '01/19/17', '01/20/17', '01/21/17', '01/22/17'],
      date: ['', '', '', '', '', '', ''],
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

      placeholderForItemTitleMonday: null,
      placeholderForItemAmountMonday: null,
      addEditButtonTextMonday: 'Add New Item',

      placeholderForItemTitleTuesday: null,
      placeholderForItemAmountTuesday: null,
      addEditButtonTextTuesday: 'Add New Item',

      placeholderForItemTitleWednasday: null,
      placeholderForItemAmountWednasday: null,
      addEditButtonTextWednasday: 'Add New Item',

      placeholderForItemTitleThursday: null,
      placeholderForItemAmountThursday: null,
      addEditButtonTextThursday: 'Add New Item',

      placeholderForItemTitleFriday: null,
      placeholderForItemAmountFriday: null,
      addEditButtonTextFriday: 'Add New Item',

      placeholderForItemTitleSaturday: null,
      placeholderForItemAmountSaturday: null,
      addEditButtonTextSaturday: 'Add New Item',

      placeholderForItemTitleSunday: null,
      placeholderForItemAmountSunday: null,
      addEditButtonTextSunday: 'Add New Item',
      dailyTotal: [0, 0, 0, 0, 0, 0, 0]       // daily total for 7 days of the week
    }
    this.createNewItem = this.createNewItem.bind(this);
    this.deleteAnItem = this.deleteAnItem.bind(this);
    this.updateStateWithCurrentDayItem = this.updateStateWithCurrentDayItem.bind(this);
    this.downloadDailyExpense = this.downloadDailyExpense.bind(this);
    this.updateStateAfterDelete = this.updateStateAfterDelete.bind(this);
    this.editExpenseItem = this.editExpenseItem.bind(this);
    this.downloadToExcel = this.downloadToExcel.bind(this);
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

  // User can download the credit expense report
  downloadToExcel() {
    axios({
        url: `/expenseList/${this.state.weekName}/.json`,
        baseURL: 'https://trackexpenses-4bcf1.firebaseio.com/',
        method: "GET",
    })
    .then((response) => {
      let daysInAWeek = ["Monday", "Tuesday", "Wednasday", "Thursday", "Friday", "Saturday", "Sunday"];
      let daysInDatabase = Object.keys(response.data);
      let responseData = [];
      responseData[0] = "Below is how much you spend on each item, each day:\n\n\n";
      daysInAWeek.map((day, index) => {
        if (daysInDatabase.includes(day)) {
            let itemsList = Object.values(Object.values(response.data[day]))[0];
            let temp = [];
            temp.push(day.toUpperCase() + "\n\n");
            Object.values(itemsList).map((item, idx) => {
              let itemDetails = Object.values(item)[0];
              temp.push(" " + itemDetails.title + "     $" + itemDetails.amount + "    @" + moment(itemDetails.createdAt).format('lll') + "\n");
            })
            temp.push("\n\n");
            responseData.push(temp);
        }
      })
      // save the parse expense detials for the week into the followign text file
      let blob = new Blob(responseData, {type: "text/plain;charset=utf-8"});
      FileSaver.saveAs(blob, "Weekly Expense Report.txt");
    });
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
              placeholderForItemTitleMonday: this.state.placeholderForItemTitle,
              placeholderForItemAmountMonday: this.state.placeholderForItemAmount
            })
           break;

           case("Tuesday"):
            dailyTotal[1] = total;
            this.setState({
              tuesdayExpense: data,
              dailyTotal: dailyTotal,
              placeholderForItemTitleTuesday: this.state.placeholderForItemTitle,
              placeholderForItemAmountTuesday: this.state.placeholderForItemAmount
            })
           break;

           case("Wednasday"):
            dailyTotal[2] = total;
            this.setState({
              wednasdayExpense: data,
              dailyTotal: dailyTotal,
              placeholderForItemTitleWednasday: this.state.placeholderForItemTitle,
              placeholderForItemAmountWednasday: this.state.placeholderForItemAmount
            })
           break;

           case("Thursday"):
            dailyTotal[3] = total;
            this.setState({
              thursdayExpense: data,
              dailyTotal: dailyTotal,
              placeholderForItemTitleThursday: this.state.placeholderForItemTitle,
              placeholderForItemAmountThursday: this.state.placeholderForItemAmount
            })
           break;

           case("Friday"):
            dailyTotal[4] = total;
            this.setState({
              fridayExpense: data,
              dailyTotal: dailyTotal,
              placeholderForItemTitleFriday: this.state.placeholderForItemTitle,
              placeholderForItemAmountFriday: this.state.placeholderForItemAmount
            })
           break;

           case("Saturday"):
            dailyTotal[5] = total;
            this.setState({
              saturdayExpense: data,
              dailyTotal: dailyTotal,
              placeholderForItemTitleSaturday: this.state.placeholderForItemTitle,
              placeholderForItemAmountSaturday: this.state.placeholderForItemAmount
            })
           break;

           case("Sunday"):
            dailyTotal[6] = total;
            this.setState({
              sundayExpense: data,
              dailyTotal: dailyTotal,
              placeholderForItemTitleSunday: this.state.placeholderForItemTitle,
              placeholderForItemAmountSunday: this.state.placeholderForItemAmount
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
    switch(itemCreationDay) {
           case("Monday"):
           this.setState({
              placeholderForItemTitleMonday: ' Add New Item',
              placeholderForItemAmountMonday: ' How much you spend?',
              addEditButtonTextMonday: 'Add New Item'
            })
           break;

           case("Tuesday"):
           this.setState({
              placeholderForItemTitleTuesday: ' Add New Item',
              placeholderForItemAmountTuesday: ' How much you spend?',
              addEditButtonTextTuesday: 'Add New Item'
            })
           break;

           case("Wednasday"):
           this.setState({
              placeholderForItemTitleWednasday: ' Add New Item',
              placeholderForItemAmountWednasday: ' How much you spend?',
              addEditButtonTextWednasday: 'Add New Item'
            })
           break;

           case("Thursday"):
           this.setState({
              placeholderForItemTitleThursday: ' Add New Item',
              placeholderForItemAmountThursday: ' How much you spend?',
              addEditButtonTextThursday: 'Add New Item'
            })
           break;

           case("Friday"):
           this.setState({
              placeholderForItemTitleFriday: ' Add New Item',
              placeholderForItemAmountFriday: ' How much you spend?',
              addEditButtonTextFriday: 'Add New Item'
            })
           break;

           case("Saturday"):
           this.setState({
              placeholderForItemTitleSaturday: ' Add New Item',
              placeholderForItemAmountSaturday: ' How much you spend?',
              addEditButtonTextSaturday: 'Add New Item'
            })
           break;

           case("Sunday"):
           this.setState({
              placeholderForItemTitleSunday: ' Add New Item',
              placeholderForItemAmountSunday: ' How much you spend?',
              addEditButtonTextSunday: 'Add New Item'
            })
           break;
    }

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
      let dailyTotal = this.state.dailyTotal;
      // if the listUniqueKey is found then delete that
      // item from the daily state of the corresponding
      // day of the week
      // esle decrement that item's amount from the state
      // of the day in dailyTotal['correspoding day']
      switch(day) {
         case("Monday"):
           this.state.mondayExpense.forEach((el) => {
            if (el.uniqueKey !== listUniqueKey) {
              temp.push(el);
            }
            else {
              dailyTotal[0] -= el.amount;
            }
           })
          this.setState({
            mondayExpense: temp,
            dailyTotal: dailyTotal
          })
         break;

         case("Tuesday"):
         this.state.tuesdayExpense.forEach((el) => {
          if (el.uniqueKey !== listUniqueKey) {
            temp.push(el);
            }
          else {
              dailyTotal[1] -= el.amount;
            }
          })
           this.setState({
            tuesdayExpense: temp,
            dailyTotal: dailyTotal
          })
         break;

         case("Wednasday"):
         this.state.wednasdayExpense.forEach((el) => {
          if (el.uniqueKey !== listUniqueKey) {
              temp.push(el);
            }
          else {
              dailyTotal[2] -= el.amount;
            }
          })
          this.setState({
            wednasdayExpense: temp,
            dailyTotal: dailyTotal
          })
         break;

         case("Thursday"):
         this.state.thursdayExpense.forEach((el) => {
          if (el.uniqueKey !== listUniqueKey) {
            temp.push(el);
            }
          else {
              dailyTotal[3] -= el.amount;
            }
          })
          this.setState({
            thursdayExpense: temp,
            dailyTotal: dailyTotal
          })
         break;

         case("Friday"):
         this.state.fridayExpense.forEach((el) => {
          if (el.uniqueKey !== listUniqueKey) {
            temp.push(el);
            }
          else {
              dailyTotal[4] -= el.amount;
            }
          })
          this.setState({
            fridayExpense: temp,
            dailyTotal: dailyTotal
          })
         break;

         case("Saturday"):
         this.state.saturdayExpense.forEach((el) => {
          if (el.uniqueKey !== listUniqueKey) {
            temp.push(el);
            }
          else {
              dailyTotal[5] -= el.amount;
            }
          })
          this.setState({
            saturdayExpense: temp,
            dailyTotal: dailyTotal
          })
         break;

         case("Sunday"):
         this.state.sundayExpense.forEach((el) => {
          if (el.uniqueKey !== listUniqueKey) {
            temp.push(el);
            }
          else {
              dailyTotal[6] -= el.amount;
            }
          })
          this.setState({
            sundayExpense: temp,
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
        switch(itemCreationDay) {
           case("Monday"):
           this.setState({
              placeholderForItemTitleMonday: title,
              placeholderForItemAmountMonday: amount,
              addEditButtonTextMonday: 'Finish Editing'
            })
           break;

           case("Tuesday"):
           this.setState({
              placeholderForItemTitleTuesday: title,
              placeholderForItemAmountTuesday: amount,
              addEditButtonTextTuesday: 'Finish Editing'
            })
           break;

           case("Wednasday"):
           this.setState({
              placeholderForItemTitleWednasday: title,
              placeholderForItemAmountWednasday: amount,
              addEditButtonTextWednasday: 'Finish Editing'
            })
           break;

           case("Thursday"):
           this.setState({
              placeholderForItemTitleThursday: title,
              placeholderForItemAmountThursday: amount,
              addEditButtonTextThursday: 'Finish Editing'
            })
           break;

           case("Friday"):
           this.setState({
              placeholderForItemTitleFriday: title,
              placeholderForItemAmountFriday: amount,
              addEditButtonTextFriday: 'Finish Editing'
            })
           break;

           case("Saturday"):
           this.setState({
              placeholderForItemTitleSaturday: title,
              placeholderForItemAmountSaturday: amount,
              addEditButtonTextSaturday: 'Finish Editing'
            })
           break;

           case("Sunday"):
           this.setState({
              placeholderForItemTitleSunday: title,
              placeholderForItemAmountSunday: amount,
              addEditButtonTextSunday: 'Finish Editing'
            })
           break;
        }

  }

  render() {
    return (
        <div className="App">
          <Week
            week={this.state.week}
            weeklyTotal={this.state.weeklyTotal}
            downloadToExcel={this.downloadToExcel}
          />
          <Day
            day={this.state.day[0]}
            date={this.state.date[0]}
            createNewItem = {this.createNewItem}
            expenseList = {this.state.mondayExpense}
            deleteAnItem = {this.deleteAnItem}
            editExpenseItem = {this.editExpenseItem}
            placeholderForItemTitle = {this.state.placeholderForItemTitleMonday}
            placeholderForItemAmount = {this.state.placeholderForItemAmountMonday}
            addEditButtonText = {this.state.addEditButtonTextMonday}
            dailyTotal = {this.state.dailyTotal[0]}
          />
          <Day
            day={this.state.day[1]}
            date={this.state.date[1]}
            createNewItem = {this.createNewItem}
            expenseList = {this.state.tuesdayExpense}
            deleteAnItem = {this.deleteAnItem}
            editExpenseItem = {this.editExpenseItem}
            placeholderForItemTitle = {this.state.placeholderForItemTitleTuesday}
            placeholderForItemAmount = {this.state.placeholderForItemAmountTuesday}
            addEditButtonText = {this.state.addEditButtonTextTuesday}
            dailyTotal = {this.state.dailyTotal[1]}
          />
          <Day
            day={this.state.day[2]}
            date={this.state.date[2]}
            createNewItem = {this.createNewItem}
            expenseList = {this.state.wednasdayExpense}
            deleteAnItem = {this.deleteAnItem}
            editExpenseItem = {this.editExpenseItem}
            placeholderForItemTitle = {this.state.placeholderForItemTitleWednasday}
            placeholderForItemAmount = {this.state.placeholderForItemAmountWednasday}
            addEditButtonText = {this.state.addEditButtonTextWednasday}
            dailyTotal = {this.state.dailyTotal[2]}
          />
          <Day
            day={this.state.day[3]}
            date={this.state.date[3]}
            createNewItem = {this.createNewItem}
            expenseList = {this.state.thursdayExpense}
            deleteAnItem = {this.deleteAnItem}
            editExpenseItem = {this.editExpenseItem}
            placeholderForItemTitle = {this.state.placeholderForItemTitleThursday}
            placeholderForItemAmount = {this.state.placeholderForItemAmountThursday}
            addEditButtonText = {this.state.addEditButtonTextThursday}
            dailyTotal = {this.state.dailyTotal[3]}
          />
          <Day
            day={this.state.day[4]}
            date={this.state.date[4]}
            createNewItem = {this.createNewItem}
            expenseList = {this.state.fridayExpense}
            deleteAnItem = {this.deleteAnItem}
            editExpenseItem = {this.editExpenseItem}
            placeholderForItemTitle = {this.state.placeholderForItemTitleFriday}
            placeholderForItemAmount = {this.state.placeholderForItemAmountFriday}
            addEditButtonText = {this.state.addEditButtonTextFriday}
            dailyTotal = {this.state.dailyTotal[4]}
          />
          <Day
            day={this.state.day[5]}
            date={this.state.date[5]}
            createNewItem = {this.createNewItem}
            expenseList = {this.state.saturdayExpense}
            deleteAnItem = {this.deleteAnItem}
            editExpenseItem = {this.editExpenseItem}
            placeholderForItemTitle = {this.state.placeholderForItemTitleSaturday}
            placeholderForItemAmount = {this.state.placeholderForItemAmountSaturday}
            addEditButtonText = {this.state.addEditButtonTextSaturday}
            dailyTotal = {this.state.dailyTotal[5]}
          />
          <Day
            day={this.state.day[6]}
            date={this.state.date[6]}
            createNewItem = {this.createNewItem}
            expenseList = {this.state.sundayExpense}
            deleteAnItem = {this.deleteAnItem}
            editExpenseItem = {this.editExpenseItem}
            placeholderForItemTitle = {this.state.placeholderForItemTitleSunday}
            placeholderForItemAmount = {this.state.placeholderForItemAmountSunday}
            addEditButtonText = {this.state.addEditButtonTextSunday}
            dailyTotal = {this.state.dailyTotal[6]}
          />
        </div>
    );
  }
}

export default App;
