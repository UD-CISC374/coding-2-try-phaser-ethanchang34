export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    //this.load.image("background", "assets/images/background.png");
    this.load.image("mt_back", "assets/images/mt_back.png");
    this.load.image("mt_mid", "assets/images/mt_mid.png");
    this.load.image("mt_front", "assets/images/mt_front.png");
    this.load.image("apple", "assets/images/apple.png");
    this.load.image("pear", "assets/images/pear.png");

    /* this.load.spritesheet("golemDie", "assets/spriteSheets/golem-die.png", {
      frameWidth: 16,
      frameHeight: 16
    }); */
  }

  create() {
    this.add.text(20, 20, "Loading game...");
    this.scene.start('MainScene');
  }
}
