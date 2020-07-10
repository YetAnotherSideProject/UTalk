import { LitElement, html, customElement, property, query } from 'lit-element';

@customElement('app-start')
class AppStart extends LitElement {

    createRenderRoot() {
        return this;
    }

    constructor() {
        super();
    }

    render() {
        return html`           
            <ion-content class="ion-padding">        
                <form @submit="HALLO" method="POST">
                <p>TEST</p>
            </ion-content>
        `;
    }
}