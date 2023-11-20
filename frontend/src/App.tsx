import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SignUp from "./components/SignUp";
import useLocalStorage from "use-local-storage";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { IconButton } from "@mui/material";


function App() {
  const [count, setCount] = useState(0);
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

  const switchTheme = () => {
    const newTheme = theme === "test" ? "dark" : "test";    
    setTheme(newTheme);
  }
  
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);


  return (
    <div className="App">
      <SignUp />
        Switch to {theme === "light" ? "dark" : "light" } Theme
      <IconButton sx={{ ml: 1 }} onClick={switchTheme} color="inherit">
        {theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </div>
  );
}

export default App;
