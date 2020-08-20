import {
  LitElement,
  customElement,
  html,
  css,
  internalProperty,
  query,
} from "lit-element";
import { Plugins } from "@capacitor/core";
const { Network } = Plugins;
import { AuthService } from "../../services/AuthService";

@customElement("app-login")
class AppLogin extends LitElement {
  @internalProperty()
  doRegister: boolean = false;
  @internalProperty()
  online: boolean = false;
  @query("#email")
  emailInput!: HTMLInputElement;
  @query("#password")
  passwordInput!: HTMLInputElement;
  @query("#password_again")
  passwordAgainInput!: HTMLInputElement;

  constructor() {
    super();
    //Set initial network state
    Network.getStatus().then((status) => {
      this.online = status.connected;
    });
    //Listen for network changes
    Network.addListener("networkStatusChange", (status) => {
      this.online = status.connected;
    });
  }

  static get styles() {
    return css`
      #footer-toolbar {
        --background: var(--ion-color-warning);
      }
    `;
  }

  render() {
    return html`
      <ion-header>
        <ion-toolbar>
          <ion-title>${this.doRegister ? "Register" : "Login"}</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content>
        <!--onsubmit="return false", damit die Form kein Redirect jeglicher Art macht oder Daten versendet z.B. in die URL -->
        <form onsubmit="return false" @submit=${() => this.onSubmit()}>
          <ion-item lines="full">
            <ion-label position="floating">Email</ion-label>
            <ion-input type="text" id="email" required></ion-input>
          </ion-item>

          <ion-item lines="full">
            <ion-label position="floating">Password</ion-label>
            <ion-input type="password" id="password" required></ion-input>
          </ion-item>
          ${this.doRegister
            ? html`<ion-item lines="full">
                <ion-label position="floating">Password again</ion-label>
                <ion-input
                  type="password"
                  id="password_again"
                  required
                ></ion-input>
              </ion-item>`
            : html``}

          <ion-row>
            <ion-col>
              <ion-button type="submit" expand="block" disabled=${!this.online}
                >${this.doRegister ? "Register" : "Signin"}</ion-button
              >
            </ion-col>
          </ion-row>
        </form>
        ${!this.doRegister
          ? html`<ion-row>
              <ion-col>
                <ion-button
                  @click=${() => (this.doRegister = true)}
                  expand="block"
                  >Create Account</ion-button
                >
              </ion-col>
            </ion-row>`
          : html`<ion-row>
              <ion-col>
                <ion-button
                  @click=${() => (this.doRegister = false)}
                  expand="block"
                  >Instead Signin?</ion-button
                >
              </ion-col>
            </ion-row>`}
        ${!this.online
          ? // TODO Nicht responsives Verhalten von bottom: 43px ändern. 0px funktioniert bisher nicht --> Ursachenforschung
            html` <ion-footer style="position: absolute; bottom: 43px;">
              <ion-toolbar id="footer-toolbar">
                <h1 style="font-size: 1.5em;">
                  No connection detected!
                </h1>
                <p>Checking for reconnection...</p>
              </ion-toolbar>
            </ion-footer>`
          : html``}
      </ion-content>
    `;
  }

  async onSubmit() {
    if (this.doRegister) {
      if (this.passwordInput.value !== this.passwordAgainInput.value) {
        this.showToast(`Passwords do not match!`);
        this.passwordInput.value = ``;
        this.passwordAgainInput.value = ``;
      } else {
        await AuthService.register(
          this.emailInput.value,
          this.passwordInput.value
        )
          .then(() => this.showToast(`User registered and logged in!`))
          .catch(() => {
            this.showToast(`Register failed!`);
            this.passwordInput.value = ``;
            this.passwordAgainInput.value = ``;
            this.emailInput.value = ``;
          });
      }
    } else {
      await AuthService.login(this.emailInput.value, this.passwordInput.value)
        .then(() => this.showToast(`Logged in`))
        .catch(() => this.showToast("Login failed"));
    }
  }

  async showToast(message: string) {
    const toast = document.createElement("ion-toast");
    toast.message = message;
    toast.duration = 2000;

    document.body.appendChild(toast);
    return toast.present();
  }
}
