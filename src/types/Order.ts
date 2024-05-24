import { User } from "./User";

export type OrderStatus =
  | "placed"
  | "paid"
  | "inProgress"
  | "outForDelivery"
  | "delivered";

export type Order = {
  _id?: string;
  user?: string;
  resturant?: string;
  userDetails: {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
  };
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
};
