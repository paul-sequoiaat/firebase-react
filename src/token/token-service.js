import axios from "axios";
import { requestFirebaseToken } from "../firebase/firebase-config";

export const saveFCMToken = async() => {
    const firebaseRegistrationToken = await requestFirebaseToken();
    const userId = JSON.parse(sessionStorage.getItem('user')).userId;
    axios
    .post(`${process.env.REACT_APP_BASE_URL}/user/token`, 
        {
            userId,
            firebaseRegistrationToken
        }
    )
    .catch((err) => {
        console.log('Save firebase token error', err);
    });
}
