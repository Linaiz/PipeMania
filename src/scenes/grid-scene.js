import Grid from '../objects/grid'

export default class GridScene extends Phaser.Scene {

    constructor(cellSize = 96, offsetX = 0, offsetY = 0) {
        super({ key: 'Grid'});
        this.cellSize = cellSize;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
    }

    preload() {
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
                
                // Placeholder for a pipe
                const placeholder = this.add.rectangle(x, y, this.cellSize, this.cellSize, 0xcccccc).setStrokeStyle(2, 0x888888);

            }
        }
    }
}