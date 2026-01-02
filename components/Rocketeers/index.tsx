'use client';

import { useEffect, useRef } from 'react';

import type P5 from 'p5';

import Atlas from './Entities/Drawable/Atlas';
import Mission from './Entities/Mission';
import { ExplosionAssets, Obstacles, Planets, Ships } from './Helpers/Config';

const Rocketeers = () => {
  const inputEl = useRef<P5 | null>(null);

  useEffect(() => {
    const rocketeersCount = 100;
    let steps = 600;
    let generation = 1;
    let step = 0;

    let mission: Mission | undefined;

    const images: Map<string, P5.Image> = new Map<string, P5.Image>();

    if (inputEl.current !== null) {
      inputEl.current.remove();
      inputEl.current = null;
    }

    const initP5 = async () => {
      const P5Class = (await import('p5')).default;
      new P5Class((p: P5) => {
        inputEl.current = p;
        p.setup = () => {
          const canvas = p.createCanvas(p.windowWidth - 4, p.windowHeight - 4);
          canvas.attribute('role', 'rocketeers');

          if (process.env.NODE_ENV !== 'test') {
            const load = async (key: string, path: string) => {
              const img = await p.loadImage(path);
              images.set(key, img);
            };

            const promises: Promise<void>[] = [];

            Object.values(Ships).forEach((ship: string) => {
              promises.push(load(ship, `images/${ship}.png`));
            });

            Object.values(Planets).forEach((planet: string) => {
              promises.push(load(planet, `images/${planet}.png`));
            });

            Object.values(Obstacles).forEach((layout: string) => {
              promises.push(load(layout, `images/${layout}.png`));
            });

            promises.push(
              load(
                ExplosionAssets.SPRITE,
                `images/${ExplosionAssets.SPRITE}.png`,
              ),
            );

            Promise.all(promises)
              .then(() => {
                mission = new Mission(
                  p,
                  images,
                  new Atlas(
                    p,
                    images,
                    p.createGraphics(p.windowWidth - 4, p.windowHeight - 4),
                  ),
                );
                mission.init(generation, steps, rocketeersCount);
              })
              .catch((err: unknown) => {
                console.error('Failed to load images', err);
              });
          } else {
            mission = new Mission(
              p,
              images,
              new Atlas(
                p,
                images,
                p.createGraphics(p.windowWidth - 4, p.windowHeight - 4),
              ),
            );
            mission.init(generation, steps, rocketeersCount);
          }
        };

        p.draw = (): void => {
          if (!mission) return;
          p.background(20, 21, 38);
          mission.run(step);
          step += 1;
          if (step === steps) {
            mission.evaluate(steps);

            step = 0;
            generation += 1;
            if (generation >= 80) {
              steps = 1600;
            } else if (generation >= 40) {
              steps = 1400;
            } else if (generation >= 20) {
              steps = 1000;
            } else if (generation >= 5) {
              steps = 800;
            }

            mission.init(generation, steps, rocketeersCount);
          }
        };

        p.windowResized = (): void => {
          p.resizeCanvas(p.windowWidth - 4, p.windowHeight - 4);
        };
      });
    };
    initP5().catch((err: unknown) => {
      console.error('Failed to initialize P5', err);
    });
  }, []);

  return null;
};

export default Rocketeers;
