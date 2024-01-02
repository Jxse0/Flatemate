import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import SidebarLeft from "./components/sidebar/sidebar";
import SignUp from "./components/login/SignUp";
import Dashboard from "./components/dashboard/Dashboard";
import { RouteErrorContext } from "react-router/dist/lib/context";
import ShoppingList from "./components/shoppinglist/shoppingList";
import Login from "./components/login/login";
import AuthProvider, { tokenContext } from "./AuthProvider";
import { useContext } from "react";

function App() {
  
  const [token] = useContext(tokenContext);
  return (
    <AuthProvider>
    <Router>
      <div className="App">
        <SidebarLeft />
        <Routes>
          {/*The default is set with the index property */}
          <Route path="/login" element={<Login/>}/>
          <Route path="/register"/>
          <Route index element={<Dashboard/>}/>
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/cart" element={<ShoppingList/>}/>
        </Routes>
        </div>
    </Router>
    </AuthProvider>
  );
}

export default App;
