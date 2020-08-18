import { LitElement, html, customElement } from "lit-element";

@customElement("app-interview-run")
class AppRunInterview extends LitElement {
  constructor() {
    super();
  }

  render() {
    return html`
      <app-toolbar
        customBackButton="true"
        .customClick=${() => this.navigateBack()}
      ></app-toolbar>
      <ion-content class="padding"><h1>Run Interview</h1> </ion-content>
    `;
  }

  navigateBack() {
    let nav: HTMLIonNavElement = document.querySelector(
      "ion-nav"
    ) as HTMLIonNavElement;

    nav.pop();
  }
}
