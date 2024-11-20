import { TIMER_EVENTS, timerEmitter } from "./events";

export default class Timer {
    /**
     * Creates a Timer instance.
     * @param {number} duration - Timer duration in seconds.
     */
    constructor(duration) {
        this.duration = duration;
        this.remainingTime = this.duration;
        this.timerInterval = null;
    }

    start() {
        if (this.timerInterval) return; // Prevent multiple starts

        timerEmitter.emit(TIMER_EVENTS.TIME_START, this.remainingTime);
        this.timerInterval = setInterval(() => {
            this.updateTimer();
        }, 1000); // Call updateTimer every 1 second
    }

    stop() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    updateTimer() {
        if (this.remainingTime > 0) {
            this.remainingTime--;
            timerEmitter.emit(TIMER_EVENTS.UPDATE_TIMER, this.remainingTime);
        } else {
            this.stop();
            timerEmitter.emit(TIMER_EVENTS.TIME_UP);
        }
    }
}