import Phaser from 'phaser';
import { TIMER_EVENTS, timerEmitter } from "../objects/events";
// UI will display the time that is left before water starts flowing, and the goal length of the pipe path
// Timer will update UI every second - event or coupling?
// Think if event emitter is needed here
export default class Ui extends Phaser.Scene {

    constructor() {
        super({ key: 'Ui'});
    }

    preload() {
        // Load UI assets
    }

    create() {
        this.timerText = this.add.text(10, 10, `Time: 15`, {
            fontSize: '24px',
            color: '#fff',
        });

        timerEmitter.on(TIMER_EVENTS.TIME_START, (remainingTime) => {
            this.timerText.setText(`Time: ${remainingTime}`);
        });

        timerEmitter.on(TIMER_EVENTS.UPDATE_TIMER, (remainingTime) => {
            this.timerText.setText(`Time: ${remainingTime}`);
        });
      
        timerEmitter.on(TIMER_EVENTS.TIME_UP, () => {
            this.timerText.setText('The water starts to flow!');
        });

    }

}