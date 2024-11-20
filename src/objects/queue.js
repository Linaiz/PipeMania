import Pipe from '../objects/pipe';
import PipeType from '../constants/pipe-type';
import Deque from '../utils/deque';
import { getRandomInt } from '../utils/math-utils';

export default class Queue {

    constructor(queueLength) {
        this.queueLength = queueLength;
        this.queue = new Deque();
        this.#initQueue();
    }

    #initQueue() {
        // Populate queue with random pipes
        for(let i = 0; i < this.queueLength; i++) {
            this.queue.addFront(this.#getRandomPipe());
        }
    }

    popPipe() {
        // Return next pipe in the queue
        const pipe = this.queue.removeBack();
        // append new random pipe on the beginning of the queue
        this.queue.addFront(this.#getRandomPipe());
        return pipe;
    }

    getFront() {
        return this.queue.front;
    }

    getBack() {
        return this.queue.back;
    }

    #getRandomPipe() {
        // 4 types of curved + 2 types of straight + 1 type of cross = 7 possible pipes
        const random = getRandomInt(0, 7);

        if (random < 4) {
            // Curved pipe
            return new Pipe(PipeType.CURVED);
        }
        else if (random < 6) {
            // Straight pipe
            return new Pipe(PipeType.STRAIGHT);
        }
        else {
            // Cross pipe
            return new Pipe(PipeType.CROSS);
        }
    }
    
}