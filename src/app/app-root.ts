import { LitElement, html, customElement } from "lit-element";

import "./components/app-start";

@customElement("app-root")
class AppRoot extends LitElement {

	constructor() {
		super();
	}

	//App root muss in seine Child Objects und nicht in einen Shadow DOM rendern!
	createRenderRoot() {
		return this;
	}

	render() {
		return html`
        <ion-app>
			<ion-router use-hash="false">
				<ion-route url="/" component="app-start"></ion-route>
			</ion-router>
			<ion-nav id="nav-main"></ion-nav>
        </ion-app>
      	`;
	}
}