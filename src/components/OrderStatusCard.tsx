import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Order } from "@/types/Order";
import { Separator } from "./ui/separator";
import { Progress } from "@nextui-org/react";

interface OrderStatusCardProps {
  order: Order;
}

const OrderStatusCard = ({ order }: OrderStatusCardProps) => {
  return (
    <>
      <Card
        className={` md:w-[600px] max-h-[400px] transition-all ${
          order.status === "inProgress"
            ? "bg-red-400 dark:bg-red-900 hover:bg-red-300 dark:hover:bg-red-800"
            : "bg-zinc-200 dark:bg-zinc-900 hover:bg-zinc-300 dark:hover:bg-zinc-800"
        } `}
      >
        <CardHeader>
          <CardTitle className="capitalize flex flex-col">
            <p className="justify-center flex flex-col items-center text-xl gap-2">
              #{order._id}
              <Progress
                value={order.status === "inProgress" ? 50 : 100}
                className="w-1/2 mx-auto"
              />
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-1 m-2">
          <>
            <Separator className="w-1/2 items-center justify-center flex mx-auto " />
            {order.cartItems.map((item) => (
              <div key={item.menuItemId} className="flex justify-between mb-1">
                <li className="capitalize">{item.name}</li>
                <p>{item.quantity}</p>
              </div>
            ))}
            <Separator className="w-1/2 items-center justify-center flex mx-auto " />
            <div className="flex justify-between mt-1">
              <p>Total</p>
              <p>₪{order.totalAmount}</p>
            </div>
            <Separator className="w-1/2 items-center justify-center flex mx-auto " />
            <div className="flex justify-between mt-1">
              <p>Ordered At</p>
              <p>{new Date(order.createdAt).toLocaleDateString()}</p>
              <p>{new Date(order.createdAt).toLocaleTimeString()}</p>
            </div>
          </>
        </CardContent>
      </Card>
    </>
  );
};

export default OrderStatusCard;
