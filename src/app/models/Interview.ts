// Firebase App (the core Firebase SDK) is always required
import firebase from "firebase/app";

export interface Interview {
  firebaseId: string;
  title: string;
  description: string;
  status: "Draft" | "Active" | "Archived";
  lastChangeDate: firebase.firestore.Timestamp;
  creationDate: firebase.firestore.Timestamp;
  interviewParts: InterviewPart[];
}

export interface InterviewPart {
  title: string;
  interviewQuestions: InterviewQuestion[];
}

export interface InterviewQuestion {
  question: string;
  answer?: string;
}
