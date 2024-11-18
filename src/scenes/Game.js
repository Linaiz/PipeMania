import Phaser from 'phaser'

export default class Game extends Phaser.Scene {

    constructor() {
        super({ key: 'Game'});
    }

    preload() {
        // this.load.image('pipeStraight', '/assets/pipes/straight.png');
        // this.load.image('pipeCurved', '/assets/pipes/curved.png');
        // this.load.image('pipeCross', '/assets/pipes/cross.png');
        // this.load.image('pipeStart', '/assets/pipes/start.png');
        // this.load.image('cellEmpty', '/assets/pipes/empty.png');
        // this.load.image('cellBlocked', '/assets/pipes/blocked.png');
    }

    create() {
        this.scene.launch("Ui");
        //this.grid = new Grid(7, 9);
        // Define grid dimensions and tile size
        // this.gridSize = 96; // Size of each tile (assuming 64x64 tiles)
        // this.gridWidth = 9;
        // this.gridHeight = 7;
        // this.gridPaddingX = (this.scale.width - (this.gridWidth * this.gridSize)) - 64;
        // this.gridPaddingY = 64;
    }
}