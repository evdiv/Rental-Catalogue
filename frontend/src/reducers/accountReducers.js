export const accountReducer = (state = {details: {}, token: ''}, action) => {
    switch (action.type) {
        case "ACCOUNT_REGISTER_REQUEST":
            return { ...state, loading: true }
        case "ACCOUNT_REGISTER_SUCCESS":
            return { details: action.payload.user, token: action.payload.token, loading: false }
        case "ACCOUNT_REGISTER_FAIL":
            return { ...state, loading: false, error: action.payload }

            
        case "ACCOUNT_GET_REQUEST":
            return { ...state, loading: true }
        case "ACCOUNT_GET_SUCCESS":
            return { ...state, details: action.payload, loading: false }
        case "ACCOUNT_GET_FAIL":
            return { details: {}, loading: false, error: action.payload }


        case "ACCOUNT_UPDATE_REQUEST":
            return { ...state, loading: true }
        case "ACCOUNT_UPDATE_SUCCESS":
            return { ...state, details: action.payload, loading: false }
        case "ACCOUNT_UPDATE_FAIL":
            return { ...state, loading: false, error: action.payload }


        case "ACCOUNT_LOGIN_REQUEST":
            return {...state, loading: true}
        case "ACCOUNT_LOGIN_SUCCESS":
            return { details: action.payload.user, token: action.payload.token, loading: false }
        case "ACCOUNT_LOGIN_FAIL":
            return { ...state, loading: false, error: action.payload}


        case "ACCOUNT_LOGOUT":
            return { details: {}}
        default:
            return state;
    }
}