export const userOrderReducer = (state = { orderDetails: {}, completed: false}, action) => {
    switch (action.type) {
        case "STAGE_USER_ORDER_REQUEST":
            return { ...state, loading: true }
        case "STAGE_USER_ORDER_SUCCESS":
            return { orderDetails: action.payload, loading: false }
        case "STAGE_USER_ORDER_FAIL":
            return { ...state, loading: false, error: action.payload }


        case "COMPLETE_USER_ORDER_REQUEST":
            return { ...state, loading: true }
        case "COMPLETE_USER_ORDER_SUCCESS":
            return { orderDetails: {}, completed: true, loading: false }
        case "COMPLETE_USER_ORDER_FAIL":
            return { ...state, loading: false, error: action.payload }


        case "SET_INSURANCE_REQUEST":
            return { ...state, loading: true }
        case "SET_INSURANCE_SUCCESS":
            return { orderDetails: action.payload, loading: false }
        case "SET_INSURANCE_FAIL":
            return { ...state, loading: false, error: action.payload }

        
        case "GET_USER_ORDER_DETAILS_REQUEST":
            return { ...state, loading: true }
        case "GET_USER_ORDER_DETAILS_SUCCESS":
            return { orderDetails: action.payload, loading: false }
        case "GET_USER_ORDER_DETAILS_FAIL":
            return { orderDetails: {}, loading: false, error: action.payload }

        case "RESET_USER_ORDER_DETAILS":
            return { orderDetails: {}, loading: false }
            

        default:
            return state;
    }
}