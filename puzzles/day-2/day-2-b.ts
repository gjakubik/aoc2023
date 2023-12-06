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

export async function day2b(dataPath?: string) {
  const data = await readData(dataPath);

  let total = 0;
  data.forEach((line) => {
    log('line', line);
    const [gameIDstr, games] = line.split(':');
    const gameID = gameIDstr.split(' ')[1];
    let valid = true;
    log('gameID', gameID);
    log('games', games);
    const minCubes = {
      red: 0,
      blue: 0,
      green: 0,
    };
    games.split(';').forEach((game) => {
      game.split(',').forEach((colorStr) => {
        const [num, color] = _.trim(colorStr).split(' ');
        if (parseInt(num) > minCubes[color]) {
          minCubes[color] = parseInt(num);
        }
      });
      log('game', `${game} ${valid}`);
    });
    total += Object.values(minCubes).reduce((a, b) => a * b);
  });
  return total;
}

const answer = await day2b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
