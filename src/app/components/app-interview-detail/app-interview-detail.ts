import { LitElement, html, customElement, property } from "lit-element";
import { ItemReorderEventDetail } from "@ionic/core";
import { Interview, InterviewPart } from "../../models/Interview";
import { UserDataService } from "../../services/UserDataService";
import { InterviewService } from "../../services/InterviewService";

@customElement("app-interview-detail")
class AppInterviewDetail extends LitElement {
  @property()
  interview: Interview = {} as Interview;

  constructor() {
    super();
  }

  render() {
    return html`
      <app-toolbar></app-toolbar>
      <ion-content class="padding">
        <h1>Interview Detail</h1>
        <ion-card>
          <!-- <span>Photo by <a href="https://unsplash.com/@davidvondiemar?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">David von Diemar</a> on <a href="https://unsplash.com/s/photos/press-conference?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span> -->
          <img src="src/assets/img/interview.jpg" width="100%" />
          <ion-card-header>
            <ion-card-subtitle>Interview</ion-card-subtitle>
            <ion-card-title>${this.interview.title}</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            Interview description
          </ion-card-content>
        </ion-card>
        <ion-list>
          ${this.interview.interviewParts.map((interviewpart) => {
            return html`
              <ion-list-header>${interviewpart.title}</ion-list-header>
              <ion-reorder-group
                disabled="false"
                @ionItemReorder=${({
                  detail,
                }: {
                  detail: ItemReorderEventDetail;
                }) => this.handleReorder(detail, interviewpart)}
              >
                ${interviewpart.interviewQuestions.map(
                  (interviewQuestion, index) => {
                    return html`
                      <ion-item-sliding>
                        <ion-item>
                          <ion-label>
                            ${interviewQuestion.question}
                          </ion-label>
                          <ion-reorder slot="end"></ion-reorder>
                        </ion-item>
                        <ion-item-options side="end">
                          <ion-item-option
                            id="ion-option-delete"
                            @click=${() =>
                              this.onSlideDelete(interviewpart, index)}
                            >Löschen</ion-item-option
                          >
                        </ion-item-options>
                      </ion-item-sliding>
                    `;
                  }
                )}
              </ion-reorder-group>
              <ion-item>
                <ion-button
                  slot="start"
                  @click=${() => this.addQuestion(interviewpart)}
                >
                  Part hinzufügen
                </ion-button>
                <ion-button
                  slot="end"
                  @click=${() => this.addQuestion(interviewpart)}
                >
                  Frage hinzufügen
                </ion-button>
              </ion-item>
            `;
          })}
        </ion-list>
      </ion-content>
    `;
  }

  handleReorder(detail: ItemReorderEventDetail, interviewpart: InterviewPart) {
    //Update interview object
    let draggedItem = interviewpart.interviewQuestions.splice(
      detail.from,
      1
    )[0];
    interviewpart.interviewQuestions.splice(detail.to, 0, draggedItem);
    detail.complete();
  }

  onSlideDelete(interviewpart: InterviewPart, index: number) {
    //Update interview object
    interviewpart.interviewQuestions.splice(index, 1);
    // Important to entry the shadow root to get the reference on ion-list
    let items: HTMLIonListElement = this.shadowRoot?.querySelector(
      "ion-list"
    ) as HTMLIonListElement;
    items.closeSlidingItems();
    //Obwohl property interview korrekt angepasst wird muss hier manuell ein Update erzwungen werden...
    this.requestUpdate();
  }

  addQuestion(interviewpart: InterviewPart) {
    //TODO
    console.log(`Implementation missing`);
  }

  connectedCallback() {
    super.connectedCallback();
    UserDataService.updateLastInterview(this.interview.firebaseId);
    //Only update the interview object in perstence when view is closed, not at every change on screen
    this.addEventListener("ionViewWillLeave", () =>
      InterviewService.updateInterview(this.interview)
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    //Remove event Listeners connected on connectedCallback()
    this.removeEventListener("ionViewWillLeave", () =>
      InterviewService.updateInterview(this.interview)
    );
  }
}
