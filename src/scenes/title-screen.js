import Phaser from 'phaser'
import WebFontFile from '../utils/WebFontFile'
import { UI } from '../constants/asset-paths';

export default class TitleScreen extends Phaser.Scene {

    constructor() {
        super({ key: 'TitleScreen'});
    }

    preload() {
        // Special font for the title text is retrieved from GoogleFonts with WebFontLoader
        const font = new WebFontFile(this.load, 'Jersey 25 Charted');
        this.load.addFile(font)

        this.load.image('startButton', UI.BUTTON);
    }

    create() {
        this.cameras.main.setBackgroundColor('#84d79e')
        this.#createTitle()
        this.#createStartButton()
    }

    #createTitle() {
        const titleText = this.add.text(this.scale.width / 2, this.scale.height / 3, 'Pipe Mania', {
            fontSize: '142px',
            color: '#ff854c',
            fontFamily: '"Jersey 25 Charted"',
        }).setShadow(5, 6, '#c8ff94');

        titleText.setOrigin(0.5);
    }

    #createStartButton() {
        // Start button will start the game scene once pressed
        const startButton = this.add.image(this.scale.width / 2, this.scale.height / 1.8, 'startButton').setInteractive();

        startButton.on('pointerdown', () => {
            this.scene.start('Game');
        });

        // Hover effect for button
        startButton.on('pointerover', () => {
        startButton.setScale(1.1);
        });
        startButton.on('pointerout', () => {
        startButton.setScale(1); 
        });
    }

    
}