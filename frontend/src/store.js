import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { featuredProductsReducer, onSaleProductsReducer, singleProductReducer, brandProductsReducer, departmentProductsReducer} from './reducers/productReducers'
import { allBrandsReducer, singleBrandReducer } from './reducers/brandReducers'
import { allDepartmentsReducer, singleDepartmentReducer } from './reducers/departmentReducers'
import { cartReducer } from './reducers/cartReducers'
import { accountReducer } from './reducers/accountReducers'
import { adminReducer } from './reducers/adminReducers'
import { provinceReducer } from './reducers/provinceReducers'
import { orderReducer } from './reducers/orderReducers'
import { orderReceiptReducer } from './reducers/orderReceiptReducers'
import { userOrdersReducer } from './reducers/userOrdersReducers'

const reducer = combineReducers({
    featuredProducts: featuredProductsReducer,
    onSaleProducts: onSaleProductsReducer,
    singleProduct: singleProductReducer,
    brandProducts: brandProductsReducer,
    allBrands: allBrandsReducer,
    singleBrand: singleBrandReducer,
    allDepartments: allDepartmentsReducer, 
    singleDepartment: singleDepartmentReducer,
    departmentProducts: departmentProductsReducer,
    cart: cartReducer,
    account: accountReducer,
    admin: adminReducer,
    provinces: provinceReducer,
    order: orderReducer,
    receipt: orderReceiptReducer,
    userOrders: userOrdersReducer
})

const cartLocalStorage = localStorage.getItem('cartProducts')
    ? JSON.parse(localStorage.getItem('cartProducts'))
    : []

const accountLocalStorage = localStorage.getItem('account')
    ? JSON.parse(localStorage.getItem('account'))
    : {}

const tokenLocalStorage = localStorage.getItem('token')
    ? JSON.parse(localStorage.getItem('token'))
    : ''

const orderLocalStorage = localStorage.getItem('order')
    ? JSON.parse(localStorage.getItem('order'))
    : ''

const initialState = {
    cart: { cartProducts: cartLocalStorage },
    account: { details: accountLocalStorage, token: tokenLocalStorage},
    order: { orderDetails: orderLocalStorage}
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store