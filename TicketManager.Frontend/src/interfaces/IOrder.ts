export interface IOrder {
  id: number;
  purchaseDate: string;
  totalPrice: number;
  screeningId: number;
  email: string;
  phone: string;
  tickets: {
    price: number;
    type: number;
    seat: {
      id: number;
      row: number;
      column: number;
    }
  }[];
}