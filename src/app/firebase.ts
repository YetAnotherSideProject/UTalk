// Firebase App (the core Firebase SDK) is always required
import firebase from "firebase/app";
// Used firebase products
import "firebase/firestore";
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
  measurementId: "G-L4TF3FWPVP",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.firestore().settings({
  cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED,
});

firebase
  .firestore()
  //Persistence is only enabled by default for android and ios, for this webapp activate manually
  .enablePersistence()
  .catch(function (err) {
    if (err.code == "failed-precondition") {
      console.log(
        `Multiple tabs open, persistence can only be enabled, in one tab at a a time.`
      );
    } else if (err.code == "unimplemented") {
      console.log(
        `The current browser does not support all of the features required to enable persistence`
      );
    } else {
      console.log(err);
    }
  });
// Subsequent queries will use persistence, if it was enabled successfully
