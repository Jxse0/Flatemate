import { useNavigate } from "react-router-dom";
import "./logincard.css";
import axios from "axios";
import { useContext, useState } from "react";
import { tokenContext } from "../../AuthProvider";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [,setToken] = useContext(tokenContext);

    const navigate = useNavigate();

    const handleLogin = async (event: React.FormEvent) => {
      event.preventDefault();
      try {
        const response = await axios.post("http://localhost:3001/auth/login", {
          email: email,
          password: password,
        });        
  
        const { token } = response.data;        
        // Store token in the context
        setToken(token);
        
        console.debug("Erfolgreicher Login:", response.data);
        navigate('/');
      } catch (error) {
        console.error("Fehler beim einloggen:", error);
      }
    };
  

    return (
        <div id="logincard">
          <div id="card-content">
            <div id="card-title">
              <h2>LOGIN</h2>
              <div className="underline-title"></div>
            </div>
            <form method="post" className="form">
              <label htmlFor="user-email" style={{ paddingTop: '13px' }}>
                &nbsp;Email
              </label>
              <input
                id="user-email"
                className="form-content"
                type="email"
                value={email}
                name="email"
                onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                autoComplete="on"
                required
              />
              <div className="form-border"></div>
              <label htmlFor="user-password" style={{ paddingTop: '22px' }}>
                &nbsp;Password
              </label>
              <input
                id="user-password"
                className="form-content"
                type="password"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                name="password"
                required
              />
              <div className="form-border"></div>
              <a href="#">
                <legend id="forgot-pass">Forgot password?</legend>
              </a>
              <input id="submit-btn" type="submit" name="submit" value="LOGIN" onClick={handleLogin} />
              <a href="/signup" id="signup">
                Don't have an account yet?
              </a>
            </form>
          </div>
        </div>
      );
};
export default Login;