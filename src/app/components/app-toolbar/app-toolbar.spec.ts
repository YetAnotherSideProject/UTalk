import {} from "jasmine";

import { LitElement } from "lit-element";
import "./app-toolbar";

describe("App-Toolbar", () => {
  let element: LitElement;
  beforeEach(async () => {
    element = document.createElement("app-toolbar") as LitElement;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    element.remove();
  });

  it("Should render app-toolbar", async () => {
    let content = element.querySelector("ion-toolbar") as HTMLIonContentElement;
    expect(content).toBeDefined();
  });
});
