import React, { useMemo } from "react";
import { useGetMyOrders } from "@/api/OrderApi";
import { Button, Spinner } from "@nextui-org/react";
import { Order } from "@/types/Order";
import OrderStatusCard from "@/components/OrderStatusCard";
import { Dot } from "lucide-react";

const OrderStatus = () => {
  const { myOrders, isLoading, error } = useGetMyOrders();
  const inProgressOrders = useMemo(() => {
    return myOrders?.filter((order) => {
      return order.status === "inProgress";
    });
  }, [myOrders]);
  const deleveredOrders = useMemo(() => {
    return myOrders?.filter((order) => order.status === "delivered");
  }, [myOrders]);

  return (
    <div className="flex flex-col w-full gap-5 md:flex-row justify-center">
      {isLoading ? (
        <Spinner className="flex justify-center mx-auto my-3" />
      ) : (
        <div className="flex flex-col w-full">
          {myOrders?.length === 0 ? (
            <h1 className="capitalize flex justify-center items-center  text-lg mx-auto ">
              You Dont Have any Orders
            </h1>
          ) : (
            <div className="flex flex-col gap-3 md:flex-row ">
              <div
                id="inProgress"
                className="flex flex-col md:items-start md:justify-start gap-2 "
              >
                <h1 className="capitalize flex justify-center items-center text-lg mx-auto ">
                  In Progress <Dot className="animate-ping" />
                </h1>

                {inProgressOrders?.map((order: Order) => (
                  <OrderStatusCard key={order._id} order={order} />
                ))}
              </div>
              <div
                id="delivered"
                className="flex flex-col md:items-start ms:justify-start gap-2 "
              >
                <h1 className="capitalize flex justify-center items-center  text-lg mx-auto ">
                  Delivered
                </h1>
                {deleveredOrders?.map((order: Order) => (
                  <OrderStatusCard key={order._id} order={order} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderStatus;
