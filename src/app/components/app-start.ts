import { LitElement, html, customElement, property, query } from "lit-element";
import { SampleDataService } from "../services/SampleDataService";

@customElement("app-start")
class AppStart extends LitElement {
  constructor() {
    super();
  }

  render() {
    return html`
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
          <ion-title>uTalk</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <p>${SampleDataService.sampleInterview1().title}</p>
      </ion-content>
    `;
  }
}
