function newRoll(pinsLeft) {  // return random roll
    let roll = Math.ceil(Math.random() * pinsLeft)
    return roll
}

function rollBowls() {  // play a frame of two rolls
    let pinsLeft = 10  // pins left on the lane, starting with 10
    let reducer = (previousRoll, nextRoll) => previousRoll + nextRoll;
    let rolls = []  // array to register rolls for this frame
    do {
        if (rolls.length === 0 || rolls.reduce(reducer) < 10) {  // if there are any pins left, roll a second time
            let roll = newRoll(pinsLeft)
            rolls.push(roll)
            pinsLeft -= roll
        } else {  // if no pins left after first roll, it's a strike so no second roll
            rolls.push(0)
        }
    } while (rolls.length < 2)

    return rolls
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
    rollBowls,
    isStrike,
    isSpare
}