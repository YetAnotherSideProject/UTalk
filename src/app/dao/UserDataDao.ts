// Firebase App (the core Firebase SDK) is always required
import firebase from "firebase/app";
// Used firebase products
import "firebase/firestore";
import { UserData } from "../models/UserData";

export class UserDataDao {
  private static dbUsers = firebase.firestore().collection("users");

  static async getUserData() {
    return UserDataDao.dbUsers
      .doc(firebase.auth().currentUser?.uid)
      .get()
      .then((doc) => {
        return doc.data() as UserData;
      });
  }

  static async updateUserData(userData: UserData) {
    return UserDataDao.dbUsers
      .doc(firebase.auth().currentUser?.uid)
      .update(userData);
  }
}
