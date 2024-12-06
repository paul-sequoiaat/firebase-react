import React, { useState, useEffect } from "react";
import { requestFirebaseToken, listenForNotifications } from "./firebase/firebase-config";

function App() {
  const [notifications, setNotifications] = useState([]);
  const [fcmToken, setFcmToken] = useState(null);

  useEffect(() => {
    const getToken = async () => {
      const token = await requestFirebaseToken();
      if (token) {
        setFcmToken(token);
      }
    };

    getToken();

    listenForNotifications((notification) => {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        `${notification.notification.title} - ${notification.notification.body}`,
      ]);
    });
  }, []);

   return (
    <div>
      <h1>Firebase Notifications</h1>
      
      {/* Display the FCM Token */}
      {fcmToken && (
        <div>
          <h2>Your FCM Token</h2>
          <p>{fcmToken}</p>
        </div>
      )}
      
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
