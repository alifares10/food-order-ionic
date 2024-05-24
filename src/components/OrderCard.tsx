import { Button, useDisclosure } from "@nextui-org/react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash2, Edit, Check, Diff } from "lucide-react";
import { CartItem } from "@/redux/reducers/cartReducer";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "./ui/input";
import EditOrder from "./EditOrder";

interface orderCardProps {
  item: CartItem;
  index: number;
  onDelete: (item: CartItem) => void;
  editQuantity: (id: string, quantity: number) => void;
}

const OrderCard = ({ item, index, onDelete, editQuantity }: orderCardProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [quantity, setQuantity] = useState(item.quantity);
  const [isEditing, setIsEditing] = useState(false);

  const changeQuantity = (e: any) => {
    e.preventDefault();
    setIsEditing(true);
    editQuantity(item._id, quantity);
    setIsEditing(false);
  };

  return (
    <Card className="w-full bg-zinc-200 dark:bg-zinc-900 hover:bg-zinc-300 dark:hover:bg-zinc-800 max-h-[400px] transition-all ">
      <CardHeader>
        <CardTitle className="capitalize flex flex-col">
          <p>#{index + 1}</p>
          <p className="justify-center items-center flex text-xl">
            {item.name}
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-1">
          <h3 className="font-bold">Extras: </h3>
          <div>
            {item.extras.length === 0 ? (
              <p>No Extras Selected</p>
            ) : (
              <div>
                {item.extras.map((extra) => (
                  <li key={extra.name}>
                    <span>{extra.name}</span>
                  </li>
                ))}
              </div>
            )}
          </div>

          <h3 className="font-bold">Quantity: </h3>
          <p>{item.quantity}</p>
          <h3 className="font-bold">Total: </h3>
          <p className="text-medium ">
            ₪ {item.price} <span className="text-xs">x {item.quantity}</span>
          </p>
          <EditOrder
            item={item}
            isOpen={isOpen}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          isIconOnly
          variant="ghost"
          color="danger"
          onClick={() => onDelete(item)}
        >
          <Trash2 />
        </Button>
        <div className="flex items-center justify-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button isIconOnly variant="ghost" color="primary">
                <Diff />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-32 flex justify-center items-center">
              <form
                className="flex flex-col"
                onSubmit={(e) => changeQuantity(e)}
              >
                <label htmlFor="quantity">Quantity:</label>
                <div className="flex gap-2 items-center justify-center">
                  <Input
                    type="number"
                    id="quantity"
                    defaultValue={item.quantity.toString()}
                    className="col-span-2 w-16"
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    min={1}
                  />
                  <Button
                    isIconOnly
                    variant="ghost"
                    color="primary"
                    disabled={isEditing}
                    size="sm"
                    type="submit"
                  >
                    <Check />
                  </Button>
                </div>
              </form>
            </PopoverContent>
          </Popover>
          <Button variant="ghost" color="primary" isIconOnly onClick={onOpen}>
            <Edit />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default OrderCard;
