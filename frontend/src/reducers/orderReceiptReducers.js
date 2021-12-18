export const orderReceiptReducer = (state = { orderReceipt: {}}, action) => {
    switch (action.type) {
        
        case "GET_ORDER_RECEIPT_REQUEST":
            return { loading: true }

        case "GET_ORDER_RECEIPT_SUCCESS":
            return { orderReceipt: action.payload, loading: false }

        case "GET_ORDER_RECEIPT_FAIL":
            return { orderReceipt: {}, loading: false, error: action.payload }

        case "RESET_ORDER_RECEIPT":
            return { orderReceipt: {}, loading: false }
            
        default:
            return state;
    }
}