import { LitElement, html, customElement } from "lit-element";

@customElement("app-backup")
class AppBackup extends LitElement {
  constructor() {
    super();
  }

  render() {
    return html`
      <app-toolbar></app-toolbar>
      <ion-content class="padding">
        <h1>Backup</h1>
      </ion-content>
    `;
  }
}
