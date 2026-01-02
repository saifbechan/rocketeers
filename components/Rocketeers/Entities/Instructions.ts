import type P5 from 'p5';

import { Evolution } from '../Helpers/Config';

class Instructions {
  private readonly steps: P5.Vector[];

  constructor(p5: P5, lifespan: number, instructions: Instructions[]) {
    const steps = this.crossover(
      p5,
      lifespan,
      instructions[Math.floor(Math.random() * instructions.length)],
      instructions[Math.floor(Math.random() * instructions.length)],
    );

    this.steps = this.mutate(p5, steps);
  }

  private crossover = (
    p5: P5,
    lifespan: number,
    current: Instructions | undefined,
    partner: Instructions | undefined,
  ): P5.Vector[] => {
    const steps = new Array<P5.Vector>(lifespan);
    const middle = current
      ? Math.floor(Math.random() * current.getLength())
      : -1;

    for (let index = 0; index < lifespan; index += 1) {
      const currentStep = current?.getStep(index);
      const partnerStep = partner?.getStep(index);

      if (middle === -1 || !currentStep || !partnerStep) {
        steps[index] = this.createRandom(p5);
      } else if (index > middle) {
        steps[index] = this.createFromPrevious(p5, currentStep);
      } else {
        steps[index] = this.createFromPrevious(p5, partnerStep);
      }
    }
    return steps;
  };

  private mutate = (p5: P5, steps: P5.Vector[]): P5.Vector[] =>
    steps.map((step) => {
      if (this.shouldMutate()) {
        return this.createRandom(p5);
      }
      return step;
    });

  private shouldMutate = (): boolean =>
    Math.random() < (Evolution.MUTATION_RATE as number);

  private createRandom = (p5: P5): P5.Vector => {
    const step = p5.createVector(p5.random(-1, 1), p5.random(-1, 1));
    return p5
      .createVector(step.x, step.y)
      .setMag(Evolution.MAX_FORCE as number);
  };

  private createFromPrevious = (p5: P5, step: P5.Vector): P5.Vector =>
    p5.createVector(step.x, step.y);

  getLength(): number {
    return this.steps.length;
  }

  getStep(index: number): P5.Vector | undefined {
    return this.steps[index];
  }
}

export default Instructions;
