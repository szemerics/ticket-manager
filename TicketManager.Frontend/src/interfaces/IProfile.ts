export interface IProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  roles: {
    id: number;
    name: string;
  }
} 