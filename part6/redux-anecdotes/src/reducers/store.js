import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import anecdoteReducer from "./anecdoteReducer";
import {composeWithDevTools} from 'redux-devtools-extension'
import notificationReducer from "./notificationReducer";
import filterReducer from './filterReducer'
const reducers = combineReducers({
  anecdote: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer
})
const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store