import { LitElement, html, customElement } from "lit-element";

@customElement("app-about-us")
class AppAboutUs extends LitElement {
  constructor() {
    super();
  }

  render() {
    return html`
      <app-toolbar></app-toolbar>
      <ion-content class="padding">
        <h1>About Us</h1>
      </ion-content>
    `;
  }
}
