import { SYMBOL_WIDTH, SYMBOL_HEIGHT, FRAME_TIME } from './constants.js';
import Button from './button.js';

export default class Bar {
  constructor(playHandler) {
    this.width = 240;
    this.height = SYMBOL_HEIGHT * 2;
    this.position = { x: SYMBOL_WIDTH * 3, y: 0 };
    this.playHandler = playHandler;

    this.renderElements();
  }

  renderElements() {
    const { x, y } = this.position;
    const { width, height } = this;

    const bar = new PIXI.Graphics();
    bar.position.x = x;
    bar.position.y = y;
    bar.beginFill(0x000000);
    bar.drawRect(0, 0, width, height);
    bar.endFill();

    const playButton = new Button(this.playHandler);

    const balance = new PIXI.Text('Balance: ', {
      fontFamily: 'Arial',
      fontSize: 24,
      fill: 'white',
    });

    balance.x = 40;
    balance.y = 20;

    const reward = new PIXI.Text('Reward: ', {
      fontFamily: 'Arial',
      fontSize: 24,
      fill: 'white',
    });

    reward.x = 40;
    reward.y = 50;

    bar.addChild(balance);
    bar.addChild(playButton);
    bar.addChild(reward);

    this.balance = balance;
    this.reward = reward;
    this.pixiContainer = bar;
  }

  highlightReward() {
    this.reward.style.fill = 'orange';

    setTimeout(() => {
      this.reward.style.fill = 'white';
    }, 1000);
  }

  displayBalance(balance) {
    this.balance.text = `Balance: ${balance}`;
  }

  displayReward(reward) {
    this.reward.text = `Reward: ${reward}`;
  }
}