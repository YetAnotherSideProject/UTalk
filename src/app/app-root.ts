import { LitElement, html, customElement, property, query } from "lit-element";

import "./components/app-start";
import "./components/app-menu/app-menu";
import "./components/app-category-list/app-category-list";
import "./components/app-question-list/app-question-list";
import "./components/app-question-detail/app-question-detail";
import "./components/app-interview-list/app-interview-list";
import "./components/app-interview-detail/app-interview-detail";
import "./components/app-backup/app-backup";
import "./components/app-about-us/app-about-us";
import "./components/app-run-interview/app-run-interview";
import "./components/app-settings/app-settings";

@customElement("app-root")
export class AppRoot extends LitElement {
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
        <ion-router use-hash="false">
          <ion-route url="/" component="app-start"></ion-route>
          <ion-route
            url="/categorylist"
            component="app-category-list"
          ></ion-route>
          <ion-route
            url="/questionlist/:category"
            component="app-question-list"
          ></ion-route>
          <ion-route
            url="/questiondetail/:editable"
            component="app-question-detail"
          ></ion-route>
          <ion-route
            url="/interviewlist"
            component="app-interview-list"
          ></ion-route>
          <ion-route
            url="/interviewdetail/:interviewId"
            component="app-interview-detail"
          ></ion-route>
          <ion-route url="/backup" component="app-backup"></ion-route>
          <ion-route url="/aboutus" component="app-about-us"></ion-route>
          <ion-route
            url="/runinterview"
            component="app-run-interview"
          ></ion-route>
          <ion-route url="/settings" component="app-settings"></ion-route>
        </ion-router>
        <ion-nav id="main"></ion-nav>
        <app-menu></app-menu>
      </ion-app>
    `;
  }
  connectedCallback() {
    super.connectedCallback();
    console.log("test");
  }
}
