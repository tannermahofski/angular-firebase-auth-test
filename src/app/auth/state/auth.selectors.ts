import { createSelector } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { AuthStatus } from './auth.state';

export const selectAuthState = (state: AppState) => state.authState;

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (authState) => authState.status === AuthStatus.authenticated
);

export const selectAuthUser = createSelector(
  selectAuthState,
  (authState) => authState.user
);
