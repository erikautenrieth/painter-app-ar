import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
 // Import the functions you need from the SDKs you need

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyALcoMWBnBBAN-48x37uJoM0koLogT-nxA",
    authDomain: "webxr-reality.firebaseapp.com",
    projectId: "webxr-reality",
    storageBucket: "webxr-reality.appspot.com",
    messagingSenderId: "958221837765",
    appId: "1:958221837765:web:56edba7a2679e97e1317ac",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const database = getFirestore(app);
  export const auth = getAuth();