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


        default:
            return state;
    }
}