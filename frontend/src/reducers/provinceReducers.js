export const provinceReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_PROVINCES_REQUEST':
            return []
        case 'GET_PROVINCES_SUCCESS':
            return action.payload
        case 'GET_PROVINCES_FAIL':
            return []
        default:
            return state
    }
}