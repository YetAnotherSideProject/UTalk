import { LitElement, html, css, customElement } from "lit-element";

import UTalkLogo_V3 from "../../../assets/img/utalk_logo_v3.png";

@customElement("app-about-us")
class AppAboutUs extends LitElement {
  constructor() {
    super();
  }

  static get styles() {
    return css`
      .about__header {
        background-color: var(--ion-color-primary);
      }
      .about__headerCreated {
        margin: 0px 0px 40px 0px;
        text-align: center;
        font-weight: bold;
      }
      .about__version p {
        margin: 0;
        text-align: center;
      }
      hr {
        width: 80%;
        border: 2px solid var(--ion-color-primary-contrast);
        margin-bottom: 2em;
      }
      .about__content {
        width: 80%;
        margin: auto;
        margin-bottom: 2em;
      }
      .about__creditsHeader {
        text-align: center;
        font-weight: bold;
        margin-bottom: 1em;
      }
    `;
  }

  render() {
    return html`
      <app-toolbar></app-toolbar>
      <ion-content class="padding">
        <div class="about__header">
          <img src="${UTalkLogo_V3}" alt="uTalk logo" width="100%" />
          <p class="about__headerCreated">Created by Mario und Martin</p>
        </div>
        <div class="about__version">
          <p>Version 1.0</p>
          <p>Last update: 21.08.2020</p>
          <hr />
        </div>
        <div class="about__content">
          <p>
            <b>uTalk</b> ist aus einem Projekt der FH Münster entstanden und
            wurde für eine Prüfungsleistung im Fach
            <b>Mobile Engineering</b> entwickelt. Mit Hilfe des
            <b>Ionic</b>-Frameworks, der Template-Bibliothek
            <b>LitElement</b> sowie der cross-platform native Runtime
            <b>Capacitor</b> kann die App für Android sowie iOS durch lediglich
            eine Codebasis bedient werden.
          </p>
          <p>
            uTalk soll dir beim <b>Vorbereiten</b>, <b>Durchführen</b> und
            <b>Nachbereiten</b> von Interviews oder Befragungen helfen. Wir
            hoffen Dir gefällt die App und Du schreibst uns was du gut und noch
            viel mehr was du schlecht findest!
          </p>
        </div>
        <hr />
        <p class="about__creditsHeader">Credits</p>
        <div class="about__content">
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
      </ion-content>
    `;
  }
}
