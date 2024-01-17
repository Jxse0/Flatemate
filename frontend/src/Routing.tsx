import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useContext } from 'react';
import { tokenContext } from './AuthProvider';
import SignUp from "./components/login/SignUp";
import ShoppingList from "./components/shoppinglist/shoppingList";
import SidebarLeft from "./components/sidebar/sidebar";
import Login from "./components/login/login";
import Dashboard from "./components/dashboard/Dashboard";
import MeAndAmigos from "./components/accountDetails/meAndAmigos";
import Chat from "./components/chat/Chat";
import Todo from "./components/todoBig";

type Props = {
  children: React.ReactNode;
};
function IsLoggedIn({ children }: Props) {
  const [token] = useContext(tokenContext);

  if (token === '') {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
}

function Router() {
    return (
        <BrowserRouter>
          <div className="App">
            <SidebarLeft />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              {/* The default is set with the index property */}
              <Route index element={<IsLoggedIn><Dashboard/></IsLoggedIn>}/>
              <Route
                path="/dashboard"
                element={
                  <IsLoggedIn>
                    <Dashboard />
                  </IsLoggedIn>
                }
              />
              <Route
                path="/cart"
                element={
                  <IsLoggedIn>
                    <ShoppingList />
                  </IsLoggedIn>
                }
              />
                <Route
                path="/chat"
                element={
                  <IsLoggedIn>
                    <Chat/>
                  </IsLoggedIn>
                }
              />
              <Route
                path="/todo"
                element={
                  <IsLoggedIn>
                    <Todo/>
                  </IsLoggedIn>
                }
              />
              <Route
                path="/account"
                element={
                  <IsLoggedIn>
                    <Chat/>
                  </IsLoggedIn>
                }
              />
              <Route
              path="/wg-details"
              element={
                <IsLoggedIn>
                  <MeAndAmigos/>
                </IsLoggedIn>
              }
              />
            </Routes>
          </div>
        </BrowserRouter>
      );
}

export default Router;