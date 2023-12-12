import { readData } from '../../shared.ts';
import chalk from 'chalk';
import _ from 'lodash';
import { log, logRed, logYellow } from '../utils.ts';

interface Galaxy {
  id: number;
  x: number;
  y: number;
}

const isColEmpty = (data: string[][], i: number) => {
  let allEmpty = true;
  data.forEach((line) => {
    if (line[i] !== '.') {
      allEmpty = false;
    }
  });
  return allEmpty;
};

export async function day11a(dataPath?: string) {
  const data = await readData(dataPath);

  // Add all rows and cols
  const rowGalaxies = [];

  data.forEach((line) => {
    rowGalaxies.push(line);
    Array.from(line).every((c) => c === '.') && rowGalaxies.push(line);
  });

  const universe = rowGalaxies.map((line: string) => Array.from(line));

  for (let i = 0; i < universe[0].length; i++) {
    if (isColEmpty(universe, i)) {
      universe.forEach((line) => line.splice(i, 0, '.'));
      i++;
    }
  }

  universe.forEach((line) => {
    console.log(line.join(''));
  });

  const galaxies: Galaxy[] = [];

  // Find positions of galaxies
  universe.forEach((line, li) => {
    Array.from(line).forEach((c, ci) => {
      if (c === '#') {
        galaxies.push({
          id: galaxies[galaxies.length - 1]
            ? galaxies[galaxies.length - 1].id + 1
            : 1,
          x: ci,
          y: li,
        });
      }
    });
  });

  console.table(galaxies);

  const distTable: number[][] = [];
  galaxies.forEach((curr, curri) => {
    // log(`curr ${curri}`, curr);
    galaxies.forEach((comp) => {
      // log('comp', comp);
      const h = Math.abs(curr.x - comp.x);
      const v = Math.abs(curr.y - comp.y);
      // logRed('pushing', h + v);
      distTable[curri]
        ? distTable[curri].push(h + v)
        : (distTable[curri] = [h + v]);
    });
  });

  let total = 0;

  distTable.forEach((line) => {
    // find 0
    let si = line.findIndex((v) => v === 0);
    while (si < line.length) {
      total += line[si];
      si++;
    }
  });

  return total;
}

const answer = await day11a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
