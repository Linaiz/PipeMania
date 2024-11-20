import Phaser from 'phaser'
// UI will display the time that is left before water starts flowing, and the goal length of the pipe path
// Timer will update UI every second - event or coupling?
// Think if event emitter is needed here
export default class Ui extends Phaser.Scene {

    constructor() {
        super({ key: 'Ui'});
    }

    preload() {
        // Load UI assets
    }

    create() {
        console.log("ui");
        // Create text for timer
        // Create text for goal
    }

}