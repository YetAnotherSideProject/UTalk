import {} from "jasmine";

import { LitElement } from "lit-element";
import "./app-fab";

describe("App-Fab", () => {
  let element: LitElement;
  beforeEach(async () => {
    element = document.createElement("app-fab") as LitElement;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    element.remove();
  });

  it("Should render app-fab", async () => {
    let content = element.querySelector(
      "ion-fab-button"
    ) as HTMLIonFabButtonElement;
    expect(content).toBeDefined();
  });
});
