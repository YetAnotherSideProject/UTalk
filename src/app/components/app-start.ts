import { LitElement, html, customElement, property, query } from 'lit-element';
import { SampleDataService } from '../services/SampleDataService'

@customElement('app-start')
class AppStart extends LitElement {

    constructor() {
        super();
    }

    render() {
        return html`           
            <ion-content class="ion-padding">        
                <p>${SampleDataService.sampleInterview1().title}</p>
            </ion-content>
        `;
    }
}