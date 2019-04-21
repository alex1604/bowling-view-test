import { setFrames, addPoints, updateCounter } from '../actions/actions'

const frames = [{},{},{},{},{},{},{},{},{},{}]
const counter = [30,60,90,120,126,140,10]

describe('we are testing frame list generation here:', () => {
    it('dispatches right action type', () => {
        expect(setFrames().type).toBe('SET_FRAMES')
    })
    it('returns an array of objects', () => {
        expect(typeof setFrames(frames).frames[0]).toBe('object')
        expect(typeof setFrames(frames).frames[9]).toBe('object')
    })
    it('dispatches right amount of frames', () => {
        expect(setFrames(frames).frames.length).toBe(10)
    })
})

describe('we are testing addPoints action here:', () => {
    it('dispatches right action type', () => {
        expect(addPoints().type).toBe('ADD_POINTS')
    })
})

describe('we are testing updateCounter action here:', () => {
    it('dispatches right action type', () => {
        expect(updateCounter(counter).type).toBe('UPDATE_COUNTER')
    })
    it('returns array with numbers', () => {
        expect(typeof updateCounter(counter).counter[0]).toBe('number')
        expect(typeof updateCounter(counter).counter[6]).toBe('number')
    })
    it('dispatches right amount of counter elements', () => {
        expect(updateCounter(counter).counter.length).toBe(7)
    })
})