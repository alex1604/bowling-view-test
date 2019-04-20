import React from 'react'
import styled from 'styled-components'
import HitButton from './HitButton'

const Selector = styled.div`
    width: 60%;
    height: 10vh;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`

const HitSelector = props => (
    <Selector>
        {
            props.options.map(x => <HitButton key={x} hits={x} rollBowl={props.rollBowl}/>)
        }
    </Selector>
)

export default HitSelector