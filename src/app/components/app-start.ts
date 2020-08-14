import { LitElement, html, customElement, internalProperty } from "lit-element";

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

@customElement("app-start")
class AppStart extends LitElement {
  @internalProperty()
  protected lastInterviews: Interview[] = [];
  @internalProperty()
  protected lastQuestions: Question[] = [];

  constructor() {
    super();
    //TODO abhängig vom Login/Get user Prozess machen
    this.presentLoading();
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        console.log(
          "User logged in, getting recent data for app-start component"
        );
        [this.lastInterviews, this.lastQuestions] = await Promise.all([
          UserDataService.getLastInterviews(),
          UserDataService.getLastQuestions(),
        ]);
      }
    });
  }

  render() {
    if (firebase.auth().currentUser === null) {
      return html` <ion-content class="ion-padding"
        ><app-login></app-login>
      </ion-content>`;
    }

    return html`
      <app-toolbar></app-toolbar>
      <ion-content class="ion-padding">
        <h1>Letzte Interviews</h1>
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
        <h1>Letzte Fragen</h1>
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
                          <ion-card-title
                            >Kategorie: ${question.categoryId}</ion-card-title
                          >
                          <ion-card-title
                            >Frage: ${question.text}</ion-card-title
                          >
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
                        <ion-label slot="end">
                          Neue Frage anlegen
                        </ion-label>
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

  async presentLoading() {
    const loading = document.createElement("ion-loading");

    loading.cssClass = "loading_popover";
    loading.message = "Please wait...";
    loading.duration = 2000;

    document.body.appendChild(loading);
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
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
}
