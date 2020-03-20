export default class Application {
	constructor() {
    const app = new PIXI.Application({
    	width: window.innerWidth,
    	height: 242,
    	backgroundColor: 0xc1c1c1,
    	resolution: 1
    });

    document.body.appendChild(app.view);

    this.app = app;
  }
}