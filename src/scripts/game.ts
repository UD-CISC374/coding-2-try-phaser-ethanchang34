import 'phaser';
import MainScene from './scenes/mainScene';
import PreloadScene from './scenes/preloadScene';
import Beam from './objects/beam';
import GameConfig = Phaser.Types.Core.GameConfig;

const DEFAULT_WIDTH =800;
const DEFAULT_HEIGHT = 500;


const config: GameConfig = {
    backgroundColor: '#ffffff',
    scale: {
        parent: 'phaser-game',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT
    },
    scene: [PreloadScene, MainScene],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            //gravity: { y: 400 }
        }
    }
};

window.addEventListener('load', () => {
    window['game'] = new Phaser.Game(config);
});

//
