import Phaser from 'phaser';
import Queue from '../objects/queue';
import { ANIMATIONS } from '../constants/asset-paths';


export default class QueueScene extends Phaser.Scene { 
    
    constructor() {
        super({ key: 'Queue'});
    }

    create(data) {
        this.queueLength = data.queueLength;
        this.cellSize = data.cellSize;
        this.offsetX = data.offsetX;
        this.offsetY = data.offsetY;
        this.spacing = data.spacing;

        this.queue = new Queue(this.queueLength);
        this.#createQueue(this.queue);
        this.#createSelectionAnimation();
        this.#createText();
    }

    #createQueue(queue) {
        let current = queue.getBack();    

        // Draw current pipe
        this.#addPipe(current.value, 0);

        // Draw rest of the pipes in the queue
        current = current.next;
        let i = 1;
        while (current) {
            this.#addPipe(current.value, i);
            i += 1;
            current = current.next;
        }
    }

    getNextPipe() {
        const pipe = this.queue.popPipe();
        this.#redrawQueue();
        return pipe;
    }

    #redrawQueue() {
        let current = this.queue.getBack();
        let i = 0;

        // Draw first element separately
        if (current.value.sprite) {
            current.value.sprite.setPosition(this.offsetX, this.offsetY);
            current = current.next;
            i += 1;
        }
        
        while(current) {
            if (current.value.sprite) {
                this.#movePipeUp(current.value);
            }
            else {
                this.#addPipe(current.value, i);
            }
            i += 1;
            current = current.next;
        }
    }

    #addPipe(pipe, i) {
        let x = this.offsetX;
        let y = i * (this.cellSize + this.spacing) + this.cellSize / 2 + this.offsetY;

        if (i == 0) y -= this.cellSize / 2;

        const pipeSprite = this.add.image(x, y, pipe.spritePath);
        pipeSprite.rotation = Phaser.Math.DegToRad(pipe.rotation);

        const scaleX = this.cellSize / pipeSprite.width;
        const scaleY = this.cellSize / pipeSprite.height;
        pipeSprite.setScale(scaleX, scaleY);

        pipe.sprite = pipeSprite;
    }

    #movePipeUp(pipe) {
        pipe.sprite.y -= this.cellSize + this.spacing;
    }

    #createSelectionAnimation() {   
        const selection = this.add.sprite(this.offsetX, this.offsetY, ANIMATIONS.SELECTION);
        const scaleX = this.cellSize * 1.1 / selection.width;
        const scaleY = this.cellSize * 1.1 / selection.height;
        selection.setScale(scaleX, scaleY);
        selection.play(ANIMATIONS.SELECTION);
    }

    #createText() {
        const text = this.add.text(this.offsetX + 5, this.offsetY + this.cellSize - this.spacing, 'Next:', {
            fontSize: '28px',
            fontFamily: 'Monaco',
        });
        text.setOrigin(0.5);
    }
}