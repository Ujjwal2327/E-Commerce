import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { productReducer } from './reducers/product.reducer'

// while working with redux, we need 4 things - store, reducer, action, constants (optional)

const reducer = combineReducers({
  // reducers
  products: productReducer
})

const initialState = {}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
)

export default store