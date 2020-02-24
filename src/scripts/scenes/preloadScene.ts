export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.image("background", "assets/images/background.jpg");
    this.load.image("ship", "assets/images/ship.jpg");
    this.load.image("ship2", "assets/images/ship2.jpg");
    this.load.image("ship3", "assets/images/ship3.jpg");
    this.load.spritesheet("golem", "assets/spriteSheets/golem-walk.png", {
      frameWidth: 16, 
      frameHeight: 16
    });
    this.load.spritesheet("golemDie", "assets/spriteSheets/golem-die.png", {
      frameWidth: 16,
      frameHeight: 16
    });
  }

  create() {
    this.add.text(20, 20, "Loading game...");
    this.scene.start('MainScene');
  }
}
