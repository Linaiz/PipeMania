import { EVENTS } from '../objects/events';
import Timer from '../objects/timer';


// UI will display the time that is left before water starts flowing, and the goal length of the pipe path
// Timer will update UI every second - event or coupling?
// Think if event emitter is needed here
export class Ui extends Phaser.Scene {
    #customEventEmitter;

    constructor(emitter) {
        this.#customEventEmitter = emitter;
    }

    preload() {
        // Load UI assets
    }

    create() {
        // Create text for timer
    }

}