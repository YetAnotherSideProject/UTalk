import { LitElement, html, css, customElement, property } from "lit-element";

@customElement("app-fab")
class AppFab extends LitElement {
  @property({ type: String }) icon = "play-outline";

  constructor() {
    super();
  }

  static get styles() {
    return css`
      #fab-button {
        --ion-color-primary: var(--ion-color-tertiary);
        --ion-color-primary-shade: var(--ion-color-tertiary-shade);
      }
    `;
  }

  render() {
    return html`
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button id="fab-button">
          <ion-icon name=${this.icon}></ion-icon>
        </ion-fab-button>
      </ion-fab>
    `;
  }
}
