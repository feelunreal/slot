import Application from './application.js';
import ReelContainer from './reel-container.js';
import Bar from './bar.js';
import { formatResultByLines, computeReward } from './utils/index.js'

export default class SlotMachine extends Application  {
	constructor() {
		super();

		this.createGameElements();
		this.setBalance(5000);
		this.bar.displayReward(0);
	}

	createGameElements() {
		const reelContainer = new ReelContainer(this.handleResult.bind(this));
		this.app.stage.addChild(reelContainer.pixiContainer);
		reelContainer.constructReels();
		this.reelContainer = reelContainer;

		const bar = new Bar(this.play.bind(this));
		this.app.stage.addChild(bar.pixiContainer);
		this.bar = bar;
	}

	setMode(mode) {
		this.mode = mode;
	}

	setBalance(balance) {
		this.balance = balance;
		this.bar.displayBalance(balance);
	}

	play() {
		this.setBalance(--this.balance);

		this.reelContainer.rotateReels(this.mode);
	}

	handleResult(reels) {
		const result = formatResultByLines(reels);
		const rewardByLines = computeReward(result);
		const sum = Object.values(rewardByLines).reduce((acc, val) => acc + val, 0);

		this.bar.displayReward(sum);
		this.reelContainer.highlightLines(rewardByLines);

		if (sum > 0) {
			this.bar.highlightReward();
		}
	}
}