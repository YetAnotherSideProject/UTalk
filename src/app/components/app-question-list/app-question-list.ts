import {
  LitElement,
  html,
  customElement,
  property,
  TemplateResult,
} from "lit-element";

import { Category } from "../../models/Category";
import { Question } from "../../models/Question";
import { QuestionDao } from "../../dao/QuestionDao";
import { CategoryDao } from "../../dao/CategoryDao";

@customElement("app-question-list")
class AppQuestionList extends LitElement {
  @property({ type: Object }) category = {} as Category;

  questions: Question[] = [];

  array: Array<TemplateResult> = [];

  constructor() {
    super();
  }

  render() {
    return html`
      <app-toolbar backButton="true" defaultHref="/categorylist"></app-toolbar>
      <ion-content class="padding">
        <ion-list>
          <ion-list-header>Fragen zu ${this.category.name} </ion-list-header>
          ${this.questions.map((question, id) => {
            return html`<ion-item @click=${() => this.onItemClick(question)}>
              <ion-card>
                <!-- <span>Photo by <a href="https://unsplash.com/@brucemars?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">bruce mars</a> on <a href="https://unsplash.com/s/photos/questions?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span> -->
                <img src="src/assets/img/question.jpg" width="100%" />
                <ion-card-header>
                  <ion-card-subtitle>Question ${id}</ion-card-subtitle>
                  <ion-card-title
                    >Kategorie: ${this.category.name}</ion-card-title
                  >
                </ion-card-header>
                <ion-card-content>
                  ${question.text}
                </ion-card-content>
              </ion-card>
            </ion-item>`;
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
      category: this.category,
    });
  }

  updateQuestions() {
    QuestionDao.getAllQuestions(this.category.firebaseId).then((questions) => {
      this.questions = questions;
      this.requestUpdate();
    });
  }

  onItemClick(question: Question) {
    let nav: HTMLIonNavElement = document.querySelector(
      "ion-nav"
    ) as HTMLIonNavElement;

    nav.push("app-question-detail", {
      category: this.category,
      question: question,
    });
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("ionViewWillEnter", this.updateQuestions);
    this.updateQuestions();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("ionViewWillEnter", this.updateQuestions);
  }
}
