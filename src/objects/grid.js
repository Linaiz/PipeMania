import Pipe from '../objects/pipe'
import PipeType from '../constants/pipe-type'
import Cell from '../objects/cell'
import CellType from '../constants/cell-type'
import { getRandomInt } from '../utils/math-utils'

export default class Grid {

    constructor(rows, columns, numBlockedCells = 4) {
        this.rows = rows;
        this.columns = columns;
        this.numBlockedCells = numBlockedCells;
        this.grid = this.#createGrid();
    }

    #createGrid() {
        // Populate grid with empty cells
        const grid = [];

        for (let row = 0; row < this.rows; row++) {
            grid[row] = [];      
            for (let col = 0; col < this.columns; col++) {
                grid[row][col] = new Cell(CellType.EMPTY);
            }
        }
   
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

        // Make sure the starting pipe isn't blocked by a blocked cell
        while (true) {
            const row = getRandomInt(minRow, maxRow);
            const col = getRandomInt(minCol, maxCol);

            if (grid[row][col].type != CellType.EMPTY) continue;
            if (row > 0 && grid[row - 1][col].type == CellType.BLOCKED) continue;
            if (row < this.rows - 1 && grid[row + 1][col].type == CellType.BLOCKED) continue;
            if (col > 0 && grid[row][col - 1].type == CellType.BLOCKED) continue;
            if (col < this.columns - 1 && grid[row][col + 1].type == CellType.BLOCKED) continue;

            grid[row][col] = startPipe;
            this.startRow = row;
            this.startCol = col;
            break;
        }

        return grid;
    }

    getCell(row, col) {
        if (!this.isValidCell(row, col)) return null;
        return this.grid[row][col];
    }

    setCell(row, col, value) {
        if (this.isValidCell(row, col)) {
            this.grid[row][col] = value;
        }
    }

    setCellSprite(row, col, sprite) {
        if (!this.isValidCell(row, col)) return null;
        this.grid[row][col].sprite = sprite;
    }

    // Check if a cell is within the grid boundaries
    isValidCell(row, col) {
        return row >= 0 && row < this.rows && col >= 0 && col < this.columns;
    }

    canPlacePipe(row, col) {
        if (!this.isValidCell(row, col)) return false;
        const cell = this.grid[row][col];

        return  cell.type == CellType.EMPTY ||
                cell.type == PipeType.STRAIGHT ||
                cell.type == PipeType.CURVED ||
                cell.type == PipeType.CROSS;
    }

    startWaterFlow() {

    }

    progressWaterFlow() {
        const visited = Array.from({ length: this.rows }, () => Array(this.columns).fill(false));
        const distances = Array.from({ length: this.rows }, () => Array(this.columns).fill(0));
        const directions = [
            [0, 1],   // Right
            [0, -1],  // Left
            [1, 0],   // Down
            [-1, 0],  // Up
        ];

        let dist = 0;
        this.#findLongestPath(this.startRow, this.startCol, visited, directions, distances, dist);
    }

    #findNextWaterFlowCell(startRow, startCol) {

    }

    #findLongestPath(row, col, visited, directions, distances) {
        const cell = this.getCell(row, col) 

        if ( 
            !this.isValidCell(row, col) ||
            visited[row][col] ||
            cell.filled ||
            cell.type === CellType.EMPTY || 
            cell.type === CellType.BLOCKED
        )
            return 0;
        
        visited[row][col] = true;
        for (const [dx, dy] of directions) {
            const newRow = row + dx;
            const newCol = col + dy;
            
            let nextDist =  1 + this.#findLongestPath(newRow, newCol, visited, directions, distances); 
            if (nextDist > distances[row][col]) distances[row][col] = nextDist;
        }
        
        console.log(distances);
        return distances[row][col];
    }

}