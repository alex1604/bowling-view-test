import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { addPoints, updateCounter } from '../actions/actions'
import { rollBowls, isStrike, isSpare } from '../actions/rollManager'
import FrameBoard from './FrameBoard'

const addition = (a, b) => a + b

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
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
`
const Total = styled.div`
    width: 60%;
    height: 10vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    align-self: flex-start;
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

    calculateCumulatedHits = pos => {
        const { counter } = this.props
        let result = pos === 0 ? 0 : counter[pos-1]
        return result
    }

    checkPreviousStrike = () => {
        let { index } = this.state
        const { counter, frames } = this.props
        let nextCounter = [...counter]
        let currentFrame = frames[index]
        let previousFrame = frames[index - 1]
        let previousPreviousFrame = frames[index-2]

        let isLastRoll = index === frames.length - 1

        console.log('previousStrike ?', nextCounter[index - 1], counter, nextCounter)
        if (isLastRoll && previousFrame.strike && previousPreviousFrame.strike) {
            nextCounter[index - 2] = 30 + this.calculateCumulatedHits(index-2)
            nextCounter[index - 1] = 30 + nextCounter[index - 2]
            nextCounter[index] = 30 + nextCounter[index - 1]
            let action = updateCounter(nextCounter)
            this.props.dispatch(action)
        }
        // if currentRoll is Strike and third strike in a row ==> add bonus of 30 to first strike
        else if (!currentFrame.strike && previousFrame.strike && previousPreviousFrame === undefined) {
            nextCounter[index - 1] = 10 + currentFrame.rolls.reduce(addition) + this.calculateCumulatedHits(index-1)
            console.log('modified nextCounter = ', nextCounter)
            let action = updateCounter(nextCounter)
            this.props.dispatch(action)
        } else if (!currentFrame.strike && previousFrame.strike && !previousPreviousFrame.strike) {
            nextCounter[index - 1] = 10 + currentFrame.rolls.reduce(addition) + this.calculateCumulatedHits(index-1)
            console.log('modified nextCounter = ', nextCounter)
            let action = updateCounter(nextCounter)
            this.props.dispatch(action)
        } else if (currentFrame.strike && previousFrame.strike && previousPreviousFrame === undefined) {
            nextCounter[index - 2] = 30 + this.calculateCumulatedHits(index-2)
            console.log('modified nextCounter = ', nextCounter)
            let action = updateCounter(nextCounter)
            this.props.dispatch(action)
        }  else if (currentFrame.strike && previousFrame.strike && previousPreviousFrame.strike) {
            nextCounter[index - 2] = 30 + this.calculateCumulatedHits(index-2)
            console.log('modified nextCounter = ', nextCounter)
            let action = updateCounter(nextCounter)
            this.props.dispatch(action)
        } else if (!currentFrame.strike && previousFrame.strike && previousPreviousFrame.strike) {
            nextCounter[index - 2] = 20 + this.calculateCumulatedHits(index-2)
            nextCounter[index - 1] = 20 + 10 + currentFrame.rolls.reduce(addition) + this.calculateCumulatedHits(index-2)
            console.log('modified nextCounter = ', nextCounter)
            let action = updateCounter(nextCounter)
            this.props.dispatch(action)
        }
        //}
    }

    checkPreviousSpare = () => {
        let { index } = this.state
        const { counter, frames } = this.props
        let nextCounter = [...counter]
        let currentFrame = frames[index]
        let previousFrame = frames[index - 1]

        console.log('previousSpare ?', nextCounter[index - 1], nextCounter)
        // if currentRoll is Strike and third strike in a row ==> add bonus of 30 to first strike
        if (previousFrame.spare) {
            nextCounter[index - 1] = previousFrame.rolls.reduce(addition) + currentFrame.rolls[0] + this.calculateCumulatedHits(index-1) ///////////////
        }
        let action = updateCounter(nextCounter)
        this.props.dispatch(action)
    }

    countTotal = () => {
        const { frames, counter } = this.props
        const { index } = this.state
        let frame = frames[index - 1]
        let nextFrame = frames[index]
        console.log(frames)
        let previousTotal = index > 1 ? counter[index-2] : 0
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
    }

    addPointsToFrame = () => {
        const { index } = this.state
        let rolls = [10,0]
        this.props.frames[index].addRolls(rolls)
        let action = addPoints()
        this.props.dispatch(action)
        if (index >= 1) this.checkPreviousSpare()
        if (index >= 1) this.checkPreviousStrike()
        this.setState({ index: this.state.index + 1 }, this.countTotal)
    }

    render() {

        let frames = this.props.frames.map(frame => (
            <Frame key={frame.index}>
                <FrameBoard rolls={frame.rolls} />
                <Total>{this.props.counter[frame.index] !== undefined ? this.props.counter[frame.index] : ''}</Total>
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
    return {
        frames: state.frames,
        counter: state.counter
    }
}

export default connect(mapStateToProps)(ScoreBoard);