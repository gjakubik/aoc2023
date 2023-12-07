import chalk from 'chalk';

export const log = (label: string, value?: any) =>
  console.log(chalk.bgBlue(`${label}: `), chalk.blue(value));

export const logYellow = (label: string, value?: any) =>
  console.log(chalk.bgYellow(`${label}: `), chalk.yellow(value));

export const logRed = (label: string, value?: any) =>
  console.log(chalk.bgRed(`${label}: `), chalk.red(value));

export function isNumeric(str: string) {
  return /^\d+$/.test(str);
}
