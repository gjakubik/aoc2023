import { readData } from '../../shared.ts';
import chalk from 'chalk';
import _ from 'lodash';
import { log, logRed, logYellow } from '../utils.ts';

const CARDS = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

const getStrength = (hand: string) => {
  const cardMapObj = {};
  Array.from(hand).forEach((ch) => {
    if (!cardMapObj[ch]) {
      cardMapObj[ch] = 1;
    } else {
      cardMapObj[ch]++;
    }
  });

  const cardMap = Object.entries(cardMapObj);

  logYellow('cardMap', Object.entries(cardMapObj));

  // Has five of a kind
  if (cardMap.length === 1) {
    return 6;
  }

  // Has 4 of a kind
  if (cardMap.find(([c, v]) => v === 4)) {
    return 5;
  }

  // Has full house
  if (cardMap.length === 2) {
    return 4;
  }

  // Has 3 of a kind
  if (cardMap.find(([c, v]) => v === 3)) {
    return 3;
  }

  const numPairs = cardMap.filter(([c, v]) => v === 2).length;

  return numPairs;
};

const handCompare = (a: string, b: string) => {
  let i = 0;
  while (i < a.length) {
    if (a[i] === b[i]) {
      i++;
      continue;
    }

    return (
      CARDS.findIndex((c) => c === b[i]) - CARDS.findIndex((c) => c === a[i])
    );
  }
};

export async function day7a(dataPath?: string) {
  const data = await readData(dataPath);

  const hands = data.map((line) => {
    const [hand, bid] = line.split(' ');

    return {
      hand,
      bid,
      strength: getStrength(hand),
    };
  });

  log('hands', hands);

  //filter hands by strength and then hand
  const sorted = hands.sort((a, b) => {
    if (a.strength - b.strength !== 0) {
      return a.strength - b.strength;
    }
    return handCompare(a.hand, b.hand);
  });

  logRed('sorted', sorted);

  const total = sorted.reduce((acc, hand, i) => {
    return (acc += (i + 1) * parseInt(hand.bid));
  }, 0);

  log('total', total);

  return total;
}

const answer = await day7a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
