export const allBrandsReducer = (state = { brands: [] }, action) => {
    switch (action.type) {
        case "ALL_BRAND_REQUEST":
            return { brands: [], loading: true }
        case "ALL_BRAND_SUCCESS":
            return { brands: action.payload, loading: false }
        case "ALL_BRAND_FAIL":
            return { brands: [], error: action.payload, loading: false }
        default:
            return state
    }
}

export const singleBrandReducer = (state = {brand: {}}, action) => {
    switch (action.type) {
        case "SINGLE_BRAND_REQUEST":
            return {brand: {}, loading: true}
        case "SINGLE_BRAND_SUCCESS":
            return {brand: action.payload, loading: false}
        case "SINGLE_BRAND_FAIL":
            return { brand: {}, error: action.payload, loading: false}
        default:
            return state
    }
}