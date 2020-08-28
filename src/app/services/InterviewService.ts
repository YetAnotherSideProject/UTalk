// Firebase App (the core Firebase SDK) is always required
import firebase from "firebase/app";

import {
  Interview,
  InterviewPart,
  InterviewQuestion,
} from "../models/Interview";
import { InterviewDao } from "../dao/InterviewDao";
import { QuestionDao } from "../dao/QuestionDao";

export class InterviewService {
  static async getAllInterviews() {
    return InterviewDao.getAllInterviews();
  }

  static async getAllDraftInterviews() {
    return InterviewDao.getInterviewsWhere("status", "==", "Draft");
  }

  static async addInterview(interviewTitle: string) {
    if (interviewTitle !== undefined && interviewTitle !== "") {
      //Create basic interview template
      const interview: Interview = {
        firebaseId: "",
        title: interviewTitle,
        description: "Beschreibung ist hier ...",
        status: "Draft",
        creationDate: firebase.firestore.Timestamp.fromDate(new Date()),
        lastChangeDate: firebase.firestore.Timestamp.fromDate(new Date()),
        interviewParts: [
          {
            title: "Part I",
            interviewQuestions: [
              { question: "Frage 1" },
              { question: "Frage 2" },
            ],
          },
          {
            title: "Part II",
            interviewQuestions: [{ question: "Frage 3" }],
          },
        ],
      };
      await InterviewDao.addInterview(interview);
    }
  }

  static async renameInterview(interview: Interview, newTitle: string) {
    if (newTitle !== interview.title) {
      interview.title = newTitle;
      await InterviewDao.updateInterview(interview);
    }
  }

  static async addCategoryToInterview(
    interview: Interview,
    categoryName: string,
    categoryId: string
  ) {
    let newPart: InterviewPart = {
      title: categoryName,
      interviewQuestions: [],
    };
    let questions = await QuestionDao.getAllQuestions(categoryId);
    questions.forEach((question) => {
      newPart.interviewQuestions.push({
        question: question.text,
      } as InterviewQuestion);
    });
    interview.interviewParts.push(newPart);
    InterviewService.updateInterview(interview);
  }

  static async updateInterview(interview: Interview) {
    interview.lastChangeDate = firebase.firestore.Timestamp.fromDate(
      new Date()
    );
    await InterviewDao.updateInterview(interview);
  }

  static async deleteInterview(interview: Interview) {
    await InterviewDao.deleteInterview(interview);
  }
}
