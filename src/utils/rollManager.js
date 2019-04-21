function newRoll(pinsLeft) {  // return random roll
    let roll = Math.ceil(Math.random() * pinsLeft)
    return roll
}

function isStrike(rolls) {
    // if first roll is 10 then strike
    let strike = rolls[0] === 10 ? true : false
    return strike
}

function isSpare(rolls) {
    // if second roll not 0 and total is 10 then spare
    let spare = rolls[1] !== 0 && rolls.reduce((x, y) => x + y) === 10 ? true : false
    return spare
}

export {
    isStrike,
    isSpare
}