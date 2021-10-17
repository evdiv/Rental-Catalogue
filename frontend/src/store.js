import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { featuredProductsReducer, onSaleProductsReducer, singleProductReducer, brandProductsReducer} from './reducers/productReducers'
import { allBrandsReducer, singleBrandReducer } from './reducers/brandReducers'

const reducer = combineReducers({
    featuredProducts: featuredProductsReducer,
    onSaleProducts: onSaleProductsReducer,
    singleProduct: singleProductReducer,
    brandProducts: brandProductsReducer,
    allBrands: allBrandsReducer,
    singleBrand: singleBrandReducer
})

const initialState = {}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store