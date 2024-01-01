import { useNavigate } from "react-router-dom";
import "./logincard.css";
import axios from "axios";
import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin =() => {
        try{
            axios
            .post("http://localhost:3001/auth/login", {
              email: email,
              password: password,
            })
            .then((response) => {
              console.log("Erfolgreich gesendet:", response.data);
              navigate('/');
            })
            .catch((error) => {
              console.error("Fehler beim Senden:", error);
            });
        } catch (error) {
            console.error("Failed Login", error);
        }       
    }

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