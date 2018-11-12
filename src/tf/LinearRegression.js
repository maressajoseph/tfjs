import React, { Component } from 'react'
import { modelLinear as model, tf } from './index'

class LinearRegression extends Component {
  state = {
    training: true,
    result: ''
  }

  componentDidMount() {
    // training data
    const xs = tf.tensor2d([-1, 0, 1, 2, 3, 4], [6, 1])
    const ys = tf.tensor2d([-3, -1, 1, 3, 5, 7], [6, 1])

    // train model w/training data (epochs property specifies how many times tf
    // is going through training set)
    // result of the fit method is a promise => callback fn when training is done
    model.fit(xs, ys, { epochs: 500, shuffle: true }).then(() => {
      model.predict(tf.tensor2d([5], [1,1])).print()
      this.setState({
        training: false
      })
    })
  }

  handleClick = () => {
    const val = document.getElementById('inputValue').value
    this.setState({
      result: String(model.predict(tf.tensor2d([val], [1,1])).dataSync()[0])
    })
  }

  render() {
    return (
      <div>
        <h2>
          Linear Regression
        </h2>
        <label>Input value:</label>
        <input type="text" id="inputValue" disabled={this.state.training}/><br />
        <button onClick={this.handleClick}>{this.state.training ? 'Model is training..' : 'Predict'}</button>
        <p>Result: {this.state.result}</p>
      </div>
    )
  }
}

export default LinearRegression
