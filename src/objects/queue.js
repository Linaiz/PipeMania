export default class Queue {

    constructor(numElements) {
        // Save as an array for now, consider a linked list or a queue-like structure in JS
        this.queue = new Array(numElements).fill(-1); 
    }

    getNextPipe() {
        // Return next pipe in the queue
        // pop last element from queue
        // append new random pipe on the beginning of the queue
    }
    
}