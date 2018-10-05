import React, { Component } from 'react'
import './App.css'
import LinearRegression from './tf/LinearRegression'

class App extends Component {

  render() {
    return (
      <div className="App">
        <h1>TensorFlow.js Demo</h1>
        <LinearRegression />
      </div>
    )
  }
}

export default App
