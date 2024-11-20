import GridElement from './grid-element';
import CellType from '../constants/cell-type';
import { SPRITES } from '../constants/asset-paths';

export default class Cell extends GridElement {
    constructor(type) { 
        super(type);
        this.#initCell();
        this._rotation = 0;
    }

    #initCell() {
        switch(this.type) {
            case CellType.EMPTY:
                this._spritePath = SPRITES.CELL_EMPTY;
                break;
            case CellType.BLOCKED:
                this._spritePath = SPRITES.CELL_BLOCKED;
                break;
            
        }
    }
}