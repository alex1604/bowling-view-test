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
    width: 50%;
    height: 70%;
    margin-top: 10%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-right: 1px solid gray;
    border-radio: 3px;
`
const RollTwo = styled.div`
    width: 50%;
    height: 70%;
    margin-top: 10%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

const displayConverterLeft = (rolls) => {
    try {
        let display = rolls[0]
        if (isStrike(rolls)) display = 'X'
        return display
    } catch {
        return ''
    }
}

const displayConverterRight = (rolls) => {
    try {
        let display = rolls[1]
        if (isStrike(rolls)) display = ''
        if (isSpare(rolls)) display = '/'
        return display
    } catch {
        return ''
    }
}

const FrameBoard = props => (
    <Container>
        <RollOne>{displayConverterLeft(props.rolls)}</RollOne>
        <RollTwo>{displayConverterRight(props.rolls)}</RollTwo>
    </Container>
)

export default FrameBoard