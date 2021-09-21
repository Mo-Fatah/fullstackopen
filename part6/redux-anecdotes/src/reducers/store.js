import { createStore, combineReducers } from "redux";
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
  composeWithDevTools()
)

export default store