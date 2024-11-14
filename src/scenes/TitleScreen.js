import Phaser from 'phaser'

export default class TitleScreen extends Phaser.Scene {

    preload() {
        this.load.image('startButton', '../../public/assets/ui/button.png');

    }

    create() {
        this.cameras.main.setBackgroundColor('#84d79e')
        
        const titleText = this.add.text(this.scale.width / 2, this.scale.height / 3, 'Pipe Mania', {
            fontSize: '48px',
            color: '#ffffff',
            fontFamily: 'Arial',
          });
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