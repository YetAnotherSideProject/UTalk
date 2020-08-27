// Firebase App (the core Firebase SDK) is always required
import firebase from "firebase/app";
// Used firebase products
import "firebase/firestore";
import "firebase/auth";

import { Theming } from "../models/Theming";

export class ThemingDao {
  private static dbUsers = firebase.firestore().collection("users");

  static async setDarkMode(darkMode: Theming) {
    return ThemingDao.dbUsers
      .doc(firebase.auth().currentUser?.uid)
      .set(darkMode, { merge: true });
  }

  static async getDarkMode() {
    return ThemingDao.dbUsers
      .doc(firebase.auth().currentUser?.uid)
      .get()
      .then((doc) => {
        return doc.data() as Theming;
      });
  }

  static async updateDarkMode(darkMode: Theming) {
    return ThemingDao.dbUsers
      .doc(firebase.auth().currentUser?.uid)
      .update(darkMode);
  }
}
