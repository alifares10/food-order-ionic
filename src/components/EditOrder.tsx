import { CartItem } from "@/redux/reducers/cartReducer";
import { Modal, ModalContent, ModalBody, ModalFooter } from "@nextui-org/react";
import { Button } from "./ui/button";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Extra } from "./ProductsModal";
import { useDispatch } from "react-redux";

interface EditOrderProps {
  item: CartItem;
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: (open: boolean) => void;
}

const EditOrder = ({ item, isOpen, onOpen, onOpenChange }: EditOrderProps) => {
  const dispatch = useDispatch();
  const [extras, setExtras] = useState<Extra[]>(item.extras);
  const [totalPrice, setTotalPrice] = useState(item.price);

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

  //   console.log("extras", extras);
  //   console.log("totalPrice", totalPrice);

  const saveEdit = () => {
    dispatch({
      type: "cart/editItemExtras",
      payload: { id: item._id, extras, newPrice: totalPrice },
    });
    onOpenChange(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      placement={"center"}
      onOpenChange={onOpenChange}
      className="p-2 m-6"
    >
      <ModalContent className="group relative block overflow-hidden">
        {(onClose) => (
          <>
            <ModalBody className="">
              <h1 className="text-lg font-medium capitalize items-center justify-center text-center">
                Edit Extras
              </h1>
              <h3 className="text-lg font-medium capitalize items-center justify-center text-center">
                {item.name}
              </h3>

              <div>
                <h3 className="font-bold">Extras:</h3>
                {item.allExtras.map((extra) => (
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
            </ModalBody>
            <ModalFooter className="justify-center items-center">
              <Button onClick={saveEdit}>Save</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default EditOrder;
