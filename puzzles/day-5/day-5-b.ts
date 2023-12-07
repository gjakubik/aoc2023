import { readData } from '../../shared.ts';
import chalk from 'chalk';
import _ from 'lodash';
import { getNumbers, log, logRed, logYellow } from '../utils.ts';

export async function day5b(dataPath?: string) {
  const data = await readData(dataPath);

  let seeds: number[] = getNumbers(data[0].split(':')[1]);
  const blocks = data.slice(1).filter((l) => !!l);

  log('seeds', seeds);

  let seedRanges: number[][] = [];
  let first = true;
  let rangeNum = 0;
  seeds.forEach((seed) => {
    if (first) {
      seedRanges[rangeNum] = [seed];
      first = false;
    } else {
      seedRanges[rangeNum].push(seedRanges[rangeNum][0] + seed);
      first = true;
      rangeNum++;
    }
  });

  log('seedRanges', seedRanges);

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
    let newSeedRanges = [];
    while (seedRanges.length > 0) {
      const [s, e] = seedRanges.pop();
      map.every(([a, b, c]) => {
        const os = _.max([s, b]);
        const oe = _.min([e, b + c]);
        if (os < oe) {
          newSeedRanges.push([os - b + a, oe - b + a]);
          if (os > s) {
            seedRanges.push([s, os]);
          }
          if (e > oe) {
            seedRanges.push([oe, e]);
          }
          return false;
        } else {
          newSeedRanges.push([s, e]);
        }
        return true;
      });
    }
    seedRanges = [...newSeedRanges];
  });
  log('ranges', seedRanges);
  return _.min(seedRanges);
}

const answer = await day5b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
