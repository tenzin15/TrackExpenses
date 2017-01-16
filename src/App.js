import React, { Component } from 'react';
import './styles/App.css';
import Monday from './components/Monday';

class App extends Component {
  constructor() {
    super();
    this.state = {
      total: 0
    }
  }
  render() {
    return (
      <div className="App">
        <header id="week_total_header">
          <h3 id="h3_week">Week: 01/16/17 - 01/22/17</h3>
          <h3 id="h3_total">TOTAL: ${this.state.total}</h3>
        </header>
        <Monday />
      </div>
    );
  }
}

export default App;
