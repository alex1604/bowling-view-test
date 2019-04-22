import React, { Component } from 'react';
import { init } from './utils/gameData'
import './App.css';
import { connect } from 'react-redux'
import { setFrames, updateCounter, addPoints } from './actions/actions'
import ScoreBoard from './components/ScoreBoard'
import HitSelector from './components/HitSelector'
import { checkPreviousStrikes, checkPreviousSpare, checkFinalFrame, countTotal } from './utils/calculator'

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
  componentWillMount() {  // generate array of Frames and update frames in state by dispatching an action
    let frames = init()
    this.props.dispatch(setFrames(frames))
  }

  calculatePointsFromStrikes = (counter) => {
  // check if some previous frames were a strike and needs update with points from current frame 
  //and update counter in state

    const { index } = this.state
    const { frames } = this.props
    let nextCounter = checkPreviousStrikes(counter, frames, index)  // perform the check and return next counter state
    
    if (nextCounter !== undefined) {  // update counter state
      let action = updateCounter(nextCounter)
      this.props.dispatch(action)
    }
    nextCounter = nextCounter !== undefined ? nextCounter : [...counter]
    return nextCounter
  }

  calculatePointsFromSpares = (counter) => {  
    // check if previous frame was spare and needs update with points from current frame and update counter in state
    const { index } = this.state
    const { frames } = this.props
    let nextCounter = checkPreviousSpare(counter, frames, index)  // perform the check and return next counter state

    if (nextCounter !== undefined) {  // update counter state
      let action = updateCounter(nextCounter)
      this.props.dispatch(action)
    }
    nextCounter = nextCounter !== undefined ? nextCounter : [...counter]
    return nextCounter
  }

  finalCalculation = (counter) => {  // final calculation after points form last frame have been registered
    const { index } = this.state
    const { frames } = this.props
    let nextCounter = checkFinalFrame(counter, frames, index)  // perform count operation for last frame 
                                                              //and return final total point
    if (nextCounter !== undefined) {  // update counter in state
      let action = updateCounter(nextCounter)
      this.props.dispatch(action)
    }
  }

  updateTotalCumulatedPoints = () => {
    const { index } = this.state
    const { counter, frames } = this.props
    let nextCounter = countTotal(counter, frames, index)  // perform count operation and return next counter state
    let action = updateCounter(nextCounter)
    this.props.dispatch(action)  // update counter state
  }

  addPointsToFrame = (rolls, isNotLastFrame) => {
    const { index } = this.state
    const { counter } = this.props
    this.props.frames[index].addRolls(rolls) // add rolls to current Frame
    let action = addPoints()
    this.props.dispatch(action)
    if (index >= 1) {
      let nextCounter = this.calculatePointsFromSpares(counter)  // need to update total points from previous spare roll ?
      nextCounter = this.calculatePointsFromStrikes(nextCounter) // need to update total points from previous strikes ?
      if (index === 9) nextCounter = this.finalCalculation(nextCounter) // if last frame then perform final calculation
    }
    if (isNotLastFrame) {
      this.setState({ index: this.state.index + 1 }, () => {  // update index
        this.updateTotalCumulatedPoints()  // update total points cumulated till now and add them to counter
      })
    }
    // calculate cumulated points so far and update counter 
  }

  rollBowl = (x) => {
    let isLastRoll = this.state.index === 9
    let { hits, currentOptions } = this.state
    let newOptions = currentOptions.splice(0, currentOptions.length - x) // remove hit pins from hit selector buttons
    hits.push(x) // add hit to hitset
    this.setState({ hits })
    console.log('push x =', x)

    if (!isLastRoll) {  // if last frame
      if (hits[0] === 10) {  // if strike then automatically add ten points and a zero
        hits.push(0)
        this.setState({ hits: [], currentOptions: [...options] })
        this.addPointsToFrame(hits, true)
      } else if (hits.length === 2) {  // if current frame complete push frame result, 
        // reset hits and selector buttons
        this.setState({ hits: [], currentOptions: [...options] })  // reset roll selectors to 0-10
        this.addPointsToFrame(hits, true)
      } else {
        this.setState({ currentOptions: newOptions })  // else update selector buttons
      }
    } else if (isLastRoll) {  // if last frame (special frame because of conditional amount of rolls up to 3)
      switch (hits.length) {   // depending on current amount of rolls :
        case 1:
          if (hits[0] === 10) this.setState({ currentOptions: [...options] }) // if first roll is trike then keep all roll selectors 0-10
          else this.setState({ currentOptions: newOptions })  // otherwise update and remove redundant roll selectors
          break;
        case 2:
          if (hits[1] === 10) this.setState({ currentOptions: [...options] }) // if second roll is strike 
          // keep all selectors 0-10 (and it means first roll was strike too)
          else if (hits[0] + hits[1] < 10) {  // if no strike and no spare during two first rolls then end game by adding 0 to last roll
            hits.push(0)
            this.setState({ currentOptions: [...options] })
            this.addPointsToFrame(hits, false)
          } else if (hits[0] + hits[1] === 10) {  // if first and second roll made a spare
            this.setState({ currentOptions: [...options] })
          } else {  // otherwise update selector
            this.setState({ currentOptions: newOptions })
          }
          break;
        case 3:  // in case last frame contains 3 rolls (and that means at least one strike or spare) then end game
          this.addPointsToFrame(hits, false) 
          this.setState({ currentOptions: [...options] })
          break;
        default:
          this.setState({ currentOptions: [...options] })  // reset selector buttons
          break;
      }
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
