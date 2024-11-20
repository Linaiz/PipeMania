import Phaser from 'phaser'
import Queue from '../objects/queue'

export default class QueueScene extends Phaser.Scene { 
    
    constructor(queueLength, cellSize = 96, offsetX = 0, offsetY = 0) {
        super({ key: 'Queue'});
        this.queueLength = queueLength;
        this.cellSize = cellSize;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
    }

    create(data) {
        this.queueLength = data.queueLength;
        this.offsetX = data.offsetX;
        this.offsetY = data.offsetX;

        this.queue = new Queue();
        this.createQueue(this.queue);

    }

    createQueue(queue) {

    }   
}