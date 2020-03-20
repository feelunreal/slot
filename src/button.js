export default class Button {
  constructor(playHandler) {
    const text = new PIXI.Text('Spin', {
      fontFamily: 'Arial',
      fontSize: 24,
      fill: 'white',
    });
    
    text.position.set(42, 12);
    text.resolution = 1;

    const button = new PIXI.Graphics();
    button.beginFill(0x61b705);
    button.drawRoundedRect(0, 0, 141, 50, 5);
    button.endFill();
    button.interactive = true;
    button.buttonMode = true;
    button.on('mousedown', playHandler);
    button.addChild(text);
    button.position.set(50, 170);

    return button;
  }
}