import { LitElement, html, customElement } from "lit-element";

@customElement("app-toolbar")
class AppToolbar extends LitElement {
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
    `;
  }
}
