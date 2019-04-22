import { checkPreviousStrikes, checkPreviousSpare, countTotal, checkFinalFrame, calculateCumulatedHits } from '../utils/calculator'
import {
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
} from '../testConstants/constants'

describe('test cumulated hits:', () => {
    it('calculates the right cumulated amount of hits', () => {
        let cumulated = calculateCumulatedHits(counterCheckCumulatedCalc, framesNoStrikesBefore, 3)
        expect(cumulated).toBe(21)
    })
})

describe('test checkPreviousStrikes :', () => {
    it('returns original counter if no strikes', () => {
        let nextCounter = checkPreviousStrikes(counter, framesNoStrikesBefore, 2)
        expect(nextCounter).toEqual(counter)
    })
    it('returns right counter if current strike and two previous strikes:', () => {
        let nextCounter = checkPreviousStrikes(counterForStrikeCheck, framesCurrentStrikeTwoPreviousStrikes, 3)
        expect(nextCounter).toEqual([3, 33, '?'])
    })
    it('returns right counter if current strike and one previous strikes:', () => {
        let nextCounter = checkPreviousStrikes(counterCurrentStrikeOnePreviousStrikes, framesCurrentStrikeOnePreviousStrikes, 3)
        expect(nextCounter).toEqual([3, 6, '?'])
    })
    it('returns right counter if not current strike but two previous strikes:', () => {
        let nextCounter = checkPreviousStrikes(counterForStrikeCheck, framesNoCurrentStrikeTwoPreviousStrikes, 3)
        expect(nextCounter).toEqual([3, 23, 38])
    })
    it('returns right counter if not current strike but one previous strikes:', () => {
        let nextCounter = checkPreviousStrikes(counterNotCurrentStrikeOnePreviousStrike, framesNoCurrentStrikeOnePreviousStrikes, 2)
        expect(nextCounter).toEqual([3, 18])
    })
})

describe('test checkPreviousSpares :', () => {
    it('returns original counter if no spares', () => {
        let nextCounter = checkPreviousSpare(counter, framesNoSparesBefore, 2)
        expect(nextCounter).toEqual(counter)
    })
    it('returns right counter if current spare and previous spare:', () => {
        let nextCounter = checkPreviousSpare(counterCurrentSpareOnePreviousSpare, framesCurrentSpareOnePreviousSpare, 3)
        expect(nextCounter).toEqual([3, 6, 26])
    })
    it('returns right counter if not current spare and one previous spare:', () => {
        let nextCounter = checkPreviousSpare(counterNotCurrentStrikeOnePreviousStrikes, framesNotCurrentStrikeOnePreviousStrikes, 3)
        expect(nextCounter).toEqual([3, 6, 21])
    })
})

describe('test checkFinalCheck :', () => {
    it('returns right final result with 3 rolls on last frame:', () => {
        let nextCounter = checkFinalFrame(counterFinalCheck, framesFinalCheck, 9)
        expect(nextCounter).toEqual([3,6,9,12,15,18,21,24,27,40])
    })
})

describe('test countTotal :', () => {
    it('returns right updated counter after complete frame:',() => {
        let nextCounter = countTotal(counterForTotalCountCheck, framesTotalCount, 4)
        expect(nextCounter).toEqual([3,23,43,53])
    })
})