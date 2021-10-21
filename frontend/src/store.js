import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { featuredProductsReducer, onSaleProductsReducer, singleProductReducer, brandProductsReducer} from './reducers/productReducers'
import { allBrandsReducer, singleBrandReducer } from './reducers/brandReducers'
import { cartReducer } from './reducers/cartReducers'

const reducer = combineReducers({
    featuredProducts: featuredProductsReducer,
    onSaleProducts: onSaleProductsReducer,
    singleProduct: singleProductReducer,
    brandProducts: brandProductsReducer,
    allBrands: allBrandsReducer,
    singleBrand: singleBrandReducer,
    cart: cartReducer
})

const cartLocalStorage = localStorage.getItem('cartProducts')
    ? JSON.parse(localStorage.getItem('cartProducts'))
    : []

const initialState = {
    cart: { cartProducts: cartLocalStorage}
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store