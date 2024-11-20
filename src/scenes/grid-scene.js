import Phaser from 'phaser'
import Grid from '../objects/grid'
import { UI } from '../constants/asset-paths'
import { SPRITES } from '../constants/asset-paths'

export default class GridScene extends Phaser.Scene {

    constructor(cellSize = 96, offsetX = 0, offsetY = 0) {
        super({ key: 'Grid'});
        this.cellSize = cellSize;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
    }

    preload() {
        this.load.image(SPRITES.PIPE_STRAIGHT, SPRITES.PIPE_STRAIGHT);
        this.load.image(SPRITES.PIPE_CURVED, SPRITES.PIPE_CURVED);
        this.load.image(SPRITES.PIPE_CROSS, SPRITES.PIPE_CROSS);
        this.load.image(SPRITES.PIPE_START, SPRITES.PIPE_START);
        this.load.image(SPRITES.CELL_EMPTY, SPRITES.CELL_EMPTY);
        this.load.image(SPRITES.CELL_BLOCKED, SPRITES.CELL_BLOCKED);

        this.load.image(UI.RELOAD_BUTTON, UI.RELOAD_BUTTON);
    }

    create(data) {
        this.offsetX = data.offsetX;
        this.offsetY = data.offsetY;

        this.grid = new Grid(7, 9);
        this.createGrid(this.grid);
        console.log(this.grid);

        this.createReloadButton();
    }

    createGrid(grid) {
        for (let row = 0; row < grid.rows; row++) {
            for (let col = 0; col < grid.columns; col++) {
                const x = col * this.cellSize + this.cellSize / 2 + this.offsetX;
                const y = row * this.cellSize + this.cellSize / 2 + this.offsetY;
                
                const cell = grid.getCell(row, col);
                const cellSprite = this.add.image(x, y, cell.spritePath);
                cellSprite.rotation = Phaser.Math.DegToRad(cell.rotation);

                const scaleX = this.cellSize / cellSprite.width;
                const scaleY = this.cellSize / cellSprite.height;
                cellSprite.setScale(scaleX, scaleY);
            }
        }
    }

    createReloadButton() {
        const button = this.add.sprite(975, 50, UI.RELOAD_BUTTON)
        .setScale(0.6)
        .setInteractive()
        .on('pointerdown', () => { this.scene.restart(); });

        button.on('pointerover', () => {
            button.setScale(0.65);
            });
        button.on('pointerout', () => {
            button.setScale(0.6); 
        });
    }
}