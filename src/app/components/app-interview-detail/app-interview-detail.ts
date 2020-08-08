import { LitElement, html, customElement, property } from "lit-element";
import { Interview } from "../../models/Interview";
import { UserDataService } from "../../services/UserDataService";
import { ItemReorderEventDetail } from "@ionic/core";

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
          <ion-reorder-group disabled="false" id="reorder_group_ivs">
            ${this.interview.interviewParts.map((interviewpart) => {
              return html`
                <ion-list-header>${interviewpart.title}</ion-list-header>
                ${interviewpart.interviewQuestions?.map((interviewQuestion) => {
                  return html`
                    <ion-item>
                      <ion-label>
                        ${interviewQuestion.question}
                      </ion-label>
                      <ion-reorder slot="end"></ion-reorder>
                    </ion-item>
                  `;
                })}
              `;
            })}
          </ion-reorder-group>
        </ion-list>
      </ion-content>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    UserDataService.updateLastInterview(this.interview.firebaseId);
    const reorderGroup = document.querySelector("ion-reorder-group");
    reorderGroup?.addEventListener(
      "ionItemReorder",
      ({ detail }: { ItemReorderEventDetail }) => {
        // The `from` and `to` properties contain the index of the item
        // when the drag started and ended, respectively
        console.log("Dragged from index", detail.from, "to", detail.to);

        // Finish the reorder and position the item in the DOM based on
        // where the gesture ended. This method can also be called directly
        // by the reorder group
        detail.complete();
      }
    );
  }
}
