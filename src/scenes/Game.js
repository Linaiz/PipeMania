import Phaser from 'phaser'

export default class Game extends Phaser.Scene {

    preload() {
        this.load.image('pipeStraight', 'src/assets/pipes/straight.png');
    }

    create() {

    }
}