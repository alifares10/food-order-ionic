import { MenuItem } from "@/types/Restaurant";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { ShoppingBag, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

interface ProductsModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: (open: boolean) => void;
  item: MenuItem;
  addToCart: () => void;
  extras: Extra[];
  setExtras: React.Dispatch<React.SetStateAction<Extra[]>>;
  totalPrice: number;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
}

export type Extra = {
  name: string;
  price: number;
};

const ProductsModal = ({
  isOpen,
  onOpen,
  onOpenChange,
  item,
  addToCart,
  extras,
  setExtras,
  totalPrice,
  setTotalPrice,
}: ProductsModalProps) => {
  // reset the extras and total price when the modal is closed
  useEffect(() => {
    if (!isOpen) {
      setExtras([]);
      setTotalPrice(item.price);
    }
  }, [isOpen]);

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
    <Modal
      isOpen={isOpen}
      placement={"center"}
      onOpenChange={onOpenChange}
      className="p-1 m-6"
    >
      <ModalContent className="group relative block overflow-hidden">
        {(onClose) => (
          <>
            <ModalBody className="">
              <img
                src={item.imageUrl}
                alt=""
                className="h-64 w-full object-cover transition duration-500 sm:h-72 rounded-lg"
              />
              <h3 className="mt-4 text-lg font-medium capitalize">
                {item.name}
              </h3>
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
              <div className="flex  gap-1 items-center">
                <span className="font-bold">Total: </span>
                <span>₪{totalPrice}</span>
              </div>
            </ModalBody>
            <ModalFooter className="justify-center items-center">
              <Button
                variant="solid"
                color="danger"
                onPress={onClose}
                className="w-1/2 flex gap-1"
                onClick={addToCart}
              >
                Add To Order <ShoppingBag />
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ProductsModal;
