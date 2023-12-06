import { readData } from '../../shared.ts';
import chalk from 'chalk';
import _ from 'lodash';

const log = (label: string, value: any) =>
  console.log(chalk.bgBlue(`${label}: `), chalk.blue(value));

const RED_CUBES = 12;
const GREEN_CUBES = 13;
const BLUE_CUBES = 14;

const MAX_COLORS = {
  red: RED_CUBES,
  green: GREEN_CUBES,
  blue: BLUE_CUBES,
};

export async function day2a(dataPath?: string) {
  const data = await readData(dataPath);

  let total = 0;
  data.forEach((line) => {
    log('line', line);
    const [gameIDstr, games] = line.split(':');
    const gameID = gameIDstr.split(' ')[1];
    let valid = true;
    log('gameID', gameID);
    log('games', games);
    games.split(';').every((game) => {
      game.split(',').every((colorStr) => {
        const [num, color] = _.trim(colorStr).split(' ');
        if (num > MAX_COLORS[color]) {
          valid = false;
          return false;
        }
        return true;
      });
      log('game', `${game} ${valid}`);
      if (!valid) {
        return false;
      }
      return true;
    });
    if (valid) {
      total += parseInt(gameID);
    }
  });
  return total;
}

const answer = await day2a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
