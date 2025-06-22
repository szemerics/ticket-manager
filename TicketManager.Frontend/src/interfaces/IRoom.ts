import { IScreening } from "./IScreening";

export interface IRoom {
  id: number,
  name: string,
  rowNumber: number,
  columnNumber: number,
  screenings: IScreening[]
}