import { LitElement, html, customElement, property } from "lit-element";
import { NavOptions } from "@ionic/core";

import { Category } from "../../models/Category";
import { QuestionDao } from "../../dao/QuestionDao";
import { Question } from "../../models/Question";
import { UserDataService } from "../../services/UserDataService";

@customElement("app-question-detail")
class AppQuestionDetail extends LitElement {
  @property({ type: Boolean }) editable = false;
  @property({ type: Object }) category = {} as Category;
  @property({ type: Object }) question = {} as Question;
  opacity: number = 0.5;
  updatable: Boolean = false;

  constructor() {
    super();
  }

  render() {
    return html`
      <!-- TODO edit defaultHref to navigate back to suitable category id -->
      <app-toolbar
        customBackButton="true"
        .customClick=${() => this.navigateBack()}
        editButton="true"
        .onEditClick=${() => this.toggle()}
      ></app-toolbar>
      <ion-content class="padding">
        <ion-card>
          <!-- <span>Photo by <a href="https://unsplash.com/@brucemars?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">bruce mars</a> on <a href="https://unsplash.com/s/photos/questions?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span> -->
          <img
            src="src/assets/img/question.jpg"
            width="100%"
            style="opacity: ${this.opacity}"
          />
          <ion-card-header>
            <ion-card-subtitle>Question</ion-card-subtitle>
            <ion-card-title><u>Kategorie</u></ion-card-title>
            <ion-input
              disabled
              readonly
              placeholder="Kategorie eingeben ..."
              value=${this.category.name}
            ></ion-input>
          </ion-card-header>
          <ion-card-content>
            <ion-card-title><u>Frage</u></ion-card-title>
            <ion-textarea
              disabled=${!this.editable}
              readonly=${!this.editable}
              placeholder="Deine Frage ..."
              value=${this.question.text ? this.question.text : ""}
              auto-grow="true"
            ></ion-textarea>
          </ion-card-content>
        </ion-card>
        <!-- TODO Position absolute funktioniert nur solange wie der Text in Frage nicht über eine Seite hinausgeht. Lösung finden! -->
        <div
          style="position: absolute; bottom: 5px;width: 100%; text-align: center"
        >
          <ion-button
            style="color: white"
            disabled=${!this.editable}
            expand="block"
            @click=${this.saveQuestion}
            >Speichern</ion-button
          >
        </div>
      </ion-content>
    `;
  }

  // Aus irgendeinem Grund funktioniert der BackButton nicht. Scheinbar wird die pop()-Methode nicht aufgerufen, sondern auf die angegebene defaultHref geleitet. Deshalb dieser kleine Workaround (s. app-toolbar customBackButton)
  navigateBack() {
    let nav: HTMLIonNavElement = document.querySelector(
      "ion-nav"
    ) as HTMLIonNavElement;

    nav.pop();
  }

  toggle() {
    this.editable = !this.editable;
    if (this.editable) {
      this.opacity = 1.0;
    } else {
      this.opacity = 0.5;
    }
    console.log("Updatable status on toggle: ", this.updatable);
    this.requestUpdate();
  }

  saveQuestion() {
    const text = this.shadowRoot?.querySelector("ion-textarea")?.value || "";
    const question: Question = { text: text };
    if (this.updatable) {
      QuestionDao.updateQuestion(
        this.category.firebaseId ? this.category.firebaseId : "",
        this.question.firebaseId ? this.question.firebaseId : "",
        question
      )
        .then(() => {
          this.showToast("Frage wurde gespeichert");
        })
        .catch((error) => {
          this.showToast(
            "Es ist ein Fehler aufgetreten. Bitte versuche es erneut!"
          );
        });
    } else {
      QuestionDao.addQuestion(this.category.firebaseId, question)
        .then(() => {
          this.showToast("Frage wurde gespeichert");
          this.navigateBack();
        })
        .catch((error) => {
          this.showToast(
            "Es ist ein Fehler aufgetreten. Bitte versuche es erneut!"
          );
        });
    }

    this.toggle();
  }

  // Utils
  async showToast(message: string) {
    const toast = document.createElement("ion-toast");
    toast.message = message;
    toast.duration = 2000;

    document.body.appendChild(toast);
    return toast.present();
  }

  connectedCallback() {
    super.connectedCallback();

    this.updatable = !this.editable;
    console.log("Updatable status on connected: ", this.updatable);
    // Set opacity
    if (this.editable) {
      this.opacity = 1.0;
    } else {
      this.opacity = 0.5;
    }
    //TODO ändern
    UserDataService.updateLastQuestion(
      this.category.firebaseId || "",
      this.question.firebaseId || ""
    );
  }
}
