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
import { Toast } from "@capacitor/toast";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { CheckCircle2, Loader2, ShoppingBag } from "lucide-react";

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
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const order = useAppSelector((state) => state.order.order);
  const cart = useAppSelector((state) => state.cart.items);

  useEffect(() => {}, [item]);

  const addToCart = () => {
    setIsLoading(true);
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
    //reset the extras and total price
    setExtras([]);
    setTotalPrice(item.price);
    setIsLoading(false);
  };

  const selectExtra = (extra: Extra) => {
    // check if the extra is already selected
    const isExtraSelected = extras.some((e) => e.name === extra.name);
    if (isExtraSelected) {
      // remove the extra
      setExtras((prev) => prev.filter((e) => e.name !== extra.name));
      setTotalPrice((prev) => prev - extra.price);
      return;
    }
    // add the extra
    setExtras((prev) => [...prev, extra]);
    setTotalPrice((prev) => prev + extra.price);
  };

  return (
    <>
      {item.imageUrl !== undefined && (
        <div>
          <Drawer>
            <DrawerTrigger asChild>
              <Card
                className={`relative hover:scale-105 transition-all  bg-cover bg-center
                         bg-no-repeat items-center justify-center cursor-pointer`}
                style={{ backgroundImage: `url(${item.imageUrl})` }}
              >
                <CardHeader className="flex justify-center items-center">
                  <CardTitle className="capitalize text-white font-bold tracking-wider text-xl ">
                    {item.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex justify-start"></CardContent>
              </Card>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>
                  {" "}
                  <img
                    src={item.imageUrl}
                    alt=""
                    className="h-64 w-full object-cover transition duration-500 sm:h-72 rounded-lg"
                  />
                  <h3 className="mt-4 text-lg font-medium capitalize">
                    {item.name}
                  </h3>
                </DrawerTitle>
                <DrawerDescription className="flex flex-col ">
                  <h5 className="capitalize">{item.description} </h5>
                  <div>
                    <h3 className="font-bold">Extras:</h3>
                    {item.extras.map((extra) => (
                      <div
                        key={extra.name}
                        onClick={() => selectExtra(extra)}
                        className={`bg-slate-200 dark:bg-zinc-800 rounded-small p-2 flex justify-between items-center
                                 gap-2 cursor-pointer hover:bg-slate-300 dark:hover:bg-zinc-700 transition-all mt-1 ${
                                   extras.some((e) => e.name === extra.name) &&
                                   "bg-slate-400 dark:bg-zinc-600"
                                 }`}
                      >
                        <div className="flex justify-center items-center gap-1 transition-all">
                          {extras.some((e) => e.name === extra.name) && (
                            <CheckCircle2
                              size={20}
                              className="animate-appearance-in transition-all duration-300 ease-in-out"
                            />
                          )}
                          <span className="capitalize">{extra.name}</span>
                        </div>
                        <span className="capitalize">₪{extra.price}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex  gap-1 items-center justify-center p-2">
                    <span className="font-bold">Total: </span>
                    <span>₪{totalPrice}</span>
                  </div>
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter className="items-center justify-center flex">
                <Button
                  variant="destructive"
                  className="w-1/2 flex gap-1 p-5 "
                  onClick={addToCart}
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <>
                      Add To Order <ShoppingBag />
                    </>
                  )}
                </Button>
                <DrawerClose className="w-full flex items-center justify-center">
                  <Button variant="secondary" className="w-1/2 p-5">
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          {/* <ProductsModal
            isOpen={isOpen}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
            item={item}
            addToCart={addToCart}
            extras={extras}
            setExtras={setExtras}
            totalPrice={totalPrice}
            setTotalPrice={setTotalPrice}
          /> */}
        </div>
      )}
    </>
  );
};

export default ProductCard;
