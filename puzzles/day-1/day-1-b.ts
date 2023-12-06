import { readData } from '../../shared.ts';
import chalk from 'chalk';

const NUMBERS = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

function is_numeric(str: string) {
  return /^\d+$/.test(str);
}

export async function day1b(dataPath?: string) {
  const data = await readData(dataPath);

  console.log(chalk.bgRed('Your Data:'), chalk.red(data));

  let total = 0;
  data.forEach((line, index) => {
    console.log(chalk.bgRed(`String ${index}:`), chalk.red(line));

    const digits = [];
    // loop through each character in the string
    Array.from(line).forEach((char, index) => {
      // if the character is numeric, add it to the digits array
      if (is_numeric(char)) {
        digits.push(char);
      } else {
        // if the character is not numeric, check if it's a number word
        Object.keys(NUMBERS).forEach((key) => {
          // if the character is a number word, add it to the digits array
          if (line.substring(index, index + key.length) === key) {
            digits.push(NUMBERS[key]);
          }
        });
      }
    });

    // add the first and last digit as strings
    const first = digits[0];
    const last = digits[digits.length - 1];
    const firstLast = `${first}${last}`;
    total += parseInt(firstLast);
  });

  return total;
}

const answer = await day1b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
