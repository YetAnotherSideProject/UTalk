import { LitElement, customElement, html, query } from "lit-element";
import { AuthService } from "../../services/AuthService";

@customElement("app-login")
class AppLogin extends LitElement {
  @query("#email") emailInput!: HTMLInputElement;
  @query("#password") passwordInput!: HTMLInputElement;

  constructor() {
    super();
  }

  render() {
    return html`
      <ion-content class="ion-padding">
        <h1>Login or Register</h1>
        <ion-item-group>
          <ion-item>
            <ion-label position="floating">E-Mail</ion-label>
            <ion-input type="email" id="email" required></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Password</ion-label>
            <ion-input type="password" id="password" required></ion-input>
          </ion-item>
          <ion-item-divider></ion-item-divider>
        </ion-item-group>
        <ion-button-row>
          <ion-button @click=${() => this.login()}>Login</ion-button>
          <ion-button>Register</ion-button>
        </ion-button-row>
      </ion-content>
    `;
  }

  async login() {
    await AuthService.login(this.emailInput.value, this.passwordInput.value)
      .then(() => console.log(`Logged in`))
      .catch(() => console.log("Loggin failed"));
  }

  async register() {
    console.log(`register todo.. `);
  }
}
