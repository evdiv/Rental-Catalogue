export const accountReducer = (state = {account: {details: {}}}, action) => {
    switch (action.type) {
        case "ACCOUNT_REGISTER_REQUEST":
            return { account: {}, loading: true }
        case "ACCOUNT_REGISTER_SUCCESS":
            return { account: { details: action.payload }, loading: false }
        case "ACCOUNT_REGISTER_FAIL":
            return { account: {}, loading: false, error: action.payload }
        case "ACCOUNT_LOGIN_REQUEST":
            return {account: {}, loading: true}
        case "ACCOUNT_LOGIN_SUCCESS":
            return { account: { details: action.payload }, loading: false }
        case "ACCOUNT_LOGIN_FAIL":
            return { account: {}, loading: false, error: action.payload}

        default:
            return state;
    }
}