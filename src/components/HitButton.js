import React from 'react'
import styled from 'styled-components'

const Button = styled.div`
    border: 2px solid gray;
    border-radius: 20px;
    width: 7%;
    height: 5vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

const HitButton = props => (
    <Button onClick={()=>{props.rollBowl(props.hits)}}>
        {props.hits}
    </Button>
)

export default HitButton