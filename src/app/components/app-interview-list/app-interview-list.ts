import { LitElement, html, customElement } from "lit-element";

@customElement("app-interview-list")
class AppInterviewList extends LitElement {
  constructor() {
    super();
  }

  render() {
    return html`
      <app-toolbar></app-toolbar>
      <ion-content class="padding"
        ><ion-list>
          <ion-list-header>
            Interviews
          </ion-list-header>
          <ion-item>
            <ion-card>
              <!-- <span>Photo by <a href="https://unsplash.com/@davidvondiemar?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">David von Diemar</a> on <a href="https://unsplash.com/s/photos/press-conference?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span> -->
              <img src="src/assets/img/interview.jpg" width="100%" />
              <ion-card-header>
                <ion-card-subtitle>Interview</ion-card-subtitle>
                <ion-card-title>Sport-Reportage VfL Sassenberg</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                Bericht über den VfL Sassenberg, einem Kreisliga-Verein aus dem
                Kreis Warendorf. Es wird über den Saisonabbruch sowie den im
                September anstehenden Saisonstart und die aktuell laufende
                Vorbereitung berichtet. Es finden Interviews mit dem
                Trainergespann und einigen Spielern statt.
              </ion-card-content>
            </ion-card>
          </ion-item>
          <ion-item>
            <ion-card>
              <!-- <span>Photo by <a href="https://unsplash.com/@davidvondiemar?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">David von Diemar</a> on <a href="https://unsplash.com/s/photos/press-conference?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span> -->
              <img src="src/assets/img/interview.jpg" width="100%" />
              <ion-card-header>
                <ion-card-subtitle>Interview</ion-card-subtitle>
                <ion-card-title>Sport-Reportage VfL Sassenberg</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                Bericht über den VfL Sassenberg, einem Kreisliga-Verein aus dem
                Kreis Warendorf. Es wird über den Saisonabbruch sowie den im
                September anstehenden Saisonstart und die aktuell laufende
                Vorbereitung berichtet. Es finden Interviews mit dem
                Trainergespann und einigen Spielern statt.
              </ion-card-content>
            </ion-card>
          </ion-item>
          <ion-item>
            <ion-card>
              <!-- <span>Photo by <a href="https://unsplash.com/@davidvondiemar?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">David von Diemar</a> on <a href="https://unsplash.com/s/photos/press-conference?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span> -->
              <img src="src/assets/img/interview.jpg" width="100%" />
              <ion-card-header>
                <ion-card-subtitle>Interview</ion-card-subtitle>
                <ion-card-title>Sport-Reportage VfL Sassenberg</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                Bericht über den VfL Sassenberg, einem Kreisliga-Verein aus dem
                Kreis Warendorf. Es wird über den Saisonabbruch sowie den im
                September anstehenden Saisonstart und die aktuell laufende
                Vorbereitung berichtet. Es finden Interviews mit dem
                Trainergespann und einigen Spielern statt.
              </ion-card-content>
            </ion-card>
          </ion-item>
          <ion-item>
            <ion-card>
              <!-- <span>Photo by <a href="https://unsplash.com/@davidvondiemar?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">David von Diemar</a> on <a href="https://unsplash.com/s/photos/press-conference?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span> -->
              <img src="src/assets/img/interview.jpg" width="100%" />
              <ion-card-header>
                <ion-card-subtitle>Interview</ion-card-subtitle>
                <ion-card-title>Sport-Reportage VfL Sassenberg</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                Bericht über den VfL Sassenberg, einem Kreisliga-Verein aus dem
                Kreis Warendorf. Es wird über den Saisonabbruch sowie den im
                September anstehenden Saisonstart und die aktuell laufende
                Vorbereitung berichtet. Es finden Interviews mit dem
                Trainergespann und einigen Spielern statt.
              </ion-card-content>
            </ion-card>
          </ion-item>
        </ion-list>
      </ion-content>
      <app-fab icon="add-outline"></app-fab>
    `;
  }
}
