import { LitElement, html, css, customElement } from "lit-element";

@customElement("app-category-list")
class AppCategoryList extends LitElement {
  constructor() {
    super();
  }

  render() {
    return html`
      <app-toolbar></app-toolbar>
      <ion-content class="padding">
        <ion-list>
          <ion-list-header>
            Fragen-Kategorien
          </ion-list-header>
          <ion-item>
            <ion-label>Sport</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>Politik</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>Freizeit</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>Bildung</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>Urlaub</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>Uni</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>Münster</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>Software-Entwicklung</ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    `;
  }
}
