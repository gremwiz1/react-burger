import * as IngredientApi from '../../utils/IngredientApi';
import { AppDispatch, AppThunk } from '../../utils/types';
import { setTokens, signOut } from '../../utils/utils';
export const USER_REQUEST: 'USER_REQUEST' = 'USER_REQUEST';
export const USER_REGISTRATION_SUCCESS: 'USER_REGISTRATION_SUCCESS' = 'USER_REGISTRATION_SUCCESS';
export const USER_REGISTRATION_FAILED: 'USER_REGISTRATION_FAILED' = 'USER_REGISTRATION_FAILED';
export const USER_REQUEST_SUCCESS: 'USER_REQUEST_SUCCESS' = 'USER_REQUEST_SUCCESS';
export const USER_REQUEST_FAILED: 'USER_REQUEST_FAILED' = 'USER_REQUEST_FAILED';
export const FORGOT_PASSWORD_REQUEST: 'FORGOT_PASSWORD_REQUEST' = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS: 'FORGOT_PASSWORD_SUCCESS' = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED: 'FORGOT_PASSWORD_FAILED' = 'FORGOT_PASSWORD_FAILED';
export const RESET_PASSWORD_REQUEST: 'RESET_PASSWORD_REQUEST' = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS' = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED: 'RESET_PASSWORD_FAILED' = 'RESET_PASSWORD_FAILED';
export const LOGOUT_REQUEST: 'LOGOUT_REQUEST' = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS: 'LOGOUT_SUCCESS' = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED: 'LOGOUT_FAILED' = 'LOGOUT_FAILED';
export const UPDATE_USER_REQUEST: 'UPDATE_USER_REQUEST' = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS' = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED: 'UPDATE_USER_FAILED' = 'UPDATE_USER_FAILED';
export const TOKEN_REQUEST: 'TOKEN_REQUEST' = 'TOKEN_REQUEST';
export const TOKEN_SUCCESS: 'TOKEN_SUCCESS' = 'TOKEN_SUCCESS';
export const TOKEN_FAILED: 'TOKEN_FAILED' = 'TOKEN_FAILED';
interface IUserRequestAction {
    readonly type: typeof USER_REQUEST;
}
interface IUserRegistrationSuccessAction {
    readonly type: typeof USER_REGISTRATION_SUCCESS;
    readonly user: {
        name: string;
        email: string;
    }
}
interface IUserRegistrationFailedAction {
    readonly type: typeof USER_REGISTRATION_FAILED;
}
interface IUserRequestSuccessAction {
    readonly type: typeof USER_REQUEST_SUCCESS;
    readonly user: {
        name: string;
        email: string;
    }
}
interface IUserRequestFailedAction {
    readonly type: typeof USER_REQUEST_FAILED;
}
interface IForgotPasswordRequestAction {
    readonly type: typeof FORGOT_PASSWORD_REQUEST;
}
interface IForgotPasswordSuccessAction {
    readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}
interface IForgotPasswordFailedAction {
    readonly type: typeof FORGOT_PASSWORD_FAILED;
}
interface IResetPasswordRequestAction {
    readonly type: typeof RESET_PASSWORD_REQUEST;
}
interface IResetPasswordSuccessAction {
    readonly type: typeof RESET_PASSWORD_SUCCESS;
}
interface IResetPasswordFailedAction {
    readonly type: typeof RESET_PASSWORD_FAILED;
}
interface ILogoutRequestAction {
    readonly type: typeof LOGOUT_REQUEST;
}
interface ILogoutSuccessAction {
    readonly type: typeof LOGOUT_SUCCESS;
}
interface ILogoutFailedAction {
    readonly type: typeof LOGOUT_FAILED;
}
interface IUpdateUserRequestAction {
    readonly type: typeof UPDATE_USER_REQUEST;
}
interface IUpdateUserSuccessAction {
    readonly type: typeof UPDATE_USER_SUCCESS;
    readonly user: {
        name: string;
        email: string;
    }
}
interface IUpdateUserFailedAction {
    readonly type: typeof UPDATE_USER_FAILED;
}
interface ITokenRequestAction {
    readonly type: typeof TOKEN_REQUEST;
}
interface ITokenSuccessAction {
    readonly type: typeof TOKEN_SUCCESS;
}
interface ITokenFailedAction {
    readonly type: typeof TOKEN_FAILED;
}
export type TUserActions =
    | IUserRequestAction
    | IUserRegistrationSuccessAction
    | IUserRegistrationFailedAction
    | IUserRequestSuccessAction
    | IUserRequestFailedAction
    | IForgotPasswordRequestAction
    | IForgotPasswordSuccessAction
    | IForgotPasswordFailedAction
    | IResetPasswordRequestAction
    | IResetPasswordSuccessAction
    | IResetPasswordFailedAction
    | ILogoutRequestAction
    | ILogoutSuccessAction
    | ILogoutFailedAction
    | IUpdateUserRequestAction
    | IUpdateUserSuccessAction
    | IUpdateUserFailedAction
    | ITokenRequestAction
    | ITokenSuccessAction
    | ITokenFailedAction;
interface IRegistration {
    name: string,
    email: string,
    password: string
}
export const registration : AppThunk = (data: IRegistration) => {
    return function (dispatch) {
        dispatch({
            type: USER_REQUEST
        });
        IngredientApi.registrationUser(data)
            .then(res => {
                if (res && res.success) {
                    setTokens(res);
                    dispatch({
                        type: USER_REGISTRATION_SUCCESS,
                        user: res.user
                    })
                }
                else {
                    dispatch({
                        type: USER_REGISTRATION_FAILED
                    })
                }
            }).catch((err) => {
                dispatch({
                    type: USER_REGISTRATION_FAILED
                })
            })
    }
}
interface IAuthorization {
    email: string,
    password: string
}
export const authorization : AppThunk = (data: IAuthorization) => {
    return function (dispatch) {
        dispatch({
            type: USER_REQUEST
        });
        IngredientApi.autorizationUser(data)
            .then(res => {
                if (res && res.success) {
                    setTokens(res);
                    dispatch({
                        type: USER_REQUEST_SUCCESS,
                        user: res.user
                    });
                }
                else {
                    console.log('ssss')
                    dispatch({
                        type: USER_REQUEST_FAILED
                    })
                }
            }).catch((err) => {
                dispatch({
                    type: USER_REQUEST_FAILED
                })
            })
    }
}
interface IForgotPassword {
    email: string
}
export const forgotPassword : AppThunk = (email: IForgotPassword) => {
    return function (dispatch) {
        dispatch({
            type: FORGOT_PASSWORD_REQUEST
        });
        IngredientApi.forgotPasswordUser(email)
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: FORGOT_PASSWORD_SUCCESS
                    })
                }
                else {
                    dispatch({
                        type: FORGOT_PASSWORD_FAILED
                    })
                }
            }).catch((err) => {
                dispatch({
                    type: FORGOT_PASSWORD_FAILED
                })
            })
    }
}
interface IResetPassword {
    password: string,
    token: string
}
export const resetPassword : AppThunk = (data: IResetPassword) => {
    return function (dispatch) {
        dispatch({
            type: RESET_PASSWORD_REQUEST
        });
        IngredientApi.resetPasswordUser(data)
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: RESET_PASSWORD_SUCCESS
                    })
                }
                else {
                    dispatch({
                        type: RESET_PASSWORD_FAILED
                    })
                }
            }).catch((err) => {
                dispatch({
                    type: RESET_PASSWORD_FAILED
                })
            })
    }
}
export const logout : AppThunk = (callback: () => void) => {
    return function (dispatch) {
        dispatch({
            type: LOGOUT_REQUEST
        });
        IngredientApi.logoutUser()
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: LOGOUT_SUCCESS
                    });
                    signOut();
                    callback();
                }
                else {
                    dispatch({
                        type: LOGOUT_FAILED
                    });
                }
            }).catch((err) => {
                dispatch({
                    type: LOGOUT_FAILED
                })
            })
    }
}
export const getNewToken : AppThunk = () => {
    return function (dispatch) {
        dispatch({
            type: TOKEN_REQUEST
        });
        IngredientApi.refreshToken()
            .then((res) => {
                if (res && res.success) {
                    setTokens(res);
                    dispatch({
                        type: TOKEN_SUCCESS
                    });
                }
                else {
                    dispatch({
                        type: TOKEN_FAILED
                    })
                }
            }).catch((err) => {
                dispatch({
                    type: TOKEN_FAILED
                })
            })
    }
}
interface IChangeUserProfile {
    email: string,
    password: string,
    name: string
}
export const changeUserProfile : AppThunk = (data: IChangeUserProfile) => {
    return function (dispatch) {
        dispatch({
            type: UPDATE_USER_REQUEST
        });
        console.log(data)
        IngredientApi.updateUser(data)
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: UPDATE_USER_SUCCESS,
                        user: res.user
                    })
                }
                else {
                    dispatch({
                        type: UPDATE_USER_FAILED
                    })
                }
            }).catch((err) => {
                if (err.message === 'jwt expired' || err.message === 'Token is invalid') {
                    dispatch(getNewToken());
                    dispatch(changeUserProfile(data));
                }
                else {
                    dispatch({
                        type: UPDATE_USER_FAILED
                    })
                }
            })
    }
}
export const getUser : AppThunk = () => {
    return function (dispatch) {
        dispatch({
            type: USER_REQUEST
        });
        IngredientApi.getUser()
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: USER_REQUEST_SUCCESS,
                        user: res.user
                    })
                }
                else {
                    dispatch({
                        type: USER_REQUEST_FAILED
                    })
                }
            }).catch((err) => {
                if (err.message === 'jwt expired' || err.message === 'Token is invalid') {
                    dispatch(getNewToken());
                    dispatch(getUser());
                }
                else {
                    dispatch({
                        type: USER_REQUEST_FAILED
                    })
                }
            })
    }
}