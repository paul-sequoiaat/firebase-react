import React, { useState, useEffect } from "react";
import { requestForToken, onMessageListener } from "./firebase/firebase-config";

function App() {
  const [token, setToken] = useState("");
  const [notification, setNotification] = useState(null);

  // Generate and display the token
  useEffect(() => {
    requestForToken(setToken)
      .then((currentToken) => {
        if (currentToken) {
          setToken(currentToken);
          console.log("Token generated:", currentToken);
        } else {
          console.log("No registration token available. Request permission to generate one.");
        }
      })
      .catch((err) => {
        console.error("An error occurred while retrieving token:", err);
      });
  }, []);

  // Listen for incoming messages
  useEffect(() => {
    onMessageListener()
      .then((payload) => {
        console.log("Message received: ", payload);
        setNotification(payload.notification);
      })
      .catch((err) => console.error("Failed to receive message:", err));
  }, []);

  return (
    <div>
      <h1>Push Notification Demo</h1>
      {token ? (
        <p>Your token: <code>{token}</code></p>
      ) : (
        <p>Generating token... Please wait or enable notifications.</p>
      )}
      {notification && (
        <div>
          <h2>{notification.title}</h2>
          <p>{notification.body}</p>
        </div>
      )}
    </div>
  );
}

export default App;
