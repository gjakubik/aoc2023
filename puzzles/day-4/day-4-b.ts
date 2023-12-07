import { readData } from '../../shared.ts';
import chalk from 'chalk';
import _ from 'lodash';
import { log, logRed, logYellow } from '../utils.ts';

const getNumbers = (numStr: string) =>
  _.trim(numStr)
    .split(' ')
    .filter((s) => _.trim(s) !== '')
    .map((s) => parseInt(s));

export async function day4b(dataPath?: string) {
  const data = await readData(dataPath);

  const memoTable = {};

  const totalScratchcards = (lineIndex: number) => {
    if (lineIndex >= data.length) {
      return 0;
    }

    if (memoTable[lineIndex]) {
      return memoTable[lineIndex];
    }

    const [winningStr, mineStr] = data[lineIndex].split(':')[1].split('|');

    const winning = getNumbers(winningStr);
    const mine = getNumbers(mineStr);

    let wins = 0;
    mine.forEach((myNum) => {
      if (winning.includes(myNum)) {
        wins++;
      }
    });

    // Find total cards won from this card
    let totalCards = 1;
    if (wins > 0) {
      _.range(lineIndex + 1, lineIndex + wins + 1).forEach((newCardIndex) => {
        totalCards += totalScratchcards(newCardIndex);
      });
    }
    memoTable[lineIndex] = totalCards;
    return totalCards;
  };

  let total = 0;
  data.forEach((_, index) => {
    total += totalScratchcards(index);
  });
  return total;
}

const answer = await day4b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
