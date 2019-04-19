import { combineReducers } from 'redux';
import { SET_FRAMES, ADD_POINTS } from '../actions/constants.js';

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
let rootReducer = combineReducers({
	frames: framesReducer
});

export default rootReducer;