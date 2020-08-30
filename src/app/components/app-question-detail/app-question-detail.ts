import { LitElement, html, customElement, property } from "lit-element";
import { alertController } from "@ionic/core";

import { QuestionDao } from "../../dao/QuestionDao";
import { Question, Category } from "../../models/Question";
import QuestionImage from "../../../assets/img/question.jpg";
import { UserDataService } from "../../services/UserDataService";

import "./app-interviewpart-select-modal";

@customElement("app-question-detail")
class AppQuestionDetail extends LitElement {
  @property({ type: Boolean }) updatable = false;
  @property({ type: Object }) category = {} as Category;
  @property({ type: Object }) question = {} as Question;

  constructor() {
    super();
  }

  render() {
    return html`
      <!-- TODO edit defaultHref to navigate back to suitable category id -->
      <app-toolbar
        customBackButton="true"
        .customClick=${() => this.onClickBackButton()}
      ></app-toolbar>
      <ion-content class="padding">
        <ion-card>
          <!-- <span>Photo by <a href="https://unsplash.com/@brucemars?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">bruce mars</a> on <a href="https://unsplash.com/s/photos/questions?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span> -->
          <img src="${QuestionImage}" width="100%" />
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
              placeholder="Deine Frage ..."
              value=${this.question.text ? this.question.text : ""}
              auto-grow="true"
            ></ion-textarea>
          </ion-card-content>
        </ion-card>
      </ion-content>
      <app-fab icon="copy-outline" @click=${this.onFabClick}></app-fab>
    `;
  }

  // Aus irgendeinem Grund funktioniert der BackButton nicht. Scheinbar wird die pop()-Methode nicht aufgerufen, sondern auf die angegebene defaultHref geleitet. Deshalb dieser kleine Workaround (s. app-toolbar customBackButton)
  onClickBackButton() {
    const text = this.shadowRoot?.querySelector("ion-textarea")?.value || "";

    // Prove if text is not empty before saving
    if (text.length > 0) {
      this.navigateBack();
    } else {
      this.showEmptyQuestionAlert();
    }
  }

  navigateBack() {
    let nav: HTMLIonNavElement = document.querySelector(
      "ion-nav"
    ) as HTMLIonNavElement;
    nav.pop();
  }

  async onFabClick() {
    // Create the modal with the defined component
    const modalElement = document.createElement("ion-modal");
    modalElement.component = "app-interviewpart-select-modal";
    //TODO
    modalElement.cssClass = "my-custom-class";
    modalElement.componentProps = {
      question: this.question.text,
    };
    // Present the modal
    document.body.appendChild(modalElement);
    modalElement.present();
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
        })
        .catch((error) => {
          this.showToast(
            "Es ist ein Fehler aufgetreten. Bitte versuche es erneut!"
          );
        });
    }
  }

  // Utils
  async showToast(message: string) {
    const toast = document.createElement("ion-toast");
    toast.message = message;
    toast.duration = 2000;

    document.body.appendChild(toast);
    return toast.present();
  }

  async showEmptyQuestionAlert() {
    const alert = await alertController.create({
      header: "Möchtest du keine Frage eingeben?",
      buttons: [
        {
          text: "Abbrechen ohne Frage einzugeben",
          handler: () => this.navigateBack(),
        },
        {
          text: "Doch!",
          role: "cancel",
        },
      ],
    });

    await alert.present();
  }

  connectedCallback() {
    super.connectedCallback();

    // Add Ionic Lifeccycle methods
    this.addEventListener("ionViewWillLeave", this.saveQuestion);

    //TODO ändern
    UserDataService.updateLastQuestion(
      this.category.firebaseId || "",
      this.question.firebaseId || ""
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    // Remove Ionic Lifeccycle methods
    this.removeEventListener("ionViewWillLeave", this.saveQuestion);
  }
}
