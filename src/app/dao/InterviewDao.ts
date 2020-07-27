// Firebase App (the core Firebase SDK) is always required
import firebase from "firebase/app";
// Used firebase products
import "firebase/firestore";
import "firebase/auth";

import { Interview } from "../models/Interview";

export class InterviewDao {

    static interviewDb = firebase.firestore().collection("users").doc(firebase.auth().currentUser?.uid).collection("interviews");

    static addInterview(interview: Interview) {
        return this.interviewDb.doc().set(interview);
    }

    static updateInterview(interviewId: string, interview: Interview) {
        return this.interviewDb.doc(interviewId).update(interview);
    }

    static deleteInterview(interviewId: string) {
        return this.interviewDb.doc(interviewId).delete();
    }

    static getInterviewById(interviewId: string) {
        return this.interviewDb.doc(interviewId).get();
    }

    static getAllInterviews() {
        return this.interviewDb.get();
    }
}