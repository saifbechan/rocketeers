import type P5 from 'p5';

import { ExplosionAssets, ExplosionParams } from '../../Helpers/Config';

export default class Explosion {
  private index = 0.0;
  private readonly sprites: P5.Image[] = [];

  constructor(p5: P5, images: Map<string, P5.Image | P5.Graphics>) {
    const image = p5.createImage(1, 1);
    const sprite = images.get(ExplosionAssets.SPRITE) ?? image;

    if (Explosion.cachedSource !== sprite) {
      Explosion.cachedSource = sprite;
      Explosion.cachedSprites = [];
      sprite.loadPixels();
      Explosion.cachedSprites.push(sprite.get(1, 1, 89, 89));
      Explosion.cachedSprites.push(sprite.get(93, 1, 89, 89));
      Explosion.cachedSprites.push(sprite.get(185, 1, 89, 89));
      Explosion.cachedSprites.push(sprite.get(277, 1, 89, 89));
      Explosion.cachedSprites.push(sprite.get(369, 1, 89, 89));

      Explosion.cachedSprites.push(sprite.get(1, 93, 89, 89));
      Explosion.cachedSprites.push(sprite.get(93, 93, 89, 89));
      Explosion.cachedSprites.push(sprite.get(185, 93, 89, 89));
      Explosion.cachedSprites.push(sprite.get(277, 93, 89, 89));
      Explosion.cachedSprites.push(sprite.get(369, 93, 89, 89));
    }

    this.sprites = Explosion.cachedSprites;
  }

  private static cachedSource: P5.Image | P5.Graphics | null = null;
  private static cachedSprites: P5.Image[] = [];

  draw(p5: P5, pos: P5.Vector): void {
    if (this.index > this.sprites.length) return;

    p5.image(
      this.sprites[Math.floor(this.index) % this.sprites.length],
      pos.x,
      pos.y,
      30,
      30,
    );

    this.index += ExplosionParams.SPEED;
  }
}
