import Phaser from 'phaser';
import { TIMER_EVENTS, timerEmitter } from "../objects/events";
import { SCORE_EVENTS, scoreEmitter} from "../objects/events";

export default class Ui extends Phaser.Scene {

    constructor() {
        super({ key: 'Ui'});
    }

    create() {
        this.#createTimerText();
        this.#createGoalText();
        scoreEmitter.on(SCORE_EVENTS.SCORE_REACHED, this.createWinText, this);
        scoreEmitter.on(SCORE_EVENTS.SCORE_NOT_REACHED, this.createLossText, this);
    }

    #createTimerText() {
        this.timerText = this.add.text(210, 45, 'Time: 15', {
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
        this.goalText = this.add.text(610, 45, 'Goal: 15', {
            fontSize: '24px',
            color: '#fff',
        });

        scoreEmitter.on(SCORE_EVENTS.SCORE_READY, (goalScore) => {
            this.goalText.setText(`Goal: ${goalScore}`);
        })

        scoreEmitter.on(SCORE_EVENTS.UPDATE_SCORE, (goalScore) => {
            this.goalText.setText(`Goal: ${goalScore}`);
        })
    }

    createWinText() {
        const winText = this.add.text(this.scale.width / 2 + 80, this.scale.height / 2, 'Victory!', {
            fontSize: '160px',
            color: '#000',
            fontFamily: '"Jersey 25 Charted"',
        });
        winText.setOrigin(0.5);
    }

    createLossText() {
        const lossText = this.add.text(this.scale.width / 2 + 80, this.scale.height / 2, 'You Lost...', {
            fontSize: '160px',
            color: '#000',
            fontFamily: '"Jersey 25 Charted"',
        });
        lossText.setOrigin(0.5);
    }

}