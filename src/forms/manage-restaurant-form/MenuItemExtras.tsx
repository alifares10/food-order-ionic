import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  ControllerRenderProps,
  FieldValues,
  useFieldArray,
  useFormContext,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Plus, PlusCircle } from "lucide-react";
interface MenuItemExtrasProps {
  field: ControllerRenderProps<FieldValues, `menuItems.${number}.extras`>;
}

const MenuItemExtras = ({ field }: MenuItemExtrasProps) => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: `${field.name}`,
  });

  return (
    <div className="flex flex-col justify-center items-center gap-1 w-full">
      <div>
        <FormDescription>Add extras to this menu item</FormDescription>
      </div>

      <FormField
        control={control}
        name={`${field.name}`}
        render={() => (
          <FormItem className="grid grid-cols-2 md:grid-cols-3 gap-2 justify-start ">
            {fields.map((_, index) => (
              <MenuItemExtraInput
                key={index}
                field={field}
                index={index}
                removeMenuItem={() => remove(index)}
              />
            ))}
          </FormItem>
        )}
      />
      <Button
        type="button"
        onClick={() => append({ name: "", price: "" })}
        variant={"ghost"}
      >
        <PlusCircle size={24} className="" />
      </Button>
    </div>
  );
};

const MenuItemExtraInput = ({
  index,
  field,
  removeMenuItem,
}: {
  index: number;
  field: ControllerRenderProps<FieldValues, `menuItems.${number}.extras`>;
  removeMenuItem: () => void;
}) => {
  const { control } = useFormContext();

  return (
    <div className="flex gap-1 flex-col justify-center items-center">
      <FormField
        control={control}
        name={`${field.name}.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              Name <FormMessage />
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Cheese"
                className="bg-white text-black"
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`${field.name}.${index}.price`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              Price (₪)
              <FormMessage />
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="8.99"
                className="bg-white text-black"
              />
            </FormControl>
          </FormItem>
        )}
      />
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

export default MenuItemExtras;
