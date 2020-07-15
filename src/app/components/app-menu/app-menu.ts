import { LitElement, html, customElement, property, query } from "lit-element";

@customElement("app-menu")
class AppMenu extends LitElement {
  constructor() {
    super();
  }

  render() {
    return html`
      <ion-menu side="start" menu-id="main" content-id="main">
        <ion-header>
          <ion-toolbar translucent>
            <ion-title>Menu</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <ion-list>
            <ion-item>
              <ion-icon name="albums" slot="start"></ion-icon>
              <ion-label>Kategorien</ion-label>
            </ion-item>
            <ion-item>
              <ion-icon name="help" slot="start"></ion-icon>
              <ion-label>Fragen</ion-label>
            </ion-item>
            <ion-item>
              <ion-icon name="chatbubbles" slot="start"></ion-icon>
              <ion-label>Interviews</ion-label>
            </ion-item>
            <ion-item>
              <ion-icon name="cloud" slot="start"></ion-icon>
              <ion-label>Sicherung</ion-label>
            </ion-item>
            <ion-item>
              <ion-icon name="settings" slot="start"></ion-icon>
              <ion-label>Einstellungen</ion-label>
            </ion-item>
            <ion-item>
              <ion-icon name="information-circle" slot="start"></ion-icon>
              <ion-label>Über uns</ion-label>
            </ion-item>
          </ion-list>
        </ion-content>
      </ion-menu>
    `;
  }
}
