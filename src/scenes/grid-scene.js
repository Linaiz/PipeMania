import Grid from '../objects/grid'
import { SPRITES } from '../constants/asset-paths';

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
    }

    create(data) {
        this.offsetX = data.offsetX;
        this.offsetY = data.offsetY;

        this.createGrid(new Grid(7, 9));

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
}