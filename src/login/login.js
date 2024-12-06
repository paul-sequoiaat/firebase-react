import React, { useState } from "react";
import axios from "axios";
import { saveFCMToken } from "../token/token-service";

export function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async(e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/user/login`, { email, password })
      .then((response) => {
        const userData = response.data.data;
        sessionStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        saveFCMToken();
      }) 
      .catch((err) => {
        console.error("Login error:", err);
        setError(err);
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Login;
