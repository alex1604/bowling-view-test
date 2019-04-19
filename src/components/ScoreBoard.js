import React, { Component } from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import { addPoints } from '../actions/actions'
import { rollBowls, isStrike, isSpare } from '../actions/rollManager'
import FrameBoard from './FrameBoard'

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    border-top: 2px solid black;
    border-left: 2px solid black;
    border-bottom: 2px solid black;
    border-radius: 3px;
    width: 90vw;
    height: 20vh;
`
const Frame = styled.div`
    border-right: 2px solid black;
    width: 10%;
    height: 20vh;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`

class ScoreBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            index: 0
        }
        // methods here
    }

    componentDidMount() {
        console.log(this.props.frames)
    }

    addPointsToFrame = () => {
        let rolls = rollBowls()
        this.props.frames[this.state.index].addRolls(rolls)
        this.props.dispatch(addPoints())
        this.setState({index: this.state.index+1})
    }

    render() {
        let frames = this.props.frames.map(frame => (
            <Frame key={frame.index}>
                <FrameBoard rolls={frame.rolls} />
            </Frame>
        ))
        return (
            <Container>
                {frames}
                <button onClick={this.addPointsToFrame}>Points</button>
            </Container>
        )
    }
}

let mapStateToProps = state => {
    return{
        frames: state.frames
    }
  }
  
  export default connect(mapStateToProps)(ScoreBoard);