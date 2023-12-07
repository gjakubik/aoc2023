import { readData } from '../../shared.ts';
import chalk from 'chalk';
import _ from 'lodash';
import { getNumbers, log, logRed, logYellow } from '../utils.ts';

export async function day5a(dataPath?: string) {
  const data = await readData(dataPath);

  const seeds = getNumbers(data[0].split(':')[1]);
  const blocks = data.slice(1).filter((l) => !!l);

  log('seeds', seeds);
  log('blocks', blocks);

  const maps: number[][][] = [];
  let mapIndex = 0;
  blocks.every((line) => {
    if (line.includes('map')) {
      mapIndex++;
      maps[mapIndex] = [];
      return true;
    }

    maps[mapIndex].push(getNumbers(line));

    return true;
  });

  maps.forEach((map) => {
    seeds.forEach((seed, i) => {
      map.forEach(([a, b, c]) => {
        if (b <= seed && seed < b + c) {
          seeds[i] = seed - b + a;
        }
      });
    });
  });

  return _.min(seeds);
}

const answer = await day5a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
