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
      .interviewRun__navigationButton--dark {
        --background: black;
        --background-activated: black;
      }
      .interviewRun__navigationButton--white {
        --background: white;
        --background-activated: white;
      }
      .interviewRun__navigationIcon {
        font-size: 4em;
        color: var(--ion-color-secondary);
      }
    `;
  }

  render() {
    const progress = (this.currentQuestionTotal + 1) / this.maxQuestions;

    console.log("Progress: ", progress);
    // TODO
    // Responsiv machen
    return html`
      <app-toolbar
        customBackButton="true"
        .customClick=${() => this.navigateBack()}
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
          <ion-button class=${
            this.darkMode
              ? "interviewRun__navigationButton--dark"
              : "interviewRun__navigationButton--white"
          } @click=${this.onClickPrevious}>
            <ion-icon
              class="interviewRun__navigationIcon"
              name="arrow-back-outline"
            ></ion-icon>
          </ion-button>
            <p>Prev</p>
          </div>
          <div class="interviewRun__navigationDirection">
          <p>Next</p>
          <ion-button class=${
            this.darkMode
              ? "interviewRun__navigationButton--dark"
              : "interviewRun__navigationButton--white"
          } @click=${this.onClickNext}>
          <ion-icon
            class="interviewRun__navigationIcon"
            name="arrow-forward-outline"
          ></ion-icon>
          </ion-button>
        </div>
      </ion-content>
    `;
  }

  navigateBack() {
    let nav: HTMLIonNavElement = document.querySelector(
      "ion-nav"
    ) as HTMLIonNavElement;

    nav.pop();
  }

  onClickNext() {
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
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("ionViewWillEnter", this.loadInitialData);
    this.removeEventListener("ionViewWillEnter", this.checkDarkMode);
    this.removeEventListener("ionViewWillLeave", this.saveInterview);
  }
}
