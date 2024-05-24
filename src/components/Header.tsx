import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";
import ThemeToggle from "./ThemeToggle";
import { Badge } from "@nextui-org/react";
import { ShoppingCart } from "lucide-react";
import { useAppSelector } from "@/redux/store";

const Header = () => {
  const cart = useAppSelector((state) => state.cart.items);
  return (
    <div className="border-b-2 border-b-orange-500 py-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-3xl font-bold tracking-tight text-orange-500"
        >
          My Burger
        </Link>

        <div className="md:hidden flex gap-3">
          <Link
            to="/my-order"
            className="flex  items-center font-bold hover:text-orange-500"
          >
            <Badge
              color="danger"
              content={cart.length}
              shape="rectangle"
              className="flex items-center justify-center"
            >
              <div className="flex gap-1 justify-center items-center">
                <ShoppingCart className="flex" />
              </div>
            </Badge>
          </Link>
          <MobileNav />
        </div>
        <div className="hidden md:flex gap-3">
          <MainNav />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Header;
