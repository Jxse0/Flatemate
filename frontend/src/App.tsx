
import "./App.css";
import AuthProvider, { tokenContext } from "./AuthProvider";
import { useContext } from "react";
import Router from "./Routing";

function App() {

  const [token] = useContext(tokenContext);
  return (
    <AuthProvider>
      <div className="App">
    <Router>
    </Router>
        </div>
    </AuthProvider>
  );
}

export default App;
