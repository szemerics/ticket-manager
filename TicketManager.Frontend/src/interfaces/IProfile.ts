export interface IProfile {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  roles: {
    id: number;
    name: string;
  }
} 