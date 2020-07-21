import { LitElement, html, css, customElement } from "lit-element";

@customElement("app-about-us")
class AppAboutUs extends LitElement {
  constructor() {
    super();
  }

  static get styles() {
    return css`
      #about-header {
        background-color: var(--ion-color-primary);
      }
      #created {
        margin: 0px 0px 40px 0px;
        text-align: center;
        font-weight: bold;
      }
      #version p {
        margin: 0;
        text-align: center;
      }
      hr {
        width: 80%;
        border: 2px solid black;
        margin-bottom: 2em;
      }
      #about-content {
        width: 80%;
        margin: auto;
        margin-bottom: 2em;
        text-align: justify;
      }
      #spacer {
        margin-bottom: 4em;
      }
    `;
  }

  render() {
    return html`
      <app-toolbar></app-toolbar>
      <ion-content class="padding">
        <div id="about-header">
          <img
            src="src/assets/img/utalk_logo_v2.png"
            alt="uTalk logo"
            width="100%"
          />
          <p id="created">Created by Mario und Martin</p>
        </div>
        <div id="version">
          <p>Version 1.0</p>
          <p>Last update: 20.07.2020</p>
          <hr />
        </div>
        <div id="about-content">
          <p>
            uTalk ist aus einem Projekt der FH Münster entstanden und wurde für
            eine Prüfungsleistung im Fach Mobile Engineering entwickelt. Mit
            Hilfe des Ionic-Frameworks, der Template-Bibliothek LitElement sowie
            der cross-platform native Runtime Capacitor kann die App für Android
            sowie iOS durch lediglich eine Codebasis bedient werden.
          </p>
          <p>
            uTalk soll dir beim Vorbereiten, Durchführen und Nachbereiten von
            Interviews oder Befragungen helfen. Wir hoffen Dir gefällt die App
            und Du schreibst uns was du gut und noch viel mehr was du schlecht
            findest!
          </p>
        </div>
        <hr />
        <p style="text-align: center; font-weight: bold; margin-bottom: 1em">
          Credits
        </p>
        <div id="about-content">
          <span
            >Photo by
            <a
              href="https://unsplash.com/@davidvondiemar?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
              >David von Diemar</a
            >
            on
            <a
              href="https://unsplash.com/s/photos/press-conference?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
              >Unsplash</a
            ></span
          >
          <br />
          <span
            >Photo by
            <a
              href="https://unsplash.com/@brucemars?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
              >bruce mars</a
            >
            on
            <a
              href="https://unsplash.com/s/photos/questions?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
              >Unsplash</a
            ></span
          >
        </div>
        <div id="spacer"></div>
      </ion-content>
    `;
  }
}
