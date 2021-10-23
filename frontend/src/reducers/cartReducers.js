export const cartReducer = (state = {cartProducts: []}, action) => {
    switch (action.type) {
        case "CART_ADD_PRODUCT":
            const {id, qty} = action.payload

            const inCart = state.cartProducts.find(p => p.id === id)
            if (inCart){
                return {
                    ...state,
                    cartProducts: state.cartProducts.map(p => {
                        if (p.id === id) { 
                            p.qty += qty
                        }
                        return p 
                    }) 
                } 
            } else {
                return {
                    ...state,
                    cartProducts: [...state.cartProducts, {id, qty}]
                }
            }
    
        default:
            return state
    }
}