export const cartReducer = (state = {cartProducts: []}, action) => {
    switch (action.type) {
        case "CART_ADD_PRODUCT":
            const {id, qty, days} = action.payload
            return {
                ...state,
                cartProducts: [...state.cartProducts, {id, qty, days}]
            }
    
        default:
            return state
    }
}