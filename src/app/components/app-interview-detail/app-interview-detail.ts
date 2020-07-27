import { LitElement, html, customElement, property } from "lit-element";
import { Interview } from "../../models/Interview";
import { InterviewDao } from "../../dao/InterviewDao";

@customElement("app-interview-detail")
class AppInterviewDetail extends LitElement {

  @property({ type: String }) interviewId = "";
  interview?: Interview = undefined;

  constructor() {
    super();
  }

  render() {
    return html`
      <app-toolbar></app-toolbar>
      <ion-content class="padding"><h1>Interview Detail: ${this.interview?.title}</h1> </ion-content>
    `;
  }

  connectedCallback() {
    //Noch keine Ahnung, ob das hier richtig ist, aber im Konstruktor ist interviewId noch nicht gesetzt
    super.connectedCallback();
    InterviewDao.getInterviewById(this.interviewId).then((interview) => {
      this.interview = interview;
      this.requestUpdate();
    });
  }
}
