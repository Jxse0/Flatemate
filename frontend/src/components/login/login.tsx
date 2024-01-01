import "./logincard.css";

const Login = () => {

    return (
        <div id="card">
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
                name="email"
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
                name="password"
                required
              />
              <div className="form-border"></div>
              <a href="#">
                <legend id="forgot-pass">Forgot password?</legend>
              </a>
              <input id="submit-btn" type="submit" name="submit" value="LOGIN" />
              <a href="#" id="signup">
                Don't have an account yet?
              </a>
            </form>
          </div>
        </div>
      );
};
export default Login;