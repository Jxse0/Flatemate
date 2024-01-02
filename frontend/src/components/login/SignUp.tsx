import React, { useState } from "react";
import axios from "axios";
import "./logincard.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [paypal, setPaypal] = useState("");
  const [password, setPassword] = useState("");
  const [isFilled, setIsFilled] = useState(false);

  const handleInputChange = () => {
    // Überprüfe, ob alle Eingabefelder ausgefüllt sind
    if (email && firstname && lastname && paypal && password) {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  };
  const navigate = useNavigate();

  const handleFormSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (isFilled) {
      // Hier den Axios Request durchführen
      axios
        .post("http://localhost:3001/user", {
          email: email,
          firstname: firstname,
          lastname: lastname,
          paypal: paypal,
          password: password,
        })
        .then((response) => {
          console.log("Erfolgreich gesendet:", response.data);
          navigate('/');
        })
        .catch((error) => {
          console.error("Fehler beim Senden:", error);
        });
    } else {
      console.log("Bitte füllen Sie alle Felder aus.");
    }
  };

  return (
    <div id="signupcard">
    <div id="card-content">
      <div id="card-title">
        <h2>Sign Up</h2>
        <div className="underline-title"></div>
      </div>
      <form method="post" className="form">
        {/*Email Field */}
        <label htmlFor="user-email" style={{ paddingTop: '13px' }}>
          &nbsp;Email
        </label>
        <input
        id="user-email"
        type="email"
        className="form-content"
        value={email}
        autoComplete="on"
        onChange={(e) => {
          setEmail(e.target.value);
          handleInputChange();
        }}
        required
        />
        <div className="form-border"/>
        {/*Vorname Field */}
        <label style={{ paddingTop: '22px' }}>
          &nbsp;Vorname
        </label> 
      <input
        className="form-content"
        value={firstname}
        onChange={(e) => {
          setFirstname(e.target.value);
          handleInputChange();
        }}
        required
        />
         <div className="form-border"/>
         {/*Nachname Field */}
         <label style={{ paddingTop: '22px' }}>
          &nbsp;Nachname
        </label> 
        <input
        className="form-content"
        value={lastname}
        onChange={(e) => {
          setLastname(e.target.value);
          handleInputChange();  
        }}
        required
        />
         <div className="form-border"/>
        {/*Paypal Field */}
             <label htmlFor="user-password" style={{ paddingTop: '22px' }}>
          &nbsp;PayPal-Email
        </label>
        <input
          className="form-content"
          value={paypal}
        onChange={(e) => {
          setPaypal(e.target.value);
          handleInputChange();
        }}
          required
        />
        <div className="form-border"/>
         {/*Passwort Field */}
         <label htmlFor="user-password" style={{ paddingTop: '22px' }}>
          &nbsp;Passwort
        </label>
        <input
          id="user-password"
          className="form-content"
          type="password"
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            handleInputChange();
          }}
          required
        />
        <div className="form-border"/>
        <input id="submit-btn" type="submit" name="submit" value="Register" onClick={handleFormSubmit}/>
        <a href="/login" id="signup">
                Already have an account?
              </a>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
