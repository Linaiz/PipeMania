import { WATER_EVENTS, waterEmitter } from "./events";

export default class WaterFlow {
    /**
     * Creates a WaterFlow instance, that will progress the water flow through events.
     * @param {number} cellFillDuration - Time it takes to fill one cell, in seconds.
    */
    constructor(cellFillDuration) {
        this.cellFillDuration = cellFillDuration;
        this.timerInterval = null;
        waterEmitter.on(WATER_EVENTS.WATER_STOP, this.stop, this);
    }

    start() {
        if (this.timerInterval) return; // Prevent multiple starts

        waterEmitter.emit(WATER_EVENTS.WATER_START);
        this.timerInterval = setInterval(() => {
            this.progressWaterFlow();
        }, this.cellFillDuration);
    }

    stop() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    progressWaterFlow() {
        waterEmitter.emit(WATER_EVENTS.WATER_PROGRESS);
    }
}