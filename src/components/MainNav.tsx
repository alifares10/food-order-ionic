import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@nextui-org/react";
import UsernameMenu from "./UsernameMenu";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "@nextui-org/react";
import { ShoppingCart } from "lucide-react";
import { useAppSelector } from "@/redux/store";

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const cart = useAppSelector((state) => state.cart.items);
  const navigate = useNavigate();

  return (
    <div className="flex space-x-2 items-center">
      <Link
        to="/my-order"
        className="font-bold hover:text-orange-500 transition-all"
      >
        <Badge
          color="danger"
          content={cart.length}
          shape="rectangle"
          className="flex gap-1"
        >
          <ShoppingCart className="flex " />
        </Badge>
      </Link>
      {isAuthenticated ? (
        <>
          <UsernameMenu />
        </>
      ) : (
        <>
          {!isLoading && (
            <Button
              variant="ghost"
              className="font-bold hover:text-orange-500 hover:bg-white"
              onClick={async () => await loginWithRedirect()}
            >
              Log In
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default MainNav;
