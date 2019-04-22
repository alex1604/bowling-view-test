const addition = (a, b) => a + b

function calculateCumulatedHits(counter, frames, pos) {
  pos--
  let result = pos < 0 ? 0 : counter[pos]
  let frame = frames[pos]
  result = result === '?' ? frame.rolls.reduce(addition) + counter[pos - 1] : result
  return result
}

function checkPreviousStrikes(counter, frames, index) {
  let nextCounter = [...counter]
  let currentFrame = frames[index]
  let previousFrame = frames[index - 1]
  let previousPreviousFrame = frames[index - 2]

  let isLastRoll = index === 9

  if (isLastRoll) { // special case if next frame is last frame
    if (previousFrame.strike) {
      if (previousPreviousFrame.strike) {
        nextCounter[index - 2] = 30 + calculateCumulatedHits(counter, frames, index - 2)
        nextCounter[index - 1] = 30 + nextCounter[index - 2]
        return nextCounter
      } else {
        nextCounter[index - 1] = 20 + nextCounter[index - 2]
        return nextCounter
      }
    } else {
      return nextCounter
    }
  }
  if (!currentFrame.strike) {
    if (previousFrame.strike) {
      if (previousPreviousFrame === undefined || !previousPreviousFrame.strike) {
        nextCounter[index - 1] = 10 + currentFrame.rolls.reduce(addition) + calculateCumulatedHits(counter, frames, index - 1)
        return nextCounter
      } else {  // if frame before previous frame was also strike
        nextCounter[index - 2] = 20 + calculateCumulatedHits(counter, frames, index - 2)
        nextCounter[index - 1] = 20 + currentFrame.rolls.reduce(addition) + calculateCumulatedHits(counter, frames, index - 1)
        return nextCounter
      }
    }
  } else {
    if (previousFrame.strike) {
      if (previousPreviousFrame === undefined || previousPreviousFrame.strike) {
        nextCounter[index - 2] = 30 + calculateCumulatedHits(counter, frames, index - 2)
        return nextCounter
      }
    }
  }
  return nextCounter
}

function checkPreviousSpare(counter, frames, index) {
  let nextCounter = [...counter]
  let currentFrame = frames[index]
  let previousFrame = frames[index - 1]
  let previousPreviousCounter = index - 2 < 0 ? 0 : counter[index - 2]

  let isLastRoll = index === 9

  if (previousFrame.spare) {
    nextCounter[index - 1] = previousPreviousCounter + currentFrame.rolls[0] + 10
  }
  if (isLastRoll && currentFrame.spare) {
    nextCounter[index] = 10 + nextCounter[index - 1]
  }
  return nextCounter
}

function checkFinalFrame(counter, frames, index) {
  let nextCounter = [...counter]
  let previousTotal = nextCounter[8]
  let currentFrame = frames[9]

  nextCounter[index] = previousTotal + currentFrame.rolls.reduce(addition)
  return nextCounter
}

function countTotal(counter, frames, index) {
  let nextCounter = [...counter]
  let frame = frames[index - 1]
  let previousTotal = index > 1 ? counter[index - 2] : 0
  let reducedFrameHits = frame.rolls.reduce(addition)

  let total = previousTotal + reducedFrameHits

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
  countTotal,
  checkFinalFrame,
  calculateCumulatedHits
}