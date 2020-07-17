import { LitElement, html, customElement } from "lit-element";

@customElement("app-interview-detail")
class AppInterviewDetail extends LitElement {
  constructor() {
    super();
  }

  render() {
    return html`
      <app-toolbar></app-toolbar>
      <ion-content class="padding"><h1>Interview Detail</h1> </ion-content>
    `;
  }
}
