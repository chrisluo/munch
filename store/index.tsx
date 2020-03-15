export default interface RootState {
  auth: AuthState;
}

export interface AuthState {
  token: string;
  userId: string;
  didTryAutoLogin: boolean;
}
