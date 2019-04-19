import { SET_FRAMES, ADD_POINTS } from './constants.js';

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

export {
    setFrames,
    addPoints
};