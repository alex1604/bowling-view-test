const addition = (a, b) => a + b

function calculateCumulatedHits(counter, pos) {
    let result = pos === 0 ? 0 : counter[pos - 1]
    return result
}

function checkPreviousStrikes(counter, frames, index) {
    let nextCounter = [...counter]
    let currentFrame = frames[index]
    let previousFrame = frames[index - 1]
    let previousPreviousFrame = frames[index - 2]

    let isLastRoll = index === frames.length - 1

    if (isLastRoll && currentFrame.strike) {
        if (previousFrame.strike && previousPreviousFrame.strike) {
            nextCounter[index - 2] = 30 + calculateCumulatedHits(counter, index - 2)
            nextCounter[index - 1] = 30 + nextCounter[index - 2]
            nextCounter[index] = 30 + nextCounter[index - 1]
            console.log('nextCounter = ', nextCounter)
            return nextCounter
        } else if(previousFrame.strike) {
            nextCounter[index - 1] = 20 + nextCounter[index - 2]
            nextCounter[index] = 10 + nextCounter[index - 1]
            console.log('nextCounter = ', nextCounter)
            return nextCounter
        } else {
            nextCounter[index] = 10 + nextCounter[index - 1]
            console.log('nextCounter = ', nextCounter)
            return nextCounter
        }
    }
    // if currentRoll is Strike and third strike in a row ==> add bonus of 30 to first strike
    else if (!currentFrame.strike && previousFrame.strike && previousPreviousFrame === undefined) {
      nextCounter[index - 1] = 10 + currentFrame.rolls.reduce(addition) + calculateCumulatedHits(counter, index - 1)
      console.log('nextCounter = ', nextCounter)
      return nextCounter
    } else if (!currentFrame.strike && previousFrame.strike && !previousPreviousFrame.strike) {
      nextCounter[index - 1] = 10 + currentFrame.rolls.reduce(addition) + calculateCumulatedHits(counter, index - 1)
      console.log('nextCounter = ', nextCounter)
      return nextCounter
    } else if (currentFrame.strike && previousFrame.strike && previousPreviousFrame === undefined) {
      nextCounter[index - 2] = 30 + calculateCumulatedHits(counter, index - 2)
      console.log('nextCounter = ', nextCounter)
      return nextCounter
    } else if (currentFrame.strike && previousFrame.strike && previousPreviousFrame.strike) {
      nextCounter[index - 2] = 30 + calculateCumulatedHits(counter, index - 2)
      console.log('nextCounter = ', nextCounter)
      return nextCounter
    } else if (!currentFrame.strike && previousFrame.strike && previousPreviousFrame.strike) {
      nextCounter[index - 2] = 20 + calculateCumulatedHits(counter, index - 2)
      nextCounter[index - 1] = 20 + 10 + currentFrame.rolls.reduce(addition) + calculateCumulatedHits(counter, index - 2)
      console.log('nextCounter = ', nextCounter)
      return nextCounter
    }
  }

function checkPreviousSpare(counter, frames, index) {
    let nextCounter = [...counter]
    let currentFrame = frames[index]
    let previousFrame = frames[index - 1]
    let previousPreviousCounter = index - 2 < 0 ? 0 : counter[index-2]

    let isLastRoll = index === frames.length - 1
    // if currentRoll is Strike and third strike in a row ==> add bonus of 30 to first strike
    if (previousFrame.spare) {
      nextCounter[index - 1] = previousPreviousCounter + currentFrame.rolls[0] + 10
      if (isLastRoll && currentFrame.spare) {
        nextCounter[index] = 10 + nextCounter[index - 1]
      }
      return nextCounter
    } else if(isLastRoll && currentFrame.spare) {
        nextCounter[index] = 10 + nextCounter[index - 1]
        return nextCounter
    }
    
  }

  function countTotal(counter, frames, index) {
    let nextCounter = [...counter]
    let frame = frames[index - 1]
    let previousTotal = index > 1 ? counter[index - 2] : 0
    let reducedFrameHits = frame.rolls.reduce(addition)

    let total = previousTotal + reducedFrameHits
    console.log(total)

    if ((!frame.strike && !frame.spare)) {
      nextCounter = [...counter, total]
      return nextCounter
    } else {
      nextCounter = [...counter, '?']
      return nextCounter
    }
  }

  export {
      checkPreviousStrikes,
      checkPreviousSpare,
      countTotal
  }