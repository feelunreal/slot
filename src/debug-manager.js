export default class DebugManager {
  constructor(setApplicationMode, setUserBalance) {
    this.setApplicationMode = setApplicationMode;
    this.setUserBalance = setUserBalance;

    const container = document.createElement('div');
    document.body.appendChild(container);
    this.container = container;

    this.reelsParams = {
      '0': { position: 'top', symbol: 'bar' },
      '1': { position: 'top', symbol: 'bar' },
      '2': { position: 'top', symbol: 'bar' }
    };

    this.createMoneySetter();
    this.createModeSelector();
    this.createReelsParameterizers();
    this.handle('random');
  }

  createMoneySetter() {
    const wrapper = document.createElement('div');
    const text = document.createTextNode('Money: ');
    const button = document.createElement('button')
    const input = document.createElement('input');

    wrapper.appendChild(text);
    wrapper.appendChild(input);
    wrapper.appendChild(button);

    button.innerText = 'Set';
    button.addEventListener('click', () => this.setUserBalance(input.value));

    this.container.appendChild(wrapper);
  }

  createModeSelector() {
    const text = document.createTextNode('Mode: ');
    const modeSelector = createSelectElement(['random', 'fixed']);
    modeSelector.addEventListener('change', (e) => this.handle(e.target.value));

    this.container.appendChild(text);
    this.container.appendChild(modeSelector);
    this.modeSelector = modeSelector;
  }

  createReelsParameterizers() {
    const positions = ['top', 'center', 'bottom'];
    const symbols = ['bar', '2xbar', '7', 'cherry', '3xbar'];

    const paramsContainer = document.createElement('div');

    [0, 1, 2].forEach((reel, index) => {
      const wrapper = document.createElement('div');

      const text = document.createTextNode(`Reel: ${index+1}`);
      const positionSelector = createSelectElement(positions);
      const symbolSelector = createSelectElement(symbols);

      positionSelector.addEventListener('change', (e) => {
        this.reelsParams[index].position = e.target.value
      });
      symbolSelector.addEventListener('change', (e) => {
        this.reelsParams[index].symbol = e.target.value
      });

      wrapper.appendChild(text)
      wrapper.appendChild(positionSelector);
      wrapper.appendChild(symbolSelector);

      paramsContainer.appendChild(wrapper);
    });

    this.container.appendChild(paramsContainer)
    this.paramsContainer = paramsContainer;
  }

  handle(mode) {
    if (mode === 'random') {
      this.setApplicationMode({});
      this.paramsContainer.style.display = 'none';
    } else {
      this.setApplicationMode(this.reelsParams);
      this.paramsContainer.style.display = 'block';
    }
  }  
}

function createSelectElement(options) {
  const selector = document.createElement('select');

  options.forEach((value) => {
    const option = document.createElement('option');
    option.value = option.text = value;

    selector.appendChild(option);
  });

  return selector;
}