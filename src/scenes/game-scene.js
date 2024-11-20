import Phaser from 'phaser'
import { SPRITES, ANIMATIONS } from '../constants/asset-paths'

export default class Game extends Phaser.Scene {

    constructor() {
        super({ key: 'Game'});
    }

    preload() {
        this.load.image(SPRITES.PIPE_STRAIGHT, SPRITES.PIPE_STRAIGHT);
        this.load.image(SPRITES.PIPE_CURVED, SPRITES.PIPE_CURVED);
        this.load.image(SPRITES.PIPE_CROSS, SPRITES.PIPE_CROSS);
        this.load.image(SPRITES.PIPE_START, SPRITES.PIPE_START);
        this.load.image(SPRITES.CELL_EMPTY, SPRITES.CELL_EMPTY);
        this.load.image(SPRITES.CELL_BLOCKED, SPRITES.CELL_BLOCKED);

        this.load.spritesheet(ANIMATIONS.SELECTION, ANIMATIONS.SELECTION, {
            frameWidth: 136,
            frameHeight: 136,
        });
    }

    create() {
        this.#createAnimations();

        const gridSettings = {
            rows: 7,
            columns: 9,
            offsetX: 200,
            offsetY: 95,
        }

        const queueSettings = {
            queueLength: 5,
            offsetX: 100,
            offsetY: 205,
            spacing: 10,
        }
        
        this.scene.launch("Grid", gridSettings);
        this.scene.launch("Queue", queueSettings);
        this.scene.launch("Ui");
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
}