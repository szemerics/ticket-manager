export interface ICreateMovie {
  posterUrl: string;
  title: string;
  year: number;
  description: string;
  lengthInMinutes: number;
  minimumAge: number;
  categories: number[];
}