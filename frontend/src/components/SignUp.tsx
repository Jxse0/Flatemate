import React, { useState } from "react";
import axios from "axios";

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

  const handleFormSubmit = () => {
    if (isFilled) {
      // Hier den Axios Request durchführen
      axios
        .post("http://localhost:3001/user/", {
          email: email,
          firstname: firstname,
          lastname: lastname,
          paypal: paypal,
          password: password,
        })
        .then((response) => {
          console.log("Erfolgreich gesendet:", response.data);
        })
        .catch((error) => {
          console.error("Fehler beim Senden:", error);
        });
    } else {
      console.log("Bitte füllen Sie alle Felder aus.");
    }
  };

  return (
    <>
      <input
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          handleInputChange();
        }}
        placeholder="Email"
      />
      <input
        value={firstname}
        onChange={(e) => {
          setFirstname(e.target.value);
          handleInputChange();
        }}
        placeholder="Vorname"
      />
      <input
        value={lastname}
        onChange={(e) => {
          setLastname(e.target.value);
          handleInputChange();
        }}
        placeholder="Nachname"
      />
      <input
        value={paypal}
        onChange={(e) => {
          setPaypal(e.target.value);
          handleInputChange();
        }}
        placeholder="Paypal"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          handleInputChange();
        }}
        placeholder="Passwort"
      />
      <button onClick={handleFormSubmit} disabled={!isFilled}>
        Submit
      </button>
    </>
  );
};

export default SignUp;
