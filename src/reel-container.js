import Reel from './reel.js';
import { SYMBOL_WIDTH } from './constants.js';

export default class ReelContainer {
  constructor(onReelsRotationEnd) {
    const rotationTimes = [2000, 2500, 3000];
    const reelsCount = rotationTimes.length;
    const reelsResultPositions = [];

    const onRotationEnd = (reelResult) => {
      reelsResultPositions.push(reelResult);
      const isRotationEnded = reelsResultPositions.length === reelsCount;

      if (isRotationEnded) {
        onReelsRotationEnd(reelsResultPositions);
      }
    }

    this.reelsResultPositions = reelsResultPositions;
    this.reels = Array.from(rotationTimes, (rotationTime) => new Reel(rotationTime, onRotationEnd));

    this.pixiContainer = new PIXI.Container();
  }

  constructReels() {
    for (let i = 0; i < this.reels.length; i++) {
      const reel = this.reels[i];
      reel.pixiContainer.position.x = SYMBOL_WIDTH * i;
      this.pixiContainer.addChild(reel.pixiContainer);
    }
  }

  rotateReels(params) {
    this.reelsResultPositions.length = 0;
    for (let i = 0; i < this.reels.length; i++) {
      const reel = this.reels[i];
      reel.rotate(params[i]);
    }
  }

  highlightLines(lines) {
    for (let i = 0; i < this.reels.length; i++) {
      const reel = this.reels[i];
      reel.highlight(lines);
    }
  }
}