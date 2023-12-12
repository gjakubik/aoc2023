import { readData } from '../../shared.ts';
import chalk from 'chalk';
import _ from 'lodash';
import { log, logRed, logYellow } from '../utils.ts';

interface Galaxy {
  id: number;
  x: number;
  y: number;
}

// const EMPTY_GALAXY_SIZE = 100;
const EMPTY_GALAXY_SIZE = 1000000;

const isColEmpty = (data: string[][], i: number) => {
  let allEmpty = true;
  data.forEach((line) => {
    if (line[i] !== '.' && line[i] !== 'X') {
      allEmpty = false;
    }
  });
  return allEmpty;
};

export async function day11b(dataPath?: string) {
  const data = await readData(dataPath);

  // Add all rows and cols
  const rowGalaxies = [];

  data.forEach((line) => {
    if (Array.from(line).every((c) => c === '.')) {
      rowGalaxies.push(_.repeat('X', line.length));
    } else {
      rowGalaxies.push(line);
    }
  });

  const universe = rowGalaxies.map((line: string) => Array.from(line));

  for (let i = 0; i < universe[0].length; i++) {
    if (isColEmpty(universe, i)) {
      universe.forEach((line) => line.splice(i, 1, 'X'));
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

      let totx = 0;
      let toty = 0;
      // Traverse from max x to min x and add 1000000
      const [sx, ex] = [curr.x, comp.x].sort();
      const [sy, ey] = [curr.y, comp.y].sort();
      let cx = sx;
      let cy = sy;
      while (cx < ex) {
        if (universe[sy][cx] === 'X') {
          totx += EMPTY_GALAXY_SIZE;
        } else {
          totx += 1;
        }
        cx++;
      }

      while (cy < ey) {
        if (universe[cy][sx] === 'X') {
          toty += EMPTY_GALAXY_SIZE;
        } else {
          toty += 1;
        }
        cy++;
      }

      // logRed('pushing', totx + toty);
      distTable[curri]
        ? distTable[curri].push(totx + toty)
        : (distTable[curri] = [totx + toty]);
    });
  });

  // log('distTable', distTable);
  let total = 0;

  distTable.forEach((line) => {
    // find 0
    let si = line.findIndex((v) => v === 0);
    while (si < line.length) {
      total += line[si];
      // log('total', total);
      si++;
    }
  });

  return total;
}

const answer = await day11b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
