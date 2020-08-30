// Firebase App (the core Firebase SDK) is always required
import firebase from "firebase/app";
// Used firebase products
import "firebase/firestore";
import "firebase/auth";

import { Category } from "../models/Question";

export class CategoryDao {
  private static dbUsers = firebase.firestore().collection("users");

  static addCategory(category: Category) {
    return this.dbUsers
      .doc(firebase.auth().currentUser?.uid)
      .collection("questioncategories")
      .doc()
      .set(category);
  }

  static updateCategory(categoryId: string | undefined, category: Category) {
    return this.dbUsers
      .doc(firebase.auth().currentUser?.uid)
      .collection("questioncategories")
      .doc(categoryId)
      .update(category);
  }

  static deleteCategory(categoryId: string | undefined) {
    return this.dbUsers
      .doc(firebase.auth().currentUser?.uid)
      .collection("questioncategories")
      .doc(categoryId)
      .delete();
  }

  static getCategoryById(categoryId: string) {
    return this.dbUsers
      .doc(firebase.auth().currentUser?.uid)
      .collection("questioncategories")
      .doc(categoryId)
      .get()
      .then((categoryDoc) => {
        console.log("Firebase category doc: ", categoryDoc.data());
        let category: Category = categoryDoc.data() as Category;
        category.firebaseId = categoryId;
        return category;
      });
  }

  static async getAllCategories() {
    let categories: Category[] = [];
    await this.dbUsers
      .doc(firebase.auth().currentUser?.uid)
      .collection("questioncategories")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((categoryDoc) => {
          let category: Category = categoryDoc.data() as Category;
          category.firebaseId = categoryDoc.id;
          categories.push(category);
        });
      });
    return categories;
  }
}
