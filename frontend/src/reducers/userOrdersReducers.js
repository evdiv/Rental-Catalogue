export const userOrdersReducer = (state = { orders: [], loading: false}, action) => {
    switch (action.type) {
        
        case "GET_USER_ORDERS_REQUEST":
            return { loading: true }

        case "GET_USER_ORDERS_SUCCESS":
            return { orders: action.payload, loading: false }

        case "GET_USER_ORDERS_FAIL":
            return { ...state, loading: false, error: action.payload }
            
        default:
            return state;
    }
}