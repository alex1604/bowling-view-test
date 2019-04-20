import React, { Component } from 'react';
import { init } from './actions/gameData'
import './App.css';
import {connect} from 'react-redux'
import { setFrames } from './actions/actions'
import ScoreBoard from './components/ScoreBoard'
import HitSelector from './components/HitSelector'

const addition = (a, b) => a + b
const options = [0,1,2,3,4,5,6,7,8,9,10]

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      hits: [],
      index: 0
    }
  }
  componentWillMount(){
    let frames = init()
    this.props.dispatch(setFrames(frames))
  }

  /*
  addPointsToFrame = (rolls) => {
    const { index } = this.state
    //let rolls = [10,0]
    this.props.frames[index].addRolls(rolls)
    let action = addPoints()
    this.props.dispatch(action)
    if (index >= 1) this.checkPreviousSpare()
    if (index >= 1) this.checkPreviousStrike()
    this.setState({ index: this.state.index + 1 }, this.countTotal)
} */

  rollBowl = (x) =>{
    console.log(x)
    let hits = [...this.state.hits]
    hits.push(x)
    this.setState(hits)
    if(hits.length === 2) {
      this.setState({hits: []})
      //this.addPointsToFrame(hits)
    }
  }

  render() {
    return (
      <div className="App">
        <HitSelector options={options} rollBowl={this.rollBowl}/>
        <ScoreBoard />
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
      frames: state.frames
  }
}

export default connect(mapStateToProps)(App);
