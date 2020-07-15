import { LitElement, html, customElement, property, query } from "lit-element";

import "./components/app-start";
import "./components/app-menu/app-menu";

@customElement("app-root")
class AppRoot extends LitElement {
  constructor() {
    super();
  }

  //App root muss in seine Child Objects und nicht in einen Shadow DOM rendern!
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <ion-app>
        <app-menu></app-menu>
        <ion-router use-hash="false">
          <ion-route url="/" component="app-start"></ion-route>
        </ion-router>
        <ion-nav id="main"></ion-nav>
      </ion-app>
    `;
  }
}
