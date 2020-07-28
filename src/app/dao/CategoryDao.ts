// Firebase App (the core Firebase SDK) is always required
import firebase from "firebase/app";
// Used firebase products
import "firebase/firestore";
import "firebase/auth";

import { Category } from "../models/Category";

export class CategoryDao {
  //TODO ändern, sobald Auth implementiert!!!
  //static categoryDb = firebase.firestore().collection("users").doc(firebase.auth().currentUser?.uid).collection("interviews");
  static categoryDb = firebase
    .firestore()
    .collection("users")
    .doc("8shSQqwEjAh6GMnON7iAvhSHC3B3")
    .collection("questioncategories");

  static addCategory(category: Category) {
    return this.categoryDb.doc().set(category);
  }

  static updateCategory(categoryId: string, category: Category) {
    return this.categoryDb.doc(categoryId).update(category);
  }

  static deleteCategory(categoryId: string | undefined) {
    return this.categoryDb.doc(categoryId).delete();
  }

  static getCategoryById(categoryId: string) {
    return this.categoryDb
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
    await this.categoryDb.get().then((querySnapshot) => {
      querySnapshot.forEach((categoryDoc) => {
        let category: Category = categoryDoc.data() as Category;
        category.firebaseId = categoryDoc.id;
        categories.push(category);
      });
    });
    return categories;
  }
}
