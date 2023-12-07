import chalk from 'chalk';
import _ from 'lodash';

export const log = (label: string, value?: any) =>
  console.log(chalk.bgBlue(`${label}: `), chalk.blue(value));

export const logYellow = (label: string, value?: any) =>
  console.log(chalk.bgYellow(`${label}: `), chalk.yellow(value));

export const logRed = (label: string, value?: any) =>
  console.log(chalk.bgRed(`${label}: `), chalk.red(value));

export const isNumeric = (str: string) => {
  return /^\d+$/.test(str);
};

export const getNumbers = (numStr: string) =>
  _.trim(numStr)
    .split(' ')
    .filter((s) => _.trim(s) !== '')
    .map((s) => parseInt(s));
