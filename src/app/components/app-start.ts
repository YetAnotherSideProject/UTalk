import { LitElement, html, customElement, property, query } from "lit-element";

import "./app-toolbar/app-toolbar";
import "./app-fab/app-fab";
// Firebase App (the core Firebase SDK) is always required
import firebase from "firebase/app";
// Used firebase products
import "firebase/auth";
import { UserDataService } from "../services/UserDataService";
import { Interview } from "../models/Interview";
import { Question } from "../models/Question";

@customElement("app-start")
class AppStart extends LitElement {
  lastInterviews: Interview[] = [];
  lastQuestions: Question[] = [];

  constructor() {
    super();
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        console.log(
          "User logged in, getting recent data for app-start component"
        );
        [this.lastInterviews, this.lastQuestions] = await Promise.all([
          UserDataService.getLastInterviews(),
          UserDataService.getLastQuestions(),
        ]);
      } else {
        "User logged out, no recent data for app-start component";
        this.lastInterviews = [];
        this.lastQuestions = [];
      }
      console.log(`Last Interviews: ${this.lastInterviews.length}`);
      console.log(`Last Questions: ${this.lastQuestions.length}`);
      console.log(`Now rendering app-start`);
      this.requestUpdate();
    });
  }

  render() {
    return html`
      <app-toolbar></app-toolbar>
      <ion-content class="ion-padding">
        <h1>Letzte Interviews</h1>
        <ion-slides pager="true">
          ${this.lastInterviews.map(
            (interview) => html`
              <ion-slide
                button
                @click=${() => {
                  //TODO
                  this.onInterviewClick("Hallo");
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
        </ion-slides>
        <h1>Letzte Fragen</h1>
        <ion-slides pager="true">
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
                    <ion-card-title>Frage: ${question.text}</ion-card-title>
                  </ion-card-header>
                </ion-card>
              </ion-slide>
            `
          )}
        </ion-slides>
      </ion-content>
      <app-fab icon="play-outline"></app-fab>
    `;
  }

  onInterviewClick(interviewId: string | undefined) {
    //TODO
    console.log(`Clicked on last Interview : ${interviewId}`);
    // let nav: HTMLIonNavElement = document.querySelector(
    //   "ion-nav"
    // ) as HTMLIonNavElement;
    // nav.push("app-interview-detail", { interviewId: interviewId });
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
