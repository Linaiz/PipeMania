import Phaser from 'phaser'
import WebFontFile from '../utils/WebFontFile'

export default class TitleScreen extends Phaser.Scene {

    preload() {
        this.load.image('startButton', '/assets/ui/button.png');
        const font = new WebFontFile(this.load, 'Jersey 25 Charted');
        this.load.addFile(font)
    }

    create() {
        this.cameras.main.setBackgroundColor('#84d79e')
        
        const titleText = this.add.text(this.scale.width / 2, this.scale.height / 3, 'Pipe Mania', {
            fontSize: '142px',
            color: '#ff854c',
            fontFamily: '"Jersey 25 Charted"',
          }).setShadow(5, 6, '#c8ff94');
          titleText.setOrigin(0.5);


        const startButton = this.add.image(this.scale.width / 2, this.scale.height / 1.8, 'startButton').setInteractive();

        // Start the game when the button is clicked
        startButton.on('pointerdown', () => {
        this.scene.start('game');
        });

        // Add hover effect for button (optional)
        startButton.on('pointerover', () => {
        startButton.setScale(1.1); // Increase scale when hovered over
        });
        startButton.on('pointerout', () => {
        startButton.setScale(1); // Reset scale when not hovered
        });
    }

    
}