import { readData } from '../../shared.ts';
import chalk from 'chalk';
import _ from 'lodash';
import { getNumbers, log, logRed, logYellow } from '../utils.ts';

export async function day9b(dataPath?: string) {
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
        nums[numLine].unshift(0);
        numLine--;
        continue;
      }

      nums[numLine].unshift(nums[numLine][0] - nums[numLine + 1][0]);
      numLine--;
    }

    // logYellow('nums', nums);
    total += nums[0][0];
  });

  return total;
}

const answer = await day9b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
