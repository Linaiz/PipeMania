import Phaser from 'phaser';
import Grid from '../objects/grid';
import { ANIMATIONS } from '../constants/asset-paths';
import { PIPE_EVENTS, pipeEmitter } from '../objects/events';

/**
 * Visual reperesentaton of the grid.
 */
export default class GridScene extends Phaser.Scene {
    // Attributes for the cell that the player is hovering over
    #currentRow = 0;
    #currentCol = 0;
    #currentAnimation;

    constructor() {
        super({ key: 'Grid'});
    }

    create(data) {
        this.rows = data.rows;
        this.columns = data.columns;
        this.cellSize = data.cellSize;
        this.offsetX = data.offsetX;
        this.offsetY = data.offsetY;

        this.grid = new Grid(this.rows, this.columns);
        this.#createGrid(this.grid);  

        this.input.on('pointermove', this.handlePointerMove, this);
        this.input.on('pointerdown', this.handlePointerDown, this);

        pipeEmitter.on(PIPE_EVENTS.PIPE_UPDATED, this.updatePipe, this);   
    }

    #createGrid(grid) {
        for (let row = 0; row < grid.rows; row++) {
            for (let col = 0; col < grid.columns; col++) {
                // Calculate x and y for the cell to be drawn
                const x =  this.#calcGridPositionX(col);
                const y = this.#calcGridPositionY(row);           
                this.#addCellSprite(x, y, row, col);
            }
        }
    }

    handlePointerMove(pointer) {
        // Draw selection animation over the current cell under the pointer
        if (this.#isWithinGridBoundaries(pointer.x, pointer.y)) {
            // Calculate row and column
            const col = this.#calcGridColumn(pointer.x);
            const row = this.#calcGridRow(pointer.y);

            if (row == this.#currentRow && col == this.#currentCol) return;

            this.#currentRow = row;
            this.#currentCol = col;

            if (this.#currentAnimation) this.#currentAnimation.destroy();
            if (!this.grid.canPlacePipe(row, col)) return;

            this.#currentAnimation = this.#createSelectionAnimation(row, col);
        } 
        else {
            this.#currentRow = -1;
            this.#currentCol = -1;
            if (this.#currentAnimation) this.#currentAnimation.destroy();
        }
    }
    
    handlePointerDown(pointer) {
        // Try to place a pipe
        if (!this.#isWithinGridBoundaries(pointer.x, pointer.y)) return;

        const row = this.#calcGridRow(pointer.y);
        const col = this.#calcGridColumn(pointer.x);
        if (!this.grid.canPlacePipe(row, col)) return;

        pipeEmitter.emit(PIPE_EVENTS.PLACE_PIPE, row, col);
    }

    updatePipe(row, col) {
        const x =  this.#calcGridPositionX(col);
        const y = this.#calcGridPositionY(row);  
        this.#addCellSprite(x, y, row, col);
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

    #addCellSprite(x, y, row, col) {
        const cell = this.grid.getCell(row, col);
        const cellSprite = this.add.image(x, y, cell.spritePath);
        cellSprite.rotation = Phaser.Math.DegToRad(cell.rotation);
        this.grid.setCellSprite(row, col, cellSprite);

        // Scale the sprite to match cellSize
        const scaleX = this.cellSize / cellSprite.width;
        const scaleY = this.cellSize / cellSprite.height;
        cellSprite.setScale(scaleX, scaleY);
    }

    #calcGridPositionX(col) {
        return col * this.cellSize + this.cellSize / 2 + this.offsetX;
    }

    #calcGridPositionY(row){
        return row * this.cellSize + this.cellSize / 2 + this.offsetY;
    }

    #calcGridRow(y) {
        return Math.floor((y - this.offsetY) / this.cellSize);  
    }

    #calcGridColumn(x) {
        return Math.floor((x - this.offsetX) / this.cellSize);
    }

    #isWithinGridBoundaries(x, y) {
        return (x >= this.offsetX &&
                x < this.offsetX + this.columns * this.cellSize &&
                y >= this.offsetY &&
                y < this.offsetY + this.rows * this.cellSize);
    }

}