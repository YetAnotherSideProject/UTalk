import { LitElement, html, css, customElement } from "lit-element";

@customElement("app-category-list")
class AppCategoryList extends LitElement {
  list: Array<string>;

  constructor() {
    super();
    this.list = [
      "Sport",
      "Politik",
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
        <ion-list>
          <ion-list-header>
            Fragen-Kategorien
          </ion-list-header>
          ${this.list.map((item, id) => {
            return html`<ion-item button @click=${this.onItemClick}
              ><ion-label>${item}</ion-label></ion-item
            >`;
          })}
        </ion-list>
      </ion-content>
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
}
