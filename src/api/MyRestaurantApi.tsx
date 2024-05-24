import { Order } from "@/types/Order";
import { Restaurant } from "@/types/Restaurant";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//testing
export const useAddMenuItemToRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const addMenuItemToRestaurantRequest = async (
    body: any
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant/menu`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error("Failed to add menu item to restaurant");
    }

    return response.json();
  };

  const {
    mutate: addMenuItemToRestaurant,
    isPending: isLoading,
    isSuccess,
    error,
  } = useMutation({
    mutationKey: ["addMenuItemToRestaurant"],
    mutationFn: addMenuItemToRestaurantRequest,
    onError: () => {
      toast.error("Unable to add menu item to restaurant");
    },
    onSuccess: () => {
      toast.success("Menu item added to restaurant");
    },
  });

  return { addMenuItemToRestaurant, isLoading };
};

export const useGetMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyRestaurantRequest = async (): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }
    return response.json();
  };

  const { data: restaurant, isLoading } = useQuery({
    queryKey: ["fetchMyRestaurant"],
    queryFn: getMyRestaurantRequest,
  });

  return { restaurant, isLoading };
};

export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    if (!response.ok) {
      throw new Error("Failed to create restaurant");
    }

    return response.json();
  };

  const {
    mutate: createRestaurant,
    isPending: isLoading,
    isSuccess,
    error,
  } = useMutation({
    mutationKey: ["createRestaurant"],
    mutationFn: createMyRestaurantRequest,
  });

  if (isSuccess) {
    toast.success("Restaurant created!");
  }

  if (error) {
    toast.error("Unable to update restaurant");
  }

  return { createRestaurant, isLoading };
};

export const useUpdateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    if (!response) {
      throw new Error("Failed to update restaurant");
    }

    return response.json();
  };

  const {
    mutate: updateRestaurant,
    isPending: isLoading,
    error,
    isSuccess,
  } = useMutation({
    mutationKey: ["updateRestaurant"],
    mutationFn: updateRestaurantRequest,
  });

  if (isSuccess) {
    toast.success("Restaurant Updated");
  }

  if (error) {
    toast.error("Unable to update restaurant");
  }

  return { updateRestaurant, isLoading };
};

export const useGetMyRestaurantOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyRestaurantOrdersRequest = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant/orders`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }

    return response.json();
  };

  const {
    data: orders,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["fetchMyRestaurantOrders"],
    queryFn: getMyRestaurantOrdersRequest,
  });

  return { orders, isLoading, refetch };
};

type UpdateOrderStatusRequest = {
  orderId: string;
  status: string;
};

export const useUpdateMyRestaurantOrder = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyRestaurantOrder = async (
    updateStatusOrderRequest: UpdateOrderStatusRequest
  ) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(
      `${API_BASE_URL}/api/my/restaurant/order/${updateStatusOrderRequest.orderId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: updateStatusOrderRequest.status }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update status");
    }

    return response.json();
  };

  const {
    mutateAsync: updateRestaurantStatus,
    isPending: isLoading,
    isError,
    isSuccess,
    reset,
  } = useMutation({
    mutationKey: ["updateOrderStatus"],
    mutationFn: updateMyRestaurantOrder,
  });

  if (isSuccess) {
    toast.success("Order updated");
  }

  if (isError) {
    toast.error("Unable to update order");
    reset();
  }

  return { updateRestaurantStatus, isLoading };
};
