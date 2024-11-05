import { createAction, props } from '@ngrx/store';
import { CustomUser } from '../models/user';

// Login Actions
export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: CustomUser }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any }>()
);

// Logout Actions
export const logout = createAction('[Auth] Logout');

export const logoutSuccess = createAction('[Auth] Logout Success');

export const logoutFailure = createAction(
  '[Auth] Logout Failure',
  props<{ error: any }>()
);

// Sign Up Actions
export const signUp = createAction(
  '[Auth] Sign Up',
  props<{
    email: string;
    password: string;
    username: string | null;
  }>()
);

export const signUpSuccess = createAction(
  '[Auth] Sign Up Success',
  props<{ user: CustomUser }>()
);

export const signUpFailure = createAction(
  '[Auth] Sign Up Failure',
  props<{ error: any }>()
);
