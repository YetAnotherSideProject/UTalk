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
    if (
      userData.lastInterviews === undefined ||
      userData.lastInterviews.length === 0
    ) {
      userData.lastInterviews = [interviewId];
    } else {
      let index = userData.lastInterviews.indexOf(interviewId);
      //Wenn es bereits in der liste vorhanden ist und bereits auf platz 1 nichts tun, ansonsten an alter Stelle entfernen und an neuer hinzufügen
      if (index > -1) {
        if (index === 0) {
          return;
        }
        userData.lastInterviews.splice(index, 1);
      }
      if (userData.lastInterviews.length >= 5) {
        userData.lastInterviews.pop();
      }
      userData.lastInterviews.unshift(interviewId);
    }
    await UserDataDao.updateUserData(userData);
  }

  static async getLastQuestions() {
    const questionIds = (await UserDataDao.getUserData()).lastQuestions;
    return Promise.all(
      questionIds.map((questionId) =>
        QuestionDao.getQuestionByCategoryAndId(
          questionId.categoryId,
          questionId.questionId
        )
      )
    );
  }

  static async updateLastQuestion(categoryId: string, questionId: string) {
    let userData = await UserDataDao.getUserData();
    let last = { categoryId, questionId };
    //Wenn es noch keine letzten gibt als einziges anlegen
    if (
      userData.lastQuestions === undefined ||
      userData.lastQuestions.length === 0
    ) {
      userData.lastQuestions = [last];
    } else {
      let existing = false;
      for (let i: number = 0; i < userData.lastQuestions.length; i++) {
        if (
          last.categoryId === userData.lastQuestions[i].categoryId &&
          last.questionId === userData.lastQuestions[i].questionId
        ) {
          existing = true;
          //Frage ist bereits in den letzten 5 vorhanden
          if (i === 0) {
            //Frage ist bereits an 1. Stelle nichts zutun
            return;
          } else {
            //Frage an der Stelle entfernen
            userData.lastQuestions.splice(i, 1);
          }
        }
      }
      if (!existing) {
        //Die Frage noch nicht drin
        if (userData.lastQuestions.length >= 5) {
          //Wenn bereits mind. 5 OBjekte darin sind das letzte entfernen, bevor neues vorne angehängt wird
          userData.lastQuestions.pop();
        }
      }
      //Vorne einfügen
      userData.lastQuestions.unshift(last);
    }

    UserDataDao.updateUserData(userData);
  }
}
