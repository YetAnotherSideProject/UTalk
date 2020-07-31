// Firebase App (the core Firebase SDK) is always required
import firebase, { User } from "firebase/app";
// Used firebase products
import "firebase/firestore";
import { UserData } from "../models/UserData";
import { Interview } from "../models/Interview";

export class UserDataService {
  private static dbUsers = firebase.firestore().collection("users");

  static async getLastInterviews() {
    let interviewIds = (await this.getUserData()).lastInterviews;
    if (interviewIds.length <= 0) {
      return [];
    }

    let interviews: Interview[] = [];
    await UserDataService.dbUsers
      .doc(firebase.auth().currentUser?.uid)
      .collection("interviews")
      .where(firebase.firestore.FieldPath.documentId(), "in", interviewIds)
      .get()
      .then((querySnap) => {
        querySnap.forEach((doc) => {
          interviews.push(doc.data() as Interview);
        });
      });
    return interviews;
  }

  static async updateLastInterview(interviewId: string) {
    let userData = await this.getUserData();
    //Wenn es noch keine letzten gibt als einziges anlegen
    if (userData.lastInterviews === undefined) {
      userData.lastInterviews = [interviewId];
    } else {
      let index = userData.lastInterviews.indexOf(interviewId);
      //Wenn es bereits in der liste vorhanden ist und bereits auf platz 1 nichts tun, ansonsten an alter Stelle entfernen und an neuer hinzufügen
      if (index > -1) {
        if (index === 0) {
          return;
        }
        userData.lastInterviews.splice(index, 1);
      } else if (userData.lastInterviews.length >= 5) {
        userData.lastInterviews.pop();
      }
      userData.lastInterviews.unshift(interviewId);
    }
    await UserDataService.dbUsers
      .doc(firebase.auth().currentUser?.uid)
      .update(userData);
  }

  private static async getUserData() {
    return UserDataService.dbUsers
      .doc(firebase.auth().currentUser?.uid)
      .get()
      .then((doc) => {
        return doc.data() as UserData;
      });
  }
}
