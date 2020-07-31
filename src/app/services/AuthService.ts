// Firebase App (the core Firebase SDK) is always required
import firebase from "firebase/app";
// Used firebase products
import "firebase/auth";

export class AuthService {
  static register(email: string, password: string): void {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        console.log(`Register user ${email} failed: ${error}`);
      });
  }

  static login(email: string, password: string): void {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        console.log(`Login user ${email} failed: ${error}`);
      });
  }
}
