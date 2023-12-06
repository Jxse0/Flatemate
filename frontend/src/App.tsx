import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import SidebarLeft from "./components/sidebar";
import SignUp from "./components/SignUp";

function App() {

  /*If you wanna add your page just do it lime the signup is done
  You can choose the path freely, they just have to match with the one in the sidebar.tsx
  */ 
  return (
    <Router>
      <div className="App">
        <SidebarLeft />
        <Routes>
          <Route path="/signup" element={<SignUp/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
