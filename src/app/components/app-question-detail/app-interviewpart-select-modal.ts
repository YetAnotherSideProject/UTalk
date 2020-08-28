import {
  LitElement,
  html,
  css,
  customElement,
  internalProperty,
} from "lit-element";
import { alertController, modalController } from "@ionic/core";
import {
  Interview,
  InterviewPart,
  InterviewQuestion,
} from "../../models/Interview";
import { InterviewService } from "../../services/InterviewService";

@customElement("app-interviewpart-select-modal")
export class AppInterviewPartSelectModal extends LitElement {
  @internalProperty()
  interviews: Interview[] = [];
  @internalProperty()
  selectedInterview: Interview | undefined = undefined;
  @internalProperty()
  searchQuery: string = "";

  constructor() {
    super();
  }

  static get styles() {
    return css`
      .interviewparts__searchbar {
        background-color: var(--ion-color-light);
      }
    `;
  }

  render() {
    let filteredInterviews: Interview[] = [];
    let filteredInterviewParts: InterviewPart[] = [];
    if (this.selectedInterview === undefined) {
      filteredInterviews = this.interviews.filter((interview) =>
        interview.title.toLowerCase().includes(this.searchQuery)
      );
    } else {
      filteredInterviewParts = this.selectedInterview.interviewParts.filter(
        (interviewPart) =>
          interviewPart.title.toLowerCase().includes(this.searchQuery)
      );
    }

    return html`<ion-header>
        <ion-toolbar>
          <ion-title>In Interview kopieren</ion-title>
          <ion-buttons slot="primary">
            <ion-button
              @click=${() => {
                if (this.selectedInterview === undefined) {
                  this.dismissModal();
                } else {
                  this.selectedInterview = undefined;
                }
              }}
            >
              <ion-icon slot="icon-only" name="arrow-back-outline"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-searchbar
        @ionChange=${(event: any) =>
          (this.searchQuery = event.target.value.toLowerCase())}
        class="interviews__searchbar"
        animated
        autocomplete="on"
        clear-icon="trash-outline"
        inputmode="text"
      ></ion-searchbar>
      <ion-content class="ion-padding">
        ${this.selectedInterview === undefined
          ? html`<ion-list>
              <ion-list-header> Verfügbare Interviews </ion-list-header>
              ${filteredInterviews.map((interview) => {
                return html` <ion-item
                  detail
                  button
                  @click=${() => (this.selectedInterview = interview)}
                >
                  <ion-label>${interview.title}</ion-label>
                </ion-item>`;
              })}
            </ion-list>`
          : html`<ion-list>
              <ion-list-header> Verfügbare InterviewParts </ion-list-header>
              ${filteredInterviewParts.map((interviewPart) => {
                return html` <ion-item
                  detail
                  button
                  @click=${() => this.onInterviewPartClick(interviewPart)}
                >
                  <ion-label>${interviewPart.title}</ion-label>
                </ion-item>`;
              })}
            </ion-list>`}
      </ion-content>`;
  }

  dismissModal() {
    modalController.dismiss();
  }

  async onInterviewPartClick(interviewPart: InterviewPart) {
    const modalElement = document.querySelector("ion-modal");
    let question: string = modalElement?.componentProps?.question;
    if (this.selectedInterview === undefined || question === ``) {
      this.showToast("Error getting required information");
      return;
    }
    let interview: Interview = this.selectedInterview;

    const alert = await alertController.create({
      header: "Hier hinzufügen?",
      message: `Wirklich die Frage zum Interview ${interview.title} zum Part ${interviewPart.title} hinzufügen?`,
      buttons: [
        {
          text: "Hinzufügen",
          handler: async () => {
            //Add questions to Interview
            interviewPart.interviewQuestions.push({
              question: question,
            } as InterviewQuestion);
            await InterviewService.updateInterview(interview);
            this.showToast("Frage zum Interview hinzugefügt!");
          },
        },
        {
          text: "Abbrechen",
          role: "cancel",
        },
      ],
    });
    await alert.present().then(() => this.dismissModal());
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
    InterviewService.getAllDraftInterviews().then((interviews) => {
      this.interviews = interviews;
    });
  }
}
