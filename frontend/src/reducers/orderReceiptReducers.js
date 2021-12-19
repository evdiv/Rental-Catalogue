export const orderReceiptReducer = (state = { orderReceipt: { orderDetails: {}, orderProducts: []}, loading: false}, action) => {
    switch (action.type) {
        
        case "GET_ORDER_RECEIPT_REQUEST":
            return { ...state, loading: true }

        case "GET_ORDER_RECEIPT_SUCCESS":
            return { orderReceipt: action.payload, loading: false }

        case "GET_ORDER_RECEIPT_FAIL":
            return { ...state, loading: false, error: action.payload }

        case "RESET_ORDER_RECEIPT":
            return state;
            
        default:
            return state;
    }
}