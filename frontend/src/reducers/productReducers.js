export const featuredProductsReducer = (state ={products: []}, action) => {
    switch (action.type) {
        case 'FEATURED_PRODUCTS_REQUEST':
            return { products: [], loading: true}
        case 'FEATURED_PRODUCTS_SUCCESS':
            return { products: action.payload, loading: false}
        case 'FEATURED_PRODUCTS_FAIL':
            return { products: [], loading: false, error: action.payload}
        default:
            return state
    }
}

export const onSaleProductsReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case 'ONSALE_PRODUCTS_REQUEST':
            return { products: [], loading: true }
        case 'ONSALE_PRODUCTS_SUCCESS':
            return { products: action.payload, loading: false }
        case 'ONSALE_PRODUCTS_FAIL':
            return { products: [], loading: false, error: action.payload }
        default:
            return state
    }
}

export const singleProductReducer = (state ={product: {}}, action) => {
    switch(action.type) {
        case 'SINGLE_PRODUCT_REQUEST':
            return {product: {}, loading: true}
        case 'SINGLE_PRODUCT_SUCCESS':
            return {product: action.payload, loading: false}
        case 'SINGLE_PRODUCT_FAIL': 
            return {product: {}, error: action.payload, loading: false}
        default:
            return state
    }
}

export const brandProductsReducer = (state ={products: []}, action) => {
    switch(action.type) {
        case 'BRAND_PRODUCTS_REQUEST':
            return {products: [], loading: true}
        case 'BRAND_PRODUCTS_SUCCESS':
            return {products: action.payload, loading: false}
        case 'BRAND_PRODUCTS_FAIL':
            return {products: [], error: action.payload, loading: false}
        default:
            return state
    }
}

export const departmentProductsReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case 'DEPARTMENTS_PRODUCTS_REQUEST':
            return { products: [], loading: true }
        case 'DEPARTMENTS_PRODUCTS_SUCCESS':
            return { products: action.payload, loading: false }
        case 'DEPARTMENTS_PRODUCTS_FAIL':
            return { products: [], error: action.payload, loading: false }
        default:
            return state
    }
}