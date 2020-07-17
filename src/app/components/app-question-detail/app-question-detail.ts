import { LitElement, html, customElement } from "lit-element";

@customElement("app-question-detail")
class AppQuestionDetail extends LitElement {
  constructor() {
    super();
  }

  render() {
    return html`
      <app-toolbar></app-toolbar>
      <ion-content class="padding"><h1>Question Detail</h1> </ion-content>
    `;
  }
}
