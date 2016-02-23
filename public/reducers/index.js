import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import TodosReducer from './reducer_todos';

const rootReducer = combineReducers({
  todos: TodosReducer,
  form: formReducer
});

export default rootReducer;
