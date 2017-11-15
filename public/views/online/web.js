import Block from '../baseview'
import DemoGameModule from "./OnlineGameModule";

export default class SinglePlay extends Block {
  constructor() {
    super();

    this.template = require('./web.html');
  }

  creation() {
    document.body.innerHTML = this.template;

    let game = new DemoGameModule();
    game.gamePreRender();

  }

}
