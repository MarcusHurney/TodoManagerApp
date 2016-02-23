import { FETCH_TODOS, FETCH_TODO } from '../actions/index';


const INITIAL_STATE = { all: [], todo: null};

export default function(state = INITIAL_STATE, action) {

	switch(action.type) {

		case FETCH_TODOS:
			return {...state, all: action.payload.data };

		case FETCH_TODO:
			return {...state, todo: action.payload.data};

		default:
			return state;
			
	}
}