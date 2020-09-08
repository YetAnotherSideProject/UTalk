import {
  LitElement,
  html,
  css,
  customElement,
  property,
  internalProperty,
} from "lit-element";

import { Interview } from "../../models/Interview";
import { InterviewDao } from "../../dao/InterviewDao";
import { alertController } from "@ionic/core";
import { InterviewService } from "../../services/InterviewService";
import { UserDataService } from "../../services/UserDataService";

@customElement("app-interview-run")
class AppRunInterview extends LitElement {
  @property({ type: Object }) interview = {} as Interview;
  questions: string[] = [];

  @internalProperty() currentPart: number = 0;
  @internalProperty() maxParts: number = 0;
  @internalProperty() currentQuestionInPart: number = 0;
  @internalProperty() maxQuestionsInPart: number = 0;
  @internalProperty() currentQuestionTotal: number = 0;
  @internalProperty() maxQuestions: number = 0;

  @internalProperty() darkMode: boolean = false;
  @internalProperty() isFooterActive: boolean = false;

  constructor() {
    super();
  }

  static get styles() {
    return css`
      .interviewRun__progressBar {
        --progress-background: var(--ion-color-secondary);
      }
      .interviewRun__questionCard {
        width: 100%;
        height: 200px;
        background-color: lightGray;
      }
      .interviewRun__answerCard {
        height: 185px;
      }
      .interviewRun__navigation {
        display: flex;
        justify-content: space-between;
        margin-top: 50px;
      }
      .interviewRun__navigationDirection {
        display: flex;
        align-items: center;
      }
      .interviewRun__navigationButton {
        --padding-start: 0;
        --padding-end: 0;
        height: 100%;
      }
      .interviewRun__navigationButton--dark {
        --background: black;
        --background-activated: black;
        --box-shadow: none;
      }
      .interviewRun__navigationButton--white {
        --background: white;
        --background-activated: white;
        --box-shadow: none;
      }
      .interviewRun__navigationIcon {
        font-size: 3.5em;
        color: var(--ion-color-secondary);
      }
      .interviewRun__navigationControls {
        display: flex;
        align-items: center;
      }
      .interviewRun__footer {
        position: fixed;
        bottom: 0px;
        z-index: 1000;
      }
      .interviewRun__footerToolbar {
        --background: var(--ion-color-medium);
        padding: 1em;
      }
      .interviewRun__footerText {
        font-size: 1.5em;
      }
    `;
  }

  render() {
    const progress = (this.currentQuestionTotal + 1) / this.maxQuestions;

    console.log("Progress: ", progress);
    // TODO
    // Responsiver machen
    return html`
      <app-toolbar
        customBackButton="true"
        .customClick=${() => this.navigateBack()}
        infoButton="true"
        .onInfoClick=${() => this.toggleFooter()}
      ></app-toolbar>
      <ion-content class="padding">
        <ion-card>
          <ion-card-header>
            <ion-card-subtitle>Interview</ion-card-subtitle>
            <ion-card-title>${this.interview.title}</ion-card-title>
          </ion-card-header>
          <ion-card-content
            >Interview Part:
            ${this.currentPart + 1}/${this.maxParts} -
            ${
              this.interview.interviewParts[this.currentPart].title
            }</ion-card-content
          >
          <ion-progress-bar class="interviewRun__progressBar" value=${progress}></ion-progress-bar>
        </ion-card>
        <ion-slides @ionSlideNextEnd=${
          this.increaseQuestionCounter
        } @ionSlidePrevEnd=${this.decreaseQuestionCounter}>
        ${this.questions.map(
          (question) => html`<ion-slide>
            <ion-card class="interviewRun__questionCard">
              <ion-card-header>
                <ion-card-subtitle>Frage</ion-card-subtitle>
              </ion-card-header>
              <ion-card-content>${question}</ion-card-content>
            </ion-card>
          </ion-slide>`
        )}
        </ion-slides>
        <ion-card class="interviewRun__answerCard">
          <ion-card-header>
            <ion-card-subtitle>Antwort</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            <ion-textarea
              placeholder="Gibt deine Antwort ein ..."
              value=${
                this.interview.interviewParts[this.currentPart]
                  .interviewQuestions[this.currentQuestionInPart].answer || ""
              }
            ></ion-textarea>
          </ion-card-content>
        </ion-card>
        <div class="interviewRun__navigation">
          <div class="interviewRun__navigationDirection">
          <ion-button class=${`${
            this.darkMode
              ? "interviewRun__navigationButton--dark"
              : "interviewRun__navigationButton--white"
          } interviewRun__navigationButton`} @click=${this.onClickPrevious}>
            <ion-icon
              class="interviewRun__navigationIcon"
              name="arrow-back-outline"
            ></ion-icon>
          </ion-button>
            <p>Prev</p>
          </div>
          <div class="interviewRun__navigationControls">
          <ion-button class=${`${
            this.darkMode
              ? "interviewRun__navigationButton--dark"
              : "interviewRun__navigationButton--white"
          } interviewRun__navigationButton`} @click=${this.onClickPause}>
          <ion-icon
            class="interviewRun__navigationIcon"
            name="pause-circle-outline"
          ></ion-icon>
          </ion-button>
          <ion-button class=${`${
            this.darkMode
              ? "interviewRun__navigationButton--dark"
              : "interviewRun__navigationButton--white"
          } interviewRun__navigationButton`} @click=${this.onClickStop}>
          <ion-icon
            class="interviewRun__navigationIcon"
            name="stop-circle-outline"
          ></ion-icon>
          </ion-button>
          </div>
          <div class="interviewRun__navigationDirection">
          <p>Next</p>
          <ion-button class=${`${
            this.darkMode
              ? "interviewRun__navigationButton--dark"
              : "interviewRun__navigationButton--white"
          } interviewRun__navigationButton`} @click=${this.onClickNext}>
          <ion-icon
            class="interviewRun__navigationIcon"
            name="arrow-forward-outline"
          ></ion-icon>
          </ion-button>
        </div>
        ${
          this.isFooterActive
            ? html` <ion-footer class="interviewRun__footer">
                <ion-toolbar class="interviewRun__footerToolbar">
                  <h1 class="interviewRun__footerText">Info</h1>
                  <p>
                    Führe hier dein Interview durch und trage die Antworten
                    unten in das entsprechende Feld ein. Swipe nach links oder
                    rechts oder navigiere mit Hilfe der Pfeiltasten im unteren
                    Bildschirmbereich, um die nächste oder vorherige Frage
                    anzuzeigen. Mit dem Pause-Button unterbrichst du das
                    Interview und kannst es später fortsetzen, mit dem
                    Stop-Button beendest du es ganz. Im oberen Bildschirmbereich
                    findest du einen Überblick über den aktuellen Interviewpart
                    sowie den Gesamtstatus.
                  </p>
                </ion-toolbar>
              </ion-footer>`
            : html``
        }
      </ion-content>
    `;
  }

  toggleFooter() {
    this.isFooterActive = !this.isFooterActive;
  }

  navigateBack() {
    let nav: HTMLIonNavElement = document.querySelector(
      "ion-nav"
    ) as HTMLIonNavElement;

    nav.pop();
  }

  navigateTo(url: string) {
    let nav: HTMLIonNavElement = document.querySelector(
      "ion-nav"
    ) as HTMLIonNavElement;

    nav.push(url);
  }

  onClickNext() {
    if (this.currentQuestionTotal + 1 === this.maxQuestions) {
      console.log("Interview beenden?");
      this.showAlert(
        "Willst Du das Interview abschließen?",
        this.stopInterview
      );
    }
    const swiper = this.shadowRoot?.querySelector(
      "ion-slides"
    ) as HTMLIonSlidesElement;
    swiper.slideNext();
  }

  onClickPrevious() {
    const swiper = this.shadowRoot?.querySelector(
      "ion-slides"
    ) as HTMLIonSlidesElement;
    swiper.slidePrev();
  }

  onClickPause() {
    this.showAlert(
      "Willst Du das Interview wirklich pausieren?",
      this.pauseInterview
    );
  }

  onClickStop() {
    this.showAlert(
      "Willst Du das Interview wirklich abschließen?",
      this.stopInterview
    );
  }

  pauseInterview = () => {
    this.showToast("Interview pausiert");
    this.navigateTo("app-interview-list");
  };

  stopInterview = () => {
    // const newInterview = { ...this.interview, status: "Archived" } as Interview;
    this.interview.status = "Archived";
    InterviewService.updateInterview(this.interview)
      .then(() => {
        console.log("Interview status changed successfully!");
      })
      .catch((error) => {
        console.log("Error while stopping interview: ", error.message);
      });
    this.showToast("Interview ist abgeschlossen");
    this.navigateTo("app-interview-list");
  };

  async showAlert(text: string, confirmAction: Function) {
    const alert = await alertController.create({
      header: text,
      buttons: [
        {
          text: "Ja",
          handler: () => confirmAction(),
        },
        {
          text: "Nein, doch nicht!",
          role: "cancel",
        },
      ],
    });

    await alert.present();
  }

  increaseQuestionCounter() {
    // Save answer
    const textarea = this.shadowRoot?.querySelector(
      "ion-textarea"
    ) as HTMLIonTextareaElement;
    const answerText = textarea.value;
    console.log("Answer text: ", answerText);
    this.interview.interviewParts[this.currentPart].interviewQuestions[
      this.currentQuestionInPart
    ].answer = answerText || undefined;

    // Clear ion-textarea
    textarea.value = "";

    if (this.currentQuestionInPart < this.maxQuestionsInPart - 1) {
      this.currentQuestionInPart++;
      this.currentQuestionTotal++;
    } else {
      if (this.currentPart < this.maxParts - 1) {
        this.currentPart++;
        this.currentQuestionInPart = 0;
        this.currentQuestionTotal++;
        this.maxQuestionsInPart = this.interview.interviewParts[
          this.currentPart
        ].interviewQuestions.length;
      }
    }
  }

  decreaseQuestionCounter() {
    // Save answer
    const textarea = this.shadowRoot?.querySelector(
      "ion-textarea"
    ) as HTMLIonTextareaElement;
    const answerText = textarea.value;
    console.log("Answer text: ", answerText);
    this.interview.interviewParts[this.currentPart].interviewQuestions[
      this.currentQuestionInPart
    ].answer = answerText || undefined;

    // Clear ion-textarea
    textarea.value = "";

    if (this.currentQuestionInPart > 0) {
      this.currentQuestionInPart--;
      this.currentQuestionTotal--;
    } else {
      if (this.currentPart > 0) {
        this.currentPart--;
        this.maxQuestionsInPart = this.interview.interviewParts[
          this.currentPart
        ].interviewQuestions.length;
        this.currentQuestionInPart = this.maxQuestionsInPart - 1;
        this.currentQuestionTotal--;
      }
    }
  }

  loadInitialData() {
    this.maxQuestionsInPart = this.interview.interviewParts[
      this.currentPart
    ].interviewQuestions.length;
    this.maxParts = this.interview.interviewParts.length;
    this.maxQuestions = this.interview.interviewParts.reduce(
      (amount, part) => amount + part.interviewQuestions.length,
      0
    );
    this.questions = this.interview.interviewParts
      .map((part) =>
        part.interviewQuestions.map((question) => question.question)
      )
      .reduce((prev, current) => prev.concat(current));
  }

  saveInterview() {
    // Save answer
    const textarea = this.shadowRoot?.querySelector(
      "ion-textarea"
    ) as HTMLIonTextareaElement;
    const answerText = textarea.value;
    console.log("Answer text: ", answerText);
    this.interview.interviewParts[this.currentPart].interviewQuestions[
      this.currentQuestionInPart
    ].answer = answerText || undefined;

    // Save interview in firebase
    InterviewDao.updateInterview(this.interview);
  }

  // Utils
  async showToast(message: string) {
    const toast = document.createElement("ion-toast");
    toast.message = message;
    toast.duration = 2000;

    document.body.appendChild(toast);
    return toast.present();
  }

  // TODO Hack, da noch nicht herausgefunden wurde wie global die CSS-Eigenschaften von Shadow DOMs geändert werden können. Prüfen, ob eine bessere Methode gefunden werden kann
  checkDarkMode() {
    const darkMode = document.body.classList.contains("dark");
    this.darkMode = darkMode;
    console.log("Dark Mode is: ", darkMode);
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("ionViewWillEnter", this.loadInitialData);
    this.addEventListener("ionViewWillEnter", this.checkDarkMode);
    this.addEventListener("ionViewWillLeave", this.saveInterview);
    this.addEventListener("ionViewWillLeave", () => {
      if (this.interview.status === "Archived") {
        UserDataService.updateLastActiveInterview(undefined);
      } else {
        UserDataService.updateLastActiveInterview(this.interview.firebaseId);
      }
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("ionViewWillEnter", this.loadInitialData);
    this.removeEventListener("ionViewWillEnter", this.checkDarkMode);
    this.removeEventListener("ionViewWillLeave", this.saveInterview);
    this.removeEventListener("ionViewWillLeave", () => {
      if (this.interview.status === "Archived") {
        UserDataService.updateLastActiveInterview(undefined);
      } else {
        UserDataService.updateLastActiveInterview(this.interview.firebaseId);
      }
    });
  }
}
