import { InterviewQuestion } from "./InterviewQuestion";

export interface Interview {
    title: string;
    interviewQuestions?: InterviewQuestion[];
}