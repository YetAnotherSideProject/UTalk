import { LitElement, html, customElement, property } from "lit-element";
import { Interview } from "../../models/Interview";
import { UserDataService } from "../../services/UserDataService";

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
      <ion-content class="padding"
        ><h1>Interview Detail: ${this.interview.title}</h1>
      </ion-content>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    UserDataService.updateLastInterview(this.interview.firebaseId);
  }
}
