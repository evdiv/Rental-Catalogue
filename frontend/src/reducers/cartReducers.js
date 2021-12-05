export const cartReducer = (state = { cartProducts: [], newProductAdded: false}, action) => {
    switch (action.type) {
        case "CART_ADD_PRODUCT":
            const product = action.payload
            return {
                ...state,
                newProductAdded: true,
                cartProducts: [...state.cartProducts, { ...product }]
            }

        case "CART_HIDE_CONFIRMATION":
            return {...state,
                newProductAdded: false
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