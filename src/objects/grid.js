
export default class Grid {

    constructor(rows, columns) {
      this.rows = rows;
      this.columns = columns;
      this.grid = this.createGrid();
    }

    createGrid() {
        const grid = [];

        for (let row = 0; row < this.rows; row++) {
          grid[row] = [];

          for (let col = 0; col < this.columns; col++) {
            grid[row][col] = null;
          }
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

    printGrid() {
        console.table(this.grid);
    }

}