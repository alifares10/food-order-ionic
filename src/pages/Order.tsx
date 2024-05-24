import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import OrderCard from "@/components/OrderCard";
import { MenuItem } from "@/types/Restaurant";
import OrderSummary from "@/components/OrderSummary";
import { type Order } from "@/types/Order";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useCreateOrder } from "@/api/OrderApi";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const cart = useAppSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const [myOrder, setMyOrder] = useState<Order>({} as Order);
  const [phone, setPhone] = useState<string>("");
  const { user, loginWithRedirect, isAuthenticated } = useAuth0();
  const {
    createOrder,
    error,
    isLoading,
    isSuccess,
    myOrder: order,
  } = useCreateOrder();
  const dispatch = useDispatch();
  const removeAll = () => {
    dispatch({ type: "cart/resetCart" });
  };

  const removeItem = (item: MenuItem) => {
    dispatch({ type: "cart/removeItem", payload: item });
  };

  const changeQuantity = (id: string, quantity: number) => {
    dispatch({ type: "cart/editItemQuantity", payload: { id, quantity } });
  };

  const CreateOrder = async (myPhone: string) => {
    if (!isAuthenticated) {
      toast("Please login to place the order", {
        action: {
          label: "login",
          onClick: async () => await loginWithRedirect(),
        },
      });
      return;
    }
    if (!user) {
      return;
    }

    const order: Order = {
      totalAmount: cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      ),
      cartItems: cart.map((item) => ({
        menuItemId: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      status: "inProgress",
      createdAt: new Date().toISOString(),
      userDetails: {
        name: user.name,
        email: user.email,
        phone: myPhone,
        address: user.address || "",
      },
    };
    createOrder({ userId: user.sub, order });
  };

  useEffect(() => {
    if (isSuccess) {
      removeAll();
      setPhone("");
      navigate("/order-status");
    }
  }, [isSuccess]);

  return (
    <div className="flex flex-col w-full gap-5 md:flex-row">
      <div className="md:w-2/3  flex flex-col  rounded-md">
        {cart.length === 0 ? (
          <h1 className="capitalize flex justify-center items-center p-3 text-lg">
            You Dont Have any Items in your Order
          </h1>
        ) : (
          <div className="justify-start items-start flex flex-col gap-2">
            {cart.map((item, index) => (
              <OrderCard
                item={item}
                key={item._id}
                index={index}
                onDelete={removeItem}
                editQuantity={changeQuantity}
              />
            ))}
          </div>
        )}
      </div>
      <Separator className="md:hidden" />

      <div className="md:w-1/3  flex flex-col gap-2">
        <OrderSummary
          cart={cart}
          clearOrder={removeAll}
          submitOrder={CreateOrder}
          setPhone={setPhone}
          isAuthenticated={isAuthenticated}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Order;
