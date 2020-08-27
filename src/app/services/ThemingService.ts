// Firebase App (the core Firebase SDK) is always required
import firebase from "firebase/app";
// Used firebase products
import "firebase/firestore";
import "firebase/auth";

import { ThemingDao } from "../dao/ThemingDao";
import { Theming } from "../models/Theming";

export class ThemingService {
  static async activateDarkModeConfig() {
    ThemingDao.getDarkMode()
      .then((theming) => {
        document.body.classList.toggle("dark", theming.darkMode);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  static async getDarkModeConfig() {
    return await ThemingDao.getDarkMode();
  }

  static async updateDarkMode(theming: Theming) {
    ThemingDao.setDarkMode(theming);
    document.body.classList.toggle("dark", theming.darkMode);
  }
}
