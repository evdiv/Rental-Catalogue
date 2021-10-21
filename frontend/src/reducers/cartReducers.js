export const cartReducer = (state = {cartProducts: []}, action) => {
    switch (action.type) {
        case "CART_ADD_PRODUCT":
            const product = action.payload

            const inCart = state.cartProducts.find(p => p.ProductsID === product.ProductsID)
            if (inCart){
                return {
                    ...state,
                    cartProducts: state.cartProducts.map(p => p.ProductsID === product.ProductsID 
                        ? p.qty += product.qty : p)
                } 
            } else {
                return {
                    ...state,
                    cartProducts: [...state.cartProducts, product]
                }
            }
    
        default:
            return state
    }
}