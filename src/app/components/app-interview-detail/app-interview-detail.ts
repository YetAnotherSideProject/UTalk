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
      #ion-option-delete {
        --ion-color-primary: var(--ion-color-danger);
        --ion-color-primary-contrast: var(--ion-color-danger-contrast);
      }
      #ion-button-iv_run {
        --ion-color-primary: var(--ion-color-success);
        --ion-color-primary-contrast: var(--ion-color-success-contrast);
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
              <ion-card-title slot="start"
                >${this.interview.title}</ion-card-title
              >
              <ion-button
                slot="end"
                size="large"
                id="ion-button-iv_run"
                @click=${() => this.onRunInterview()}
                ><ion-icon name="play-outline"></ion-icon
              ></ion-button>
            </ion-item>
          </ion-card-header>
          <ion-card-content>
            Interview description
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
                      @ionBlur=${(event: any) =>
                        (interviewpart.title = event.target.value)}
                    ></ion-input
                  ></ion-list-header>
                </ion-item>
                <ion-item-options side="end">
                  <ion-item-option
                    id="ion-option-delete"
                    @click=${() => this.onInterviewpartSlideDelete(index)}
                    >Löschen</ion-item-option
                  >
                </ion-item-options>
              </ion-item-sliding>
              <ion-reorder-group
                disabled="false"
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
                            value=${interviewQuestion.question}
                            @ionBlur=${(event: any) =>
                              (interviewQuestion.question = event.target.value)}
                          >
                          </ion-input>
                          <ion-reorder slot="end"></ion-reorder>
                        </ion-item>
                        <ion-item-options side="end">
                          <ion-item-option
                            id="ion-option-delete"
                            @click=${() =>
                              this.onQuestionSlideDelete(interviewpart, index)}
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
          })}
        </ion-list>
      </ion-content>
      <app-fab icon="add-outline" @click=${this.onFabClick}></app-fab>
    `;
  }

  onRunInterview() {
    console.log(`Run interview implementation missing!`);
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
          text: "Abrechen",
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
