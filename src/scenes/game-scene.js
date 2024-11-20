import Phaser from 'phaser'
import { SPRITES } from '../constants/asset-paths'

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
    }

    create() {
        const gridSettings = {
            rows: 7,
            columns: 9,
            offsetX: 200,
            offsetY: 95,
        }

        const queueSettings = {
            queueLength: 7,
        }
        
        this.scene.launch("Grid", gridSettings);
        // launch queue scene
        this.scene.launch("Ui");
    }
}