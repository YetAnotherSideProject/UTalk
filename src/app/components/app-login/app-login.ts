import {
  LitElement,
  customElement,
  html,
  internalProperty,
  query,
} from "lit-element";
import { AuthService } from "../../services/AuthService";

@customElement("app-login")
class AppLogin extends LitElement {
  @internalProperty()
  doRegister: boolean = false;
  @query("#email")
  emailInput!: HTMLInputElement;
  @query("#password")
  passwordInput!: HTMLInputElement;
  @query("#password_again")
  passwordAgainInput!: HTMLInputElement;

  constructor() {
    super();
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
              <ion-button type="submit" expand="block"
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
