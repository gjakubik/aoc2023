import { readData } from '../../shared.ts';
import chalk from 'chalk';
import _ from 'lodash';
import { log, logRed, logYellow } from '../utils.ts';

const getNumbers = (numStr: string) =>
  _.trim(numStr)
    .split(' ')
    .filter((s) => _.trim(s) !== '')
    .map((s) => parseInt(s));

export async function day4a(dataPath?: string) {
  const data = await readData(dataPath);

  let total = 0;
  data.forEach((line) => {
    const [winningStr, mineStr] = line.split(':')[1].split('|');

    const winning = getNumbers(winningStr);
    const mine = getNumbers(mineStr);

    log('winning', winning);
    log('mine', mine);

    let wins = 0;
    mine.forEach((myNum) => {
      if (winning.includes(myNum)) {
        logRed('match', myNum);
        wins++;
      }
    });
    if (wins > 0) {
      const score = 1 * 2 ** (wins - 1);
      logYellow('wins', wins);
      logYellow('score', score);
      total += score;
    }
  });

  return total;
}

const answer = await day4a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
