import { readData } from '../../shared.ts';
import chalk from 'chalk';
import { log, logRed, logYellow } from '../utils.ts';

const ABOVE = ['F', '7', '|', 'S'];
const LEFT = ['F', 'L', '-', 'S'];
const RIGHT = ['7', 'J', '-', 'S'];
const BELOW = ['|', 'L', 'J', 'S'];

export async function day10a(dataPath?: string) {
  const data = await readData(dataPath);

  // find S
  let sx = undefined;
  let sy = undefined;

  data.every((line, iy) => {
    Array.from(line).every((char, ix) => {
      if (char === 'S') {
        sx = ix;
        sy = iy;
        return false;
      }
      return true;
    });
    // return true only if the coord is not found
    return !sx;
  });

  log('sx', sx);
  log('sy', sy);

  let cx = sx;
  let cy = sy;
  let last = 'none';
  let start = true;
  let length = 0;

  log('condition', start || (cx !== sx && cy !== sy));

  while (start || cx !== sx || cy !== sy) {
    if (start) {
      start = false;
    }

    length++;

    logYellow('pipe', data[cy][cx]);
    logRed('cx', cx);
    logRed('cy', cy);
    logRed('last', last);
    // Traverse up
    if (
      !!data[cy - 1] &&
      last !== 'up' &&
      BELOW.includes(data[cy][cx]) &&
      ABOVE.includes(data[cy - 1][cx])
    ) {
      log('up');
      last = 'down';
      cy--;
      continue;
    }

    //Traverse right
    if (
      !!data[cy] &&
      last !== 'right' &&
      LEFT.includes(data[cy][cx]) &&
      RIGHT.includes(data[cy][cx + 1])
    ) {
      log('right');
      last = 'left';
      cx++;
      continue;
    }

    // Traverse left
    if (
      !!data[cy] &&
      last !== 'left' &&
      RIGHT.includes(data[cy][cx]) &&
      LEFT.includes(data[cy][cx - 1])
    ) {
      log('left');
      last = 'right';
      cx--;
      continue;
    }

    // Travers down
    if (
      !!data[cy + 1] &&
      last !== 'down' &&
      ABOVE.includes(data[cy][cx]) &&
      BELOW.includes(data[cy + 1][cx])
    ) {
      log('down');
      last = 'up';
      cy++;
      continue;
    }
  }

  log('length', length);

  return length / 2;
}

const answer = await day10a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
