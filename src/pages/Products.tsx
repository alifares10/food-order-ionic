import { useAddMenuItemToRestaurant } from "@/api/MyRestaurantApi";
import { useGetAllRestaurants } from "@/api/RestaurantApi";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { Spinner } from "@nextui-org/react";
import { useMemo } from "react";

const Products = () => {
  const { isAuthenticated } = useAuth0();
  const { restaurants, isLoading } = useGetAllRestaurants();

  const restaurant = useMemo(() => {
    return restaurants?.[0];
  }, [restaurants]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="filtes" className="border">
        filters
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div id="main-content" className="flex flex-col gap-5 border ">
          <div className="grid md:grid-cols-4 gap-2">
            {restaurant?.menuItems.map((item) => (
              <ProductCard
                key={item._id}
                item={item}
                isAuhenticated={isAuthenticated}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
