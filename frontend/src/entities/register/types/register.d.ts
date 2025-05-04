export interface Register {
  email: string;
  password: string;
  repeatPassword: string;
}

export interface RegisterResponse {
  accessToken: string;
}
