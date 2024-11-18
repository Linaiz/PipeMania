class PipeType {
    static #STRAIGHT = 0;
    static #CURVED = 1;
    static #CROSS = 2;

    static get STRAIGHT() { return this.#STRAIGHT; }
    static get CURVED() { return this.#CURVED; }
    static get CROSS() { return this.#CROSS; }
}