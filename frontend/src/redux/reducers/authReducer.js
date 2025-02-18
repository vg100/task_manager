import { BaseReducer } from "./BaseReducer";

export const AuthActionTypes = {
    LOGIN_REQUEST: 'Login Request',
    LOGIN_REQUEST_SUCCESS: 'Login Request Success',
    USER_LOGOUT: 'User Logout',
    USER_UPDATE: 'User Update',
    LOGIN_REQUEST_FAILURE: "LOGIN_REQUEST_FAILURE"
};


export class AuthReducer extends BaseReducer {
    initialState = {
        user: null,
        loggedIn: false,
        loggingIn: false,
        loading: false,
    };

    [AuthActionTypes.LOGIN_REQUEST](state, action) {
        return { ...state, loggingIn: true, loading: true };
    }

    [AuthActionTypes.LOGIN_REQUEST_SUCCESS](state, action) {
        return {
            ...state,
            user: action.payload,
            loggingIn: false,
            loading: false,
            loggedIn: true,
        };
    }
    [AuthActionTypes.USER_UPDATE](state, action) {
        return {
            ...state,
            user: action.payload,
            loggingIn: false,
            loading: false,
            loggedIn: true,
        };
    }
    [AuthActionTypes.LOGIN_REQUEST_FAILURE](state, action) {
        return {
            ...state,
            loading: false,
            error: action.payload
        };
    }
    [AuthActionTypes.USER_LOGOUT](state, action) {
        return { ...this.initialState };
    }


}

