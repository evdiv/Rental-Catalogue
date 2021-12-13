export const orderReducer = (state = { orderDetails: {}}, action) => {
    switch (action.type) {
        case "STAGE_ORDER_REQUEST":
            return { ...state, loading: true }
        case "STAGE_ORDER_SUCCESS":
            return { orderDetails: action.payload, loading: false }
        case "STAGE_ORDER_FAIL":
            return { ...state, loading: false, error: action.payload }


        case "COMPLETE_ORDER_REQUEST":
            return { ...state, loading: true }
        case "COMPLETE_ORDER_SUCCESS":
            return { orderDetails: action.payload, loading: false }
        case "COMPLETE_ORDER_FAIL":
            return { ...state, loading: false, error: action.payload }


        case "SET_INSURANCE_REQUEST":
            return { ...state, loading: true }
        case "SET_INSURANCE_SUCCESS":
            return { orderDetails: action.payload, loading: false }
        case "SET_INSURANCE_FAIL":
            return { ...state, loading: false, error: action.payload }

        
        case "GET_ORDER_DETAILS_REQUEST":
            return { ...state, loading: true }
        case "GET_ORDER_DETAILS_SUCCESS":
            return { orderDetails: action.payload, loading: false }
        case "GET_ORDER_DETAILS_FAIL":
            return { orderDetails: {}, loading: false, error: action.payload }

        case "RESET_ORDER_DETAILS":
            return { orderDetails: {}, loading: false }

        default:
            return state;
    }
}