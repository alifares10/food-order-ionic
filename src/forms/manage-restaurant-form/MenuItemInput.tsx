import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import MenuItemExtras from "./MenuItemExtras";

type Props = {
  index: number;
  removeMenuItem: () => void;
};

const MenuItemInput = ({ index, removeMenuItem }: Props) => {
  const { control } = useFormContext();

  return (
    <div className="flex flex-row items-end gap-2 overflow-y-scroll">
      <FormField
        control={control}
        name={`menuItems.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1 ">
              Name <FormMessage />
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Cheese Pizza"
                className="bg-white text-black max-sm:w-24"
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`menuItems.${index}.price`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              Price (₪) <FormMessage />
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="8.00"
                className="bg-white text-black max-sm:w-10"
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`menuItems.${index}.description`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              Description <FormMessage />
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Description"
                className="bg-white text-black max-sm:w-24"
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`menuItems.${index}.imageUrl`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              Image Url <FormMessage />
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Image Url"
                className="bg-white text-black max-sm:w-24"
              />
            </FormControl>
          </FormItem>
        )}
      />
      <Popover>
        <PopoverTrigger className={buttonVariants({ variant: "default" })}>
          Add Extras
        </PopoverTrigger>
        <PopoverContent className="dark:bg-zinc-900 outline outline-2 outline-zinc-600 flex justify-center items-center">
          <FormField
            control={control}
            name={`menuItems.${index}.extras`}
            render={({ field }) => (
              <FormItem className="flex flex-col justify-center items-center">
                <FormLabel className="flex items-center gap-1 justify-center">
                  Extras <FormMessage />
                </FormLabel>
                <MenuItemExtras field={field} />
              </FormItem>
            )}
          />
        </PopoverContent>
      </Popover>

      <Button
        type="button"
        onClick={removeMenuItem}
        variant={"destructive"}
        className="flex items-center justify-center p-2 rounded-full bg-transparent"
      >
        <X size={24} className="text-black dark:text-white" />
      </Button>
    </div>
  );
};

export default MenuItemInput;
