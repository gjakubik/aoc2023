import { readData } from '../../shared.ts';
import chalk from 'chalk';
import _ from 'lodash';
import { log, logYellow, logRed, isNumeric } from '../utils.ts';

const isSymbol = (char: string) => !isNumeric(char) && char !== '.';

const checkThree = (line: string, midIndex: number) => {
  if (isSymbol(line[midIndex])) {
    return true;
  }
  if (midIndex - 1 >= 0 && isSymbol(line[midIndex - 1])) {
    return true;
  }
  if (midIndex + 1 < line.length && isSymbol(line[midIndex + 1])) {
    return true;
  }
  return false;
};

// Returns the number and list of indicies of the line that the digits fall on
// [65, [4, 5]]
const findNumber = (line: string, startIndex: number, log?: boolean) => {
  let indicies = [startIndex];
  let back = startIndex;
  let forward = startIndex;
  while (true) {
    if (
      (!isNumeric(line[back]) || back === 0) &&
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

    if (back > 0 && isNumeric(line[back])) {
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

export async function day3a(dataPath?: string) {
  const data = await readData(dataPath);

  let total = 0;
  const machineNumbers = [];
  const foundIndicies = [];
  data.every((line, lineIndex) => {
    // For each line, check every character
    foundIndicies.push([]);
    Array.from(line).every((char, charIndex) => {
      // Check if it could be a number
      if (!isNumeric(char) || foundIndicies[lineIndex].includes(charIndex)) {
        // continue
        return true;
      }

      logYellow(`line ${lineIndex}`, line);
      // It is a number, parse it and find all of the indexes of its chars
      const { number, indicies } = findNumber(line, charIndex, true);

      foundIndicies[lineIndex] = foundIndicies[lineIndex].concat(indicies);

      logRed('number', number);
      logRed('indicies', indicies);
      // Check the characters before and after the number
      if (indicies[0] - 1 >= 0 && isSymbol(line[indicies[0] - 1])) {
        logRed('symbol before', number);
        machineNumbers.push(number);
        total += number;
        return true;
      }
      if (
        indicies[indicies.length - 1] + 1 < line.length &&
        isSymbol(line[indicies[indicies.length - 1] + 1])
      ) {
        logRed('symbol after', number);
        machineNumbers.push(number);
        total += number;
        return true;
      }
      // For each index, check the three valid "adjacent" spots above and below
      let foundAbove = false;
      if (lineIndex - 1 >= 0) {
        logRed('checking above');
        indicies.every((numIndex) => {
          if (checkThree(data[lineIndex - 1], numIndex)) {
            logRed('found above', number);
            machineNumbers.push(number);
            total += number;
            foundAbove = true;
            return false;
          }
          return true;
        });
      }

      if (lineIndex + 1 < data.length && !foundAbove) {
        logRed('checking below');
        indicies.every((numIndex) => {
          if (checkThree(data[lineIndex + 1], numIndex)) {
            logRed('found below', number);
            machineNumbers.push(number);
            total += number;
            return false;
          }
          return true;
        });
      }

      return true;
    });
    return true;
  });
  log('machineNumbers', machineNumbers);
  return total;
}

const answer = await day3a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
