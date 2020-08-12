import {
  LitElement,
  html,
  css,
  customElement,
  internalProperty,
} from "lit-element";
import { alertController, SegmentChangeEventDetail } from "@ionic/core";
import { Interview } from "../../models/Interview";
import { InterviewService } from "../../services/InterviewService";

@customElement("app-interview-list")
class AppInterviewList extends LitElement {
  @internalProperty()
  interviews: Interview[] = [];
  @internalProperty()
  searchQuery: string = "";
  @internalProperty()
  statusFilter: string = "All";
  @internalProperty()
  dateSortFilter: string = "Change";
  @internalProperty()
  sortReverse: boolean = false;

  constructor() {
    super();
    this.retrieveInterviewObjects();
  }

  static get styles() {
    return css`
      #interview_searchbar {
        background-color: var(--ion-color-light);
      }
      #interview_filterbar_status {
        background-color: var(--ion-color-light);
      }
      #interview_filterbar_date {
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
      #statusBadge_Draft {
        --ion-color-primary: var(--ion-color-warning);
        --ion-color-primary-contrast: var(--ion-color-warning-contrast);
      }
      #statusBadge_Active {
        --ion-color-primary: var(--ion-color-success);
        --ion-color-primary-contrast: var(--ion-color-success-contrast);
      }
      #statusBadge_Archived {
        --ion-color-primary: var(--ion-color-medium);
        --ion-color-primary-contrast: var(--ion-color-medium-contrast);
      }
    `;
  }

  render() {
    const filteredInterviews = this.interviews
      .filter(
        (interview) =>
          this.statusFilter === "All" || interview.status === this.statusFilter
      )
      .filter((interview) =>
        interview.title.toLowerCase().includes(this.searchQuery)
      )
      .sort((i1, i2) => {
        if (this.dateSortFilter === "Change") {
          return this.sortByDate(
            i1.lastChangeDate.seconds,
            i2.lastChangeDate.seconds,
            this.sortReverse
          );
        } else {
          return this.sortByDate(
            i1.creationDate.seconds,
            i2.creationDate.seconds,
            this.sortReverse
          );
        }
      });

    return html`
      <app-toolbar></app-toolbar>

      <ion-searchbar
        @ionChange=${(event: any) =>
          (this.searchQuery = event.target.value.toLowerCase())}
        id="interview_searchbar"
        animated
        autocomplete="on"
        clear-icon="trash-outline"
        inputmode="text"
      ></ion-searchbar>

      <ion-segment
        id="interview_filterbar_status"
        value="All"
        @ionChange=${({ detail }: { detail: SegmentChangeEventDetail }) =>
          (this.statusFilter = detail.value || "All")}
      >
        <ion-segment-button value="All">
          <ion-label>All</ion-label>
        </ion-segment-button>
        <ion-segment-button value="Draft">
          <ion-label>Draft</ion-label>
        </ion-segment-button>
        <ion-segment-button value="Active">
          <ion-label>Active</ion-label>
        </ion-segment-button>
        <ion-segment-button value="Archived">
          <ion-label>Archived</ion-label>
        </ion-segment-button>
      </ion-segment>
      <ion-segment
        id="interview_filterbar_date"
        value="Change"
        @ionChange=${({ detail }: { detail: SegmentChangeEventDetail }) =>
          (this.dateSortFilter = detail.value || "Change")}
      >
        <ion-segment-button
          layout="icon-start"
          value="Change"
          @click=${() => {
            if (this.dateSortFilter === "Change") {
              if (this.sortReverse === false) {
                this.sortReverse = true;
              } else {
                this.sortReverse = false;
              }
            }
          }}
        >
          <ion-icon
            name=${this.sortReverse ? "arrow-up-outline" : "arrow-down-outline"}
          ></ion-icon>
          <ion-label>Change</ion-label>
        </ion-segment-button>
        <ion-segment-button
          layout="icon-start"
          value="Creation"
          @click=${() => {
            if (this.dateSortFilter === "Creation") {
              if (this.sortReverse === false) {
                this.sortReverse = true;
              } else {
                this.sortReverse = false;
              }
            }
          }}
        >
          <ion-icon
            name=${this.sortReverse ? "arrow-up-outline" : "arrow-down-outline"}
          ></ion-icon>
          <ion-label>Creation</ion-label>
        </ion-segment-button>
      </ion-segment>

      <ion-content class="padding">
        <ion-list id="interview_list">
          <ion-list-header>
            Interviews
          </ion-list-header>
          ${filteredInterviews.map((interview) => {
            return html` <ion-item-sliding>
              <ion-item
                detail
                button
                @click=${() => this.onItemClick(interview)}
              >
                <ion-label>${interview.title}</ion-label>
                <ion-badge slot="end" id="statusBadge_${interview.status}" }
                  >${interview.status}</ion-badge
                >
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

  sortByDate(s1: number, s2: number, reverse: boolean): number {
    if (reverse) {
      if (s1 > s2) {
        return -1;
      }
      if (s1 < s2) {
        return 1;
      }
    } else {
      if (s1 < s2) {
        return -1;
      }
      if (s1 > s2) {
        return 1;
      }
    }
    return 0;
  }

  onItemClick(interview: Interview) {
    let nav: HTMLIonNavElement = document.querySelector(
      "ion-nav"
    ) as HTMLIonNavElement;
    nav.push("app-interview-detail", { interview: interview });
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
      this.retrieveInterviewObjects();
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
                this.retrieveInterviewObjects()
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
              ).then(() => this.retrieveInterviewObjects());
            },
          },
        ],
      })
      .then((alert) => alert.present());
  }

  async retrieveInterviewObjects() {
    InterviewService.getAllInterviews().then((interviews) => {
      this.interviews = interviews;
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
