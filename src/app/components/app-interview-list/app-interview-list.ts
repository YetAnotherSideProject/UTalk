import { LitElement, html, customElement } from "lit-element";

@customElement("app-interview-list")
class AppInterviewList extends LitElement {
  constructor() {
    super();
  }

  render() {
    return html`
      <app-toolbar></app-toolbar>
      <ion-content class="padding"><h1>Interview List</h1> </ion-content>
    `;
  }
}
