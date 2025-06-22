export interface IScreening {
  id: number;
  movieId: number;
  screeningTime: string;
  screeningPrice: number;
  roomId: number;
  roomName: string,
  rowNumber: number,
  columnNumber: number,
  movie: {
    id: number;
    title: string;
    year: number;
    description: string;
    lengthInMinutes: number;
    minimumAge: number;
    posterUrl: string;
    categories: number[];
  };
  seats: {
    id: number;
    screeningId: number;
    row: number;
    column: number;
    isReserved: boolean;
  }[];
}
