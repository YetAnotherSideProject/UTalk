// Firebase App (the core Firebase SDK) is always required
import firebase from "firebase/app";
// Used firebase products
import "firebase/auth";
import {
  LitElement,
  html,
  css,
  query,
  customElement,
  internalProperty,
} from "lit-element";
import { alertController } from "@ionic/core";
import { menuController } from "@ionic/core";
import { AuthService } from "../../services/AuthService";
import { ClassWatcherService } from "../../services/ClassWatcherService";
import UTalkLogo_White from "../../../assets/img/utalk_logo_white.png";
import UTalkLogo_V2 from "../../../assets/img/utalk_logo_v2.png";

@customElement("app-menu")
class AppMenu extends LitElement {
  @internalProperty()
  protected user: string = "";
  @internalProperty() protected darkMode: boolean = false;
  @query("ion-menu") menu!: HTMLIonMenuElement;

  constructor() {
    super();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user.email as string;
      }
    });
  }

  static get styles() {
    return css`
      .menu__header {
        display: flex;
        align-items: center;
      }
      .menu__headerUser {
        font-size: 0.8em;
        margin-left: 1em;
      }
    `;
  }

  render() {
    return html`
      <ion-menu content-id="main">
        <ion-header>
          <ion-toolbar translucent>
            <div class="menu__header">
              <img
                src=${this.darkMode ? UTalkLogo_White : UTalkLogo_V2}
                width="80px"
              />
              <p class="menu__headerUser">${this.user}</p>
            </div>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <ion-list>
            <ion-item button @click=${this.openStart}>
              <ion-icon name="home" slot="start" color="secondary"></ion-icon>
              <ion-label>Start</ion-label>
            </ion-item>
            <ion-item button @click=${this.openCategories}>
              <ion-icon
                name="help-outline"
                slot="start"
                color="secondary"
              ></ion-icon>
              <ion-label>Fragen</ion-label>
            </ion-item>
            <ion-item button @click=${this.openInterviews}>
              <ion-icon
                name="chatbubbles"
                slot="start"
                color="secondary"
              ></ion-icon>
              <ion-label>Interviews</ion-label>
            </ion-item>
            <ion-item button @click=${this.openSettings}>
              <ion-icon
                name="settings"
                slot="start"
                color="secondary"
              ></ion-icon>
              <ion-label>Einstellungen</ion-label>
            </ion-item>
            <ion-item button @click=${this.logout}>
              <ion-icon
                name="log-out-outline"
                slot="start"
                color="secondary"
              ></ion-icon>
              <ion-label>Logout</ion-label>
            </ion-item>
            <ion-item button @click=${this.openAboutUs}>
              <ion-icon
                name="information-circle"
                slot="start"
                color="secondary"
              ></ion-icon>
              <ion-label>Über uns</ion-label>
            </ion-item>
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
    this.closeMenu();
  }

  openCategories() {
    let nav: HTMLIonNavElement = document.querySelector(
      "ion-nav"
    ) as HTMLIonNavElement;
    nav.push("app-category-list");
    this.closeMenu();
  }

  openInterviews() {
    let nav: HTMLIonNavElement = document.querySelector(
      "ion-nav"
    ) as HTMLIonNavElement;
    nav.push("app-interview-list");
    this.closeMenu();
  }

  openSettings() {
    let nav: HTMLIonNavElement = document.querySelector(
      "ion-nav"
    ) as HTMLIonNavElement;
    nav.push("app-settings");
    this.closeMenu();
  }

  openAboutUs() {
    let nav: HTMLIonNavElement = document.querySelector(
      "ion-nav"
    ) as HTMLIonNavElement;
    nav.push("app-about-us");
    this.closeMenu();
  }

  closeMenu() {
    if (window.innerWidth <= 768) {
      this.menu.close();
    }
  }

  async logout() {
    const alert = await alertController.create({
      header: "Logout?",
      message: "Wirklich ausloggen?",
      buttons: [
        {
          text: "Logout",
          handler: async () => {
            await AuthService.logout();
            let nav: HTMLIonNavElement = document.querySelector(
              "ion-nav"
            ) as HTMLIonNavElement;
            nav.push("app-start");
          },
        },
        {
          text: "Abbrechen",
          role: "cancel",
        },
      ],
    });
    await alert.present();
  }

  // TODO Hack, da noch nicht herausgefunden wurde wie global die CSS-Eigenschaften von Shadow DOMs geändert werden können. Prüfen, ob eine bessere Methode gefunden werden kann
  checkDarkMode() {
    const _darkMode = document.body.classList.contains("dark");
    this.darkMode = _darkMode;
    console.log("Dark Mode in Menu is: ", _darkMode);
  }

  checkDisplayWidth = () => {
    if (window.innerWidth > 768) {
      this.menu.open();
    } else {
      this.menu.close();
    }
  };

  connectedCallback() {
    super.connectedCallback();
    //this.addEventListener("ionViewWillEnter", this.checkDarkMode);

    window.onresize = this.checkDisplayWidth;

    let classWatcher = new ClassWatcherService(
      document.body,
      "dark",
      this.checkDarkMode,
      this.checkDarkMode
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    //this.removeEventListener("ionViewWillEnter", this.checkDarkMode);
  }
}
