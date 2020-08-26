import { LitElement, html, css, query, customElement } from "lit-element";

@customElement("app-settings")
class AppSettings extends LitElement {
  @query("#darkMode")
  darkMode!: HTMLIonToggleElement;

  constructor() {
    super();
  }

  static get styles() {
    return css`
      .settings {
        padding: 1em;
      }
      .settings__attribute {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 1em;
      }
    `;
  }

  render() {
    return html`
      <app-toolbar></app-toolbar>
      <ion-content class="padding">
        <div class="settings">
          <h1>Settings</h1>
          <div class="settings__attribute">
            <p>Dark Mode aktivieren</p>
            <ion-toggle id="darkMode" />
          </div>
        </div>
      </ion-content>
    `;
  }

  toggleDarkModeClass(event: any) {
    console.log("Toggle dark mode");
    document.body.classList.toggle("dark", event.detail.checked);
  }

  registerEventListener() {
    this.darkMode.addEventListener("ionChange", this.toggleDarkModeClass);
  }

  deregisterEventListener() {
    this.darkMode.removeEventListener("ionChange", this.toggleDarkModeClass);
  }

  connectedCallback() {
    super.connectedCallback();

    // Add Ionic Lifeccycle methods
    this.addEventListener("ionViewWillEnter", this.registerEventListener);
    this.addEventListener("ionViewWillLeave", this.deregisterEventListener);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    // Remove Ionic Lifeccycle methods
    this.removeEventListener("ionViewWillEnter", this.registerEventListener);
    this.removeEventListener("ionViewWillLeave", this.deregisterEventListener);
  }
}
