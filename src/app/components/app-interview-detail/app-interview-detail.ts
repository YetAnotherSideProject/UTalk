import { LitElement, html, css, customElement, property } from "lit-element";
import { ItemReorderEventDetail, alertController } from "@ionic/core";
import { Interview, InterviewPart } from "../../models/Interview";
import { UserDataService } from "../../services/UserDataService";
import { InterviewService } from "../../services/InterviewService";

@customElement("app-interview-detail")
class AppInterviewDetail extends LitElement {
  @property()
  interview: Interview = {} as Interview;

  constructor() {
    super();
  }

  static get styles() {
    return css`
      .interviewDetail__title {
        font-weight: bold;
        font-size: 2em;
      }
      .interviewDetail__runButton {
        --ion-color-primary: var(--ion-color-success);
        --ion-color-primary-contrast: var(--ion-color-success-contrast);
      }
      .interviewDetail__optionDelete {
        --ion-color-primary: var(--ion-color-danger);
        --ion-color-primary-contrast: var(--ion-color-danger-contrast);
      }
    `;
  }

  render() {
    return html`
      <app-toolbar backButton="true" defaultHref="/interviewlist"></app-toolbar>
      <ion-content class="padding">
        <h1>Interview Detail</h1>
        <ion-card>
          <!-- <span>Photo by <a href="https://unsplash.com/@davidvondiemar?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">David von Diemar</a> on <a href="https://unsplash.com/s/photos/press-conference?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span> -->
          <img src="src/assets/img/interview.jpg" width="100%" />
          <ion-card-header>
            <ion-card-subtitle>Interview</ion-card-subtitle>
            <ion-item lines="none">
              <ion-input
                class="interviewDetail__title"
                slot="start"
                type="text"
                readonly=${this.interview.status !== "Draft"}
                value=${this.interview.title}
                @ionBlur=${({ target }: { target: HTMLIonInputElement }) => {
                  if (target.value !== ``) {
                    this.interview.title = target.value as string;
                  }
                }}
              ></ion-input>
              ${this.interview.status !== "Archived"
                ? html`
                    <ion-button
                      slot="end"
                      size="large"
                      class="interviewDetail__runButton"
                      @click=${() => this.onRunInterview()}
                      ><ion-icon name="play-outline"></ion-icon
                    ></ion-button>
                  `
                : html``}
            </ion-item>
          </ion-card-header>
          <ion-card-content>
            <ion-textarea
              readonly=${this.interview.status !== "Draft"}
              auto-grow="true"
              value=${this.interview.description}
              @ionBlur=${({ target }: { target: HTMLIonInputElement }) => {
                if (target.value !== ``) {
                  this.interview.description = target.value as string;
                }
              }}
            >
            </ion-textarea>
          </ion-card-content>
        </ion-card>
        <ion-list>
          ${this.interview.interviewParts.map((interviewpart, index) => {
            return html`
              <ion-item-sliding>
                <ion-item>
                  <ion-list-header
                    ><ion-input
                      value=${interviewpart.title}
                      readonly=${this.interview.status !== "Draft"}
                      @ionBlur=${({
                        target,
                      }: {
                        target: HTMLIonInputElement;
                      }) => {
                        if (target.value !== ``) {
                          interviewpart.title = target.value as string;
                        }
                      }}
                    ></ion-input
                  ></ion-list-header>
                </ion-item>
                ${this.interview.status === "Draft"
                  ? html` <ion-item-options side="end">
                      <ion-item-option
                        class="interviewDetail__optionDelete"
                        @click=${() => this.onInterviewpartSlideDelete(index)}
                        >Löschen</ion-item-option
                      >
                    </ion-item-options>`
                  : html``}
              </ion-item-sliding>
              <ion-reorder-group
                disabled=${this.interview.status !== "Draft"}
                @ionItemReorder=${({
                  detail,
                }: {
                  detail: ItemReorderEventDetail;
                }) => this.handleReorder(detail, interviewpart)}
              >
                ${interviewpart.interviewQuestions.map(
                  (interviewQuestion, index) => {
                    return html`
                      <ion-item-sliding>
                        <ion-item>
                          <ion-input
                            readonly=${this.interview.status !== "Draft"}
                            value=${interviewQuestion.question}
                            @ionBlur=${({
                              target,
                            }: {
                              target: HTMLIonInputElement;
                            }) => {
                              if (target.value !== ``) {
                                interviewQuestion.question = target.value as string;
                              }
                            }}
                          >
                          </ion-input>
                          <ion-reorder slot="end"></ion-reorder>
                        </ion-item>
                        ${this.interview.status === "Draft"
                          ? html` <ion-item-options side="end">
                              <ion-item-option
                                id="ion-option-delete"
                                @click=${() =>
                                  this.onQuestionSlideDelete(
                                    interviewpart,
                                    index
                                  )}
                                >Löschen</ion-item-option
                              >
                            </ion-item-options>`
                          : html``}
                      </ion-item-sliding>
                    `;
                  }
                )}
              </ion-reorder-group>
              ${this.interview.status === "Draft"
                ? html`<ion-item>
                    <ion-input
                      placeholder="Weitere Frage ..."
                      @ionBlur=${({
                        target,
                      }: {
                        target: HTMLIonInputElement;
                      }) => this.onNewQuestion(interviewpart, target)}
                    ></ion-input>
                  </ion-item>`
                : html``}
            `;
          })}
        </ion-list>
      </ion-content>
      ${this.interview.status === "Draft"
        ? html` <app-fab
            icon="add-outline"
            @click=${this.onFabClick}
          ></app-fab>`
        : html``}
    `;
  }

  onRunInterview() {
    let nav: HTMLIonNavElement = document.querySelector(
      "ion-nav"
    ) as HTMLIonNavElement;

    nav.push("app-interview-run", { interview: this.interview });
  }

  handleReorder(detail: ItemReorderEventDetail, interviewpart: InterviewPart) {
    //Update interview object
    let draggedItem = interviewpart.interviewQuestions.splice(
      detail.from,
      1
    )[0];
    interviewpart.interviewQuestions.splice(detail.to, 0, draggedItem);
    detail.complete();
  }

  async onInterviewpartSlideDelete(index: number) {
    const alert = await alertController.create({
      header: "Interview Part löschen?",
      message: "Diesen Interviewpart inklusiver aller Fragen wirklich löschen?",
      buttons: [
        {
          text: "Löschen",
          handler: () => {
            //Update interview object
            this.interview.interviewParts.splice(index, 1);
            //Da array in dem property nicht neu zugewiesen, sondern nur angepasst wird muss manuell ein Update erzeugt werden
            this.requestUpdate();
          },
        },
        {
          text: "Abbrechen",
          role: "cancel",
        },
      ],
    });
    await alert.present();

    // Important to entry the shadow root to get the reference on ion-list
    let items: HTMLIonListElement = this.shadowRoot?.querySelector(
      "ion-list"
    ) as HTMLIonListElement;
    items.closeSlidingItems();
  }

  onQuestionSlideDelete(interviewpart: InterviewPart, index: number) {
    //Update interview object
    interviewpart.interviewQuestions.splice(index, 1);
    // Important to entry the shadow root to get the reference on ion-list
    let items: HTMLIonListElement = this.shadowRoot?.querySelector(
      "ion-list"
    ) as HTMLIonListElement;
    items.closeSlidingItems();
    //Da array in dem property nicht neu zugewiesen, sondern nur angepasst wird muss manuell ein Update erzeugt werden
    this.requestUpdate();
  }

  onNewQuestion(interviewpart: InterviewPart, target: HTMLIonInputElement) {
    if (target.value !== null && target.value !== ``) {
      interviewpart.interviewQuestions.push({
        question: target.value as string,
      });
      //Da array in dem property nicht neu zugewiesen, sondern nur angepasst wird muss manuell ein Update erzeugt werden
      target.value = ``;
      this.requestUpdate();
    }
  }

  async onFabClick() {
    const alert = await alertController.create({
      header: "Interviewpart hinzufügen",
      message: "Bitte Titel eingeben",
      inputs: [
        {
          name: "parttitle",
          placeholder: "Part X",
        },
      ],
      buttons: [
        {
          text: "Abbrechen",
          role: "cancel",
        },
        {
          text: "Ok",
          handler: (data: any) => {
            if (data.parttitle !== ``) {
              this.interview.interviewParts.push({
                title: data.parttitle,
                interviewQuestions: [],
              });
              //Da array in dem property nicht neu zugewiesen, sondern nur angepasst wird muss manuell ein Update erzeugt werden
              this.requestUpdate();
            }
          },
        },
      ],
    });
    await alert.present();
  }

  connectedCallback() {
    super.connectedCallback();
    UserDataService.updateLastInterview(this.interview.firebaseId);
    //Only update the interview object in perstence when view is closed, not at every change on screen
    this.addEventListener("ionViewWillLeave", () =>
      InterviewService.updateInterview(this.interview)
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    //Remove event Listeners connected on connectedCallback()
    this.removeEventListener("ionViewWillLeave", () =>
      InterviewService.updateInterview(this.interview)
    );
  }
}
