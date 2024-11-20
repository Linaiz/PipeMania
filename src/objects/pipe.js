import GridElement from './grid-element';
import PipeType from '../constants/pipe-type'
import ConnectionPoint from '../constants/connection-point'
import { SPRITES } from '../constants/asset-paths';

export default class Pipe extends GridElement {
    #_connectionPoints;

    get connectionPoints() { return this.#_connectionPoints; }

    constructor(type) { 
        super(type);
        this.initPipe();
    }

    initPipe() {
        switch (this.type) {
            case PipeType.STRAIGHT:
                this.initStraightPipe();
                break;
            case PipeType.CURVED:
                this.initCurvedPipe();
                break;
            case PipeType.CROSS:
                this.initCrossPipe();
                break;
            case PipeType.START:
                this.initStartPipe();
                break;
        }
    }

    connectsTo(otherPipe) {
        this.#_connectionPoints.forEach(point1 => {
            otherPipe.connectionPoints.forEach(point2 => {
                if (ConnectionPoint.isConnecting(point1, point2)) return true;
            });
        });
        return false;
    }

    initStraightPipe() {
        this._spritePath = SPRITES.PIPE_STRAIGHT;

        // Straight pipe can be oriented in 2 ways. The orientation is random.
        const randomOrientation = Math.random(); 
        if (randomOrientation < 0.5) {
            // Vertical orientation
            this._rotation = 0; 
            this.#_connectionPoints = [ConnectionPoint.UP, ConnectionPoint.DOWN];
        }
        else {
            // Horizontal orientation
            this._rotation = 90; 
            this.#_connectionPoints = [ConnectionPoint.LEFT, ConnectionPoint.RIGHT];
        }
    }

    initCurvedPipe() {
        this._spritePath = SPRITES.PIPE_CURVED;

        // Curved pipe can be oriented in 4 ways. The orientation is random.
        const randomOrientation = Math.random(); 
        if (randomOrientation < 0.25){
            // down->right direction
            this._rotation = 0; 
            this.#_connectionPoints = [ConnectionPoint.DOWN, ConnectionPoint.RIGHT];
        }
        else if (randomOrientation < 0.5) {
            // down->left direction
            this._rotation = 90; 
            this.#_connectionPoints = [ConnectionPoint.DOWN, ConnectionPoint.LEFT];
        }
        else if (randomOrientation < 0.75) {
            // up->left direction
            this._rotation = 180; 
            this.#_connectionPoints = [ConnectionPoint.UP, ConnectionPoint.LEFT];
        }
        else {
            // up->right direction
            this._rotation = 270; 
            this.#_connectionPoints = [ConnectionPoint.UP, ConnectionPoint.RIGHT];
        }
    }

    initCrossPipe() {
        this._spritePath = SPRITES.PIPE_CROSS;
        this.#_connectionPoints = [
            ConnectionPoint.UP, 
            ConnectionPoint.DOWN, 
            ConnectionPoint.LEFT, 
            ConnectionPoint.RIGHT
        ];
    }

    initStartPipe() {
        this._spritePath = SPRITES.PIPE_START;

        // Starting can be oriented in 4 ways. The orientation is random.
        const randomOrientation = Math.random(); 
        if (randomOrientation < 0.25){
            this._rotation = 0; 
            this.#_connectionPoints = [ConnectionPoint.UP];
        }
        else if (randomOrientation < 0.5) {
            this._rotation = 90; 
            this.#_connectionPoints = [ConnectionPoint.RIGHT];
        }
        else if (randomOrientation < 0.75) {
            this._rotation = 180; 
            this.#_connectionPoints = [ConnectionPoint.DOWN];
        }
        else {
            this._rotation = 270; 
            this.#_connectionPoints = [ConnectionPoint.LEFT];
        }
    }



}
