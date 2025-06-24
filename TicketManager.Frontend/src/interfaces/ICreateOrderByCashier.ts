export interface ICreateOrderByCashier {
  screeningId: number,
  tickets: {
    type: number,
    seatId: number
  }[]
}