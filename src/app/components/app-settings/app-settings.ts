import { LitElement, html, customElement } from "lit-element";

@customElement("app-settings")
class AppSettings extends LitElement {
  constructor() {
    super();
  }

  render() {
    return html`
      <app-toolbar></app-toolbar>
      <ion-content class="padding">
        <h1>Settings</h1>
      </ion-content>
    `;
  }
}
