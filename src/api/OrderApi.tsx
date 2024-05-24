import { Order } from "@/types/Order";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useCreateOrder = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createOrderRequest = async (
    userId: string | undefined,
    order: Order
  ): Promise<Order> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/order/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ userId, order }),
    });

    if (!response.ok) {
      throw new Error("Failed to create order");
    }

    return response.json();
  };

  const {
    mutate: createOrder,
    isPending: isLoading,
    isSuccess,
    data: myOrder,
    error,
  } = useMutation({
    mutationKey: ["createOrder"],
    mutationFn: (variables: { userId: string | undefined; order: Order }) =>
      createOrderRequest(variables.userId, variables.order),
  });

  if (isSuccess) {
    console.log(myOrder);
    toast.success("Order created successfully");
  }
  if (error) {
    console.error(error);
    toast.error("Unable to create order");
  }

  return { createOrder, isLoading, myOrder, error, isSuccess };
};

const useGetMyOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyOrdersRequest = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/order`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }

    return response.json();
  };

  const {
    data: myOrders,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["myOrders"],
    queryFn: getMyOrdersRequest,
    staleTime: 1000 * 100,
  });

  return { myOrders, error, isLoading };
};

export { useCreateOrder, useGetMyOrders };
