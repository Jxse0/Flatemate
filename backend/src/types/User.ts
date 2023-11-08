export interface User {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  paypal: string;
}

export type CreateUser = Omit<User, "id">;
