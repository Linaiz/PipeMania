import Phaser from 'phaser'

import TitleScreen from './scenes/title-screen'
import Game from './scenes/game'
import Ui from './scenes/ui'

const config = {
    width: 1100,
    height: 800,
    type: Phaser.AUTO,
    scene: [TitleScreen, Game, Ui]
}

const game = new Phaser.Game(config)