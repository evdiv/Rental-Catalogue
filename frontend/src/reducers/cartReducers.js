export const cartReducer = (state = {cartProducts: []}, action) => {
    switch (action.type) {
        case "CART_ADD_PRODUCT":
            const {product, qty, days} = action.payload
            return {
                ...state,
                cartProducts: [...state.cartProducts, {product, qty, days}]
            }

        case "CART_REMOVE_PRODUCT":
            const {products} = action.payload
            return {
                ...state,
                cartProducts: products
            }

        default:
            return state
    }
}