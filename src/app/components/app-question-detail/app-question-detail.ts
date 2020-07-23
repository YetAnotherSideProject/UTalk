import { LitElement, html, customElement } from "lit-element";

@customElement("app-question-detail")
class AppQuestionDetail extends LitElement {
  editable: boolean = false;
  text: string = "Trallafitti";
  opacity: number = 0.5;

  constructor() {
    super();
  }

  render() {
    return html`
      <!-- TODO edit defaultHref to navigate back to suitable category id -->
      <app-toolbar
        backButton="true"
        defaultHref="/questionlist/2"
        editButton="true"
        .onEditClick=${() => this.toggle()}
      ></app-toolbar>
      <ion-content class="padding">
        <ion-card>
          <!-- <span>Photo by <a href="https://unsplash.com/@brucemars?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">bruce mars</a> on <a href="https://unsplash.com/s/photos/questions?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span> -->
          <img
            src="src/assets/img/question.jpg"
            width="100%"
            style="opacity: ${this.opacity}"
          />
          <ion-card-header>
            <ion-card-subtitle>Question</ion-card-subtitle>
            <ion-card-title><u>Kategorie</u></ion-card-title>
            <ion-input
              disabled=${!this.editable}
              readonly=${!this.editable}
              placeholder="Kategorie eingeben ..."
              value="Sport"
            ></ion-input>
          </ion-card-header>
          <ion-card-content>
            <ion-card-title><u>Frage</u></ion-card-title>
            <ion-textarea
              disabled=${!this.editable}
              readonly=${!this.editable}
              placeholder="Deine Frage ..."
              value=${this.text}
              auto-grow="true"
            ></ion-textarea>
          </ion-card-content>
        </ion-card>
        <!-- <div
          style="height: 100%; margin: 10px 10px 0px 10px; display: flex; flex-direction: column; justify-content: center"
        >
          <ion-label>Frage</ion-label>
          <ion-textarea
            disabled=${!this.editable}
            readonly=${!this.editable}
            placeholder="Deine Frage ..."
            value=${this.text}
            auto-grow="true"
          ></ion-textarea>
          <ion-button
            @click=${this.toggle}
            style="width: 90%; margin: auto; margin-bottom: 30px;"
            >Speichern</ion-button
          >
        </div> -->
        <div
          style="position: absolute; bottom: 5px; width: 100%; text-align: center"
        >
          <ion-button
            disabled=${!this.editable}
            expand="block"
            @click=${this.saveQuestion}
            >Speichern</ion-button
          >
        </div>
      </ion-content>
    `;
  }

  toggle() {
    this.editable = !this.editable;
    if (this.editable) {
      this.opacity = 1.0;
    } else {
      this.opacity = 0.5;
    }
    this.requestUpdate();
  }

  saveQuestion() {
    this.showSaveToast();
    this.toggle();
  }

  // Utils
  async showSaveToast() {
    const toast = document.createElement("ion-toast");
    toast.message = "Frage wurde gespeichert!";
    toast.duration = 2000;

    document.body.appendChild(toast);
    return toast.present();
  }
}
