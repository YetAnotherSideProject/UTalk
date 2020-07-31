// Firebase App (the core Firebase SDK) is always required
import firebase from "firebase/app";

import { UserDataDao } from "../dao/UserDataDao";
import { InterviewDao } from "../dao/InterviewDao";

export class UserDataService {
  static async getLastInterviews() {
    let interviewIds = (await UserDataDao.getUserData()).lastInterviews;
    if (interviewIds.length <= 0) {
      return [];
    }

    return await InterviewDao.getInterviewsWhere(
      firebase.firestore.FieldPath.documentId(),
      "in",
      interviewIds
    );
  }

  static async updateLastInterview(interviewId: string) {
    let userData = await UserDataDao.getUserData();
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
    await UserDataDao.updateUserData(userData);
  }
}
