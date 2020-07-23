import {
  LitElement,
  html,
  customElement,
  property,
  TemplateResult,
} from "lit-element";
import NavParams from "@ionic/core";

@customElement("app-question-list")
class AppQuestionList extends LitElement {
  @property({ type: String }) categoryId = "";
  array: Array<TemplateResult> = [];

  constructor() {
    super();
    this.generateMockItems();
  }

  render() {
    return html`
      <app-toolbar backButton="true" defaultHref="/categorylist"></app-toolbar>
      <ion-content class="padding">
        <ion-list>
          <ion-list-header>
            Fragen zu ${this.categoryId}
          </ion-list-header>
          ${this.array.map((item, id) => {
            return html`${item}`;
          })}
        </ion-list>
      </ion-content>
      <app-fab
        icon="add-outline"
        .onFabClick=${() => this.addQuestion()}
      ></app-fab>
    `;
  }

  addQuestion() {
    let nav: HTMLIonNavElement = document.querySelector(
      "ion-nav"
    ) as HTMLIonNavElement;

    nav.push("app-question-detail", {
      editable: true,
      categoryId: this.categoryId,
    });
  }

  generateMockItems() {
    for (let index = 0; index < 19; index++) {
      this.array.push(html`
        <ion-item @click=${this.onItemClick}>
          <ion-card>
            <!-- <span>Photo by <a href="https://unsplash.com/@brucemars?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">bruce mars</a> on <a href="https://unsplash.com/s/photos/questions?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span> -->
            <img src="src/assets/img/question.jpg" width="100%" />
            <ion-card-header>
              <ion-card-subtitle>Question ${index}</ion-card-subtitle>
              <ion-card-title>Kategorie: Sport</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              Wie groß ist der Frust nach der verpassten Gelegenheit des
              Aufstiegs in die Bezirksliga, nachdem der SC Münster 08 II
              zurückgezogen hat?
            </ion-card-content>
          </ion-card>
        </ion-item>
      `);
    }
  }

  onItemClick() {
    let nav: HTMLIonNavElement = document.querySelector(
      "ion-nav"
    ) as HTMLIonNavElement;

    nav.push("app-question-detail", { categoryId: this.categoryId });
  }
}
