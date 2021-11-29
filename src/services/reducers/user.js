import {
    USER_REQUEST, USER_REGISTRATION_SUCCESS, USER_REGISTRATION_FAILED, USER_REQUEST_SUCCESS,
    USER_REQUEST_FAILED, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILED,
    RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILED, LOGOUT_REQUEST,
    LOGOUT_SUCCESS, LOGOUT_FAILED, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILED,
    TOKEN_REQUEST, TOKEN_SUCCESS, TOKEN_FAILED
} from '../actions/index';
const userInitialState = {
    name: "",
    email: "",
    userRequest: false,
    isLoggedIn: false,
    passwordRequest: false,
    isForgotPassword: false,
    resetPasswordRequest: false,
    isResetPassword: true,
    logoutRequest: false,
    logoutFailed: false,
    updateUserRequest: false,
    updateUserSuccess: false,
    tokenRequest: false,
    tokenSuccess: false
};
export const userReducer = (state = userInitialState, action) => {
    switch (action.type) {
        case USER_REQUEST: {
            return {
                ...state,
                userRequest: true
            }
        }
        case USER_REGISTRATION_SUCCESS: {
            return {
                ...state,
                userRequest: false,
                name: action.user.name,
                email: action.user.email,
                isLoggedIn: true
            }
        }
        case USER_REGISTRATION_FAILED: {
            return {
                ...state,
                userRequest: false,
                isLoggedIn: false,
                email: "",
                name: ""
            }
        }
        case USER_REQUEST_SUCCESS: {
            return {
                ...state,
                userRequest: false,
                name: action.user.name,
                email: action.user.email,
                isLoggedIn: true
            }
        }
        case USER_REQUEST_FAILED: {
            return {
                ...state,
                userRequest: false,
                isLoggedIn: false,
                email: "",
                name: ""
            }
        }
        case FORGOT_PASSWORD_REQUEST: {
            return {
                ...state,
                passwordRequest: true,
                isResetPassword: false
            }
        }
        case FORGOT_PASSWORD_SUCCESS: {
            return {
                ...state,
                passwordRequest: false,
                isForgotPassword: true
            }
        }
        case FORGOT_PASSWORD_FAILED: {
            return {
                ...state,
                passwordRequest: false
            }
        }
        case RESET_PASSWORD_REQUEST: {
            return {
                ...state,
                resetPasswordRequest: true
            }
        }
        case RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                resetPasswordRequest: false,
                isResetPassword: true,
                isForgotPassword: false
            }
        }
        case RESET_PASSWORD_FAILED: {
            return {
                ...state,
                resetPasswordRequest: false
            }
        }
        case LOGOUT_REQUEST: {
            return {
                ...state,
                logoutRequest: true,
                logoutFailed: false
            }
        }
        case LOGOUT_SUCCESS: {
            return {
                ...state,
                email: "",
                name: "",
                logoutRequest: false,
                logoutFailed: false,
                isLoggedIn: false
            }
        }
        case LOGOUT_FAILED: {
            return {
                ...state,
                logoutRequest: false,
                logoutFailed: true
            }
        }
        case UPDATE_USER_REQUEST: {
            return {
                ...state,
                updateUserRequest: true,
                updateUserSuccess: false
            }
        }
        case UPDATE_USER_SUCCESS: {
            return {
                ...state,
                updateUserRequest: false,
                updateUserSuccess: true,
                name: action.user.name,
                email: action.user.email
            }
        }
        case UPDATE_USER_FAILED: {
            return {
                ...state,
                updateUserRequest: false,
                updateUserSuccess: false
            }
        }
        case TOKEN_REQUEST: {
            return {
                ...state,
                tokenRequest: true,
                tokenSuccess: false
            }
        }
        case TOKEN_SUCCESS: {
            return {
                ...state,
                tokenRequest: false,
                tokenSuccess: true
            }
        }
        case TOKEN_FAILED: {
            return {
                ...state,
                tokenRequest: false,
                tokenSuccess: false
            }
        }
        default: {
            return state;
        }
    }
}