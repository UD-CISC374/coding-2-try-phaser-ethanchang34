import ExampleObject from '../objects/exampleObject';
import { GameObjects } from 'phaser';

export default class MainScene extends Phaser.Scene {
  mt_back: Phaser.GameObjects.TileSprite;
  mt_mid: Phaser.GameObjects.TileSprite;
  mt_front: Phaser.GameObjects.TileSprite;
  //apple: Phaser.GameObjects.Image;
  apple: Phaser.Physics.Arcade.Image;
  //pear: Phaser.GameObjects.Image;
  pear: Phaser.Physics.Arcade.Image;
  //ruby: Phaser.GameObjects.Image;
  ruby: Phaser.Physics.Arcade.Image;
  ship: Phaser.GameObjects.Sprite;
  ship2: Phaser.GameObjects.Sprite;
  explosion: Phaser.GameObjects.Sprite;
  powerUps: Phaser.Physics.Arcade.Group;
  //powerUps: Phaser.GameObjects.Sprite;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    //Background
    this.mt_back = this.add.tileSprite(0, 0, 0, 0, "mt_back");
    this.mt_back.setOrigin(0, 0);
    this.mt_mid = this.add.tileSprite(0, 100, 0, 0, "mt_mid");
    this.mt_mid.setOrigin(0, 0);
    this.mt_front = this.add.tileSprite(0, 500, 0, 0, "mt_front");
    this.mt_front.setOrigin(0, 0);

    //Collectibles
    this.apple = this.physics.add.image(this.scale.width - 100, this.scale.height / 2 + 100, "apple");
    this.apple.setScale(0.1);
    this.apple.setVelocity(500, 600);
    this.apple.setCollideWorldBounds(true);
    this.apple.setBounce(1);
    this.pear = this.physics.add.image(this.scale.width - 100, this.scale.height / 2 - 100, "pear");
    this.pear.setScale(0.1);
    this.pear.setVelocity(400, 700);
    this.pear.setCollideWorldBounds(true);
    this.pear.setBounce(1);
    this.ruby = this.physics.add.image(this.scale.width - 100, this.scale.height / 2 - 200, "ruby");
    this.ruby.setScale(0.1);
    this.ruby.setVelocity(700, 200);
    this.ruby.setCollideWorldBounds(true);
    this.ruby.setBounce(1);
    
    //Enemies
    this.ship = this.add.sprite(this.scale.width - 300, this.scale.height / 2 + 300, "ship");
    this.ship2 = this.add.sprite(this.scale.width - 300, this.scale.height / 2 - 300, "ship2");
    this.ship.setScale(5);
    this.ship2.setScale(4);
    this.ship.angle -= 90;
    this.ship2.angle -= 90;

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
    
    this.ship.play("ship_anim");
    this.ship2.play("ship2_anim");

    //Interactives
    this.ship.setInteractive();
    this.ship2.setInteractive();
    this.input.on('gameobjectdown', this.destroy, this);

    /* this.powerUps = this.physics.add.group();
    var maxObjects = 4;
    for (var i = 0; i <= maxObjects; i++) {
      var powerUp = this.physics.add.sprite(16, 16, "power-up");
      this.powerUps.add(powerUp);
      powerUp.setRandomPosition(0, 0, this.scale.width, this.scale.height);
      if (Math.random() > 0.5) {
        powerUp.play("red");
      } else {
        powerUp.play("gray");
      }
      powerUp.setVelocity(100, 100)
      powerUp.setCollideWorldBounds(true);
      powerUp.setBounce(1);
    } */
    /* //let powerArr: Array <Phaser.GameObjects.Image> = [this.apple, this.pear, this.ruby];
    this.powerUps.add(this.physics.add.image(this.apple.width, this.apple.height, "apple"));
    this.apple.setRandomPosition(0, 0, this.scale.width, this.scale.height);
    this.powerUps.add(this.physics.add.image(this.apple.width, this.apple.height, "apple"));
    this.apple.setRandomPosition(0, 0, this.scale.width, this.scale.height); // I want 2 apples
    this.powerUps.add(this.physics.add.image(this.pear.width, this.pear.height, "pear"));
    this.pear.setRandomPosition(0, 0, this.scale.width, this.scale.height);
    this.powerUps.add(this.physics.add.image(this.ruby.width, this.ruby.height, "ruby"));
    this.ruby.setRandomPosition(0, 0, this.scale.width, this.scale.height); */

    this.add.text(20, 20, "Playing game...", {font: "25px Arial", fill: "black"});
  }

  move(obj, speed) {
    obj.x += speed;
    if (obj.x < 0) {
      this.resetPos(obj);
    }
  }

  resetPos(obj) {
    obj.x = this.scale.width - 50;
    var randomY = Phaser.Math.Between(0, this.scale.height);
    obj.y = randomY;
  }

  destroy(pointer, gameObject) {
    gameObject.setTexture("explosion");
    gameObject.play("explode");
  }

  update() {
    /* this.move(this.ruby, -15);
    this.move(this.apple, -8);
    this.move(this.pear, -6) */
    this.move(this.ship, -15);
    this.move(this.ship2, -15);
    this.mt_back.tilePositionX += 2;
    this.mt_mid.tilePositionX += 3;
    this.mt_front.tilePositionX += 4;
  }
}
