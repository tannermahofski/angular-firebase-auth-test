import { authReducer } from '../auth/state/auth.reducer';
import { AuthState } from '../auth/state/auth.state';

export interface AppState {
  authState: AuthState;
}

export const appStateReducerMap = {
  authState: authReducer,
};
