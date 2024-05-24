import { CartItem } from "@/redux/reducers/cartReducer";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash2, CheckCircle2 } from "lucide-react";
import { Button } from "@nextui-org/react";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "./ui/form";

const phoneNumberRegex = /^05[0123456789]\d{7}$/;

const formSchema = z.object({
  phone: z.string().refine((value) => phoneNumberRegex.test(value), {
    message: "Invalid phone number ",
  }),
});

export type phoneForm = z.infer<typeof formSchema>;

interface OrderSummaryProps {
  cart: CartItem[];
  clearOrder: () => void;
  submitOrder: (phone: string) => Promise<void>;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const OrderSummary = ({
  cart,
  clearOrder,
  submitOrder,
  setPhone,
  isLoading,
  isAuthenticated,
}: OrderSummaryProps) => {
  const form = useForm<phoneForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
    },
  });

  const onSubmit = (data: phoneForm) => {
    submitOrder(data.phone);
  };

  return (
    <Card className="w-full max-h-[500px] transition-all border-zinc-500">
      <CardHeader>
        <CardTitle className="capitalize flex flex-col text-center text-lg">
          <p>Order Summary</p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-1">
          <h3 className="font-bold">Total Items: </h3>
          <p className="w-10 border-2 border-zinc-400 rounded-md flex items-center justify-center">
            {cart.length}
          </p>
          <h3 className="font-bold">Total Price: </h3>
          <p className="text-medium">
            ₪{cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}
          </p>
        </div>
        <Separator className="mt-3" />
      </CardContent>

      <CardFooter className="flex flex-col gap-1">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="w-full">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Phone"
                        className="bg-zinc-200 dark:bg-zinc-800"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter your phone number to complete the order
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-1 w-full">
              <Button
                className="w-full flex gap-1 justify-center items-center hover:animate-hover-tada transition-all"
                color="danger"
                onClick={clearOrder}
                type="button"
              >
                Clear <Trash2 />
              </Button>
              <Button
                className="w-full flex gap-1 justify-center items-center hover:animate-hover-tada transition-all"
                disabled={!cart.length || !isAuthenticated}
                isLoading={isLoading}
                type="submit"
              >
                {isAuthenticated ? (
                  <>
                    Checkout <CheckCircle2 />{" "}
                  </>
                ) : (
                  "Login to Checkout"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardFooter>
    </Card>
  );
};

export default OrderSummary;
