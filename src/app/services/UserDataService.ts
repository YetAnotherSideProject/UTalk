// Firebase App (the core Firebase SDK) is always required
import firebase from "firebase/app";

import { UserDataDao } from "../dao/UserDataDao";
import { InterviewDao } from "../dao/InterviewDao";
import { QuestionDao } from "../dao/QuestionDao";
import { Question } from "../models/Question";

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

  static async getLastQuestions() {
    let questions: Question[] = [];
    const questionIds = (await UserDataDao.getUserData()).lastQuestions;
    await Promise.all(
      questionIds.map(async (questionId) => {
        questions.push(
          await QuestionDao.getQuestionByCategoryAndId(
            questionId.categoryId,
            questionId.questionId
          )
        );
      })
    );
    return questions;
  }

  static async updateLastQuestion(categoryId: string, questionId: string) {
    let userData = await UserDataDao.getUserData();
    let last = { categoryId, questionId };
    //Wenn es noch keine letzten gibt als einziges anlegen
    if (userData.lastQuestions === undefined) {
      userData.lastQuestions = [last];
    } else {
      let index = userData.lastQuestions.indexOf(last);
      //Wenn es bereits in der liste vorhanden ist und bereits auf platz 1 nichts tun, ansonsten an alter Stelle entfernen und an neuer hinzufügen
      if (index > -1) {
        if (index === 0) {
          return;
        }
        userData.lastQuestions.splice(index, 1);
      } else if (userData.lastQuestions.length >= 5) {
        userData.lastQuestions.pop();
      }
      userData.lastQuestions.unshift(last);
    }
    await UserDataDao.updateUserData(userData);
  }
}
