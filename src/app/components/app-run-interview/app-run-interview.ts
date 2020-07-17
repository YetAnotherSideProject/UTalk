import { LitElement, html, customElement } from "lit-element";

@customElement("app-run-interview")
class AppRunInterview extends LitElement {
  constructor() {
    super();
  }

  render() {
    return html`
      <app-toolbar></app-toolbar>
      <ion-content class="padding"><h1>Run Interview</h1> </ion-content>
    `;
  }
}
