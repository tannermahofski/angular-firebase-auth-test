import { createReducer, on } from '@ngrx/store';
import { AuthStatus, initialState } from './auth.state';
import {
  login,
  loginFailure,
  loginSuccess,
  logout,
  logoutFailure,
  logoutSuccess,
  signUp,
  signUpFailure,
  signUpSuccess,
} from './auth.actions';

export const authReducer = createReducer(
  initialState,
  on(login, (state, { email, password }) => ({ ...state })),
  on(loginSuccess, (state, { user }) => ({
    ...state,
    user: user,
    error: null,
    status: AuthStatus.authenticated,
  })),
  on(loginFailure, (state, { error }) => ({ ...state, error: error })),
  on(logout, (state) => ({ ...state })),
  on(logoutSuccess, (state) => ({
    user: null,
    error: null,
    status: AuthStatus.unauthenticated,
  })),
  on(logoutFailure, (state) => ({ ...state })),
  on(signUp, (state, { email, password, username }) => ({ ...state })),
  on(signUpSuccess, (state, { user }) => ({
    ...state,
    user: user,
    error: null,
    status: AuthStatus.authenticated,
  })),
  on(signUpFailure, (state, { error }) => ({ ...state, error: error }))
);
