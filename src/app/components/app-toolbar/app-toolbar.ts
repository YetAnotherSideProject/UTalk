import { LitElement, html, css, customElement, property } from "lit-element";

@customElement("app-toolbar")
class AppToolbar extends LitElement {
  // Back button properties
  @property({ type: Boolean }) backButton = false;
  @property({ type: Boolean }) customBackButton = false;
  @property({ type: Function }) customClick = new Function();
  @property({ type: String }) defaultHref = "/";
  @property({ type: Function }) customClickAction = new Function();

  // Edit button properties
  @property({ type: Boolean }) infoButton = false;
  @property({ type: Function }) onInfoClick = new Function();

  constructor() {
    super();
  }

  static get styles() {
    return css`
      .toolbar__customBackButton {
        margin-right: 0px !important;
      }
    `;
  }

  render() {
    return html`
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
            ${this.setBackButton()} ${this.setCustomBackButton()}
          </ion-buttons>
          <ion-title>uTalk</ion-title>
          <ion-buttons slot="end"> ${this.setInfoButton()} </ion-buttons>
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

  setCustomBackButton() {
    if (this.customBackButton) {
      return html`<ion-button @click=${this.customClick}
        ><ion-icon
          class="toolbar__customBackButton"
          name="chevron-back-outline"
          slot="start"
        ></ion-icon>
        <ion-label>Back</ion-label></ion-button
      >`;
    } else {
      return;
    }
  }

  setInfoButton() {
    if (this.infoButton) {
      return html`<ion-button @click=${this.onInfoClick}>
        <ion-icon slot="icon-only" name="information-circle-outline"></ion-icon>
      </ion-button>`;
    } else {
      return;
    }
  }
}
