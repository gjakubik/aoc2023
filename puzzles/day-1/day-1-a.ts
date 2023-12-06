import { readData } from '../../shared.ts';
import chalk from 'chalk';

// const list = [ '1721', '979', '366', '299', '675', '1456' ]
// list[0] ==== 1721

function is_numeric(str: string) {
  return /^\d+$/.test(str);
}

export async function day1a(dataPath?: string) {
  const data = await readData(dataPath);

  console.log(chalk.bgRed('Your Data:'), chalk.red(data));

  let total = 0;
  data.forEach((line) => {
    let numString = '';
    Array.from(line).every((char) => {
      if (is_numeric(char)) {
        numString += char;
        return false;
      }

      return true;
    });

    let searchIndex = line.length - 1;

    while (searchIndex >= 0) {
      if (is_numeric(line[searchIndex])) {
        numString += line[searchIndex];
        break;
      }

      searchIndex = searchIndex - 1;
    }

    const parsedValue = parseInt(numString);

    total += parsedValue;
  });

  return total;
}

const answer = await day1a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
