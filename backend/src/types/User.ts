export interface User {
  id: string;
  email: string;
  username: string;
  paypal: string;
  password: string;
  surname: string;
  name: string;
}

export interface UserNotFoundError {
  message: string;
}

export type CreateUser = Omit<User, "id">;
