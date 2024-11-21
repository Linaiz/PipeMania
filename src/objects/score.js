import { WATER_EVENTS, waterEmitter } from "./events"
import { SCORE_EVENTS, scoreEmitter } from "./events";

export default class Score {
    /**
     * Keeps track of tje current player score and emits GameWon/GameLost events
     * @param {number} goalScore Number of pipes that the player needs to fill in order to win.
     */
    constructor(goalScore) {
        this.goalScore = goalScore;
        this.currScore = 0;
        waterEmitter.on(WATER_EVENTS.FILL_CELL, this.incrementScore, this);
        waterEmitter.on(WATER_EVENTS.WATER_STOP, this.evaluateScore, this);
        scoreEmitter.emit(SCORE_EVENTS.SCORE_READY, this.goalScore);
    }

    incrementScore() {
        this.currScore++;
        scoreEmitter.emit(SCORE_EVENTS.UPDATE_SCORE, this.goalScore - this.currScore);

        if (this.currScore == this.goalScore)
            scoreEmitter.emit(SCORE_EVENTS.SCORE_REACHED);
    }

    evaluateScore() {
        if (this.currScore >= this.goalScore)
            scoreEmitter.emit(SCORE_EVENTS.SCORE_REACHED);
        else
            scoreEmitter.emit(SCORE_EVENTS.SCORE_NOT_REACHED);
    }
}