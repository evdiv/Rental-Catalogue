export const accountReducer = (state = {details: {}}, action) => {
    switch (action.type) {
        case "ACCOUNT_REGISTER_REQUEST":
            return { details: {}, loading: true }
        case "ACCOUNT_REGISTER_SUCCESS":
            return { details: action.payload, loading: false }
        case "ACCOUNT_REGISTER_FAIL":
            return { details: {}, loading: false, error: action.payload }
        case "ACCOUNT_LOGIN_REQUEST":
            return {details: {}, loading: true}
        case "ACCOUNT_LOGIN_SUCCESS":
            return { details: action.payload, loading: false }
        case "ACCOUNT_LOGIN_FAIL":
            return { details: {}, loading: false, error: action.payload}

        default:
            return state;
    }
}