export interface IOrder {
  id: number;
  purchaseDate: string;
  totalPrice: number;
  screening: {
    id: number,
    movie: {
      id: number,
      title: string;
    }
  }
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