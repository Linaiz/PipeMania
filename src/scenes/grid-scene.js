import Phaser from 'phaser'
import Grid from '../objects/grid'
import { UI } from '../constants/asset-paths'

export default class GridScene extends Phaser.Scene {

    constructor(rows = 7, columns = 9, cellSize = 96, offsetX = 0, offsetY = 0) {
        super({ key: 'Grid'});
        this.rows = rows;
        this.columns = columns;
        this.cellSize = cellSize;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
    }

    preload() {
        this.load.image(UI.RELOAD_BUTTON, UI.RELOAD_BUTTON);
    }

    create(data) {
        this.rows = data.rows;
        this.columns = data.columns;
        this.offsetX = data.offsetX;
        this.offsetY = data.offsetY;

        this.grid = new Grid(this.rows, this.columns);
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