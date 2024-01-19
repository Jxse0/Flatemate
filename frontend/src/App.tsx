import "./App.css";
import InfoProvider, { tokenContext } from "./InfoProvider";
import { useContext } from "react";
import Router from "./Routing";

function App() {
  const [token] = useContext(tokenContext);
  return (
    <InfoProvider>
      <div className="App">
        <Router></Router>
      </div>
    </InfoProvider>
  );
}

export default App;
