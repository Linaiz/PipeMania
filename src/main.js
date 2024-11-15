import Phaser from 'phaser'

import TitleScreen from './scenes/title-screen'
import Game from './scenes/game'

const config = {
    width: 1100,
    height: 800,
    type: Phaser.AUTO
}

const game = new Phaser.Game(config)

game.scene.add('titlescreen', TitleScreen)
game.scene.add('game', Game)

game.scene.start('titlescreen')