import Phaser from 'phaser'
import Queue from '../objects/queue'

export default class QueueScene extends Phaser.Scene { 
    
    constructor(queueLength, cellSize = 96, offsetX = 0, offsetY = 0, spacing = 0) {
        super({ key: 'Queue'});
        this.queueLength = queueLength;
        this.cellSize = cellSize;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.spacing = spacing;
    }

    create(data) {
        this.queueLength = data.queueLength;
        this.offsetX = data.offsetX;
        this.offsetY = data.offsetY;
        this.spacing = data.spacing;

        this.queue = new Queue(this.queueLength);
        this.drawQueue(this.queue);
        this.createText();

        console.log(this.queue);
    }

    drawQueue(queue) {
        let current = queue.getBack();
        
        // Draw current pipe 
        this.addPipe(current.value, this.offsetX, this.offsetY);

        // Draw rest of the pipes in the queue
        current = current.next;
        let i = 1;
        while (current) {
            const x = this.offsetX;
            const y = i * (this.cellSize + this.spacing) + this.cellSize / 2 + this.offsetY;

            this.addPipe(current.value, x, y);

            i += 1;
            console.log(current);
            current = current.next;
        }

    }

    addPipe(pipe, x, y) {
        const pipeSprite = this.add.image(x, y, pipe.spritePath);
        pipeSprite.rotation = Phaser.Math.DegToRad(pipe.rotation);

        const scaleX = this.cellSize / pipeSprite.width;
        const scaleY = this.cellSize / pipeSprite.height;
        pipeSprite.setScale(scaleX, scaleY);
    }

    createText() {
        const text = this.add.text(this.offsetX + 5, this.offsetY + this.cellSize - this.spacing, 'Next:', {
            fontSize: '28px',
            fontFamily: 'Monaco',
        });
        text.setOrigin(0.5);
    }
}