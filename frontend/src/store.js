import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { featuredProductsReducer, onSaleProductsReducer, singleProductReducer, brandProductsReducer} from './reducers/productReducers'
import { allBrandsReducer, singleBrandReducer } from './reducers/brandReducers'
import { cartReducer } from './reducers/cartReducers'
import { accountReducer } from './reducers/accountReducers'

const reducer = combineReducers({
    featuredProducts: featuredProductsReducer,
    onSaleProducts: onSaleProductsReducer,
    singleProduct: singleProductReducer,
    brandProducts: brandProductsReducer,
    allBrands: allBrandsReducer,
    singleBrand: singleBrandReducer,
    cart: cartReducer,
    account: accountReducer
})

const cartLocalStorage = localStorage.getItem('cartProducts')
    ? JSON.parse(localStorage.getItem('cartProducts'))
    : []

const accountLocalStorage = localStorage.getItem('account')
    ? JSON.parse(localStorage.getItem('account'))
    : {}

const initialState = {
    cart: { cartProducts: cartLocalStorage },
    account: { details: accountLocalStorage }
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store