import { LitElement, html, customElement, property, query } from "lit-element";
import HTMLIonNavElement from "@ionic/core";

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
            <ion-menu-toggle>
              <ion-item button @click=${this.openStart}>
                <ion-icon name="home" slot="start" color="tertiary"></ion-icon>
                <ion-label>Start</ion-label>
              </ion-item>
            </ion-menu-toggle>
            <ion-menu-toggle>
              <ion-item button @click=${this.openCategories}>
                <ion-icon name="albums" slot="start" color="tertiary"></ion-icon>
                <ion-label>Kategorien</ion-label>
              </ion-item>
            </ion-menu-toggle>
            </ion-menu-toggle>
            <ion-menu-toggle>
              <ion-item button @click=${this.openInterviews}>
                <ion-icon name="chatbubbles" slot="start" color="tertiary"></ion-icon>
                <ion-label>Interviews</ion-label>
              </ion-item>
            </ion-menu-toggle>
            <ion-menu-toggle>
              <ion-item button @click=${this.openBackup}>
                <ion-icon name="cloud" slot="start" color="tertiary"></ion-icon>
                <ion-label>Sicherung</ion-label>
              </ion-item>
            </ion-menu-toggle>
            <ion-menu-toggle>
              <ion-item button @click=${this.openSettings}>
                <ion-icon name="settings" slot="start" color="tertiary"></ion-icon>
                <ion-label>Einstellungen</ion-label>
              </ion-item>
            </ion-menu-toggle>
            <ion-menu-toggle>
              <ion-item button @click=${this.openAboutUs}>
                <ion-icon name="information-circle" slot="start" color="tertiary"></ion-icon>
                <ion-label>Über uns</ion-label>
              </ion-item>
            </ion-menu-toggle>
          </ion-list>
        </ion-content>
      </ion-menu>
    `;
  }

  openStart() {
    let nav: HTMLIonNavElement = document.querySelector(
      "ion-nav"
    ) as HTMLIonNavElement;
    nav.push("app-start");
  }

  openCategories() {
    let nav: HTMLIonNavElement = document.querySelector(
      "ion-nav"
    ) as HTMLIonNavElement;
    nav.push("app-category-list");
  }

  openInterviews() {
    let nav: HTMLIonNavElement = document.querySelector(
      "ion-nav"
    ) as HTMLIonNavElement;
    nav.push("app-interview-list");
  }

  openBackup() {
    let nav: HTMLIonNavElement = document.querySelector(
      "ion-nav"
    ) as HTMLIonNavElement;
    nav.push("app-backup");
  }

  openSettings() {
    let nav: HTMLIonNavElement = document.querySelector(
      "ion-nav"
    ) as HTMLIonNavElement;
    nav.push("app-settings");
  }

  openAboutUs() {
    let nav: HTMLIonNavElement = document.querySelector(
      "ion-nav"
    ) as HTMLIonNavElement;
    nav.push("app-about-us");
  }
}
