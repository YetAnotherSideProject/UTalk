import { LitElement, html, customElement, property } from "lit-element";

@customElement("app-toolbar")
class AppToolbar extends LitElement {
  @property({ type: Boolean }) backButton = false;
  @property({ type: String }) defaultHref = "/";

  constructor() {
    super();
  }

  render() {
    return html`
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
            ${this.setBackButton()}
          </ion-buttons>
          <ion-title>uTalk</ion-title>
        </ion-toolbar>
      </ion-header>
    `;
  }

  setBackButton() {
    if (this.backButton) {
      return html`<ion-back-button
        default-href=${this.defaultHref}
      ></ion-back-button>`;
    } else {
      return;
    }
  }
}
