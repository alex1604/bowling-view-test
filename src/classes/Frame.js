import {isStrike, isSpare} from '../actions/rollManager'

export default class Frame {
    constructor(i){
        this.rolls = []
        this.strike = false
        this.spare = false
        this.index = i
    }
    addRolls(rolls){
        this.rolls = rolls
        this.strike = isStrike(rolls)
        this.spare = isSpare(rolls)
    }
}