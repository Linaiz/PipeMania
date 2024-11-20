import { getRandomInt } from '../utils/math-utils'
import PipeType from '../constants/pipe-type'
import CellType from '../constants/cell-type'
import Pipe from '../objects/pipe'
import Cell from '../objects/cell'

export default class Grid {

    constructor(rows, columns, numBlockedCells = 4) {
        this.rows = rows;
        this.columns = columns;
        this.numBlockedCells = numBlockedCells;
        this.grid = this.createGrid();
    }

    createGrid() {
        // Populate grid with empty cells
        const grid = Array.from({ length: this.rows }, () => Array(this.columns).fill(new Cell(CellType.EMPTY)));
   
        // Add blocked cells
        var i = 0;
        while (i < this.numBlockedCells) {
            const row = getRandomInt(0, this.rows);
            const col = getRandomInt(0, this.columns);

            if (grid[row][col].type == CellType.EMPTY) {
                grid[row][col] = new Cell(CellType.BLOCKED);
                i++;
            }
        }

        // Add starting pipe
        const startPipe = new Pipe(PipeType.START);

        var minRow = 0;
        var minCol =  0;
        var maxRow  = this.rows - 1;
        var maxCol = this.columns;

        // Spawn starting pipe far from the grid edge that it is facing
        switch (startPipe.rotation) {
            case 0:
                // UP
                minRow = Math.floor(maxRow / 2);
            case 90:
                // RIGHT
                maxCol = Math.floor(maxCol / 2);            
            case 180:
                // DOWN
                maxRow = Math.floor(maxRow / 2);
            case 270:
                // LEFT
                minCol = Math.floor(maxCol / 2);
            default:
                break;
        }

        while (true) {
            const row = getRandomInt(minRow, maxRow);
            const col = getRandomInt(minCol, maxCol);

            if (grid[row][col].type != CellType.EMPTY) continue;
            if (row > 0 && grid[row - 1][col].type == CellType.BLOCKED) continue;
            if (row < this.rows - 1 && grid[row + 1][col].type == CellType.BLOCKED) continue;
            if (col > 0 && grid[row][col - 1].type == CellType.BLOCKED) continue;
            if (col < this.columns - 1 && grid[row][col + 1].type == CellType.BLOCKED) continue;

            grid[row][col] = startPipe;
            break;
        }

        return grid;
    }

    getCell(row, col) {
        if (this.isValidCell(row, col)) {
            return this.grid[row][col];
        }
        return null;
    }

    // Set the value of a cell
    setCell(row, col, value) {
        if (this.isValidCell(row, col)) {
            this.grid[row][col] = value;
        }
    }

    // Check if a cell is within the grid boundaries
    isValidCell(row, col) {
        return row >= 0 && row < this.rows && col >= 0 && col < this.columns;
    }

}