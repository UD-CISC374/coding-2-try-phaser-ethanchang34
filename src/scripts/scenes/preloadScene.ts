export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.image("mt_back", "assets/images/mt_back.png");
    this.load.image("mt_mid", "assets/images/mt_mid.png");
    this.load.image("mt_front", "assets/images/mt_front.png");
    this.load.image("apple", "assets/images/apple.png");
    this.load.image("pear", "assets/images/pear.png");
    this.load.image("ruby", "assets/images/ruby.png");
    this.load.spritesheet("explosion", "assets/spriteSheets/explosion.png", {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("ship", "assets/spriteSheets/ship.png", {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("ship2", "assets/spriteSheets/ship2.png", {
      frameWidth: 32,
      frameHeight: 16
    });
    this.load.spritesheet("ship3", "assets/spriteSheets/ship3.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("power-up", "assets/spriteSheets/power-up.png", {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("player", "assets/spriteSheets/player.png", {
      frameWidth: 16,
      frameHeight: 24
    });
    this.load.spritesheet("beam", "assets/spriteSheets/beam.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");
  }

  create() {
    this.add.text(20, 20, "Loading game...");

    //Animations
    this.anims.create({
      key: "ship_anim",
      frames: this.anims.generateFrameNumbers("ship", {}),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create ({
      key: "ship2_anim",
      frames: this.anims.generateFrameNumbers("ship2", {}),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create ({
      key: "ship3_anim",
      frames: this.anims.generateFrameNumbers("ship3", {}),
      frameRate: 20,
      repeat: -1
    })
    this.anims.create ({
      key: "explode",
      frames: this.anims.generateFrameNumbers("explosion", {}),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true
    });
    this.anims.create ({
      key: "red",
      frames: this.anims.generateFrameNumbers("power-up", {
        start: 0,
        end: 1
      }),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create ({
      key: "gray",
      frames: this.anims.generateFrameNumbers("power-up", {
        start: 2,
        end: 3
      }),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create ({
      key: "thrust",
      frames: this.anims.generateFrameNumbers("player", {}),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create ({
      key: "beam_anim",
      frames: this.anims.generateFrameNumbers("beam", {}),
      frameRate: 20,
      repeat: -1
    });

    this.scene.start('MainScene');
  }
}
