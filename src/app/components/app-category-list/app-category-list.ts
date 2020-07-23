import { LitElement, html, css, customElement } from "lit-element";
import { alertController } from "@ionic/core";

@customElement("app-category-list")
class AppCategoryList extends LitElement {
  list: Array<string>;

  constructor() {
    super();
    this.list = [
      "Politik",
      "Sport",
      "Freizeit",
      "Bildung",
      "Urlaub",
      "Uni",
      "Münster",
      "Softwareentwicklung",
      "Ernährung",
      "Klima",
      "Corona",
      "Schützenfest",
      "Netflix",
      "Technologie",
      "Ausflugsziele",
      "New Work",
      "Wetter",
    ];
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
      ></ion-searchbar>
      <ion-content class="padding">
        <ion-list id="test">
          <ion-list-header>
            Fragen-Kategorien
          </ion-list-header>
          ${this.list.map((item, id) => {
            return html` <ion-item-sliding>
              <ion-item button @click=${this.onItemClick}>
                <ion-label>${item}</ion-label>
              </ion-item>
              <ion-item-options side="end">
                <ion-item-option
                  id="ion-option"
                  @click=${() => this.onClickDelete(item)}
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
  }

  onItemClick(event: any) {
    console.log("Item clicked: " + event.target.innerText);
    let nav: HTMLIonNavElement = document.querySelector(
      "ion-nav"
    ) as HTMLIonNavElement;
    nav.push("app-question-list", { categoryId: event.target.innerText });
  }

  onClickDelete(category: string) {
    // Import to entry the shadow root to get the reference on ion-list
    let array: HTMLIonListElement = this.shadowRoot?.querySelector(
      "ion-list"
    ) as HTMLIonListElement;
    array
      .closeSlidingItems()
      .then(() => {
        console.log("Category to delete: ", category);
        this.deleteCategory(category);
        this.showDeleteToast();
      })
      .catch((error) => {
        console.log("Error: ", error.message);
      });
  }

  async onFabClick() {
    console.log("OnFabClick");
    const alert = await alertController.create({
      header: "Kategorie hinzufügen",
      message: "Bitte Text eingeben",
      inputs: [
        {
          name: "category",
          placeholder: "Neue Kategorie",
        },
      ],
      buttons: [
        {
          text: "Abbrechen",
          role: "cancel",
          handler: () => {
            console.log("Confirm Cancel");
          },
        },
        {
          text: "Speichern",
          handler: (data) => {
            console.log("Confirm Ok");
            console.log("Category data: ", data.category);
            this.addCategory(data.category);
          },
        },
      ],
    });

    await alert.present();
  }

  // Array operations
  addCategory(category: string) {
    console.log("Passed category: " + category);
    this.list = [...this.list, category];
    this.requestUpdate();
  }

  deleteCategory(category: string) {
    const index = this.list.indexOf(category);
    if (index > -1) {
      this.list.splice(index, 1);
      this.requestUpdate();
    }
  }

  // Utils
  async showDeleteToast() {
    const toast = document.createElement("ion-toast");
    toast.message = "Kategorie wurde gelöscht!";
    toast.duration = 2000;

    document.body.appendChild(toast);
    return toast.present();
  }
}
