import "./App.css";
import InfoProvider from "./InfoProvider";
import Router from "./Routing";

function App() {
  return (
    <InfoProvider>
      <div className="App">
        <Router></Router>
      </div>
    </InfoProvider>
  );
}

export default App;
