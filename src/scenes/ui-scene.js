import Phaser from 'phaser';
import { TIMER_EVENTS, timerEmitter } from "../objects/events";

export default class Ui extends Phaser.Scene {

    constructor() {
        super({ key: 'Ui'});
    }

    preload() {

    }

    create() {
        this.#createTimerText();
        this.#createGoalText();
    }

    #createTimerText() {
        this.timerText = this.add.text(210, 45, `Time: 15`, {
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

    #createGoalText() {
        this.goalText = this.add.text(610, 45, `Goal: 10`, {
            fontSize: '24px',
            color: '#fff',
        });
    }

}