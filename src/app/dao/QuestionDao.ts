// Firebase App (the core Firebase SDK) is always required
import firebase from "firebase/app";
// Used firebase products
import "firebase/firestore";
import "firebase/auth";

import { Question } from "../models/Question";
import { UserDataService } from "../services/UserDataService";

export class QuestionDao {
  private static dbUsers = firebase.firestore().collection("users");

  static addQuestion(question: Question) {
    let doc = QuestionDao.dbUsers
      .doc(firebase.auth().currentUser?.uid)
      .collection("questioncategories")
      .doc(question.categoryId)
      .collection("questions")
      .doc();
    question.firebaseId = doc.id;
    UserDataService.updateLastQuestion(
      question.categoryId,
      question.firebaseId
    );
    return doc.set(question);
  }

  static updateQuestion(question: Question) {
    return QuestionDao.dbUsers
      .doc(firebase.auth().currentUser?.uid)
      .collection("questioncategories")
      .doc(question.categoryId)
      .collection("questions")
      .doc(question.firebaseId)
      .update(question);
  }

  static deleteQuestion(
    questionCategoryId: string | undefined,
    questionId: string | undefined
  ) {
    return QuestionDao.dbUsers
      .doc(firebase.auth().currentUser?.uid)
      .collection("questioncategories")
      .doc(questionCategoryId)
      .collection("questions")
      .doc(questionId)
      .delete();
  }

  static getQuestionByCategoryAndId(categoryId: string, questionId: string) {
    return QuestionDao.dbUsers
      .doc(firebase.auth().currentUser?.uid)
      .collection("questioncategories")
      .doc(categoryId)
      .collection("questions")
      .doc(questionId)
      .get()
      .then((questionDoc) => {
        let question: Question = questionDoc.data() as Question;
        question.firebaseId = questionId;
        question.categoryId = categoryId;
        return question;
      });
  }

  static async getAllQuestions(questionCategoryId: string | undefined) {
    let questions: Question[] = [];
    await QuestionDao.dbUsers
      .doc(firebase.auth().currentUser?.uid)
      .collection("questioncategories")
      .doc(questionCategoryId)
      .collection("questions")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((questionDoc) => {
          let question: Question = questionDoc.data() as Question;
          question.firebaseId = questionDoc.id;
          questions.push(question);
        });
      });
    return questions;
  }
}
