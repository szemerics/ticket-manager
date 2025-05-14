export interface IMovie {
  id: number;
  title: string;
  year: number;
  description: string;
  lengthInMinutes: number;
  minimumAge: number;
  categories: number[];
  screenings: {
    screeningTime: string;
  }[];
}