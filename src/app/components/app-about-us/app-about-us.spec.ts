import {} from "jasmine";

import { LitElement } from "lit-element";
import "./app-about-us";

describe("App-About-Us", () => {
  let element: LitElement;
  beforeEach(async () => {
    element = document.createElement("app-about-us") as LitElement;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    element.remove();
  });

  it("Should render app-about-us", async () => {
    let content = element.querySelector("ion-content") as HTMLIonContentElement;
    expect(content).toBeDefined();
  });
});
