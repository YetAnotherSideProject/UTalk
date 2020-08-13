// Firebase App (the core Firebase SDK) is always required
import firebase from "firebase/app";
// Used firebase products
import "firebase/auth";

export class AuthService {
  static async register(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  static async login(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  static async logout() {
    return firebase.auth().signOut();
  }
}
