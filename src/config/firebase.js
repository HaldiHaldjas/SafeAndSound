import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore} from "firebase/firestore";

import { getDatabase, ref, set, child, get} from "firebase/database"

const firebaseConfig = {
    apiKey: "AIzaSyCHrlhkxx5jUVR-av3oCvvkqGbnntk0nlQ",
    authDomain: "safeandsound-74ad4.firebaseapp.com",
    projectId: "safeandsound-74ad4",
    storageBucket: "safeandsound-74ad4.appspot.com",
    messagingSenderId: "638548214338",
    appId: "1:638548214338:web:796b674113e9946b3223db"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app)
