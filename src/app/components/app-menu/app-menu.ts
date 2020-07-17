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
              <ion-item button @click=${this.openCategories}>
                <ion-icon name="albums" slot="start"></ion-icon>
                <ion-label>Kategorien</ion-label>
              </ion-item>
            </ion-menu-toggle>
            <ion-menu-toggle>
              <ion-item button @click=${this.openQuestions}>
                <ion-icon name="help" slot="start"></ion-icon>
                <ion-label>Fragen</ion-label>
              </ion-item>
            </ion-menu-toggle>
            <ion-menu-toggle>
              <ion-item button @click=${this.openInterviews}>
                <ion-icon name="chatbubbles" slot="start"></ion-icon>
                <ion-label>Interviews</ion-label>
              </ion-item>
            </ion-menu-toggle>
            <ion-menu-toggle>
              <ion-item button @click=${this.openBackup}>
                <ion-icon name="cloud" slot="start"></ion-icon>
                <ion-label>Sicherung</ion-label>
              </ion-item>
            </ion-menu-toggle>
            <ion-menu-toggle>
              <ion-item button @click=${this.openSettings}>
                <ion-icon name="settings" slot="start"></ion-icon>
                <ion-label>Einstellungen</ion-label>
              </ion-item>
            </ion-menu-toggle>
            <ion-menu-toggle>
              <ion-item button @click=${this.openAboutUs}>
                <ion-icon name="information-circle" slot="start"></ion-icon>
                <ion-label>Über uns</ion-label>
              </ion-item>
            </ion-menu-toggle>
          </ion-list>
        </ion-content>
      </ion-menu>
    `;
  }

  openCategories() {
    let nav: HTMLIonNavElement = document.querySelector(
      "ion-nav"
    ) as HTMLIonNavElement;
    nav.push("app-category-list");
  }

  openQuestions() {
    let nav: HTMLIonNavElement = document.querySelector(
      "ion-nav"
    ) as HTMLIonNavElement;
    nav.push("app-question-list");
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
