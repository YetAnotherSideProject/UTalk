import { LitElement, html, customElement, property, query } from "lit-element";

import "./app-toolbar/app-toolbar";
import { SampleDataService } from "../services/SampleDataService";

@customElement("app-start")
class AppStart extends LitElement {
  constructor() {
    super();
  }

  render() {
    return html`
      <app-toolbar></app-toolbar>
      <ion-content class="ion-padding">
        <p>${SampleDataService.sampleInterview1().title}</p>
      </ion-content>
    `;
  }
}
