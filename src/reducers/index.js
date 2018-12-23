import { combineReducers } from 'redux'
import AppReducer from './reducer_app'

const rootReducer = combineReducers({
  recipes: AppReducer,
})

export default rootReducer
