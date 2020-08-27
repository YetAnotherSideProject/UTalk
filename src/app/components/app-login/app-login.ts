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
      .login {
        display: flex;
        flex-direction: column;
        width: 100%;
      }
      .login__backgroundImage {
        object-fit: cover;
        position: absolute;
        height: 100%;
      }
      .login__logo {
        object-fit: contain;
        height: 400px;
        z-index: 100;
      }
      .login__form {
        opacity: 0.7;
        padding: 1em;
      }
      .login__signin {
        margin-top: 2em;
      }
      form > ion-item {
        border-radius: 10px;
        margin-bottom: 8px;
      }
      .login__footer {
        position: absolute;
        bottom: 0px;
      }
      .login__footerToolbar {
        --background: var(--ion-color-warning);
      }
      .login__footerText {
        font-size: 1.5em;
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
        <div class="login">
          <img
            class="login__backgroundImage"
            src="src/assets/img/interview.jpg"
            width="100%"
          />

          <img
            class="login__logo"
            src="src/assets/img/utalk_logo_white.png"
            alt="uTalk logo"
            width="100%"
          />
          <!--onsubmit="return false", damit die Form kein Redirect jeglicher Art macht oder Daten versendet z.B. in die URL -->
          <div class="login__form">
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

              <ion-row class="login__signin">
                <ion-col>
                  <ion-button
                    type="submit"
                    expand="block"
                    disabled=${!this.online}
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
          </div>
          ${!this.online
            ? html` <ion-footer class="login__footer">
                <ion-toolbar class="login__footerToolbar">
                  <h1 class="login__footerText">No connection detected!</h1>
                  <p>Checking for reconnection...</p>
                </ion-toolbar>
              </ion-footer>`
            : html``}
        </div>
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
