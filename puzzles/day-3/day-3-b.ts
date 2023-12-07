import { readData } from '../../shared.ts';
import chalk from 'chalk';
import _ from 'lodash';
import { log, logYellow, isNumeric } from '../utils.ts';

const checkThree = (line: string, midIndex: number) => {
  if (isNumeric(line[midIndex])) {
    return midIndex;
  }
  if (midIndex - 1 >= 0 && isNumeric(line[midIndex - 1])) {
    return midIndex - 1;
  }
  if (midIndex + 1 < line.length && isNumeric(line[midIndex + 1])) {
    return midIndex + 1;
  }
  return -1;
};

// Returns the number and list of indicies of the line that the digits fall on
// [65, [4, 5]]
const findNumber = (line: string, startIndex: number, log?: boolean) => {
  let indicies = [startIndex];
  let back = startIndex;
  let forward = startIndex;
  while (true) {
    if (
      (!isNumeric(line[back]) || back < 0) &&
      (!isNumeric(line[forward]) || forward === line.length)
    ) {
      break;
    }

    log && logYellow('back', line[back]);
    log && logYellow('forward', line[forward]);

    if (isNumeric(line[back])) {
      indicies.push(back);
    }

    if (isNumeric(line[forward])) {
      indicies.push(forward);
    }

    if (back >= 0 && isNumeric(line[back])) {
      back--;
    }
    if (forward < line.length && isNumeric(line[forward])) {
      forward++;
    }
  }

  const indiciesSet = new Set(indicies);
  const indiciesArray = Array.from(indiciesSet).sort((a, b) => a - b);

  log && logYellow('indicies', indiciesArray);

  const number = parseInt(
    Array.from(line)
      .slice(indiciesArray[0], indiciesArray[indiciesArray.length - 1] + 1)
      .join('')
  );
  return { number, indicies: indiciesArray };
};

export async function day3b(dataPath?: string) {
  const data = await readData(dataPath);

  let total = 0;
  data.forEach((line, lineIndex) => {
    Array.from(line).every((char, charIndex) => {
      if (char !== '*') {
        return true;
      }
      log(`* at ${charIndex}`, line);
      // Possible gear found
      // Find list of all numbers around it, if this list is === 2, then multiply and add to total, otherwise move on
      const numbers = [];
      const foundIndicies = [[], []];
      if (isNumeric(line[charIndex - 1])) {
        const { number, indicies } = findNumber(line, charIndex - 1, true);
        numbers.push(number);
      }
      if (isNumeric(line[charIndex + 1])) {
        const { number, indicies } = findNumber(line, charIndex + 1, true);
        numbers.push(number);
      }

      // Check the three possible spots above for numbers
      const checkIndicies = _.range(charIndex - 1, charIndex + 2);

      checkIndicies.forEach((i) => {
        log('foundIndicies', foundIndicies);
        if (
          lineIndex - 1 >= 0 &&
          isNumeric(data[lineIndex - 1][i]) &&
          !foundIndicies[0].includes(i)
        ) {
          const { number, indicies } = findNumber(data[lineIndex - 1], i, true);
          numbers.push(number);
          foundIndicies[0] = foundIndicies[0].concat(indicies);
        }
        if (
          lineIndex + 1 < line.length &&
          isNumeric(data[lineIndex + 1][i]) &&
          !foundIndicies[1].includes(i)
        ) {
          const { number, indicies } = findNumber(data[lineIndex + 1], i, true);
          numbers.push(number);
          foundIndicies[1] = foundIndicies[1].concat(indicies);
        }
      });
      log('numbers', numbers);
      // Valid gear found
      if (numbers.length === 2) {
        total += numbers[0] * numbers[1];
      }
      return true;
    });
  });
  return total;
}

const answer = await day3b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
