import { LitElement, html, customElement } from "lit-element";

@customElement("app-category-list")
class AppCategoryList extends LitElement {
  constructor() {
    super();
  }

  render() {
    return html`
      <app-toolbar></app-toolbar>
      <ion-content class="padding">
        <h1>Category List</h1>
      </ion-content>
    `;
  }
}
