import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import blogReducer from "../reducers/blogReducer";

const reducers = combineReducers({
  blogs: blogReducer
})

const store = createStore (
  reducers, 
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store