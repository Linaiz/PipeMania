export default class Grid {

    constructor(rows, columns) {
      this.rows = rows;
      this.columns = columns;
      this.grid = Array.from({ length: columns }, () => Array(rows).fill(-1));
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

    printGrid() {
        console.table(this.grid);
    }

}