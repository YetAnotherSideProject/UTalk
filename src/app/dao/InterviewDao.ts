// Firebase App (the core Firebase SDK) is always required
import firebase from "firebase/app";
// Used firebase products
import "firebase/firestore";
import "firebase/auth";

import { Interview } from "../models/Interview";

export class InterviewDao {
  static usersDb = firebase.firestore().collection("users");

  static addInterview(interviewTitle: string) {
    return this.usersDb
      .doc(firebase.auth().currentUser?.uid)
      .collection("interviews")
      .add({ title: interviewTitle });
  }

  static updateInterview(interview: Interview) {
    return this.usersDb
      .doc(firebase.auth().currentUser?.uid)
      .collection("interviews")
      .doc(interview.firebaseId)
      .update(interview);
  }

  static deleteInterview(interview: Interview) {
    return this.usersDb
      .doc(firebase.auth().currentUser?.uid)
      .collection("interviews")
      .doc(interview.firebaseId)
      .delete();
  }

  static getInterviewById(interviewId: string) {
    return this.usersDb
      .doc(firebase.auth().currentUser?.uid)
      .collection("interviews")
      .doc(interviewId)
      .get()
      .then((interviewDoc) => {
        let interview: Interview = interviewDoc.data() as Interview;
        interview.firebaseId = interviewDoc.id;
        return interview;
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

  static async getInterviewsWhere(
    field: firebase.firestore.FieldPath,
    operator: firebase.firestore.WhereFilterOp,
    operand: any
  ) {
    let interviews: Interview[] = [];
    await InterviewDao.usersDb
      .doc(firebase.auth().currentUser?.uid)
      .collection("interviews")
      .where(field, operator, operand)
      .get()
      .then((querySnap) => {
        querySnap.forEach((interviewDoc) => {
          let interview: Interview = interviewDoc.data() as Interview;
          interview.firebaseId = interviewDoc.id;
          interviews.push(interview);
        });
      });
    return interviews;
  }
}
