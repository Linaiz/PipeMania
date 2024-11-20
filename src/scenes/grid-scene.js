import Phaser from 'phaser';
import Grid from '../objects/grid';
import CellType from '../constants/cell-type';
import PipeType from '../constants/pipe-type';
import { ANIMATIONS, UI } from '../constants/asset-paths';

export default class GridScene extends Phaser.Scene {
    // Attributes for the cell that the player is hovering over
    #currentRow = 0;
    #currentCol = 0;
    #currentAnimation;

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
        this.#createGrid(this.grid);  
        this.#createReloadButton();
        
        this.input.on('pointermove', this.handlePointerMove, this);
    }

    #createGrid(grid) {
        for (let row = 0; row < grid.rows; row++) {
            for (let col = 0; col < grid.columns; col++) {
                // Calculate x and y for the cell to be drawn
                const x =  this.#calcGridPositionX(col);
                const y = this.#calcGridPositionY(row);
                
                // Get the sprite for the cell
                const cell = grid.getCell(row, col);
                const cellSprite = this.add.image(x, y, cell.spritePath);
                cellSprite.rotation = Phaser.Math.DegToRad(cell.rotation);

                // Scale the sprite to match cellSize
                const scaleX = this.cellSize / cellSprite.width;
                const scaleY = this.cellSize / cellSprite.height;
                cellSprite.setScale(scaleX, scaleY);
            }
        }
    }

    #createReloadButton() {
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

    handlePointerMove(pointer) {
        const mouseX = pointer.x;
        const mouseY = pointer.y;
    
        // Check if the mouse is within the grid bounds
        if (
            mouseX >= this.offsetX &&
            mouseX < this.offsetX + this.columns * this.cellSize &&
            mouseY >= this.offsetY &&
            mouseY < this.offsetY + this.rows * this.cellSize
        ) {
            // Calculate row and column
            const col = Math.floor((mouseX - this.offsetX) / this.cellSize);
            const row = Math.floor((mouseY - this.offsetY) / this.cellSize);    

            if (row == this.#currentRow && col == this.#currentCol) return;

            this.#currentRow = row;
            this.#currentCol = col;
            
            if (this.#currentAnimation) this.#currentAnimation.destroy();
            if (this.grid.getCell(row, col).type == CellType.BLOCKED || 
                this.grid.getCell(row, col).type == PipeType.START) 
                    return;

            this.#currentAnimation = this.#createSelectionAnimation(row, col);
        } else {
            if (this.#currentAnimation)
                this.#currentAnimation.destroy();
        }
    }

    #createSelectionAnimation(row, col) {  
        const x =  this.#calcGridPositionX(col);
        const y = this.#calcGridPositionY(row);

        const selection = this.add.sprite(x, y, ANIMATIONS.SELECTION);
        const scaleX = this.cellSize * 1.1 / selection.width;
        const scaleY = this.cellSize * 1.1 / selection.height;
        selection.setScale(scaleX, scaleY);
        selection.play(ANIMATIONS.SELECTION);

        return selection;
    }

    #calcGridPositionX(col) {
        return col * this.cellSize + this.cellSize / 2 + this.offsetX;
    }

    #calcGridPositionY(row){
        return row * this.cellSize + this.cellSize / 2 + this.offsetY;
    }
}