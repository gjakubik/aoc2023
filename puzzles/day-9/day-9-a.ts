import { readData } from '../../shared.ts';
import chalk from 'chalk';
import _ from 'lodash';
import { getNumbers, log, logRed, logYellow } from '../utils.ts';

export async function day9a(dataPath?: string) {
  const data = await readData(dataPath);
  let total = 0;
  data.forEach((line) => {
    const nums = [getNumbers(line)];

    // log('nums', nums);

    while (!nums[nums.length - 1].every((n) => n === 0)) {
      let prevNum = null;
      const newNums = [];
      nums[nums.length - 1].forEach((n) => {
        if (prevNum !== null) {
          newNums.push(n - prevNum);
        }
        prevNum = n;
      });
      nums.push(newNums);
    }

    // logRed('nums', nums);

    let numLine = nums.length - 1;
    while (numLine >= 0) {
      if (nums[numLine].every((n) => n === 0)) {
        nums[numLine].push(0);
        numLine--;
        continue;
      }

      nums[numLine].push(
        nums[numLine][nums[numLine].length - 1] +
          nums[numLine + 1][nums[numLine + 1].length - 1]
      );
      numLine--;
    }

    // logYellow('nums', nums);
    total += nums[0][nums[0].length - 1];
  });

  return total;
}

const answer = await day9a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
