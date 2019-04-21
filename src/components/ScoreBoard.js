import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
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

    render() {

        let frames = this.props.frames.map(frame => (
            <Frame key={frame.index}>
                <FrameBoard rolls={frame.rolls} index={frame.index}/>
                <Total>{this.props.counter[frame.index] !== undefined ? this.props.counter[frame.index] : ''}</Total>
            </Frame>
        ))
        return (
            <Container>
                {frames}
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