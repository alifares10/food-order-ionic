import { CircleUserRound, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import MobileNavLinks from "./MobileNavLinks";
import { useAuth0 } from "@auth0/auth0-react";
import ThemeToggle from "./ThemeToggle";
import { Browser } from "@capacitor/browser";

const MobileNav = () => {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();

  const login = async () => {
    await loginWithRedirect({
      async openUrl(url) {
        console.log(url);

        // Redirect using Capacitor's Browser plugin
        await Browser.open({
          url,
          windowName: "_self",
        });
      },
    });
  };
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-orange-500" />
      </SheetTrigger>
      <SheetContent className="space-y-3">
        <SheetTitle>
          {isAuthenticated ? (
            <div className="flex justify-between font-bold gap-2">
              <div className="flex capitalize gap-1">
                <CircleUserRound className="text-orange-500" />
                {user?.name || user?.email}
              </div>
              <ThemeToggle />
            </div>
          ) : (
            <div className="flex justify-between">
              <span> Welcome to My Burger</span>
              <ThemeToggle />
            </div>
          )}
        </SheetTitle>
        <Separator />
        <SheetDescription className="flex flex-col gap-4">
          {isAuthenticated ? (
            <MobileNavLinks />
          ) : (
            <Button onClick={login} className="flex-1 font-bold bg-orange-500">
              Log In
            </Button>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
