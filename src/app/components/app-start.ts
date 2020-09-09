// Firebase App (the core Firebase SDK) is always required
import firebase from "firebase/app";
// Used firebase products
import "firebase/auth";
import {
  LitElement,
  html,
  css,
  customElement,
  internalProperty,
} from "lit-element";
import { Interview } from "../models/Interview";
import { Question } from "../models/Question";
import { UserDataService } from "../services/UserDataService";
import { ThemingService } from "../services/ThemingService";
import { loadingController, alertController } from "@ionic/core";

import InterviewImage from "../../assets/img/interview.jpg";
import QuestionImage from "../../assets/img/question.jpg";

import "./app-login/app-login";
import "./app-toolbar/app-toolbar";
import "./app-fab/app-fab";

@customElement("app-start")
class AppStart extends LitElement {
  @internalProperty()
  protected lastInterviews: Interview[] = [];
  @internalProperty()
  protected lastQuestions: Question[] = [];
  @internalProperty()
  protected lastActiveInterview: Interview | null = null;
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
        [
          this.lastInterviews,
          this.lastQuestions,
          this.lastActiveInterview,
        ] = await Promise.all([
          UserDataService.getLastInterviews(),
          UserDataService.getLastQuestions(),
          UserDataService.getLastActiveInterview(),
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
      .start__interviewButton {
        --background: var(--ion-color-light-tint);
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

    this.showMenu();
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
                        <img src="${InterviewImage}" width="100%" />
                        <ion-card-header>
                          <ion-card-subtitle>Interview</ion-card-subtitle>
                          <h2>${interview.title}</h2>
                        </ion-card-header>
                      </ion-card>
                    </ion-slide>
                  `
                )}
              </ion-slides>`
            : html`
                <ion-card>
                  <!-- <span>Photo by <a href="https://unsplash.com/@davidvondiemar?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">David von Diemar</a> on <a href="https://unsplash.com/s/photos/press-conference?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span> -->
                  <img src="${InterviewImage}" width="100%" />
                  <ion-card-header>
                    <ion-card-subtitle>Interview</ion-card-subtitle>
                    <ion-item lines="none">
                      <ion-button class="start__interviewButton">
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
                        this.onQuestionClick(question);
                      }}
                    >
                      <ion-card>
                        <!-- <span>Photo by <a href="https://unsplash.com/@brucemars?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">bruce mars</a> on <a href="https://unsplash.com/s/photos/questions?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span> -->
                        <img src="${QuestionImage}" width="100%" />
                        <ion-card-header>
                          <ion-card-subtitle>Question</ion-card-subtitle>
                          <h2>${question.text}</h2>
                        </ion-card-header>
                      </ion-card>
                    </ion-slide>
                  `
                )}</ion-slides
              >`
            : html`
                <ion-card>
                  <!-- <span>Photo by <a href="https://unsplash.com/@brucemars?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">bruce mars</a> on <a href="https://unsplash.com/s/photos/questions?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span> -->
                  <img src="${QuestionImage}" width="100%" />
                  <ion-card-header>
                    <ion-card-subtitle>Noch recht leer hier</ion-card-subtitle>
                    <ion-text>Noch keine Kategorien oder Fragen angelegt</ion-text>
                    </ion-item>
                  </ion-card-header>
                </ion-card>
              `
        }
        </ion-slides>
      </ion-content>
      ${
        this.lastActiveInterview === null
          ? html``
          : html`<app-fab
              icon="play-outline"
              .onFabClick=${() => this.runLastInterview()}
            ></app-fab>`
      }
      
    `;
  }

  showMenu() {
    console.log("Show menu");
    let menu: HTMLIonMenuElement = document.querySelector(
      "ion-menu"
    ) as HTMLIonMenuElement;
    menu.hidden = false;
  }

  onInterviewClick(interview: Interview) {
    let nav: HTMLIonNavElement = document.querySelector(
      "ion-nav"
    ) as HTMLIonNavElement;
    nav.push("app-interview-detail", { interview: interview });
  }

  onQuestionClick(question: Question) {
    let nav: HTMLIonNavElement = document.querySelector(
      "ion-nav"
    ) as HTMLIonNavElement;
    nav.push("app-question-detail", { question: question });
  }

  async runLastInterview() {
    const alert = await alertController.create({
      header: "Aktives Interview fortführen?",
      message: `Wirklich das zuletzt geführte Interview ${this.lastActiveInterview?.title} fortführen?`,
      buttons: [
        {
          text: "Interview fortführen",
          handler: () => {
            let nav: HTMLIonNavElement = document.querySelector(
              "ion-nav"
            ) as HTMLIonNavElement;

            nav.push("app-interview-run", {
              interview: this.lastActiveInterview,
            });
          },
        },
        {
          text: "Abbrechen",
          role: "cancel",
        },
      ],
    });
    await alert.present();
  }

  async showLoader() {
    const loading = await loadingController.create({
      message: "Bitte warten...",
      duration: 2000,
    });

    await loading.present();
  }
}
