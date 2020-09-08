import {
  LitElement,
  html,
  css,
  customElement,
  property,
  internalProperty,
} from "lit-element";
import { actionSheetController } from "@ionic/core";
import Hammer from "hammerjs";

import { Question, Category } from "../../models/Question";
import { QuestionDao } from "../../dao/QuestionDao";

@customElement("app-question-list")
class AppQuestionList extends LitElement {
  @property({ type: Object }) category = {} as Category;
  @internalProperty() isFooterActive: boolean = false;

  questions: Question[] = [];
  mcArray: Array<HammerManager>;

  constructor() {
    super();

    this.mcArray = [];
  }

  static get styles() {
    return css`
      .questions__questionCard {
        width: 100%;
      }
      .questions__optionDelete {
        --ion-color-primary: var(--ion-color-danger);
        --ion-color-primary-contrast: var(--ion-color-danger-contrast);
      }
      .questions__footer {
        position: fixed;
        bottom: 0px;
        z-index: 1000;
      }
      .questions__footerToolbar {
        --background: var(--ion-color-medium);
        padding: 1em;
      }
      .questions__footerText {
        font-size: 1.5em;
      }
    `;
  }

  render() {
    return html`
      <app-toolbar
        backButton="true"
        defaultHref="/categorylist"
        infoButton="true"
        .onInfoClick=${() => this.toggleFooter()}
      ></app-toolbar>
      <ion-content @click=${() => this.closeFooter()} class="padding">
        <ion-list>
          <ion-list-header>Fragen zu ${this.category.name} </ion-list-header>
          ${this.questions.map((question, id) => {
            return html`<ion-item-sliding
              ><ion-item @click=${() => this.onItemClick(question)}>
                <ion-card class="questions__questionCard">
                  <ion-card-header>
                    <ion-card-subtitle>Question ${id + 1}</ion-card-subtitle>
                  </ion-card-header>
                  <ion-card-content> ${question.text} </ion-card-content>
                </ion-card> </ion-item
              ><ion-item-options side="end"
                ><ion-item-option
                  class="questions__optionDelete"
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
        ${this.isFooterActive
          ? html` <ion-footer class="questions__footer">
              <ion-toolbar class="questions__footerToolbar">
                <h1 class="questions__footerText">Info</h1>
                <p>
                  Gib hier mit Hilfe des Floating Action Buttons unten rechts
                  deine gewünschte Frage ein. Für weitere Aktionen drücke lange
                  auf eine Kategorie oder swipe nach links oder rechts.
                </p>
              </ion-toolbar>
            </ion-footer>`
          : html``}
      </ion-content>
      <app-fab
        icon="add-outline"
        .onFabClick=${() => this.addQuestion()}
      ></app-fab>
    `;
  }

  toggleFooter() {
    this.isFooterActive = !this.isFooterActive;
  }

  closeFooter() {
    this.isFooterActive = false;
  }

  // TODO
  // Bug --> Bei Zurücknavigation von questiondetail wird nach Hinzufügen einer neuen Frage die questionlist übersprungen und weiter zur categorylist navigiert
  addQuestion() {
    let nav: HTMLIonNavElement = document.querySelector(
      "ion-nav"
    ) as HTMLIonNavElement;

    nav.push("app-question-detail", {
      category: this.category,
      question: {
        firebaseId: "",
        categoryId: this.category.firebaseId,
        text: "",
      },
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
      updatable: true,
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

  deleteQuestion(questionId: string) {
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
        this.onItemPress(question ? question : "");
      });

      // Add to mcArray
      this.mcArray.push(mc);
    });
  }

  connectedCallback() {
    super.connectedCallback();

    // Add Ionic Lifeccycle methods
    this.addEventListener("ionViewWillEnter", this.updateQuestions);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    // Remove Ionic Lifeccycle methods
    this.removeEventListener("ionViewWillEnter", this.updateQuestions);
  }
}
