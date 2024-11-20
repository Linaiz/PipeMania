export default class CellType {
    static #EMPTY = 4;
    static #BLOCKED = 5;

    static get EMPTY() { return this.#EMPTY; }
    static get BLOCKED() { return this.#BLOCKED; }
}