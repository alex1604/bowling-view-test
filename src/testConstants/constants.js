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
const counter = [30, 60, 90, 120, 126, 140, 10]
const counterCheckCumulatedCalc = [12, 18, 21]
const counterForStrikeCheck = [3, '?', '?']
const counterCurrentStrikeOnePreviousStrikes = [3, 6, '?']
const counterNotCurrentStrikeOnePreviousStrike = [3, '?']

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
    framesNoStrikesBefore
}