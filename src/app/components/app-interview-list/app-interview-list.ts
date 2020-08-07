import {
  LitElement,
  html,
  css,
  customElement,
  internalProperty,
} from "lit-element";
import { Interview } from "../../models/Interview";
import { InterviewDao } from "../../dao/InterviewDao";

@customElement("app-interview-list")
class AppInterviewList extends LitElement {
  @internalProperty()
  interviews: Interview[] = [];

  constructor() {
    super();
    InterviewDao.getAllInterviews().then((interviews) => {
      this.interviews = interviews;
    });
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
          ${this.interviews.map((interview) => {
            return html` <ion-item-sliding>
              <ion-item
                button
                @click=${() => this.onItemClick(interview.firebaseId)}
                ><ion-label>${interview.title}</ion-label></ion-item
              >
              <ion-item-options side="start">
                <ion-item-option
                  id="ion-option-rename"
                  @click=${() => this.onSlideRename(interview.firebaseId)}
                  >Umbenennen</ion-item-option
                >
              </ion-item-options>
              <ion-item-options side="end">
                <ion-item-option
                  id="ion-option-delete"
                  @click=${() => this.onSlideDelete(interview.firebaseId)}
                  >Löschen</ion-item-option
                >
              </ion-item-options>
            </ion-item-sliding>`;
          })}
        </ion-list>
      </ion-content>
      <app-fab icon="add-outline"></app-fab>
    `;
  }

  onChangeSearchbar(event: any) {
    console.log(`Searchbar test: ${event.target.value}`);
    //TODO

    // const query = event.target.value.toLowerCase();
    // this.displayArray = this.categories.filter((item) => {
    //   return item.name.toLowerCase().indexOf(query) > -1;
    // });
    // this.requestUpdate();
  }

  onItemClick(interviewId: string | undefined) {
    // let nav: HTMLIonNavElement = document.querySelector(
    //   "ion-nav"
    // ) as HTMLIonNavElement;
    // nav.push("app-interview-detail", { interviewId: interviewId });
  }

  onSlideRename(interviewId: string | undefined) {
    //TODO
    console.log(`Slide rename interview Item`);
  }

  onSlideDelete(interviewId: string | undefined) {
    //TODO
    console.log(`Slide delete interview Item`);
  }
}
