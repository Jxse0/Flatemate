import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import SidebarLeft from "./components/sidebar/sidebar";
import SignUp from "./components/SignUp";
import Dashboard from "./components/dashboard/Dashboard";
import { RouteErrorContext } from "react-router/dist/lib/context";
import ShoppingList from "./components/shoppinglist/shoppingList";
import Login from "./components/login/login";

function App() {

  /*If you wanna add your page just do it lime the signup is done
  You can choose the path freely, they just have to match with the one in the sidebar.tsx
  */ 
  return (
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
  );
}

export default App;
