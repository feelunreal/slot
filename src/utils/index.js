const threeInLine = (line, symbols) => {
  const count = line.reduce((acc, val) => {
    return val === symbols[0] ? ++acc : acc;
  }, 0);

  return count === 3;
}

const combinationOf = (line, symbols) => {
  let result = true;

  symbols.forEach((s) => {
    if (!line.includes(s)) {
      result = false;
    }
  });

  return result;
}

const anyCombinationOf = (line, symbols) => {
  const count = line.reduce((acc, val) => {
    return symbols.includes(val) ? ++acc : acc;
  }, 0);

  return count >= 2;
}

class Combination {
  constructor(position, symbols, reward, strategy) {
    this.position = position;
    this.symbols = symbols;
    this.reward = reward;
    this.strategy = strategy;
  }

  getReward(line) {
    const isWin = this.strategy(line, this.symbols);

    return isWin ? this.reward : 0;
  }
};

const combinations = [
  new Combination('top', ['cherry'], 2000, threeInLine),
  new Combination('center', ['cherry'], 1000, threeInLine),
  new Combination('bottom', ['cherry'], 4000, threeInLine),
  new Combination('any', ['7'], 150, threeInLine),
  new Combination('any', ['cherry', '7'], 75, combinationOf),
  new Combination('any', ['3xbar'], 50, threeInLine),
  new Combination('any', ['2xbar'], 20, threeInLine),
  new Combination('any', ['bar'], 10, threeInLine),
  new Combination('any', ['bar', '2xbar', '3xbar'], 5, anyCombinationOf),
];

export const formatResultByLines = (reels) => {
  const top = [];
  const center = [];
  const bottom = [];

  reels.forEach((r) => {
    top.push(r.top);
    center.push(r.center);
    bottom.push(r.bottom);
  });

  return { top, center, bottom };
};

export const computeReward = (lines) => {
  const rewards = { top: 0, center: 0, bottom: 0 };

  for (let p in lines) {
    for (let i = 0; i < combinations.length; i++) {
      const combination = combinations[i];
      const combinationPosition = combination.position;

      if (p === combinationPosition || combinationPosition === 'any') {
        if (rewards[p] === 0) {
          rewards[p] += combinations[i].getReward(lines[p]); 
        }
      }
    }
  }

  return rewards;
};

export default computeReward;