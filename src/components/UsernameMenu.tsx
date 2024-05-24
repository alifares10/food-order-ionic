import { CircleUserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
import { Button } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import { User, Utensils, List } from "lucide-react";

const UsernameMenu = () => {
  const { user, logout } = useAuth0();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center px-3 font-bold gap-2">
        <Avatar isBordered showFallback color="primary" src={user?.picture} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link
            to="/manage-restaurant"
            className="font-bold hover:text-orange-500 flex items-center gap-1"
          >
            <Utensils />
            Manage Restaurant
          </Link>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem>
          <Link
            to="/order-status"
            className="font-bold hover:text-orange-500 flex items-center gap-1"
          >
            <List />
            Manage Orders
          </Link>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem>
          <Link
            to="/user-profile"
            className="font-bold hover:text-orange-500 flex items-center gap-1"
          >
            <User />
            User Profile
          </Link>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem>
          <Button
            onClick={() => logout()}
            className="flex flex-1 font-bold bg-orange-500"
          >
            Log Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UsernameMenu;
