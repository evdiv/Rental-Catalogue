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
import { orderReceiptReducer } from './reducers/orderReceiptReducers'
import { userOrderReducer } from './reducers/userOrderReducers'
import { userOrdersReducer } from './reducers/userOrdersReducers'
import { ordersReducer } from './reducers/ordersReducers'

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
    orders: ordersReducer,
    provinces: provinceReducer,
    userOrder: userOrderReducer,
    receipt: orderReceiptReducer,
    userOrders: userOrdersReducer
})

const cartLocalStorage = localStorage.getItem('cartProducts')
    ? JSON.parse(localStorage.getItem('cartProducts'))
    : []

const accountLocalStorage = localStorage.getItem('account')
    ? JSON.parse(localStorage.getItem('account'))
    : {}

const adminLocalStorage = localStorage.getItem('admin')
    ? JSON.parse(localStorage.getItem('admin'))
    : {}

const tokenLocalStorage = localStorage.getItem('token')
    ? JSON.parse(localStorage.getItem('token'))
    : ''

const userOrderLocalStorage = localStorage.getItem('userOrder')
    ? JSON.parse(localStorage.getItem('userOrder'))
    : ''

const initialState = {
    cart: { cartProducts: cartLocalStorage },
    account: { details: accountLocalStorage, token: tokenLocalStorage},
    admin: { details: adminLocalStorage, token: tokenLocalStorage },
    userOrder: { orderDetails: userOrderLocalStorage}
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store