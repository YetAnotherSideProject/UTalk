import { LitElement, html, customElement } from "lit-element";

@customElement("app-question-list")
class AppQuestionList extends LitElement {
  constructor() {
    super();
  }

  render() {
    return html`
      <app-toolbar></app-toolbar>
      <ion-content class="padding"><h1>Question List</h1> </ion-content>
    `;
  }
}
