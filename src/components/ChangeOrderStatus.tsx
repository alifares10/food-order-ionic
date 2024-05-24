import { Order, OrderStatus } from "@/types/Order";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateMyRestaurantOrder } from "@/api/MyRestaurantApi";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "@nextui-org/react";
import { CheckCircle2 } from "lucide-react";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

interface ChangeOrderStatusProps {
  orderId: string | undefined;
  orderStatus: OrderStatus;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<Order[], Error>>;
}

const ChangeOrderStatus = ({
  orderId,
  orderStatus,
  refetch,
}: ChangeOrderStatusProps) => {
  const { updateRestaurantStatus, isLoading: isUpdateLoading } =
    useUpdateMyRestaurantOrder();
  const [status, setStatus] = useState("");
  const changeStatus = async (status: string) => {
    if (!orderId) {
      toast.error("Order Id is required");
      setStatus("");
      return;
    }
    if (!status) {
      toast.error("Status is required");
      return;
    }
    try {
      await updateRestaurantStatus({ orderId, status });
      setStatus("");
      refetch();
    } catch (error) {
      setStatus("");
      console.log("Error updating order status ", error);
    }
  };
  return (
    <div className="items-center md:justify-between flex my-4 flex-col md:flex-row">
      <p className="font-bold">Change Status</p>
      {orderId && orderStatus && (
        <div className="flex items-center justify-center gap-1">
          <Select
            defaultValue={orderStatus}
            onValueChange={(e) => setStatus(e)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value="inProgress">In Progress</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {status && (
            <Button
              isIconOnly
              isLoading={isUpdateLoading}
              variant="solid"
              color="primary"
              onClick={() => changeStatus(status)}
            >
              <CheckCircle2 size={24} />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ChangeOrderStatus;
