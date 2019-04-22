import React from 'react'
import styled from 'styled-components'
import { isSpare, isStrike } from '../utils/rollManager'

const Container = styled.div`
    border-left: 2px solid gray;
    border-bottom: 2px solid gray;
    border-radio: 3px;
    width: 70%;
    height: 10vh;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`

const RollOne = styled.div`
    width: 33.33%;
    height: 70%;
    margin-top: 10%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radio: 3px;
`
const RollBorder = styled.div`
    width: 33.33%;
    height: 70%;
    margin-top: 10%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-left: 1px solid gray;
`

const displayConverterLeft = (rolls) => {
    try {
        let display = rolls[0]
        display = display === 10 ? 'X' : display
        return display
    } catch {
        return ''
    }
}

const displayConverterCenter = (rolls) => {
    try {
        let display = rolls[1]
        display = display === 10 ? 'X' : display
        if (rolls[0] + rolls[1] === 10) display = '/'
        return display
    } catch {
        return ''
    }
}
const displayConverterRight = (rolls) => {
    try {
        let display = rolls[2]
        display = display === 10 ? 'X' : display
        display = display === 0 ? '' : display
        if (rolls[1] + rolls[2] === 10) display = '/'
        return display
    } catch {
        return ''
    }
}

const LastFrameBoard = props => (
    <Container>
        <RollOne>{displayConverterLeft(props.rolls)}</RollOne>
        <RollBorder>{displayConverterCenter(props.rolls)}</RollBorder>
        <RollBorder>{displayConverterRight(props.rolls)}</RollBorder>
    </Container>
)

export default LastFrameBoard