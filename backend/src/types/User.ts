export interface User {
  id: string;
  email: string;
  username: string;
  paypal: string;
  password: string;
}

export interface UserNotFoundError {
  message: string;
}

export type CreateUser = Omit<User, "id">;
