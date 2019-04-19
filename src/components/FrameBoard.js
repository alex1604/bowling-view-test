import React from 'react'
import styled from 'styled-components'

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

const FrameBoard = props => (
    <Container>
        <RollOne>{props.rolls[0]}</RollOne>
        <RollTwo>{props.rolls[1]}</RollTwo>
    </Container>
)

export default FrameBoard