export default class ConnectionPoint {
    static #UP = 0;
    static #DOWN = 1;
    static #LEFT = 2;
    static #RIGHT = 3;

    static get UP() { return this.#UP; }
    static get DOWN() { return this.#DOWN; }
    static get LEFT() { return this.#LEFT; }
    static get RIGHT() { return this.#RIGHT; }

    isConnectingUp(point1, point2) {
        return point1 === ConnectionPoint.UP && point2 === ConnectionPoint.DOWN;
    }

    isConnectingDown(point1, point2) {
        return point1 === ConnectionPoint.DOWN && point2 === ConnectionPoint.UP;
    }

    isConnectingLeft(point1, point2) {
        return point1 === ConnectionPoint.LEFT && point2 === ConnectionPoint.RIGHT;
    }

    isConnectingRight(point1, point2) {
        return point1 === ConnectionPoint.RIGHT && point2 === ConnectionPoint.LEFT;
    }

}