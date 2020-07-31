import { LitElement, html, customElement } from "lit-element";
import { Interview } from "../../models/Interview";
import { InterviewDao } from "../../dao/InterviewDao";

@customElement("app-interview-list")
class AppInterviewList extends LitElement {
  interviews: Interview[] = [];

  constructor() {
    super();
    InterviewDao.getAllInterviews().then((interviews) => {
      this.interviews = interviews;
      this.requestUpdate();
    });
  }

  render() {
    return html`
      <app-toolbar></app-toolbar>
      <ion-content class="padding">
        <ion-list>
          <ion-list-header>
            Interviews
          </ion-list-header>
          ${this.interviews.map(
            (i) => html`
              <ion-item
                button
                @click=${() => {
                  this.onItemClick(i.firebaseId);
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
              </ion-item>
            `
          )}
        </ion-list>
      </ion-content>
      <app-fab icon="add-outline"></app-fab>
    `;
  }

  onItemClick(interviewId: string | undefined) {
    let nav: HTMLIonNavElement = document.querySelector(
      "ion-nav"
    ) as HTMLIonNavElement;
    nav.push("app-interview-detail", { interviewId: interviewId });
  }
}
