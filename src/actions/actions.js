import { SET_FRAMES, ADD_POINTS, UPDATE_COUNTER } from './constants.js';

let setFrames = (frames) => {
	return {
		type: SET_FRAMES,
		frames: frames
	}
}

let addPoints = () => {
    return {
        type: ADD_POINTS
    }
}

let updateCounter = (nextCounter) => {
    return {
        type: UPDATE_COUNTER,
        counter: nextCounter
    }
}

export {
    setFrames,
    addPoints,
    updateCounter
};