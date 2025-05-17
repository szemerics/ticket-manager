export interface IMovie {
  id: number;
  title: string;
  year: number;
  description: string;
  lengthInMinutes: number;
  minimumAge: number;
  posterUrl: string;
  categories: number[];
  screenings: {
    screeningTime: string;
  }[];
}