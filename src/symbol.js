export default class Symbol extends PIXI.Sprite {
  constructor(id, texture, topOffset) {
    super();

    this.texture = PIXI.Texture.from(`assets/${texture}`);
    this.id = id;
    this.y = topOffset;
  }
}