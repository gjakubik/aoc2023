import { readData } from '../../shared.ts';
import chalk from 'chalk';
import _ from 'lodash';
import { log, getNumbers } from '../utils.ts';

export async function day6b(dataPath?: string) {
  const data = await readData(dataPath);

  const records = getNumbers(data[1].split(':')[1]);
  const races = getNumbers(data[0].split(':')[1]).map((time, i) => ({
    time,
    record: records[i],
    possibilities: 0,
  }));

  log('races', races);

  races.forEach(({ time, record }, raceIndex) => {
    _.range(1, time).forEach((holdTime) => {
      if ((time - holdTime) * holdTime > record) {
        races[raceIndex].possibilities++;
      }
    });
  });

  const total = races
    .map((r) => r.possibilities)
    .reduce((total, curr) => total * curr);

  return total;
}

const answer = await day6b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
