import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { featuredProductsReducer, singleProductReducer } from './reducers/productReducers'


const reducer = combineReducers({
    featuredProducts: featuredProductsReducer,
    singleProduct: singleProductReducer
})

const initialState = {}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store