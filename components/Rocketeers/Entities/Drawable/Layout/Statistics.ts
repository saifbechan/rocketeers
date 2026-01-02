import type P5 from 'p5';

import { type MissionStatistics } from '../../../Types/Statistics.type';
import type Layout from './Layout';

export default class Statistics implements Layout {
  private pos: P5.Vector;

  constructor(p5: P5) {
    this.pos = p5.createVector(20, p5.height - 20);
  }

  draw(p5: P5, statistics: MissionStatistics): void {
    const texts: string[] = [
      `Framerate: ${String(Math.floor(p5.frameRate()))}`,
      `Instruction sets: ${String(statistics.instructions)}`,
      `Generation: ${String(statistics.generation)}`,
      `Lifespan: ${String(statistics.lifespan)}`,
      `Fitness level: ${String(statistics.fitness)}`,
      `Planets reached: ${String(statistics.reached)}`,
    ];

    p5.textFont('Inconsolata');
    p5.textAlign(p5.LEFT);
    p5.textSize(14);
    p5.fill(191, 191, 191);
    texts.forEach((text: string, index: number) => {
      p5.text(text, this.pos.x, this.pos.y - index * 16);
    });
  }
}
