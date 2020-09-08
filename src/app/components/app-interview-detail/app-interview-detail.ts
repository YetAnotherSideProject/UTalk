import {
  LitElement,
  html,
  css,
  customElement,
  property,
  internalProperty,
} from "lit-element";
import { ItemReorderEventDetail, alertController } from "@ionic/core";
import { Interview, InterviewPart } from "../../models/Interview";
import InterviewImage from "../../../assets/img/interview.jpg";
import { UserDataService } from "../../services/UserDataService";
import { InterviewService } from "../../services/InterviewService";

@customElement("app-interview-detail")
class AppInterviewDetail extends LitElement {
  @property()
  interview: Interview = {} as Interview;
  @internalProperty() isFooterActive: boolean = false;

  constructor() {
    super();
  }

  static get styles() {
    return css`
      .interviewDetail__heading {
        text-align: center;
      }
      .interviewDetail__title {
        font-weight: bold;
        font-size: 2em;
      }
      .interviewDetail__runButton {
        --ion-color-primary: var(--ion-color-success);
        --ion-color-primary-contrast: var(--ion-color-success-contrast);
      }
      .interviewDetail__cancelActive {
        --ion-color-primary: var(--ion-color-danger);
        --ion-color-primary-contrast: var(--ion-color-danger-contrast);
      }
      .interviewDetail__optionDelete {
        --ion-color-primary: var(--ion-color-danger);
        --ion-color-primary-contrast: var(--ion-color-danger-contrast);
      }
      ion-textarea {
        white-space: unset !important;
      }
      ion-reorder {
        display: flex !important;
        flex-direction: column !important;
        justify-content: center !important;
      }
      .interviewDetail__questionAnswer {
        --min-height: 0px;
        font-weight: normal;
        font-size: small;
      }
      .interviewDetail__footer {
        position: fixed;
        bottom: 0px;
        z-index: 1000;
      }
      .interviewDetail__footerToolbar {
        --background: var(--ion-color-medium);
        padding: 1em;
      }
      .interviewDetail__footerText {
        font-size: 1.5em;
      }
    `;
  }

  render() {
    return html`
      <app-toolbar
        backButton="true"
        defaultHref="/interviewlist"
        infoButton="true"
        .onInfoClick=${() => this.toggleFooter()}
      ></app-toolbar>
      <ion-content @click=${() => this.closeFooter()} class="padding">
        <h1 class="interviewDetail__heading">Interview Detail</h1>
        <ion-card>
          <!-- <span>Photo by <a href="https://unsplash.com/@davidvondiemar?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">David von Diemar</a> on <a href="https://unsplash.com/s/photos/press-conference?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span> -->
          <img src="${InterviewImage}" width="100%" />
          <ion-card-header>
            <ion-card-subtitle
              >Interview mit Status ${this.interview.status}</ion-card-subtitle
            >
          </ion-card-header>
          <ion-card-content>
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
                  <ion-item lines="none">
                    <ion-button
                      slot="end"
                      size="medium"
                      class="interviewDetail__runButton"
                      @click=${() => this.onRunInterview()}
                      ><ion-icon name="play-outline"></ion-icon>
                    </ion-button>
                    ${this.interview.status === "Active"
                      ? html`<ion-button
                          slot="end"
                          size="medium"
                          class="interviewDetail__cancelActive"
                          @click=${() => this.onCancelActiveMode()}
                          ><ion-icon name="arrow-undo-outline"></ion-icon
                        ></ion-button>`
                      : html``}
                  </ion-item>
                `
              : html``}
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
            if (this.interview.status === "Draft") {
              return html`
                <ion-item-sliding>
                  <ion-item>
                    <ion-list-header
                      ><ion-input
                        style="font-size: large;"
                        value=${interviewpart.title}
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
                  <ion-item-options side="end">
                    <ion-item-option
                      class="interviewDetail__optionDelete"
                      @click=${() => this.onInterviewpartSlideDelete(index)}
                      >Löschen</ion-item-option
                    >
                  </ion-item-options>
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
                            <ion-textarea
                              auto-grow="true"
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
                            </ion-textarea>
                            <ion-reorder slot="end"></ion-reorder>
                          </ion-item>
                          <ion-item-options side="end">
                            <ion-item-option
                              class="interviewDetail__optionDelete"
                              @click=${() =>
                                this.onQuestionSlideDelete(
                                  interviewpart,
                                  index
                                )}
                              >Löschen</ion-item-option
                            >
                          </ion-item-options>
                        </ion-item-sliding>
                      `;
                    }
                  )}
                </ion-reorder-group>
                <ion-item>
                  <ion-input
                    placeholder="Weitere Frage ..."
                    @ionBlur=${({ target }: { target: HTMLIonInputElement }) =>
                      this.onNewQuestion(interviewpart, target)}
                  ></ion-input>
                </ion-item>
              `;
            } else {
              return html`
                <ion-item>
                  <ion-list-header
                    ><ion-label>
                      <h1>${interviewpart.title}</h1>
                    </ion-label></ion-list-header
                  >
                </ion-item>
                ${interviewpart.interviewQuestions.map(
                  (interviewQuestion, index) => {
                    return html`
                      ${interviewQuestion.answer !== undefined
                        ? html`<ion-item lines="none">
                              <ion-label class="ion-text-wrap">
                                ${interviewQuestion.question}
                              </ion-label>
                            </ion-item>
                            <ion-item class="interviewDetail__questionAnswer"
                              ><ion-text
                                >${interviewQuestion.answer}</ion-text
                              ></ion-item
                            >`
                        : html`<ion-item>
                            <ion-label>${interviewQuestion.question}</ion-label>
                          </ion-item>`}
                    `;
                  }
                )}
              `;
            }
          })}
        </ion-list>
        ${this.isFooterActive
          ? html` <ion-footer class="interviewDetail__footer">
              <ion-toolbar class="interviewDetail__footerToolbar">
                <h1 class="interviewDetail__footerText">Info</h1>
                <p>
                  Je nach Status (Draft, Active, Archived) kannst du auf dieser
                  Seite verschiedene Interkationen durchführen. Gib z.B. mit
                  Hilfe des Floating Action Buttons unten rechts einen neuen
                  Interviewpart ein. Die zwei Balken rechts neben den Fragen
                  signalisieren, dass du sie nach deinen Vorstellungen
                  umsortieren kannst. Eine weitere Frage fügst du über das
                  entsprechend gekennzeichnete Feld ein. Mit dem grünen
                  Play-Button startest du ein Interview oder führst es fort.
                  Außerdem hast du bei einem aktiven Interview die Möglichkeit
                  deine bisher aufgenommenen Antworten zurückzusetzen. Sei damit
                  aber vorsichtig!
                </p>
              </ion-toolbar>
            </ion-footer>`
          : html``}
      </ion-content>
      ${this.interview.status === "Draft"
        ? html` <app-fab
            icon="add-outline"
            @click=${this.onFabClick}
          ></app-fab>`
        : html``}
    `;
  }

  toggleFooter() {
    this.isFooterActive = !this.isFooterActive;
  }

  closeFooter() {
    this.isFooterActive = false;
  }

  onRunInterview() {
    let nav: HTMLIonNavElement = document.querySelector(
      "ion-nav"
    ) as HTMLIonNavElement;

    if (this.interview.status === "Draft") {
      this.interview.status = "Active";
      InterviewService.updateInterview(this.interview);
    }
    nav.push("app-interview-run", { interview: this.interview });
  }

  async onCancelActiveMode() {
    const alert = await alertController.create({
      header: "Zu Entwurf zurückkehren?",
      message:
        "Das Interview wirklich in den Entwurfsmodus zurückstellen? Dabei gehen alle bisherigen Antworten verloren",
      buttons: [
        {
          text: "Zum Entwurf",
          handler: () => {
            this.interview.interviewParts.forEach((interviewpart) => {
              interviewpart.interviewQuestions.forEach((question) => {
                delete question.answer;
              });
            });
            this.interview.status = "Draft";
            InterviewService.updateInterview(this.interview);
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
