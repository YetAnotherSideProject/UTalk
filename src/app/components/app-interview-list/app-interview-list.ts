import {
  LitElement,
  html,
  css,
  customElement,
  internalProperty,
} from "lit-element";
import { alertController } from "@ionic/core";
import Hammer from "hammerjs";
import { Interview } from "../../models/Interview";
import { InterviewDao } from "../../dao/InterviewDao";
import { InterviewService } from "../../services/InterviewService";

@customElement("app-interview-list")
class AppInterviewList extends LitElement {
  @internalProperty()
  displayedInterviews: Interview[] = [];

  interviews: Interview[] = [];

  constructor() {
    super();
    this.updateInterviewObjects();
  }

  static get styles() {
    return css`
      #interview_searchbar {
        background-color: var(--ion-color-light);
      }
      #ion-option-rename {
        --ion-color-primary: var(--ion-color-warning);
        --ion-color-primary-contrast: var(--ion-color-warning-contrast);
      }
      #ion-option-delete {
        --ion-color-primary: var(--ion-color-danger);
        --ion-color-primary-contrast: var(--ion-color-danger-contrast);
      }
    `;
  }

  render() {
    return html`
      <app-toolbar></app-toolbar>
      <ion-searchbar
        @ionChange=${this.onChangeSearchbar}
        id="interview_searchbar"
        animated
        autocomplete="on"
        clear-icon="trash-outline"
        inputmode="text"
      ></ion-searchbar>
      <ion-content class="padding">
        <ion-list id="interview_list">
          <ion-list-header>
            Interviews
          </ion-list-header>
          ${this.displayedInterviews.map((interview) => {
            return html` <ion-item-sliding>
              <ion-item
                detail
                button
                @click=${() => this.onItemClick(interview)}
              >
                <ion-label>${interview.title}</ion-label>
              </ion-item>
              <ion-item-options side="start">
                <ion-item-option
                  id="ion-option-rename"
                  @click=${() => this.onSlideRename(interview)}
                  >Umbenennen</ion-item-option
                >
              </ion-item-options>
              <ion-item-options side="end">
                <ion-item-option
                  id="ion-option-delete"
                  @click=${() => this.onSlideDelete(interview)}
                  >Löschen</ion-item-option
                >
              </ion-item-options>
            </ion-item-sliding>`;
          })}
        </ion-list>
      </ion-content>
      <app-fab icon="add-outline" @click=${this.onFabClick}></app-fab>
    `;
  }

  onChangeSearchbar(event: any) {
    const query = event.target.value.toLowerCase();
    this.displayedInterviews = this.interviews.filter((item) => {
      return item.title.toLowerCase().indexOf(query) > -1;
    });
  }

  onItemClick(interview: Interview) {
    // let nav: HTMLIonNavElement = document.querySelector(
    //   "ion-nav"
    // ) as HTMLIonNavElement;
    // nav.push("app-interview-detail", { interviewId: interviewId });
  }

  onSlideRename(interview: Interview) {
    this.renameInterview(interview);
    // Important to entry the shadow root to get the reference on ion-list
    let items: HTMLIonListElement = this.shadowRoot?.querySelector(
      "ion-list"
    ) as HTMLIonListElement;
    items.closeSlidingItems();
  }

  onSlideDelete(interview: Interview) {
    InterviewService.deleteInterview(interview).then(() => {
      this.updateInterviewObjects();
      this.showToast("Interview gelöscht!");
    });
    // Important to entry the shadow root to get the reference on ion-list
    let items: HTMLIonListElement = this.shadowRoot?.querySelector(
      "ion-list"
    ) as HTMLIonListElement;
    items.closeSlidingItems();
  }

  onFabClick() {
    alertController
      .create({
        header: "Interview hinzufügen",
        message: "Bitte Titel eingeben",
        inputs: [
          {
            name: "interview_title",
            placeholder: "Titel",
          },
        ],
        buttons: [
          {
            text: "Abbrechen",
            role: "cancel",
          },
          {
            text: "Ok",
            handler: (data) => {
              InterviewService.addInterview(data.interview_title).then(() =>
                this.updateInterviewObjects()
              );
            },
          },
        ],
      })
      .then((alert) => alert.present());
  }

  renameInterview(interview: Interview) {
    alertController
      .create({
        header: "Interview umbenennen",
        message: "Bitte Titel eingeben",
        inputs: [
          {
            name: "interview_title",
            placeholder: "Neuer Titel",
          },
        ],
        buttons: [
          {
            text: "Abbrechen",
            role: "cancel",
          },
          {
            text: "Ok",
            handler: (data) => {
              InterviewService.renameInterview(
                interview,
                data.interview_title
              ).then(() => this.updateInterviewObjects());
            },
          },
        ],
      })
      .then((alert) => alert.present());
  }

  async updateInterviewObjects() {
    InterviewService.getAllInterviews().then((interviews) => {
      this.interviews = interviews;
      this.displayedInterviews = interviews;
    });
  }

  async showToast(message: string) {
    const toast = document.createElement("ion-toast");
    toast.message = message;
    toast.duration = 2000;

    document.body.appendChild(toast);
    return toast.present();
  }
}
