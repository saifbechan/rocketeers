import type P5 from 'p5';

export default abstract class Obstacle {
  abstract checkCollision(position: P5.Vector): boolean;
  abstract draw(): void;
}
