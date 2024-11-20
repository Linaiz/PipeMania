export default class PipeType {
    static #STRAIGHT = 0;
    static #CURVED = 1;
    static #CROSS = 2;
    static #START = 3;

    static get STRAIGHT() { return this.#STRAIGHT; }
    static get CURVED() { return this.#CURVED; }
    static get CROSS() { return this.#CROSS; }
    static get START() { return this.#START; }
}