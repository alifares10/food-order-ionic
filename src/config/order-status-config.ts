import { OrderStatus } from "@/types/Order";

type OrderStatusInfo = {
  label: string;
  value: OrderStatus;
  progressValue: number;
};

export const ORDER_STATUS: OrderStatusInfo[] = [
  { label: "In Progress", value: "inProgress", progressValue: 50 },
  { label: "Delivered", value: "delivered", progressValue: 100 },
];
