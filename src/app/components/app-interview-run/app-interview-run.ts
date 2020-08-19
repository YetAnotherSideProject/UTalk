import {
  LitElement,
  html,
  css,
  customElement,
  property,
  internalProperty,
} from "lit-element";

import { Interview } from "../../models/Interview";

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

  constructor() {
    super();
  }

  static get styles() {
    return css`
      ion-button {
        --background: white;
        --background-activated: white;
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
          <ion-progress-bar value=${progress}></ion-progress-bar>
        </ion-card>
        <ion-slides @ionSlideNextEnd=${
          this.increaseQuestionCounter
        } @ionSlidePrevEnd=${this.decreaseQuestionCounter}>
        ${this.questions.map(
          (question) => html`<ion-slide>
            <ion-card
              style="width: 100%; height: 200px; background-color: lightGray"
            >
              <ion-card-header>
                <ion-card-subtitle>Frage</ion-card-subtitle>
              </ion-card-header>
              <ion-card-content>${question}</ion-card-content>
            </ion-card>
          </ion-slide>`
        )}
          
        </ion-slides>
        <ion-card style="height: 185px">
          <ion-card-header>
            <ion-card-subtitle>Antwort</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            <ion-textarea
              placeholder="Gibt deine Antwort ein ..."
            ></ion-textarea>
          </ion-card-content>
        </ion-card>
        <div style="display: flex; justify-content: space-between; margin-top: 50px">
          <div style="display: flex; align-items: center">
          <ion-button @click=${this.onClickPrevious}>
            <ion-icon
              style="font-size: 4em; color: var(--ion-color-primary);"
              name="arrow-back-outline"
            ></ion-icon>
          </ion-button>
            <p>Prev</p>
          </div>
          <div style="display: flex; align-items: center">
          <p>Next</p>
          <ion-button @click=${this.onClickNext}>
          <ion-icon
            style="font-size: 4em; color: var(--ion-color-primary);"
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

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("ionViewWillEnter", this.loadInitialData);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("ionViewWillEnter", this.loadInitialData);
  }
}
