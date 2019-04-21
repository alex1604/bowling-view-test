import React, { Component } from 'react';
import { init } from './utils/gameData'
import './App.css';
import { connect } from 'react-redux'
import { setFrames, updateCounter, addPoints } from './actions/actions'
import ScoreBoard from './components/ScoreBoard'
import HitSelector from './components/HitSelector'
import { checkPreviousStrikes, checkPreviousSpare, countTotal } from './utils/calculator'

const addition = (a, b) => a + b
const options = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hits: [],
      index: 0,
      currentOptions: [...options]
    }
  }
  componentWillMount() {
    let frames = init()
    this.props.dispatch(setFrames(frames))
  }

  /*  calculateCumulatedHits = pos => {
      const { counter } = this.props
      let result = pos === 0 ? 0 : counter[pos - 1]
      return result
    }
  
    checkPreviousStrikes = () => {
      let { index } = this.state
      const { counter, frames } = this.props
      let nextCounter = [...counter]
      let currentFrame = frames[index]
      let previousFrame = frames[index - 1]
      let previousPreviousFrame = frames[index - 2]
  
      let isLastRoll = index === frames.length - 1
  
      if (isLastRoll && previousFrame.strike && previousPreviousFrame.strike) {
        nextCounter[index - 2] = 30 + this.calculateCumulatedHits(index - 2)
        nextCounter[index - 1] = 30 + nextCounter[index - 2]
        nextCounter[index] = 30 + nextCounter[index - 1]
        let action = updateCounter(nextCounter)
        this.props.dispatch(action)
      }
      // if currentRoll is Strike and third strike in a row ==> add bonus of 30 to first strike
      else if (!currentFrame.strike && previousFrame.strike && previousPreviousFrame === undefined) {
        nextCounter[index - 1] = 10 + currentFrame.rolls.reduce(addition) + this.calculateCumulatedHits(index - 1)
        console.log('modified nextCounter = ', nextCounter)
        let action = updateCounter(nextCounter)
        this.props.dispatch(action)
      } else if (!currentFrame.strike && previousFrame.strike && !previousPreviousFrame.strike) {
        nextCounter[index - 1] = 10 + currentFrame.rolls.reduce(addition) + this.calculateCumulatedHits(index - 1)
   
        let action = updateCounter(nextCounter)
        this.props.dispatch(action)
      } else if (currentFrame.strike && previousFrame.strike && previousPreviousFrame === undefined) {
        nextCounter[index - 2] = 30 + this.calculateCumulatedHits(index - 2)
        console.log('modified nextCounter = ', nextCounter)
        let action = updateCounter(nextCounter)
        this.props.dispatch(action)
      } else if (currentFrame.strike && previousFrame.strike && previousPreviousFrame.strike) {
        nextCounter[index - 2] = 30 + this.calculateCumulatedHits(index - 2)
        console.log('modified nextCounter = ', nextCounter)
        let action = updateCounter(nextCounter)
        this.props.dispatch(action)
      } else if (!currentFrame.strike && previousFrame.strike && previousPreviousFrame.strike) {
        nextCounter[index - 2] = 20 + this.calculateCumulatedHits(index - 2)
        nextCounter[index - 1] = 20 + 10 + currentFrame.rolls.reduce(addition) + this.calculateCumulatedHits(index - 2)
        console.log('modified nextCounter = ', nextCounter)
        let action = updateCounter(nextCounter)
        this.props.dispatch(action)
      }
      //}
    } */
  /*checkPreviousSpare = () => {
  let { index } = this.state
  const { counter, frames } = this.props
  let nextCounter = [...counter]
  let currentFrame = frames[index]
  let previousFrame = frames[index - 1]

  let isLastRoll = index === frames.length - 1

  console.log('previousSpare ?', nextCounter[index - 1], nextCounter)
  // if currentRoll is Strike and third strike in a row ==> add bonus of 30 to first strike

  if (previousFrame.spare) {
    nextCounter[index - 1] = previousFrame.rolls.reduce(addition) + currentFrame.rolls[0] + this.calculateCumulatedHits(index - 1)
    if (isLastRoll && currentFrame.spare) {
      nextCounter[index] = 10 + nextCounter[index - 1]
    }
  }
  let action = updateCounter(nextCounter)
  this.props.dispatch(action)
}

*/

  /*countTotal = () => {
  const { frames, counter } = this.props
  const { index } = this.state
  let frame = frames[index - 1]
  let nextFrame = frames[index]
  console.log(frames)
  let previousTotal = index > 1 ? counter[index - 2] : 0
  let reducedFrameHits = frame.rolls.reduce(addition)
  let total = previousTotal + reducedFrameHits
  if ((!frame.strike && !frame.spare)) {
    let nextCounter = [...counter, total]
    let action = updateCounter(nextCounter)
    this.props.dispatch(action)
  } else {
    let nextCounter = [...counter, '?']
    let action = updateCounter(nextCounter)
    this.props.dispatch(action)
  }
} */

  calculatePointsFromStrikes = () => {
    const { index } = this.state
    const { counter, frames } = this.props
    let nextCounter = checkPreviousStrikes(counter, frames, index)
    if (nextCounter !== undefined) {
      let action = updateCounter(nextCounter)
      console.log(action)
      this.props.dispatch(action)
    }
  }

  calculatePointsFromSpares = () => {
    const { index } = this.state
    const { counter, frames } = this.props
    let nextCounter = checkPreviousSpare(counter, frames, index)
    console.log('nextCounter =', nextCounter)
    if (nextCounter !== undefined) {
      let action = updateCounter(nextCounter)
      console.log(action)
      this.props.dispatch(action)
    }
  }

  updateTotalCumulatedPoints = () => {
    const { index } = this.state
    const { counter, frames } = this.props
    let nextCounter = countTotal(counter, frames, index)
    let action = updateCounter(nextCounter)
    this.props.dispatch(action)
  }

  addPointsToFrame = (rolls) => {
    console.log(rolls)
    const { index } = this.state
    const { counter, frames } = this.props
    console.log('current counter = ', counter)
    this.props.frames[index].addRolls(rolls) // add rolls to current Frame
    let action = addPoints()
    this.props.dispatch(action) // update frames in state
    if (index >= 1) this.calculatePointsFromSpares() // need to update total points from previous spare roll ?
    if (index >= 1) this.calculatePointsFromStrikes() // need to update total points from previous strike roll ?

    this.setState({ index: this.state.index + 1 }, () => {
      this.updateTotalCumulatedPoints()
    })
    // calculate cumulated points so far and update counter 
  }

  rollBowl = (x) => {
    let { hits, currentOptions } = this.state
    let newOptions = currentOptions.splice(0, currentOptions.length - x) // remove hit pins from hit selector buttons
    hits.push(x) // add hit to hitset
    console.log(hits)
    this.setState({ hits })
    if (hits[0] === 10) { // if strike then automatically add points
      hits.push(0)
      this.setState({ hits: [], currentOptions: [...options] })
      this.addPointsToFrame(hits)
    } else if (hits.length === 2) {  // if frame complete, reset hits and selector buttons
      this.setState({ hits: [], currentOptions: [...options] })
      this.addPointsToFrame(hits)
    } else {  // else update selector buttons
      this.setState({ currentOptions: newOptions })
    }
  }

  render() {
    return (
      <div className="App">
        <HitSelector options={this.state.currentOptions} rollBowl={this.rollBowl} />
        <ScoreBoard />
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    frames: state.frames,
    counter: state.counter
  }
}

export default connect(mapStateToProps)(App);
