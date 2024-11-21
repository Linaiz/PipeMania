import { WATER_EVENTS, waterEmitter } from "./events";

export default class WaterFlow {
    /**
     * Creates a WaterFlow instance.
     * @param {number} cellFillDuration - Time it takes to fill one cell, in seconds.
    */
    constructor(cellFillDuration) {
        this.cellFillDuration = cellFillDuration;
        this.timerInterval = null;
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