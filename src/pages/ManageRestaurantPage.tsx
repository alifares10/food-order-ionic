import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useGetMyRestaurantOrders,
  useUpdateMyRestaurant,
} from "@/api/MyRestaurantApi";
import OrderItemCard from "@/components/OrderItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";
import { Spinner } from "@nextui-org/react";
import { useMemo } from "react";

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: isCreateLoading } =
    useCreateMyRestaurant();
  const { restaurant, isLoading } = useGetMyRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateMyRestaurant();
  const { orders, refetch } = useGetMyRestaurantOrders();
  const isEditing = !!restaurant;
  const activeOrders = useMemo(() => {
    return orders?.filter((order) => {
      return order.status === "inProgress";
    });
  }, [orders]);
  const completedOrders = useMemo(() => {
    return orders?.filter((order) => {
      return order.status === "delivered";
    });
  }, [orders]);

  return (
    <Tabs defaultValue="orders">
      <TabsList>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
      </TabsList>
      {isLoading ? (
        <Spinner size="lg" className="flex items-center justify-center m-4" />
      ) : (
        <>
          <TabsContent value="orders" className="space-y-5 p-10 rounded-lg">
            <h2 className="text-2xl font-bold">
              {activeOrders?.length} Active Orders
            </h2>
            <div className="grid md:grid-cols-2 items-center justify-center gap-2">
              {activeOrders?.map((order) => (
                <OrderItemCard
                  key={order._id}
                  order={order}
                  refetch={refetch}
                />
              ))}
            </div>
            <h2 className="text-2xl font-bold">
              {completedOrders?.length} Completed Orders
            </h2>
            <div className="grid md:grid-cols-2 items-center justify-center gap-2">
              {completedOrders?.map((order) => (
                <OrderItemCard
                  key={order._id}
                  order={order}
                  refetch={refetch}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="manage-restaurant">
            <ManageRestaurantForm
              restaurant={restaurant}
              onSave={isEditing ? updateRestaurant : createRestaurant}
              isLoading={isCreateLoading || isUpdateLoading}
            />
          </TabsContent>
        </>
      )}
    </Tabs>
  );
};

export default ManageRestaurantPage;
