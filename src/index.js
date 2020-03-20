import SlotMachine from './slot-machine.js';
import DebugManager from './debug-manager.js';

const app = new SlotMachine();

const setApplicationMode = app.setMode.bind(app);
const setUserBalance = app.setBalance.bind(app);

const debugManager = new DebugManager(setApplicationMode, setUserBalance);