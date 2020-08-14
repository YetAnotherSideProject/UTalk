// Firebase App (the core Firebase SDK) is always required
import firebase from "firebase/app";
// Used firebase products
import "firebase/auth";
import { UserDataService } from "./UserDataService";
import { UserDataDao } from "../dao/UserDataDao";

export class AuthService {
  static async register(email: string, password: string) {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((cred) => {
        UserDataDao.createUserData(cred.user?.email || "");
      });
  }

  static async login(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  static async logout() {
    return firebase.auth().signOut();
  }
}
