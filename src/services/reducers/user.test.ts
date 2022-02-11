import {
  USER_REQUEST, USER_REGISTRATION_SUCCESS, USER_REGISTRATION_FAILED, USER_REQUEST_SUCCESS,
  USER_REQUEST_FAILED, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILED, LOGOUT_REQUEST,
  LOGOUT_SUCCESS, LOGOUT_FAILED, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILED,
  TOKEN_REQUEST, TOKEN_SUCCESS, TOKEN_FAILED, TUserActions
} from '../actions/index';
import { userReducer } from './user';

type TUserInitialState = {
  name: string,
  email: string,
  userRequest: boolean,
  isLoggedIn: boolean,
  passwordRequest: boolean,
  isForgotPassword: boolean,
  resetPasswordRequest: boolean,
  isResetPassword: boolean,
  logoutRequest: boolean,
  logoutFailed: boolean,
  updateUserRequest: boolean,
  updateUserSuccess: boolean,
  tokenRequest: boolean,
  tokenSuccess: boolean
}
const userInitialState: TUserInitialState = {
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
const testUser = {
  name: "testName",
  email: "testEmail"
}
describe('userReducer', () => {
  it('should return the initial state', () => {
    expect(userReducer(undefined, {} as TUserActions)).toEqual(userInitialState);
  });
  it('should handle USER_REQUEST', () => {
    expect(
      userReducer(userInitialState, {
        type: USER_REQUEST
      })
    ).toEqual(
      expect.objectContaining({
        ...userInitialState,
        userRequest: true
      })
    );
  });
  it('should handle USER_REGISTRATION_SUCCESS', () => {
    expect(
      userReducer(userInitialState, {
        type: USER_REGISTRATION_SUCCESS, user: testUser
      })
    ).toEqual(
      expect.objectContaining({
        ...userInitialState,
        userRequest: false,
        name: "testName",
        email: "testEmail",
        isLoggedIn: true
      })
    );
  });
  it('should handle USER_REGISTRATION_FAILED', () => {
    expect(
      userReducer(userInitialState, {
        type: USER_REGISTRATION_FAILED
      })
    ).toEqual(
      expect.objectContaining({
        ...userInitialState,
        userRequest: false,
        isLoggedIn: false,
        email: "",
        name: ""
      })
    );
  });
  it('should handle USER_REQUEST_SUCCESS', () => {
    expect(
      userReducer(userInitialState, {
        type: USER_REQUEST_SUCCESS, user: testUser
      })
    ).toEqual(
      expect.objectContaining({
        ...userInitialState,
        userRequest: false,
        name: "testName",
        email: "testEmail",
        isLoggedIn: true
      })
    );
  });
  it('should handle USER_REQUEST_FAILED', () => {
    expect(
      userReducer(userInitialState, {
        type: USER_REQUEST_FAILED
      })
    ).toEqual(
      expect.objectContaining({
        ...userInitialState,
        userRequest: false,
        isLoggedIn: false,
        email: "",
        name: ""
      })
    );
  });
  it('should handle FORGOT_PASSWORD_REQUEST', () => {
    expect(
      userReducer(userInitialState, {
        type: FORGOT_PASSWORD_REQUEST
      })
    ).toEqual(
      expect.objectContaining({
        ...userInitialState,
        passwordRequest: true,
        isResetPassword: false
      })
    );
  });
  it('should handle FORGOT_PASSWORD_SUCCESS', () => {
    expect(
      userReducer(userInitialState, {
        type: FORGOT_PASSWORD_SUCCESS
      })
    ).toEqual(
      expect.objectContaining({
        ...userInitialState,
        passwordRequest: false,
        isForgotPassword: true
      })
    );
  });
  it('should handle FORGOT_PASSWORD_FAILED', () => {
    expect(
      userReducer(userInitialState, {
        type: FORGOT_PASSWORD_FAILED
      })
    ).toEqual(
      expect.objectContaining({
        ...userInitialState,
        passwordRequest: false
      })
    );
  });
  it('should handle RESET_PASSWORD_REQUEST', () => {
    expect(
      userReducer(userInitialState, {
        type: RESET_PASSWORD_REQUEST
      })
    ).toEqual(
      expect.objectContaining({
        ...userInitialState,
        resetPasswordRequest: true
      })
    );
  });
  it('should handle RESET_PASSWORD_SUCCESS', () => {
    expect(
      userReducer(userInitialState, {
        type: RESET_PASSWORD_SUCCESS
      })
    ).toEqual(
      expect.objectContaining({
        ...userInitialState,
        resetPasswordRequest: false,
        isResetPassword: true,
        isForgotPassword: false
      })
    );
  });
  it('should handle RESET_PASSWORD_FAILED', () => {
    expect(
      userReducer(userInitialState, {
        type: RESET_PASSWORD_FAILED
      })
    ).toEqual(
      expect.objectContaining({
        ...userInitialState,
        resetPasswordRequest: false
      })
    );
  });
  it('should handle LOGOUT_REQUEST', () => {
    expect(
      userReducer(userInitialState, {
        type: LOGOUT_REQUEST
      })
    ).toEqual(
      expect.objectContaining({
        ...userInitialState,
        logoutRequest: true,
        logoutFailed: false
      })
    );
  });
  it('should handle LOGOUT_SUCCESS', () => {
    expect(
      userReducer(userInitialState, {
        type: LOGOUT_SUCCESS
      })
    ).toEqual(
      expect.objectContaining({
        ...userInitialState,
        email: "",
        name: "",
        logoutRequest: false,
        logoutFailed: false,
        isLoggedIn: false
      })
    );
  });
  it('should handle LOGOUT_FAILED', () => {
    expect(
      userReducer(userInitialState, {
        type: LOGOUT_FAILED
      })
    ).toEqual(
      expect.objectContaining({
        ...userInitialState,
        logoutRequest: false,
        logoutFailed: true
      })
    );
  });
  it('should handle UPDATE_USER_REQUEST', () => {
    expect(
      userReducer(userInitialState, {
        type: UPDATE_USER_REQUEST
      })
    ).toEqual(
      expect.objectContaining({
        ...userInitialState,
        updateUserRequest: true,
        updateUserSuccess: false
      })
    );
  });
  it('should handle UPDATE_USER_SUCCESS', () => {
    expect(
      userReducer(userInitialState, {
        type: UPDATE_USER_SUCCESS, user: testUser
      })
    ).toEqual(
      expect.objectContaining({
        ...userInitialState,
        updateUserRequest: false,
        updateUserSuccess: true,
        name: "testName",
        email: "testEmail"
      })
    );
  });
  it('should handle UPDATE_USER_FAILED', () => {
    expect(
      userReducer(userInitialState, {
        type: UPDATE_USER_FAILED
      })
    ).toEqual(
      expect.objectContaining({
        ...userInitialState,
        updateUserRequest: false,
        updateUserSuccess: false
      })
    );
  });
  it('should handle TOKEN_REQUEST', () => {
    expect(
      userReducer(userInitialState, {
        type: TOKEN_REQUEST
      })
    ).toEqual(
      expect.objectContaining({
        ...userInitialState,
        tokenRequest: true,
        tokenSuccess: false
      })
    );
  });
  it('should handle TOKEN_SUCCESS', () => {
    expect(
      userReducer(userInitialState, {
        type: TOKEN_SUCCESS
      })
    ).toEqual(
      expect.objectContaining({
        ...userInitialState,
        tokenRequest: false,
        tokenSuccess: true
      })
    );
  });
  it('should handle TOKEN_FAILED', () => {
    expect(
      userReducer(userInitialState, {
        type: TOKEN_FAILED
      })
    ).toEqual(
      expect.objectContaining({
        ...userInitialState,
        tokenRequest: false,
        tokenSuccess: false
      })
    );
  });
});