import { useEffect } from "react";
import useLocalStorage from "../LocalStorage/useLocalStorage";
import "./ThemeSwitcher.css";
import { FaMoon,  FaSun } from "react-icons/fa";

function ThemeSwitcher() {
  const defaultTheme = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const [theme, setTheme] = useLocalStorage(
    "userForm-theme",
    defaultTheme ? "dark" : "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("color-scheme", theme);
  }, [theme]);

  const handlerThemeSwitch = function () {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <>
    <div className="btn-container">
      <div className="btns">
        <button
          className="button"
          aria-label={`Change theme to ${
            theme === "light" ? "dark" : "light"
          } mode`}
          role="toggle"
          onClick={handlerThemeSwitch}
        >
          {theme === "dark" ? <FaSun size={15} /> : <FaMoon size={15} />}
        </button>
        </div>
      </div>
    </>
  );
}

export default ThemeSwitcher;
