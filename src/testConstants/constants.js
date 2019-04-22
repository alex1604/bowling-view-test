const framesNoStrikesBefore = [{
    rolls: [3, 0],
    strike: false,
},
{
    rolls: [0, 1],
    strike: false,
},
{
    rolls: [3, 2],
    strike: false,
}]
const framesNoSparesBefore = [{
    rolls: [3, 0],
    spare: false,
},
{
    rolls: [0, 1],
    spare: false,
},
{
    rolls: [3, 2],
    spare: false,
}]
const framesCurrentStrikeTwoPreviousStrikes = [
    {
        rolls: [3, 0],
        strike: false,
        spare: false
    }, {
        rolls: [10, 0],
        strike: true,
        spare: false
    },
    {
        rolls: [10, 0],
        strike: true,
        spare: false
    },
    {
        rolls: [10, 0],
        strike: true,
        spare: false
    }]
const framesCurrentStrikeOnePreviousStrikes = [
    {
        rolls: [3, 0],
        strike: false,
        spare: false
    }, {
        rolls: [3, 0],
        strike: false,
        spare: false
    },
    {
        rolls: [10, 0],
        strike: true,
        spare: false
    },
    {
        rolls: [10, 0],
        strike: true,
        spare: false
    }]
const framesCurrentSpareOnePreviousSpare = [
    {
        rolls: [3, 0],
        spare: false
    }, {
        rolls: [3, 0],
        spare: false
    },
    {
        rolls: [10, 0],
        spare: true
    },
    {
        rolls: [10, 0],
        spare: true
    }]
const counterCurrentSpareOnePreviousSpare = [3, 6, '?']
const framesNotCurrentStrikeOnePreviousStrikes = [
    {
        rolls: [3, 0],
        spare: false
    }, {
        rolls: [3, 0],
        spare: false
    },
    {
        rolls: [10, 0],
        spare: true
    },
    {
        rolls: [5, 0],
        spare: false
    }
]
const counterNotCurrentStrikeOnePreviousStrikes = [3, 6, '?']
const framesNoCurrentStrikeTwoPreviousStrikes = [
    {
        rolls: [3, 0],
        strike: false,
        spare: false
    }, {
        rolls: [10, 0],
        strike: true,
        spare: false
    },
    {
        rolls: [10, 0],
        strike: true,
        spare: false
    },
    {
        rolls: [5, 0],
        strike: false,
        spare: false
    }]
const framesNoCurrentStrikeOnePreviousStrikes = [
    {
        rolls: [3, 0],
        strike: false,
        spare: false
    }, {
        rolls: [10, 0],
        strike: true,
        spare: false
    },
    {
        rolls: [5, 0],
        strike: false,
        spare: false
    }]

const framesFinalCheck = [
    {
        rolls: [3, 0]
    }, 
    {
        rolls: [3, 0]
    },
    {
        rolls: [3, 0]
    },
    {
        rolls: [3, 0]
    },
    {
        rolls: [3, 0]
    }, {
        rolls: [3, 0]
    },
    {
        rolls: [3, 0]
    },
    {
        rolls: [3, 0]
    },
    {
        rolls: [3, 0]
    }, 
    {
        rolls: [6, 4, 3]
    }
]
const framesTotalCount = [
    {
        rolls: [3, 0]
    }, {
        rolls: [10, 0]
    },
    {
        rolls: [10, 0]
    },
    {
        rolls: [10, 0]
    },
    {
        rolls: [0, 2]
    }
]
const counter = [30, 60, 90, 120, 126, 140, 10]
const counterCheckCumulatedCalc = [12, 18, 21]
const counterForStrikeCheck = [3, '?', '?']
const counterForTotalCountCheck = [3,23,43]
const counterCurrentStrikeOnePreviousStrikes = [3, 6, '?']
const counterNotCurrentStrikeOnePreviousStrike = [3, '?']
const counterFinalCheck = [3,6,9,12,15,18,21,24,27]

export {
    counter,
    counterCheckCumulatedCalc,
    counterForStrikeCheck,
    counterCurrentStrikeOnePreviousStrikes,
    counterNotCurrentStrikeOnePreviousStrike,
    framesCurrentStrikeOnePreviousStrikes,
    framesCurrentStrikeTwoPreviousStrikes,
    framesNoCurrentStrikeOnePreviousStrikes,
    framesNoCurrentStrikeTwoPreviousStrikes,
    framesNoStrikesBefore,
    framesNoSparesBefore,
    framesCurrentSpareOnePreviousSpare,
    counterCurrentSpareOnePreviousSpare,
    counterNotCurrentStrikeOnePreviousStrikes,
    framesNotCurrentStrikeOnePreviousStrikes,
    framesFinalCheck,
    counterFinalCheck,
    counterForTotalCountCheck,
    framesTotalCount
}