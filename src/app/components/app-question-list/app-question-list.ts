import {
  LitElement,
  html,
  css,
  customElement,
  property,
  TemplateResult,
} from "lit-element";
import { actionSheetController } from "@ionic/core";
import Hammer from "hammerjs";

import { Category } from "../../models/Category";
import { Question } from "../../models/Question";
import { QuestionDao } from "../../dao/QuestionDao";

@customElement("app-question-list")
class AppQuestionList extends LitElement {
  @property({ type: Object }) category = {} as Category;

  questions: Question[] = [];
  mcArray: Array<HammerManager>;

  constructor() {
    super();

    this.mcArray = [];
  }

  static get styles() {
    return css`
      #ion-option {
        --ion-color-primary: var(--ion-color-danger);
        --ion-color-primary-contrast: var(--ion-color-danger-contrast);
      }
      /* ion-card {
        height: 200px;
      } */
    `;
  }

  render() {
    return html`
      <app-toolbar backButton="true" defaultHref="/categorylist"></app-toolbar>
      <ion-content class="padding">
        <ion-list>
          <ion-list-header>Fragen zu ${this.category.name} </ion-list-header>
          ${this.questions.map((question, id) => {
            return html`<ion-item-sliding
              ><ion-item @click=${() => this.onItemClick(question)}>
                <ion-card>
                  <!-- <span>Photo by <a href="https://unsplash.com/@brucemars?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">bruce mars</a> on <a href="https://unsplash.com/s/photos/questions?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span> -->
                  <!-- <img src="src/assets/img/question.jpg" width="100%" /> -->
                  <ion-card-header>
                    <ion-card-subtitle>Question ${id + 1}</ion-card-subtitle>
                    <!-- <ion-card-title
                      >Kategorie: ${this.category.name}</ion-card-title
                    > -->
                  </ion-card-header>
                  <ion-card-content>
                    ${question.text}
                  </ion-card-content>
                </ion-card> </ion-item
              ><ion-item-options side="end"
                ><ion-item-option
                  id="ion-option"
                  @click=${() =>
                    this.onClickDelete(
                      question.firebaseId ? question.firebaseId : ""
                    )}
                  >Löschen</ion-item-option
                ></ion-item-options
              ></ion-item-sliding
            >`;
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
      updatable: true,
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

  async onItemPress(questionText: string) {
    const question = this.getQuestionByText(questionText);
    const questionId = question.firebaseId;
    const actionSheet = await actionSheetController.create({
      header: "Frage löschen",
      buttons: [
        {
          text: "Löschen",
          role: "destructive",
          handler: () => this.deleteQuestion(questionId),
        },
        { text: "Abbrechen", role: "cancel" },
      ],
    });

    await actionSheet.present();
  }

  onClickDelete(questionId: string) {
    let array: HTMLIonListElement = this.shadowRoot?.querySelector(
      "ion-list"
    ) as HTMLIonListElement;
    array.closeSlidingItems();
    this.deleteQuestion(questionId);
  }

  deleteQuestion(questionId: string | undefined) {
    QuestionDao.deleteQuestion(this.category.firebaseId, questionId)
      .then(() => {
        this.showToast("Frage wurde gelöscht");
        this.updateQuestions();
      })
      .catch((error) => {
        this.showToast(
          "Es ist ein Fehler aufgetreten. Bitte versuche es erneut!"
        );
        console.log("Error: ", error.message);
      });
  }

  getQuestionByText(questionText: string) {
    return this.questions.filter((question) => {
      return question.text === questionText;
    })[0];
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

  updated() {
    var items = this.shadowRoot?.querySelectorAll("ion-item");

    this.destroyHammerManager();

    items?.forEach((item) => {
      // Hammer instance for press gesture handling
      let mc = new Hammer(item);

      // Listen to events
      mc.on("press", (ev) => {
        const question = ev.target
          .closest("ion-item")
          ?.querySelector("ion-card-content")?.innerText;
        console.log("Question on Press: ", question);
        this.onItemPress(question ? question : "");
      });

      // Add to mcArray
      this.mcArray.push(mc);
    });
    console.log("MC Array after filling: ", this.mcArray);
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("ionViewWillEnter", this.updateQuestions);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("ionViewWillEnter", this.updateQuestions);
  }
}
