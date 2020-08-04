import { LitElement, html, css, customElement } from "lit-element";
import { until } from "lit-html/directives/until.js";
import { alertController, actionSheetController } from "@ionic/core";
import Hammer from "hammerjs";

import { Category } from "../../models/Category";
import { CategoryDao } from "../../dao/CategoryDao";
import { QuestionDao } from "../../dao/QuestionDao";
import { Question } from "../../models/Question";

@customElement("app-category-list")
class AppCategoryList extends LitElement {
  categories: Category[] = [];
  displayArray: Category[] = [];
  mcArray: Array<HammerManager>;

  constructor() {
    super();

    this.updateCategories();

    this.mcArray = [];
  }

  static get styles() {
    return css`
      #searchbar {
        background-color: var(--ion-color-light);
      }
      #ion-option {
        --ion-color-primary: var(--ion-color-danger);
        --ion-color-primary-contrast: var(--ion-color-danger-contrast);
      }
    `;
  }

  render() {
    return html`
      <app-toolbar></app-toolbar>
      <ion-searchbar
        @ionChange=${this.onChangeSearchbar}
        id="searchbar"
        animated
        autocomplete="on"
        clear-icon="undefined"
        inputmode="text"
      ></ion-searchbar>
      <ion-content class="padding">
        <ion-list id="test">
          <ion-list-header>
            Fragen-Kategorien
          </ion-list-header>
          ${this.displayArray.sort(this.sortAlphabetically).map((category) => {
            return html` <ion-item-sliding>
              <ion-item
                button
                @click=${() =>
                  this.onItemClick(
                    category.firebaseId ? category.firebaseId : ""
                  )}
              >
                <ion-label>${category.name}</ion-label>
                <ion-badge slot="end"
                  >${until(
                    this.getNumberOfQuestionsforCategory(
                      category.firebaseId ? category.firebaseId : ""
                    ),
                    0
                  )}</ion-badge
                >
              </ion-item>
              <ion-item-options side="end">
                <ion-item-option
                  id="ion-option"
                  @click=${() =>
                    this.onClickDelete(
                      category.firebaseId ? category.firebaseId : ""
                    )}
                  >Löschen</ion-item-option
                >
              </ion-item-options>
            </ion-item-sliding>`;
          })}
        </ion-list>
      </ion-content>
      <app-fab icon="add-outline" @click=${this.onFabClick}></app-fab>
    `;
  }

  onChangeSearchbar(event: any) {
    console.log(`Searchbar test: ${event.target.value}`);

    const query = event.target.value.toLowerCase();
    this.displayArray = this.categories.filter((item) => {
      return item.name.toLowerCase().indexOf(query) > -1;
    });
    this.requestUpdate();
  }

  onItemClick(categoryId: string) {
    let category: Category = {} as Category;
    CategoryDao.getCategoryById(categoryId).then((item) => {
      category = item;
      let nav: HTMLIonNavElement = document.querySelector(
        "ion-nav"
      ) as HTMLIonNavElement;
      nav.push("app-question-list", { category: category });
    });
  }

  onClickDelete(categoryId: string) {
    // Important to entry the shadow root to get the reference on ion-list
    let array: HTMLIonListElement = this.shadowRoot?.querySelector(
      "ion-list"
    ) as HTMLIonListElement;
    array.closeSlidingItems();
    this.deleteCategory(categoryId);
  }

  async onItemPress(categoryText: string) {
    const category = this.getCategoryByName(categoryText);
    const categoryId = category.firebaseId;
    const actionSheet = await actionSheetController.create({
      header: "Kategorie",
      buttons: [
        {
          text: "Löschen",
          role: "destructive",
          handler: () => this.deleteCategory(categoryId),
        },
        {
          text: "Umbenennen",
          handler: () => this.onRenameClick(categoryId),
        },
        { text: "Abbrechen", role: "cancel" },
      ],
    });

    await actionSheet.present();
  }

  async onFabClick() {
    const alert = await alertController.create({
      header: "Kategorie hinzufügen",
      message: "Bitte Text eingeben",
      inputs: [
        {
          name: "categoryname",
          placeholder: "Neue Kategorie",
        },
      ],
      buttons: [
        {
          text: "Abbrechen",
          role: "cancel",
        },
        {
          text: "Speichern",
          handler: (data) => {
            this.addCategory(data.categoryname);
          },
        },
      ],
    });

    await alert.present();
  }

  addCategory(categoryname: string) {
    let category: Category = { name: categoryname };
    CategoryDao.addCategory(category);
    this.clearSearchbar();
    this.updateCategories();
  }

  deleteCategory(categoryId: string | undefined) {
    CategoryDao.deleteCategory(categoryId)
      .then(() => {
        this.showToast("Kategorie wurde gelöscht!");
        this.clearSearchbar();
        this.updateCategories();
      })
      .catch((error) => {
        this.showToast(
          "Es ist ein Fehler aufgetreten. Bitte versuche es erneut!"
        );
        console.log("Error: ", error.message);
      });
  }

  renameCategory(categoryId: string | undefined, newName: string) {
    const category: Category = {
      name: newName,
    };
    CategoryDao.updateCategory(categoryId, category)
      .then(() => {
        this.updateCategories();
        this.clearSearchbar();
        this.showToast("Kategorie umbenannt!");
      })
      .catch((error) => {
        this.showToast(
          "Es ist ein Fehler aufgetreten. Bitte versuche es erneut!"
        );
        console.log("Error: ", error.message);
      });
  }

  getCategoryByName(categoryName: string) {
    return this.categories.filter((category) => {
      return category.name === categoryName;
    })[0];
  }

  async onRenameClick(categoryId: string | undefined) {
    const alert = await alertController.create({
      header: "Kategorie umbenennen",
      message: "Bitte Text eingeben",
      inputs: [
        {
          name: "categoryname",
          placeholder: "Neuer Name",
        },
      ],
      buttons: [
        {
          text: "Abbrechen",
          role: "cancel",
        },
        {
          text: "Speichern",
          handler: (data) => {
            this.renameCategory(categoryId, data.categoryname);
          },
        },
      ],
    });

    await alert.present();
  }

  clearSearchbar() {
    let searchbar = this.shadowRoot?.querySelector(
      "ion-searchbar"
    ) as HTMLIonSearchbarElement;
    searchbar?.value ? (searchbar.value = "") : "";
  }

  updateCategories() {
    CategoryDao.getAllCategories().then((categories) => {
      this.categories = categories;
      this.displayArray = categories;
      this.requestUpdate();
    });
  }

  async getNumberOfQuestionsforCategory(categoryId: string) {
    let questions = await QuestionDao.getAllQuestions(categoryId);
    return questions.length;
  }

  // Utils
  async showToast(message: string) {
    const toast = document.createElement("ion-toast");
    toast.message = message;
    toast.duration = 2000;

    document.body.appendChild(toast);
    return toast.present();
  }

  destroyHammerManager() {
    this.mcArray.forEach((manager) => manager.destroy());
    this.mcArray = [];
    console.log("MC Array after destroying: ", this.mcArray);
  }

  sortAlphabetically(a: Category, b: Category) {
    let nameA = a.name.toLowerCase();
    let nameB = b.name.toLowerCase();
    return nameA > nameB ? 1 : nameA < nameB ? -1 : 0;
  }

  updated() {
    var items = this.shadowRoot?.querySelectorAll("ion-item");

    this.destroyHammerManager();

    items?.forEach((item) => {
      // Hammer instance for press gesture handling
      let mc = new Hammer(item);

      // Listen to events
      mc.on("press", (ev) => {
        const category = ev.target.innerText;
        this.onItemPress(category);
      });

      // Add to mcArray
      this.mcArray.push(mc);
    });
    console.log("MC Array after filling: ", this.mcArray);
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("ionViewWillEnter", this.updateCategories);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("ionViewWillEnter", this.updateCategories);
  }
}
