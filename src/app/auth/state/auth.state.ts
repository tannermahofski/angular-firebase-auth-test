import { CustomUser } from '../models/user';

export enum AuthStatus {
  authenticated,
  unauthenticated,
  loading,
}

export interface AuthState {
  user: CustomUser | null;
  error: string | null;
  status: AuthStatus;
}

export const initialState: AuthState = {
  user: null,
  error: null,
  status: AuthStatus.loading,
};
