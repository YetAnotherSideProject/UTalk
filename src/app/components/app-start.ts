import { LitElement, html, customElement, property, query } from 'lit-element';

@customElement('app-start')
class AppStart extends LitElement {

    constructor() {
        super();
    }

    render() {
        return html`           
            <ion-content class="ion-padding">        
                <p>TEST</p>
            </ion-content>
        `;
    }
}