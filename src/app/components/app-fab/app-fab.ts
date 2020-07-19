import { LitElement, html, customElement } from "lit-element";

@customElement("app-fab")
class AppFab extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button color="tertiary">
          <ion-icon name="play-outline"></ion-icon>
        </ion-fab-button>
        <ion-fab-list side="top">
          <ion-fab-button>
            <ion-icon name="logo-facebook"></ion-icon>
          </ion-fab-button>
          <ion-fab-button>
            <ion-icon name="logo-twitter"></ion-icon>
          </ion-fab-button>
          <ion-fab-button>
            <ion-icon name="logo-youtube"></ion-icon>
          </ion-fab-button>
        </ion-fab-list>
      </ion-fab>
    `;
  }
}
