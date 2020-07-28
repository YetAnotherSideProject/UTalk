// Firebase App (the core Firebase SDK) is always required
import firebase from "firebase/app";
// Used firebase products
import "firebase/firestore";
import "firebase/auth";

import { Question } from "../models/Question";

export class QuestionDao {
  //TODO ändern, sobald Auth implementiert!!!
  //static categoryDb = firebase.firestore().collection("users").doc(firebase.auth().currentUser?.uid).collection("interviews");
  static categoryDb = firebase
    .firestore()
    .collection("users")
    .doc("8shSQqwEjAh6GMnON7iAvhSHC3B3")
    .collection("questioncategories");

  static addQuestion(
    questionCategoryId: string | undefined,
    question: Question
  ) {
    return this.categoryDb
      .doc(questionCategoryId)
      .collection("questions")
      .doc()
      .set(question);
  }

  static updateQuestion(
    questionCategoryId: string,
    questionId: string,
    question: Question
  ) {
    return this.categoryDb
      .doc(questionCategoryId)
      .collection("questions")
      .doc(questionId)
      .update(question);
  }

  static deleteQuestion(
    questionCategoryId: string,
    questionId: string | undefined
  ) {
    return this.categoryDb
      .doc(questionCategoryId)
      .collection("questions")
      .doc(questionId)
      .delete();
  }

  static getCategoryById(questionCategoryId: string, questionId: string) {
    return this.categoryDb
      .doc(questionCategoryId)
      .collection("questions")
      .doc(questionId)
      .get()
      .then((questionDoc) => {
        return questionDoc.data() as Question;
      });
  }

  static async getAllQuestions(questionCategoryId: string | undefined) {
    let questions: Question[] = [];
    await this.categoryDb
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
