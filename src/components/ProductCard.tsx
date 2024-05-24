import { MenuItem } from "@/types/Restaurant";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProductsModal from "./ProductsModal";
import { useDisclosure } from "@nextui-org/react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

interface ProductCardProps {
  item: MenuItem;
  isAuhenticated: boolean;
}

type Extra = {
  name: string;
  price: number;
};

const ProductCard = ({ item, isAuhenticated }: ProductCardProps) => {
  const [extras, setExtras] = useState<Extra[]>([]);
  const [totalPrice, setTotalPrice] = useState(item.price);
  const navigate = useNavigate();
  const { loginWithRedirect } = useAuth0();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const dispatch = useDispatch();
  const order = useAppSelector((state) => state.order.order);
  const cart = useAppSelector((state) => state.cart.items);

  useEffect(() => {}, [item]);

  const addToCart = () => {
    const itemId = uuidv4();
    if (extras.length > 0) {
      const itemWithExtras = {
        ...item,
        extras,
        price: totalPrice,
        _id: itemId,
        quantity: 1,
        allExtras: item.extras,
      };
      dispatch({ type: "cart/addItem", payload: itemWithExtras });
    } else {
      dispatch({
        type: "cart/addItem",
        payload: {
          ...item,
          _id: itemId,
          quantity: 1,
          extras: [],
          allExtras: item.extras,
        },
      });
    }
    toast(`${item.name.toLocaleUpperCase()} Added to Order`, {
      duration: 2000,
      action: {
        label: "View Order",
        onClick: async () => navigate("/my-order"),
      },
    });
    // if (isAuhenticated) {

    // }
    //  else {
    //   toast("Please login to make order", {
    //     action: {
    //       label: "login",
    //       onClick: async () => await loginWithRedirect(),
    //     },
    //   });
    // }
  };

  return (
    <>
      {item.imageUrl !== undefined && (
        <div>
          <Card
            className={`relative hover:scale-105 transition-all  bg-cover bg-center bg-no-repeat items-center justify-center cursor-pointer`}
            style={{ backgroundImage: `url(${item.imageUrl})` }}
            onClick={onOpen}
          >
            <CardHeader className="flex justify-center items-center">
              <CardTitle className="capitalize text-white font-bold tracking-wider text-xl ">
                {item.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-start"></CardContent>
          </Card>
          <ProductsModal
            isOpen={isOpen}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
            item={item}
            addToCart={addToCart}
            extras={extras}
            setExtras={setExtras}
            totalPrice={totalPrice}
            setTotalPrice={setTotalPrice}
          />
        </div>
      )}
    </>
  );
};

export default ProductCard;
