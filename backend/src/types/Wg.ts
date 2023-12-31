export interface Wg {
  id: string;
  name: string;
  description: string;
  rules: string;
  userid: string;
}

export type CreateWg = Omit<Wg, "id">;
