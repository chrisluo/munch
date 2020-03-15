export default interface RootState {
  auth: {
    token: string;
    userId: string;
    didTryAutoLogin: boolean;
  };
}
