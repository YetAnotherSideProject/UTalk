import {
  LitElement,
  html,
  css,
  query,
  customElement,
  internalProperty,
} from "lit-element";
import { Theming } from "../../models/Theming";
import { ThemingService } from "../../services/ThemingService";

@customElement("app-settings")
class AppSettings extends LitElement {
  @query("#darkMode")
  darkMode!: HTMLIonToggleElement;
  @internalProperty()
  protected theming: Theming = {} as Theming;

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
            <ion-toggle checked=${this.theming.darkMode} id="darkMode" />
          </div>
        </div>
      </ion-content>
    `;
  }

  toggleDarkModeClass(event: any) {
    console.log("Toggle dark mode: ", event.detail.checked);
    const theming: Theming = { darkMode: event.detail.checked };
    ThemingService.updateDarkMode(theming);
  }

  async registerEventListener() {
    this.darkMode.addEventListener("ionChange", this.toggleDarkModeClass);
    this.theming = await ThemingService.getDarkModeConfig();
    console.log("Theming: ", this.theming);
  }

  deregisterEventListener() {
    this.darkMode.removeEventListener("ionChange", this.toggleDarkModeClass);
  }

  connectedCallback() {
    super.connectedCallback();

    // Add Ionic Lifecycle methods
    this.addEventListener("ionViewWillEnter", this.registerEventListener);
    this.addEventListener("ionViewWillLeave", this.deregisterEventListener);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    // Remove Ionic Lifecycle methods
    this.removeEventListener("ionViewWillEnter", this.registerEventListener);
    this.removeEventListener("ionViewWillLeave", this.deregisterEventListener);
  }
}
