import { readData } from '../../shared.ts';
import chalk from 'chalk';
import _ from 'lodash';
import { log, lcmAll } from '../utils.ts';

interface Node {
  name: string;
  left: string;
  right: string;
}

export async function day8b(dataPath?: string) {
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

  const startNodes = Object.values(graph)
    .filter((n: Node) => n.name[n.name.length - 1] === 'A')
    .map((n: Node) => n.name);

  log('startNodes', startNodes);

  const minimums = startNodes.map((start) => {
    let steps = 0;
    let currNode = start;
    let currI = '';
    while (true) {
      if (currNode[currNode.length - 1] === 'Z') {
        break;
      }
      currI = instructions.shift();
      instructions.push(currI);

      if (currI === 'L') {
        currNode = graph[currNode].left;
      }

      if (currI === 'R') {
        currNode = graph[currNode].right;
      }

      steps++;
    }

    return steps;
  });

  log('minimums', minimums);

  return lcmAll(minimums);
}

const answer = await day8b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
