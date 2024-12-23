import Phaser from 'phaser';
import Timer from '../objects/timer';
import Score from '../objects/score';
import WaterFlow from '../objects/water-flow';
import { SPRITES, ANIMATIONS } from '../constants/asset-paths';
import { TIMER_EVENTS, timerEmitter } from '../objects/events';

/**
 * Main scene where the game takes place.
 * This scene launches the game subcomponents: Grid, Queue, and UI,
 * Assets shared between sub-scenes are pre-load here.
 */
export default class Game extends Phaser.Scene {

    constructor() {
        super({ key: 'Game'});
        this.gameTime = 30;
        this.goal = 15;
    }

    preload() {
        this.load.image(SPRITES.PIPE_STRAIGHT, SPRITES.PIPE_STRAIGHT);
        this.load.image(SPRITES.PIPE_STRAIGHT_FILLED, SPRITES.PIPE_STRAIGHT_FILLED);
        this.load.image(SPRITES.PIPE_CURVED, SPRITES.PIPE_CURVED);
        this.load.image(SPRITES.PIPE_CURVED_FILLED, SPRITES.PIPE_CURVED_FILLED);
        this.load.image(SPRITES.PIPE_CROSS, SPRITES.PIPE_CROSS);
        this.load.image(SPRITES.PIPE_CROSS_FILLED, SPRITES.PIPE_CROSS_FILLED);
        this.load.image(SPRITES.PIPE_START, SPRITES.PIPE_START);
        this.load.image(SPRITES.PIPE_START_FILLED, SPRITES.PIPE_START_FILLED);
        this.load.image(SPRITES.CELL_EMPTY, SPRITES.CELL_EMPTY);
        this.load.image(SPRITES.CELL_BLOCKED, SPRITES.CELL_BLOCKED);

        this.load.spritesheet(ANIMATIONS.SELECTION, ANIMATIONS.SELECTION, {
            frameWidth: 136,
            frameHeight: 136,
        });
    }

    create() {
        this.#createAnimations();
        this.#addEventListeners();
        this.cameras.main.setBackgroundColor('#84d79e');

        const queueSettings = {
            queueLength: 5,
            offsetX: 100,
            offsetY: 205,
            cellSize: 96,
            spacing: 10,
        }      
        const gridSettings = {
            rows: 7,
            columns: 9,
            cellSize: 96,
            offsetX: 200,
            offsetY: 95,
        }

        this.scene.launch("Queue", queueSettings);   
        this.scene.launch("Grid", gridSettings);      
        this.scene.launch("Ui");
        this.#startGame();
    }

    #startGame(){
        const score = new Score(this.goal);
        const timer = new Timer(this.gameTime);
        timer.start();
    }

    #createAnimations() {
        this.#createSelectionAnimation();
    }

    #createSelectionAnimation() {
        this.anims.create({
            key: ANIMATIONS.SELECTION,
            frames: this.anims.generateFrameNumbers(ANIMATIONS.SELECTION, { start: 0, end: 2 }),
            frameRate: 9,
            repeat: -1
        });
    }

    #addEventListeners() {
        timerEmitter.on(TIMER_EVENTS.TIME_UP, this.startWaterFlow, this);
    }

    startWaterFlow() {
        const waterFlow = new WaterFlow(1000);
        waterFlow.start();
    }
}