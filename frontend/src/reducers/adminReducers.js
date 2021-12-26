export const adminReducer = (state = {details: {}, token: ''}, action) => {
    switch (action.type) {
        case "ADMIN_GET_REQUEST":
            return { ...state, loading: true }
        case "ADMIN_GET_SUCCESS":
            return { ...state, details: action.payload, loading: false }
        case "ADMIN_GET_FAIL":
            return { details: {}, loading: false, error: action.payload }

            
        case "ADMIN_UPDATE_REQUEST":
            return { ...state, loading: true }
        case "ADMIN_UPDATE_SUCCESS":
            return { ...state, details: action.payload, loading: false }
        case "ADMIN_UPDATE_FAIL":
            return { ...state, loading: false, error: action.payload }


        case "ADMIN_LOGIN_REQUEST":
            return {...state, loading: true}
        case "ADMIN_LOGIN_SUCCESS":
            return { details: action.payload.admin, token: action.payload.token, loading: false }
        case "ADMIN_LOGIN_FAIL":
            return { ...state, loading: false, error: action.payload}


        case "ADMIN_LOGOUT":
            return { details: {}}
        default:
            return state;
    }
}