export interface Wg {
  id: string;
  name: string;
  description: string;
  rules: string;
}

export interface WgMember {
  id: string;
  wgid: string;
  userid: string;
  aktive: string;
  role: string;
}

export type CreateWg = Omit<Wg, "id">;
