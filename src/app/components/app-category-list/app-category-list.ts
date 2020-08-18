import {
  LitElement,
  html,
  css,
  customElement,
  internalProperty,
} from "lit-element";
import { until } from "lit-html/directives/until.js";
import {
  alertController,
  actionSheetController,
  SegmentChangeEventDetail,
} from "@ionic/core";
import Hammer from "hammerjs";

import { Category } from "../../models/Category";
import { CategoryDao } from "../../dao/CategoryDao";
import { QuestionDao } from "../../dao/QuestionDao";

@customElement("app-category-list")
class AppCategoryList extends LitElement {
  @internalProperty() categories: Category[] = [];
  @internalProperty() statusFilter: string = "All";
  @internalProperty() searchQuery: string = "";
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
      ion-segment {
        background: var(--ion-color-light);
      }
      ion-item > ion-button {
        --background: white;
        --background-activated: white;
      }
      #statusIcon_Favorite {
        fill: gold;
      }
      #statusIcon_Neutral {
        fill: var(--ion-color-light);
      }
      #ion-option-start {
        --ion-color-primary: var(--ion-color-medium);
        --ion-color-primary-contrast: var(--ion-color-medium-contrast);
      }
      #ion-option-end {
        --ion-color-primary: var(--ion-color-danger);
        --ion-color-primary-contrast: var(--ion-color-danger-contrast);
      }
    `;
  }

  render() {
    const filteredInterviews = this.categories
      .filter(
        (category) =>
          this.statusFilter === "All" || category.status === this.statusFilter
      )
      .filter((category) =>
        category.name.toLowerCase().includes(this.searchQuery)
      )
      .sort(this.sortAlphabetically);

    return html`
      <app-toolbar></app-toolbar>
      <ion-searchbar
        @ionChange=${(event: any) =>
          (this.searchQuery = event.target.value.toLowerCase())}
        id="searchbar"
        animated
        autocomplete="on"
        clear-icon="trash-outline"
        inputmode="text"
      ></ion-searchbar>
      <ion-segment
        value="All"
        @ionChange=${({ detail }: { detail: SegmentChangeEventDetail }) => {
          console.log("Detail Ion Segment: ", detail.value);
          this.statusFilter = detail.value || "All";
        }}
      >
        <ion-segment-button value="All">
          <ion-label>All</ion-label>
        </ion-segment-button>
        <ion-segment-button value="Favorite">
          <ion-label>Favoriten</ion-label>
        </ion-segment-button>
      </ion-segment>
      <ion-content class="padding">
        <ion-list id="test">
          ${filteredInterviews.map((category) => {
            return html` <ion-item-sliding>
              <ion-item-options side="start">
                <ion-item-option
                  id="ion-option-start"
                  @click=${() => {
                    this.onRenameClick(category);
                  }}
                  >Umbenennen</ion-item-option
                >
              </ion-item-options>
              <ion-item
                button
                detail
                @click=${() =>
                  this.onItemClick(
                    category.firebaseId ? category.firebaseId : ""
                  )}
              >
                <ion-button
                  slot="start"
                  @click=${(event: any) => {
                    event.stopPropagation();
                    this.toggleCategoryStatus(category);
                  }}
                >
                  <ion-icon
                    id="statusIcon_${category.status}"
                    name="star"
                  ></ion-icon>
                </ion-button>
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
                  id="ion-option-end"
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
    this.closeSlider();
    this.deleteCategory(categoryId);
  }

  closeSlider() {
    // Important to entry the shadow root to get the reference on ion-list
    let array: HTMLIonListElement = this.shadowRoot?.querySelector(
      "ion-list"
    ) as HTMLIonListElement;
    array.closeSlidingItems();
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
          handler: () => this.onRenameClick(category),
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
    let category: Category = { name: categoryname, status: "Neutral" };
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

  renameCategory(category: Category | undefined, newName: string) {
    const newCategory: Category = {
      name: newName,
      status: category?.status || "Neutral",
    };
    CategoryDao.updateCategory(category?.firebaseId, newCategory)
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

  toggleCategoryStatus(category: Category | undefined) {
    const newStatus = category?.status === "Neutral" ? "Favorite" : "Neutral";
    const newCategory: Category = {
      ...category,
      status: newStatus,
    } as Category;
    CategoryDao.updateCategory(category?.firebaseId, newCategory)
      .then(() => {
        this.updateCategories();
        this.clearSearchbar();
        newStatus === "Neutral"
          ? this.showToast("Aus Favoriten entfernt")
          : this.showToast("Zu Favoriten hinzugefügt");
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

  async onRenameClick(category: Category | undefined) {
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
            this.closeSlider();
            this.renameCategory(category, data.categoryname);
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
