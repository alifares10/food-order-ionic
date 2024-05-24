import ProductCard from "./ProductCard";
import { Button } from "./ui/button";
import { Spinner } from "@nextui-org/react";
import { ArrowDownCircle, ArrowRightCircle, ArrowUpCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { MenuItem } from "@/types/Restaurant";
import { useGetAllRestaurants } from "@/api/RestaurantApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const MainProducts = () => {
  const { isAuthenticated } = useAuth0();
  const { restaurants, isLoading } = useGetAllRestaurants();
  const [paginatedProducts, setPaginatedProducts] = useState<
    MenuItem[] | null
  >();
  const navigate = useNavigate();

  const restaurant = useMemo(() => {
    return restaurants?.[0];
  }, [restaurants]);

  const totalProducts = restaurant?.menuItems.length;

  useEffect(() => {
    if (restaurant) {
      setPaginatedProducts(restaurant.menuItems.slice(0, 3));
    }
  }, [restaurant]);

  const handleViewMore = () => {
    if (paginatedProducts?.length === totalProducts) {
      return;
    }
    if (restaurant === undefined) return;
    // increase the number of products in paginatedProducts
    setPaginatedProducts((prev) => {
      if (prev) {
        return restaurant.menuItems.slice(0, prev.length + 3);
      }
      return null;
    });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-3">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="flex justify-end w-full">
            <Button
              className="flex justify-center items-center gap-1"
              onClick={() => navigate("/products")}
            >
              All Products <ArrowRightCircle />
            </Button>
          </div>

          <div className="grid md:grid-cols-3 w-full gap-4 transition-all">
            {paginatedProducts?.map((menuItem) => (
              <ProductCard
                item={menuItem}
                key={menuItem._id}
                isAuhenticated={isAuthenticated}
              />
            ))}
          </div>

          <div className="flex gap-2 w-full justify-center items-center my-3">
            <Button
              variant={"destructive"}
              className="flex items-center justify-center w-1/2  gap-1 "
              onClick={handleViewMore}
            >
              <div className="flex items-center justify-center gap-1">
                View More <ArrowDownCircle />
              </div>
            </Button>
            {paginatedProducts?.length === totalProducts && (
              <Button
                className="flex items-center justify-center gap-1"
                onClick={() => {
                  setPaginatedProducts(restaurant?.menuItems.slice(0, 3));
                }}
              >
                Reset <ArrowUpCircle />
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MainProducts;
