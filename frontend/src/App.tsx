import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SignUp from "./components/SignUp";
import useLocalStorage from "use-local-storage";

function App() {
  const [count, setCount] = useState(0);
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    console.log("yeah boi");
    
    setTheme(newTheme);
  }
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);


  return (
    <div className="App">
      <SignUp />
      <button className="ToggleButton" onClick={switchTheme}>
        Switch to {theme === "light" ? "purple" : "green" } Theme
      </button>
    </div>
  );
}

export default App;
