import { Switch } from "@nextui-org/react";
import { useTheme } from "@/components/ThemeProvider";
import { MoonIcon } from "@/assets/MoonIcon";
import { SunIcon } from "@/assets/SunIcon";

const ThemeToggle = () => {
  const { setTheme } = useTheme();
  const theme = useTheme().theme;

  return (
    <Switch
      defaultSelected={theme === "dark"}
      onValueChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      size="lg"
      color="secondary"
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <SunIcon className={className} />
        ) : (
          <MoonIcon className={className} />
        )
      }
    ></Switch>
  );
};

export default ThemeToggle;
