import { combineReducers } from 'redux';
import { SET_FRAMES, ADD_POINTS, UPDATE_COUNTER } from '../actions/constants.js';

let framesReducer = (state=[], action) => {
	switch (action.type) {
		case SET_FRAMES:
            return action.frames;
        case ADD_POINTS:
			return state
		default:
			return state;
	}
}
let counterReducer = (state=[], action) => {
	switch (action.type) {
		case UPDATE_COUNTER:
			return action.counter
		default:
			return state
	}
}
let rootReducer = combineReducers({
	frames: framesReducer,
	counter: counterReducer
});

export default rootReducer;