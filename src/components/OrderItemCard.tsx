import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Order } from "@/types/Order";
import { Separator } from "./ui/separator";
import ChangeOrderStatus from "./ChangeOrderStatus";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

interface OrderItemCardProps {
  order: Order;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<Order[], Error>>;
}

const OrderItemCard = ({ order, refetch }: OrderItemCardProps) => {
  return (
    <Card
      className={` md:h-[400px] transition-all ${
        order.status === "inProgress"
          ? "bg-red-400 dark:bg-red-900 hover:bg-red-300 dark:hover:bg-red-800"
          : "bg-zinc-200 dark:bg-zinc-900 hover:bg-zinc-300 dark:hover:bg-zinc-800"
      } `}
    >
      <CardHeader>
        <CardTitle className="capitalize flex flex-col">
          <div className="justify-center flex flex-col items-center text-xl gap-3">
            #{order._id}
            <div className="flex justify-around w-full">
              <span className="capitalize">{order.userDetails.name}</span>
              <span>{order.userDetails.phone}</span>
            </div>
          </div>
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
          <Separator className="w-1/2 items-center justify-center flex mx-auto " />
          <ChangeOrderStatus
            orderId={order._id}
            orderStatus={order.status}
            refetch={refetch}
          />
        </>
      </CardContent>
    </Card>
  );
};

export default OrderItemCard;
