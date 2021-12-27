export const ordersReducer = (state = { orders: [], loading: false}, action) => {
    switch (action.type) {
        
        case "GET_ALL_ORDERS_REQUEST":
            return { orders: [], loading: true }

        case "GET_ALL_ORDERS_SUCCESS":
            return { orders: action.payload, loading: false }

        case "GET_ALL_ORDERS_FAIL":
            return { ...state, loading: false, error: action.payload }
            

        case "GET_ORDER_REQUEST":
            return { orders: [], loading: true }

        case "GET_ALL_ORDERS_SUCCESS":
            return { orders: action.payload, loading: false }

        case "GET_ALL_ORDERS_FAIL":
            return { ...state, loading: false, error: action.payload }


        case "UPDATE_ORDER_REQUEST":
            return { loading: true }

        case "UPDATE_ORDER_SUCCESS":
            return { orders: action.payload, loading: false }

        case "UPDATE_ORDER_FAIL":
            return { ...state, loading: false, error: action.payload }

        default:
            return state;
    }
}