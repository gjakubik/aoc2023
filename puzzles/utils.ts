import chalk from 'chalk';
import _ from 'lodash';

const FLATTEN_OBJS = ['object', 'list'];

export const log = (
  label: string,
  value?: any,
  labelColor: chalk.ChalkFunction = chalk.bgBlue,
  valueColor: chalk.ChalkFunction = chalk.blue
) => {
  if (FLATTEN_OBJS.includes(typeof value)) {
    value = JSON.stringify(value);
  }
  console.log(labelColor(`${label}: `), valueColor(value));
};

export const logYellow = (label: string, value?: any) =>
  log(label, value, chalk.bgYellow, chalk.yellow);

export const logRed = (label: string, value?: any) =>
  log(label, value, chalk.bgRed, chalk.red);

export const isNumeric = (str: string) => {
  return /^\d+$/.test(str);
};

export const getNumbers = (numStr: string) =>
  _.trim(numStr)
    .split(' ')
    .filter((s) => _.trim(s) !== '')
    .map((s) => parseInt(s));
