import {
  LitElement,
  html,
  css,
  customElement,
  internalProperty,
} from "lit-element";
import { alertController, modalController } from "@ionic/core";
import { Interview } from "../../models/Interview";
import { InterviewService } from "../../services/InterviewService";

@customElement("app-interview-select-modal")
export class AppInterviewSelectModal extends LitElement {
  @internalProperty()
  interviews: Interview[] = [];
  @internalProperty()
  searchQuery: string = "";

  constructor() {
    super();
  }

  static get styles() {
    return css`
      .interviews__searchbar {
        background-color: var(--ion-color-light);
      }
    `;
  }

  render() {
    const filteredInterviews = this.interviews.filter((interview) =>
      interview.title.toLowerCase().includes(this.searchQuery)
    );

    return html` <ion-header>
        <ion-toolbar>
          <ion-title>Select Interview</ion-title>
          <ion-buttons slot="primary">
            <ion-button
              @click=${() => {
                this.dismissModal();
              }}
            >
              <ion-icon slot="icon-only" name="close"></ion-icon>
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
        <ion-list>
          <ion-list-header> Verfügbare Interviews </ion-list-header>
          ${filteredInterviews.map((interview) => {
            return html` <ion-item
              detail
              button
              @click=${() => this.onItemClick(interview)}
            >
              <ion-label>${interview.title}</ion-label>
            </ion-item>`;
          })}
        </ion-list>
      </ion-content>`;
  }

  dismissModal() {
    modalController.dismiss();
  }

  async onItemClick(interview: Interview) {
    const modalElement = document.querySelector("ion-modal");
    let categoryId: string = modalElement?.componentProps?.categoryId;
    if (categoryId === ``) {
      this.showToast("Error getting category information");
      return;
    }

    const alert = await alertController.create({
      header: "Zu diesem Interview hinzufügen?",
      message: `Wirklich alle Fragen der Kategorie ${modalElement?.componentProps?.categoryName} zum Interview ${interview.title} als neuen Part hinzufügen?`,
      buttons: [
        {
          text: "Hinzufügen",
          handler: async () => {
            //Add questions to Interview
            await InterviewService.addCategoryToInterview(
              interview,
              modalElement?.componentProps?.categoryName,
              modalElement?.componentProps?.categoryId
            );
            this.showToast("Fragen zum Interview hinzugefügt!");
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
