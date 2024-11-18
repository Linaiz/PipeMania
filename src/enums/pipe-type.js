class PipeType {
    static #_STRAIGHT = 0;
    static #_CURVED = 1;
    static #_CROSS = 2;

    static get STRAIGHT() { return this.#_STRAIGHT; }
    static get CURVED() { return this.#_CURVED; }
    static get CROSS() { return this.#_CROSS; }
}