import { Link } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppSelector } from "@/redux/store";
import { User, Utensils } from "lucide-react";
import { Separator } from "./ui/separator";

const MobileNavLinks = () => {
  const cart = useAppSelector((state) => state.cart.items);
  const { logout } = useAuth0();

  return (
    <>
      <Link
        to="/manage-restaurant"
        className="flex gap-1 items-center font-bold hover:text-orange-500 border-b-2 pb-4"
      >
        <Utensils className="flex " /> My Restaurant
      </Link>

      <Link
        to="/user-profile"
        className="flex gap-1 items-center font-bold hover:text-orange-500 border-b-2 pb-4"
      >
        <User className="flex " /> User Profile
      </Link>
      <Button
        onClick={() => logout()}
        className="flex items-center px-3 font-bold hover:bg-gray-500"
      >
        Log Out
      </Button>
    </>
  );
};

export default MobileNavLinks;
