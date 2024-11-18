import Phaser from 'phaser'

import TitleScreen from './scenes/title-screen'
import GameScene from './scenes/game-scene'
import GridScene from './scenes/grid-scene'
import UiScene from './scenes/ui-scene'

const config = {
    width: 1100,
    height: 800,
    type: Phaser.AUTO,
    scene: [TitleScreen, GameScene, GridScene, UiScene]
}

const game = new Phaser.Game(config)