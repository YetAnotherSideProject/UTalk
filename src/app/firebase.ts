// Firebase App (the core Firebase SDK) is always required
import firebase from "firebase/app";
//Firebase project config
//Firebase config is no critical data, because data is secured serverside via security rules and apiKey limitations
const firebaseConfig = {
    apiKey: "AIzaSyCubZ-kPPRmBmBsE1xnX0rgMizO1q-UJyY",
    authDomain: "fh-me-utalk.firebaseapp.com",
    databaseURL: "https://fh-me-utalk.firebaseio.com",
    projectId: "fh-me-utalk",
    storageBucket: "fh-me-utalk.appspot.com",
    messagingSenderId: "701512314225",
    appId: "1:701512314225:web:f9c15855170fcbdb3b9ad0",
    measurementId: "G-L4TF3FWPVP"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);