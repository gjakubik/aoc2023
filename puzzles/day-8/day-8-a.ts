import { readData } from '../../shared.ts';
import chalk from 'chalk';
import _ from 'lodash';
import { log, logYellow } from '../utils.ts';

export async function day8a(dataPath?: string) {
  const data = await readData(dataPath);

  const instructions = Array.from(_.trim(data[0]));

  const graph = {};
  data.slice(2).forEach((line) => {
    const [name, rest] = line.split('=').map((s) => _.trim(s));
    const [left, right] = _.trim(rest, '()')
      .split(',')
      .map((s) => _.trim(s));
    graph[name] = {
      name,
      left,
      right: _.trim(right),
    };
  });

  log('graph', graph);

  let steps = 0;
  let currNode = 'AAA';
  let currI = '';
  while (true) {
    if (currNode === 'ZZZ') {
      break;
    }
    currI = instructions.shift();
    instructions.push(currI);

    logYellow('currNode', currNode);
    logYellow('currI', currI);
    if (currI === 'L') {
      currNode = graph[currNode].left;
    }

    if (currI === 'R') {
      currNode = graph[currNode].right;
    }

    steps++;
  }

  return steps;
}

const answer = await day8a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
