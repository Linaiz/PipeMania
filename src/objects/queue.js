import Pipe from '../objects/pipe';
import PipeType from '../constants/pipe-type';
import Deque from '../utils/deque';
import { getRandomInt } from '../utils/math-utils';
import { QUEUE_EVENTS, queueEmitter } from './events';

export default class Queue {
    /**
     * Queue keeps a queue of pipes, usind the Deque data structure.
     * It is filled with random pipes, and its length is always the same.
     * Any time a pipe is popped, a new random pipe is added.
     * @param {number} queueLength Number of pipes to be kept in the queue.
     */
    constructor(queueLength) {
        this.queueLength = queueLength;
        this.queue = new Deque();
        this.#initQueue();
        queueEmitter.on(QUEUE_EVENTS.POP_QUEUE, this.popPipe, this);
    }

    #initQueue() {
        // Populate queue with random pipes
        for(let i = 0; i < this.queueLength; i++) {
            this.queue.addFront(this.#getRandomPipe());
        }
    }

    popPipe() {
        const pipe = this.queue.removeBack();  // Next pipe in the queue
        this.queue.addFront(this.#getRandomPipe());  // Append new random pipe
        queueEmitter.emit(QUEUE_EVENTS.QUEUE_POPPED, pipe);
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