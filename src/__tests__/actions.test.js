import { setFrames, addPoints, updateCounter } from '../actions/actions'

let frames = [{}, {},{}, {},{}, {},{}, {},{}, {}]

describe('we are testing frame list generation here:', () => {
    it('actions dispatches right amount of frames', () => {
        expect(setFrames(frames).frames.length).toBe(10)
    })
    it('the elements in the list are class instances', () => {
        expect(typeof setFrames(frames).frames[0]).toBe('object')
    })
})