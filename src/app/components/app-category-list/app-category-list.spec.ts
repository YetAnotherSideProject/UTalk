import {} from "jasmine";
import { LitElement } from "lit-element";
import "../../firebase";
import "./app-category-list";
import { CategoryDao } from "../../dao/CategoryDao";
import { Category } from "../../models/Question";

//Firebase nicht korrekt für Unit Tests entkoppelt
//ggf. so oder Ähnlich:
//https://stackoverflow.com/questions/46229787/testing-cloud-functions-for-firebase-with-jasmine-and-typescript
describe("App-Category-List", () => {
  let element: LitElement;

  beforeEach(async () => {
    spyOn(CategoryDao, `getAllCategories`).and.returnValue(
      Promise.resolve([] as Category[])
    );
    element = document.createElement("app-category-list") as LitElement;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    element.remove();
  });

  it("Should render app-category-list", async () => {
    let content = element.querySelector("ion-content") as HTMLIonContentElement;
    expect(content).toBeDefined();
  });
});
