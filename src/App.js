import React, { useState, useEffect } from "react";
import { listenForNotifications } from "./firebase/firebase-config";
import Login from "./login/login";

function App() {
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState(sessionStorage.getItem("user") || null);

  useEffect(() => {
    listenForNotifications((notification) => {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        `${notification.notification.title} - ${notification.notification.body}`,
      ]);
    });
  }, []);

   return (
    <div>
      {!user ? (
        <Login setUser={setUser} />
      ) : (
        <div>
          <h1>Firebase Notifications</h1>
      
          <ul>
            {notifications.map((notification, index) => (
            <li key={index}>{notification}</li>
            ))}
          </ul>
        </div>
      )
    }
  </div>
  );
}

export default App;
