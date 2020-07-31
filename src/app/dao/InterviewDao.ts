// Firebase App (the core Firebase SDK) is always required
import firebase from "firebase/app";
// Used firebase products
import "firebase/firestore";
import "firebase/auth";

import { Interview } from "../models/Interview";

export class InterviewDao {
  static usersDb = firebase.firestore().collection("users");

  static addInterview(interview: Interview) {
    return this.usersDb
      .doc(firebase.auth().currentUser?.uid)
      .collection("interviews")
      .doc()
      .set(interview);
  }

  static updateInterview(interviewId: string, interview: Interview) {
    return this.usersDb
      .doc(firebase.auth().currentUser?.uid)
      .collection("interviews")
      .doc(interviewId)
      .update(interview);
  }

  static deleteInterview(interviewId: string) {
    return this.usersDb
      .doc(firebase.auth().currentUser?.uid)
      .collection("interviews")
      .doc(interviewId)
      .delete();
  }

  static getInterviewById(interviewId: string) {
    return this.usersDb
      .doc(firebase.auth().currentUser?.uid)
      .collection("interviews")
      .doc(interviewId)
      .get()
      .then((interviewDoc) => {
        return interviewDoc.data() as Interview;
      });
  }

  static async getAllInterviews() {
    let interviews: Interview[] = [];
    await this.usersDb
      .doc(firebase.auth().currentUser?.uid)
      .collection("interviews")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((interviewDoc) => {
          let interview: Interview = interviewDoc.data() as Interview;
          interview.firebaseId = interviewDoc.id;
          interviews.push(interview);
        });
      });
    return interviews;
  }
}
