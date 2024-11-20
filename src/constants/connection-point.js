export default class ConnectionPoint {
    static #UP = 0;
    static #DOWN = 1;
    static #LEFT = 2;
    static #RIGHT = 3;

    static #CONNECTION = {
        [ConnectionPoint.UP]: ConnectionPoint.DOWN,
        [ConnectionPoint.DOWN]: ConnectionPoint.UP,
        [ConnectionPoint.LEFT]: ConnectionPoint.RIGHT,
        [ConnectionPoint.RIGHT]: ConnectionPoint.LEFT,
    }

    static get UP() { return this.#UP; }
    static get DOWN() { return this.#DOWN; }
    static get LEFT() { return this.#LEFT; }
    static get RIGHT() { return this.#RIGHT; }

    isConnecting(point1, point2) {
        return ConnectionPoint.#CONNECTION[point1] === point2;
    }

}