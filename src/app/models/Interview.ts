import { InterviewQuestion } from "./InterviewQuestion";

export interface Interview {
  firebaseId: string;
  title: string;
  interviewQuestions?: InterviewQuestion[];
}
