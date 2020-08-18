import { LitElement, html, customElement } from "lit-element";

@customElement("app-interview-run")
class AppRunInterview extends LitElement {
  constructor() {
    super();
  }

  render() {
    // TODO
    // Responsiv machen
    return html`
      <app-toolbar
        customBackButton="true"
        .customClick=${() => this.navigateBack()}
      ></app-toolbar>
      <ion-content class="padding">
        <ion-card>
          <ion-card-header>
            <ion-card-subtitle>Interview</ion-card-subtitle>
            <ion-card-title>Tesla Pressekonferenz 09/2020</ion-card-title>
          </ion-card-header>
          <ion-card-content
            >Interview Part: 4/8 - Neuentwicklungen</ion-card-content
          >
          <ion-progress-bar value="0.5"></ion-progress-bar>
        </ion-card>
        <ion-slides>
          <ion-slide>
            <ion-card style="height: 200px; background-color: lightGray">
              <ion-card-header>
                <ion-card-subtitle>Frage</ion-card-subtitle>
              </ion-card-header>
              <ion-card-content
                >Welche Neuentwicklungen wird es in den kommenden 5 Jahren
                geben?</ion-card-content
              >
            </ion-card>
          </ion-slide>
          <ion-slide>
            <ion-card>
              <ion-card-header>
                <ion-card-subtitle>Frage</ion-card-subtitle>
              </ion-card-header>
              <ion-card-content
                >Welche Neuentwicklungen wird es in den kommenden 5 Jahren
                geben?</ion-card-content
              >
            </ion-card>
          </ion-slide>
          <ion-slide>
            <ion-card>
              <ion-card-header>
                <ion-card-subtitle>Frage</ion-card-subtitle>
              </ion-card-header>
              <ion-card-content
                >Welche Neuentwicklungen wird es in den kommenden 5 Jahren
                geben?</ion-card-content
              >
            </ion-card>
          </ion-slide>
          <ion-slide>
            <ion-card>
              <ion-card-header>
                <ion-card-subtitle>Frage</ion-card-subtitle>
              </ion-card-header>
              <ion-card-content
                >Welche Neuentwicklungen wird es in den kommenden 5 Jahren
                geben?</ion-card-content
              >
            </ion-card>
          </ion-slide>
        </ion-slides>
        <ion-card style="height: 185px">
          <ion-card-header>
            <ion-card-subtitle>Antwort</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            <ion-textarea
              placeholder="Gibt deine Antwort ein ..."
            ></ion-textarea>
          </ion-card-content>
        </ion-card>
        <div style="display: flex; justify-content: space-between">
          <div style="display: flex; align-items: center">
            <ion-icon
              style="font-size: 4em; margin: 0px 20px;"
              name="arrow-back-outline"
            ></ion-icon>
            <p>Prev</p>
          </div>
          <div style="display: flex; align-items: center"">
          <p>Next</p>
          <ion-icon
            style="font-size: 4em; margin: 0px 20px"
            name="arrow-forward-outline"
          ></ion-icon>
        </div>
      </ion-content>
    `;
  }

  navigateBack() {
    let nav: HTMLIonNavElement = document.querySelector(
      "ion-nav"
    ) as HTMLIonNavElement;

    nav.pop();
  }
}
