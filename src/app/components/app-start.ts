import {
  LitElement,
  html,
  css,
  customElement,
  internalProperty,
} from "lit-element";

// Firebase App (the core Firebase SDK) is always required
import firebase from "firebase/app";
// Used firebase products
import "firebase/auth";
import { UserDataService } from "../services/UserDataService";
import { Interview } from "../models/Interview";
import { Question } from "../models/Question";

import "./app-login/app-login";
import "./app-toolbar/app-toolbar";
import "./app-fab/app-fab";
import { Theming } from "../models/Theming";
import { ThemingService } from "../services/ThemingService";
import { loadingController } from "@ionic/core";

@customElement("app-start")
class AppStart extends LitElement {
  @internalProperty()
  protected lastInterviews: Interview[] = [];
  @internalProperty()
  protected lastQuestions: Question[] = [];
  @internalProperty()
  protected loading: boolean = true;

  constructor() {
    super();
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        console.log(
          "User logged in, getting recent data for app-start component"
        );
        ThemingService.activateDarkModeConfig();
        [this.lastInterviews, this.lastQuestions] = await Promise.all([
          UserDataService.getLastInterviews(),
          UserDataService.getLastQuestions(),
        ]);
      }
    });
    let timeout = setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

  static get styles() {
    return css`
      .start__heading {
        margin-bottom: 10px;
        text-align: center;
        font-size: 1.3em;
        background-color: var(--ion-color-light);
      }
      ion-card {
        margin-top: 0px;
      }
    `;
  }

  render() {
    if (this.loading) {
      this.showLoader();
      return;
    }
    if (firebase.auth().currentUser === null) {
      return html` <ion-content class="ion-padding"
        ><app-login></app-login>
      </ion-content>`;
    }

    return html`
      <app-toolbar></app-toolbar>
      <ion-content class="ion-padding">
        <h1 class="start__heading">Letzte Interviews</h1>
        ${
          this.lastInterviews.length > 0
            ? html` <ion-slides pager="true">
                ${this.lastInterviews.map(
                  (interview) => html`
                    <ion-slide
                      button
                      @click=${() => {
                        //TODO
                        this.onInterviewClick(interview);
                      }}
                    >
                      <ion-card>
                        <!-- <span>Photo by <a href="https://unsplash.com/@davidvondiemar?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">David von Diemar</a> on <a href="https://unsplash.com/s/photos/press-conference?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span> -->
                        <img src="src/assets/img/interview.jpg" width="100%" />
                        <ion-card-header>
                          <ion-card-subtitle>Interview</ion-card-subtitle>
                          <ion-card-title>${interview.title}</ion-card-title>
                        </ion-card-header>
                      </ion-card>
                    </ion-slide>
                  `
                )}
              </ion-slides>`
            : html`
                <ion-card>
                  <!-- <span>Photo by <a href="https://unsplash.com/@davidvondiemar?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">David von Diemar</a> on <a href="https://unsplash.com/s/photos/press-conference?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span> -->
                  <img src="src/assets/img/interview.jpg" width="100%" />
                  <ion-card-header>
                    <ion-card-subtitle>Interview</ion-card-subtitle>
                    <ion-item lines="none">
                      <ion-button>
                        <ion-icon
                          slot="start"
                          name="add-circle-outline"
                        ></ion-icon>
                        <ion-label slot="end">
                          Neues Interview anlegen
                        </ion-label>
                      </ion-button>
                    </ion-item>
                  </ion-card-header>
                </ion-card>
              `
        }
        <h1 class="start__heading">Letzte Fragen</h1>
        ${
          this.lastQuestions.length > 0
            ? html` <ion-slides pager="true">
                ${this.lastQuestions.map(
                  (question) => html`
                    <ion-slide
                      button
                      @click=${() => {
                        //TODO
                        this.onQuestionClick(
                          question.categoryId,
                          question.firebaseId
                        );
                      }}
                    >
                      <ion-card>
                        <!-- <span>Photo by <a href="https://unsplash.com/@brucemars?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">bruce mars</a> on <a href="https://unsplash.com/s/photos/questions?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span> -->
                        <img src="src/assets/img/question.jpg" width="100%" />
                        <ion-card-header>
                          <ion-card-subtitle>Question</ion-card-subtitle>
                          <ion-card-title>${question.text}</ion-card-title>
                        </ion-card-header>
                      </ion-card>
                    </ion-slide>
                  `
                )}</ion-slides
              >`
            : html`
                <ion-card>
                  <!-- <span>Photo by <a href="https://unsplash.com/@brucemars?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">bruce mars</a> on <a href="https://unsplash.com/s/photos/questions?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span> -->
                  <img src="src/assets/img/question.jpg" width="100%" />
                  <ion-card-header>
                    <ion-card-subtitle>Noch recht leer hier</ion-card-subtitle>
                    <ion-item lines="none">
                      <ion-button>
                        <ion-icon
                          slot="start"
                          name="add-circle-outline"
                        ></ion-icon>
                        <ion-label slot="end"> Neue Frage anlegen </ion-label>
                      </ion-button>
                    </ion-item>
                  </ion-card-header>
                </ion-card>
              `
        }
        </ion-slides>
      </ion-content>
      <app-fab icon="play-outline"></app-fab>
    `;
  }

  onInterviewClick(interview: Interview) {
    let nav: HTMLIonNavElement = document.querySelector(
      "ion-nav"
    ) as HTMLIonNavElement;
    nav.push("app-interview-detail", { interview: interview });
  }

  onQuestionClick(
    categoryId: string | undefined,
    questionId: string | undefined
  ) {
    //TODO
    console.log(
      `Clicked on last Question: ${questionId} of Category ${categoryId}`
    );
    // let nav: HTMLIonNavElement = document.querySelector(
    //   "ion-nav"
    // ) as HTMLIonNavElement;
    // nav.push("app-interview-detail", { interviewId: interviewId });
  }

  async showLoader() {
    const loading = await loadingController.create({
      message: "Bitte warten...",
      duration: 2000,
    });

    await loading.present();
  }
}
