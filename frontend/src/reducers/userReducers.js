export const userReducer = (state = {users: []}, action) => {
    switch (action.type) {
        case "GET_ALL_USERS_REQUEST":
            return { loading: true }
        case "GET_ALL_USERS_SUCCESS":
            return { users: action.payload, loading: false }
        case "GET_ALL_USERS_FAIL":
            return { loading: false, error: action.payload }

        case "GET_USER_REQUEST":
            return { loading: true }
        case "GET_USER_SUCCESS":
            return { users: action.payload, loading: false }
        case "GET_USER_FAIL":
            return { loading: false, error: action.payload }

        case "UPDATE_USER_REQUEST":
            return { loading: true }
        case "UPDATE_USER_SUCCESS":
            return { users: action.payload, loading: false }
        case "UPDATE_USER_FAIL":
            return { loading: false, error: action.payload }

        default:
            return state;
    }
}