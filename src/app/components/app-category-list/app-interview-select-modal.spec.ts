import {} from "jasmine";
import { LitElement } from "lit-element";
import "../../firebase";
import "./app-interview-select-modal";
import { Interview } from "../../models/Interview";
import { InterviewService } from "../../services/InterviewService";

//Firebase nicht korrekt für Unit Tests entkoppelt
//ggf. so oder Ähnlich:
//https://stackoverflow.com/questions/46229787/testing-cloud-functions-for-firebase-with-jasmine-and-typescript
describe("App-Interview-Select-Modal", () => {
  let element: LitElement;

  beforeEach(async () => {
    spyOn(InterviewService, `getAllDraftInterviews`).and.returnValue(
      Promise.resolve([] as Interview[])
    );
    element = document.createElement(
      "app-interview-select-modal"
    ) as LitElement;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    element.remove();
  });

  it("Should render app-interview-select-modal", async () => {
    let content = element.querySelector("ion-content") as HTMLIonContentElement;
    expect(content).toBeDefined();
  });

  it("Interviewlist should be empty", async () => {
    let content = element.shadowRoot?.querySelector(
      "ion-list"
    ) as HTMLIonListElement;
    //Only list-header element
    expect(content.children.length).toBe(1);
  });
});
