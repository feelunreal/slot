import { SYMBOL_HEIGHT, FRAME_TIME } from './constants.js';
import Symbol from './symbol.js';

const findSymbolIDByOffset = (symbols, offset) => {
	const s = symbols.find((s) => s.y === offset);
	return s ? s.id : undefined;
}

const lines = {
	_positions: [
		{ id: 'top', offset: 0 },
		{ id: 'center', offset: SYMBOL_HEIGHT / 2 },
		{ id: 'bottom', offset: SYMBOL_HEIGHT }
	],
	getPositions() {
		return this._positions;
	},
	getOffsets() {
		return this._positions.map((p) => p.offset);
	},
	getOffsetById(id) {
		return this._positions.find((p) => p.id === id).offset;
	},
	getSymbolsByLines(symbols) {
		const result = {};

		this._positions.forEach((p) => {
			result[p.id] = findSymbolIDByOffset(symbols, p.offset)
		});

		return result;
	}
}

const symbols = [
	{ id: 'bar', texture: 'BAR.png' },
	{ id: '2xbar', texture: '2xBAR.png' },
	{ id: '7', texture: '7.png' },
	{ id: 'cherry', texture: 'Cherry.png' },
	{ id: '3xbar', texture: '3xBAR.png' }
];

const symbolsCount = symbols.length;

export default class Reel {
	constructor(rotationDuration, onRotationEnd) {
		this.rotationDuration = rotationDuration;
		this.onRotationEnd = onRotationEnd;
		this.rotationStep = SYMBOL_HEIGHT / 2;
		this.height = SYMBOL_HEIGHT * symbolsCount;
		this.pixiContainer = new PIXI.Container();
		this.animatedSymbols = 0;
		this.symbols = [];

		this.constructSymbols();
	}

	constructSymbols() {
		for (let i = 0; i < symbols.length; i++) {
			const { id, texture } = symbols[i];

			const symbol = new Symbol(id, texture, SYMBOL_HEIGHT * i);

			this.symbols.push(symbol);
			this.pixiContainer.addChild(symbol);
		}
	}

	computeRotation(params) {
		const positions = lines.getPositions();

		let desiredPosition;
		let symbol;

		if (!params) {
			const symbolIndex = Math.floor(Math.random() * 5);
			const positionIndex = Math.round(Math.random());

			symbol = symbols[symbolIndex].id;
			desiredPosition = positions[positionIndex].offset;
		} else {
			symbol = params.symbol;
			desiredPosition = positions.find((el) => el.id === params.position).offset;
		}

		const currentPosition = this.getSymbolsPositions()[symbol];

		this.delta = desiredPosition - currentPosition;
	}

	getSymbolsPositions() {
		const result = {};

		for (let i = 0; i < this.symbols.length; i++) {
			const s = this.symbols[i];

			result[s.id] = s.y;
		}

		return result;
	}

	rotate(params) {
		this.resetHighlight();
		this.computeRotation(params);
		this.rotationStartTime = 0;

		for (let i = 0; i < this.symbols.length; i++) {
			const symbol = this.symbols[i];

			this.startAnimation(symbol);
		}
	}

	startAnimation(symbol) {
		let time = 0;
		let offset = 0;

		this.animatedSymbols++;

		const animate = () => {
			const isRotationDurationEnded = time > this.rotationDuration;
			const isDesiredPosition = Math.abs(this.delta - offset) % this.height === 0;

			if (isRotationDurationEnded && isDesiredPosition) {
				return this.stopAnimation();
			}

			symbol.y += this.rotationStep;
			offset += this.rotationStep;

			if (symbol.y > this.height - SYMBOL_HEIGHT) {
				symbol.y = symbol.y - this.height;
			}

			time += FRAME_TIME;

			requestAnimationFrame(animate.bind(this));
		}

		animate();
	}

	stopAnimation() {
		this.animatedSymbols--;
		if (this.animatedSymbols === 0) {
			const resultPositions = lines.getSymbolsByLines(this.symbols);

			this.onRotationEnd(resultPositions);
		}
	}

	findSymbolByOffset(offset) {
		return this.symbols.find((s) => s.y === offset);
	}

	highlight(win) {
		const highlightColor = 0xffb600;

		for (let id in win) {
			if (win[id] > 0) {
				const offset = lines.getOffsetById(id);
				const symbol = this.findSymbolByOffset(offset);

				symbol && (symbol.tint = highlightColor);
			}
		}
	}

	resetHighlight() {
		const offsets = lines.getOffsets();

		offsets.forEach((o) => {
			const symbol = this.findSymbolByOffset(o);

			if (symbol) {
				symbol.tint = 0xffffff;
			}
		});
	}
}