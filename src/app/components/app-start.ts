import { LitElement, html, customElement, property, query } from "lit-element";

import "./app-toolbar/app-toolbar";
import "./app-fab/app-fab";
// Firebase App (the core Firebase SDK) is always required
import firebase from "firebase/app";
// Used firebase products
import "firebase/auth";
import { UserDataService } from "../services/UserDataService";
import { Interview } from "../models/Interview";

@customElement("app-start")
class AppStart extends LitElement {
  interviews: Interview[] = [];

  constructor() {
    super();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(
          "User logged in, getting recent data for app-start component"
        );
        UserDataService.getLastInterviews().then((interviews) => {
          this.interviews = interviews;
          this.requestUpdate();
        });
      } else {
        "User logged out, no recent data for app-start component";
        this.interviews = [];
        this.requestUpdate();
      }
    });
  }

  render() {
    return html`
      <app-toolbar></app-toolbar>
      <ion-content class="ion-padding">
        <h1>Letzte Interviews</h1>
        <ion-slides pager="true">
          ${this.interviews.map(
            (i) => html`
              <ion-slide
                button
                @click=${() => {
                  //TODO
                  this.onItemClick("Hallo");
                }}
              >
                <ion-card>
                  <!-- <span>Photo by <a href="https://unsplash.com/@davidvondiemar?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">David von Diemar</a> on <a href="https://unsplash.com/s/photos/press-conference?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span> -->
                  <img src="src/assets/img/interview.jpg" width="100%" />
                  <ion-card-header>
                    <ion-card-subtitle>Interview</ion-card-subtitle>
                    <ion-card-title>${i.title}</ion-card-title>
                  </ion-card-header>
                </ion-card>
              </ion-slide>
            `
          )}
        </ion-slides>
        <h1>Letzte Fragen</h1>
        <ion-slides pager="true">
          <ion-slide>
            <ion-card>
              <!-- <span>Photo by <a href="https://unsplash.com/@brucemars?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">bruce mars</a> on <a href="https://unsplash.com/s/photos/questions?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span> -->
              <img src="src/assets/img/question.jpg" width="100%" />
              <ion-card-header>
                <ion-card-subtitle>Question</ion-card-subtitle>
                <ion-card-title>Kategorie: Sport</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                Wie groß ist der Frust nach der verpassten Gelegenheit des
                Aufstiegs in die Bezirksliga, nachdem der SC Münster 08 II
                zurückgezogen hat?
              </ion-card-content>
            </ion-card>
          </ion-slide>
          <ion-slide>
            <ion-card>
              <!-- <span>Photo by <a href="https://unsplash.com/@brucemars?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">bruce mars</a> on <a href="https://unsplash.com/s/photos/questions?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span> -->
              <img src="src/assets/img/question.jpg" width="100%" />
              <ion-card-header>
                <ion-card-subtitle>Question</ion-card-subtitle>
                <ion-card-title>Kategorie: Sport</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                Wie groß ist der Frust nach der verpassten Gelegenheit des
                Aufstiegs in die Bezirksliga, nachdem der SC Münster 08 II
                zurückgezogen hat?
              </ion-card-content>
            </ion-card>
          </ion-slide>
          <ion-slide>
            <ion-card>
              <!-- <span>Photo by <a href="https://unsplash.com/@brucemars?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">bruce mars</a> on <a href="https://unsplash.com/s/photos/questions?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span> -->
              <img src="src/assets/img/question.jpg" width="100%" />
              <ion-card-header>
                <ion-card-subtitle>Question</ion-card-subtitle>
                <ion-card-title>Kategorie: Sport</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                Wie groß ist der Frust nach der verpassten Gelegenheit des
                Aufstiegs in die Bezirksliga, nachdem der SC Münster 08 II
                zurückgezogen hat?
              </ion-card-content>
            </ion-card>
          </ion-slide>
          <ion-slide>
            <ion-card>
              <!-- <span>Photo by <a href="https://unsplash.com/@brucemars?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">bruce mars</a> on <a href="https://unsplash.com/s/photos/questions?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span> -->
              <img src="src/assets/img/question.jpg" width="100%" />
              <ion-card-header>
                <ion-card-subtitle>Question</ion-card-subtitle>
                <ion-card-title>Kategorie: Sport</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                Wie groß ist der Frust nach der verpassten Gelegenheit des
                Aufstiegs in die Bezirksliga, nachdem der SC Münster 08 II
                zurückgezogen hat?
              </ion-card-content>
            </ion-card>
          </ion-slide>
          <ion-slide>
            <ion-card>
              <!-- <span>Photo by <a href="https://unsplash.com/@brucemars?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">bruce mars</a> on <a href="https://unsplash.com/s/photos/questions?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span> -->
              <img src="src/assets/img/question.jpg" width="100%" />
              <ion-card-header>
                <ion-card-subtitle>Question</ion-card-subtitle>
                <ion-card-title>Kategorie: Sport</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                Wie groß ist der Frust nach der verpassten Gelegenheit des
                Aufstiegs in die Bezirksliga, nachdem der SC Münster 08 II
                zurückgezogen hat?
              </ion-card-content>
            </ion-card>
          </ion-slide>
        </ion-slides>
      </ion-content>
      <app-fab icon="play-outline"></app-fab>
    `;
  }

  onItemClick(interviewId: string | undefined) {
    //TODO
    console.log(interviewId);
    // let nav: HTMLIonNavElement = document.querySelector(
    //   "ion-nav"
    // ) as HTMLIonNavElement;
    // nav.push("app-interview-detail", { interviewId: interviewId });
  }
}
