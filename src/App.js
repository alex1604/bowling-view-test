import React, { Component } from 'react';
import { init } from './actions/gameData'
import './App.css';
import {connect} from 'react-redux'
import { setFrames } from './actions/actions'
import ScoreBoard from './components/ScoreBoard'

class App extends Component {
  constructor(props){
    super(props)
    this.state={}
  }
  componentWillMount(){
    let frames = init()
    this.props.dispatch(setFrames(frames))
  }
  render() {
    return (
      <div className="App">
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
