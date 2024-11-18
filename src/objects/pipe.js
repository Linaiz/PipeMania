import PipeType from '../enums/pipe-type'
import ConnectionPoint from '../enums/connection-point'

class Pipe {
    #_spritePath;
    #_spriteRotation = 0; // Clockwise rotation, in degrees
    #_connectionPoints;

    get sprite() { return this.#_spritePath; }

    constructor(type) { 
        this.type = type;
        this.initPipe();
    }

    initPipe() {
        switch (this.type) {
            case PipeType.STRAIGHT:
                initStraightPipe();
            case PipeType.CURVED:
                initCurvedPipe();
            case PipeType.CROSS:
                initCrossPipe();
            default:
                break;
        }
    }

    initStraightPipe() {
        this.#_spritePath = 'assets/pipes/straight.png';

        // Straight pipe can be oriented in 2 ways. The orientation is random.
        randomOrientation = Math.random(); 
        if (randomOrientation < 0.5) {
            // Vertical orientation
            this.#_spriteRotation = 0; 
            this.#_connectionPoints = [ConnectionPoint.UP, ConnectionPoint.DOWN];
        }
        else {
            // Horizontal orientation
            this.#_spriteRotation = 90; 
            this.#_connectionPoints = [ConnectionPoint.LEFT, ConnectionPoint.RIGHT];
        }
    }

    initCurvedPipe() {
        this.#_spritePath = 'assets/pipes/curved.png';

        // Curved pipe can be oriented in 4 ways. The orientation is random.
        randomOrientation = Math.random(); 
        if (randomOrientation < 0.25){
            // down->right direction
            this.#_spriteRotation = 0; 
            this.#_connectionPoints = [ConnectionPoint.DOWN, ConnectionPoint.RIGHT];
        }
        else if (randomOrientation < 0.5) {
            // down->left direction
            this.#_spriteRotation = 90; 
            this.#_connectionPoints = [ConnectionPoint.DOWN, ConnectionPoint.LEFT];
        }
        else if (randomOrientation < 0.75) {
            // up->left direction
            this.#_spriteRotation = 180; 
            this.#_connectionPoints = [ConnectionPoint.UP, ConnectionPoint.LEFT];
        }
        else {
            // up->right direction
            this.#_spriteRotation = 270; 
            this.#_connectionPoints = [ConnectionPoint.UP, ConnectionPoint.RIGHT];
        }
    }

    initCrossPipe() {
        this.#_spritePath = 'assets/pipes/straight.png';
        this.#_connectionPoints = [
            ConnectionPoint.UP, 
            ConnectionPoint.DOWN, 
            ConnectionPoint.LEFT, 
            ConnectionPoint.RIGHT
        ];
    }



}
