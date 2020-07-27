// Firebase App (the core Firebase SDK) is always required
import firebase from "firebase/app";
// Used firebase products
import "firebase/firestore";
import "firebase/auth";

import { Interview } from "../models/Interview";

export class InterviewDao {

    //TODO ändern, sobald Auth implementiert!!!
    //static interviewDb = firebase.firestore().collection("users").doc(firebase.auth().currentUser?.uid).collection("interviews");
    static interviewDb = firebase.firestore().collection("users").doc("8shSQqwEjAh6GMnON7iAvhSHC3B3").collection("interviews");

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
        return this.interviewDb.doc(interviewId).get().then((interviewDoc) => {
            return interviewDoc.data() as Interview;
        })
    }

    static async getAllInterviews() {
        let interviews: Interview[] = [];
        await this.interviewDb.get().then((querySnapshot) => {
            querySnapshot.forEach((interviewDoc) => {
                let interview: Interview = interviewDoc.data() as Interview;
                interview.firebaseId = interviewDoc.id;
                interviews.push(interview);
            })
        })
        return interviews;
    }
}