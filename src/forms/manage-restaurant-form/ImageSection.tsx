import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import { useFormContext } from "react-hook-form";
import { Edit } from "lucide-react";

const ImageSection = () => {
  const imageRef = useRef<HTMLInputElement>(null);
  const { control, watch } = useFormContext();

  const existingImageUrl = watch("imageUrl");

  return (
    <div className="space-y-2">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold">Image</h2>
        <FormDescription>
          Add an image that will be displayed on your restaurant listing in the
          search results. Adding a new image will overwrite the existing
          one.(press on the image to change it)
        </FormDescription>
      </div>

      <div className="flex flex-col gap-2 md:w-[50%]">
        {existingImageUrl && (
          <AspectRatio
            ratio={16 / 9}
            onClick={() => imageRef.current?.click()}
            className="group relative cursor-pointer hover:opacity-80 transition-opacity duration-150 "
          >
            <img
              src={existingImageUrl}
              className="rounded-md object-cover h-full w-full "
            />
            <div className="absolute top-2 right-2 hidden group-hover:flex transition-all ">
              <Edit size={24} />
            </div>
          </AspectRatio>
        )}
        <FormField
          control={control}
          name="imageFile"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  ref={imageRef}
                  className={`bg-white text-black cursor-pointer hover:bg-gray-300  ${
                    existingImageUrl ? " hidden" : ""
                  }`}
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={(event) =>
                    field.onChange(
                      event.target.files ? event.target.files[0] : null
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default ImageSection;
