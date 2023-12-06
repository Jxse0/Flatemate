import React, { useEffect, useState } from "react";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { IconButton } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import useLocalStorage from "use-local-storage";
import "./App.css";
import SidebarLeft from "./components/sidebar";
import SignUp from "./components/SignUp";

function App() {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  }

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <Router>
      <div className="App">
        <SidebarLeft />
        <Routes>
          <Route path="/signup" Component={SignUp} />
        </Routes>
        Switch to {theme === "light" ? "dark" : "light" } Theme
        <IconButton sx={{ ml: 1 }} onClick={switchTheme} color="inherit">
          {theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </div>
    </Router>
  );
}

export default App;
