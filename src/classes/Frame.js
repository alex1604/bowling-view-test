import { isStrike, isSpare } from '../utils/rollManager'

export default class Frame {
    constructor(i) {
        this.rolls = []
        this.strike = false
        this.spare = false
        this.index = i
    }
    addRolls(rolls) {
        this.rolls = rolls
        if (rolls.length === 2) {
            this.strike = isStrike(rolls)
            this.spare = isSpare(rolls)
        }
    }
}