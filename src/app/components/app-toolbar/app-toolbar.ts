import { LitElement, html, customElement, property } from "lit-element";

@customElement("app-toolbar")
class AppToolbar extends LitElement {
  // Back button properties
  @property({ type: Boolean }) backButton = false;
  @property({ type: String }) defaultHref = "/";

  // Edit button properties
  @property({ type: Boolean }) editButton = false;
  @property({ type: Function }) onEditClick = new Function();

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
          <ion-buttons slot="end">
            ${this.setEditButton()}
          </ion-buttons>
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

  setEditButton() {
    if (this.editButton) {
      return html`<ion-button @click=${this.onEditClick}>
        <ion-icon slot="icon-only" name="create-outline"></ion-icon>
      </ion-button>`;
    }
  }
}
