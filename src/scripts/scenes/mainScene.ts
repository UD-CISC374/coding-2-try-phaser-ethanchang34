import ExampleObject from '../objects/exampleObject';
import { GameObjects } from 'phaser';
import Beam from '../objects/beam';

export default class MainScene extends Phaser.Scene {
  mt_back: Phaser.GameObjects.TileSprite;
  mt_mid: Phaser.GameObjects.TileSprite;
  mt_front: Phaser.GameObjects.TileSprite;
  apple: Phaser.Physics.Arcade.Image;
  pear: Phaser.Physics.Arcade.Image;
  ruby: Phaser.Physics.Arcade.Image;
  ship: Phaser.GameObjects.Sprite;
  ship2: Phaser.GameObjects.Sprite;
  explosion: Phaser.GameObjects.Sprite;
  powerUps: Phaser.Physics.Arcade.Group;
  player: Phaser.Physics.Arcade.Sprite;
  cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  spacebar: Phaser.Input.Keyboard.Key;
  projectiles: Phaser.GameObjects.Group;
  // beam: Phaser.GameObjects.Sprite;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    //Background
    this.mt_back = this.add.tileSprite(0, 150, 0, 0, "mt_back");
    this.mt_back.setOrigin(0, 0);
    this.mt_mid = this.add.tileSprite(0, 200, 0, 0, "mt_mid");
    this.mt_mid.setOrigin(0, 0);
    this.mt_front = this.add.tileSprite(0, 325, 0, 0, "mt_front");
    this.mt_front.setOrigin(0, 0);

    //Player
    this.player = this.physics.add.sprite(this.scale.width / 2 - 8, this.scale.height - 64, "player");
    this.player.setScale(1);
    this.player.angle += 90;
    this.player.play("thrust");
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.player.setCollideWorldBounds(true);

    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.projectiles = this.add.group({
      classType: Beam,
      maxSize: 10,
      runChildUpdate: true
    });


    //Collectibles
    this.apple = this.physics.add.image(this.scale.width - 100, this.scale.height / 2 + 50, "apple");
    this.apple.setScale(0.05);
    this.apple.setVelocity(20, 30);
    this.apple.setCollideWorldBounds(true);
    this.apple.setBounce(1);
    this.pear = this.physics.add.image(this.scale.width - 100, this.scale.height / 2 - 50, "pear");
    this.pear.setScale(0.05);
    this.pear.setVelocity(40, 70);
    this.pear.setCollideWorldBounds(true);
    this.pear.setBounce(1);
    this.ruby = this.physics.add.image(this.scale.width - 100, this.scale.height / 2, "ruby");
    this.ruby.setScale(0.03);
    this.ruby.setVelocity(70, 20);
    this.ruby.setCollideWorldBounds(true);
    this.ruby.setBounce(1);
    
    //Enemies
    this.ship = this.add.sprite(this.scale.width - 30, this.scale.height / 2 + 30, "ship");
    this.ship2 = this.add.sprite(this.scale.width - 30, this.scale.height / 2 - 30, "ship2");
    this.ship.setScale(2);
    this.ship2.setScale(2);
    this.ship.angle -= 90;
    this.ship2.angle -= 90;

    this.ship.play("ship_anim");
    this.ship2.play("ship2_anim");

    //Interactives
    this.ship.setInteractive();
    this.ship2.setInteractive();
    this.input.on('gameobjectdown', this.destroy, this);
    this.physics.add.collider(this.projectiles, this.powerUps, function(projectiles, powerUp) {
      projectiles.destroy();
    });
    //this.physics.add.overlap(this.player, this.powerUps, this.pickPowerUp, null, this);

    /* this.powerUps = this.physics.add.group();
    let maxObjects = 4;
    for (let i = 0; i <= maxObjects; i++) {
      let powerUp = this.physics.add.sprite(16, 16, "power-up");
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

    /* this.powerUps.add(this.physics.add.image(this.apple.width, this.apple.height, "apple"));
    this.apple.setRandomPosition(0, 0, this.scale.width, this.scale.height);
    this.powerUps.add(this.physics.add.image(this.apple.width, this.apple.height, "apple"));
    this.apple.setRandomPosition(0, 0, this.scale.width, this.scale.height); // I want 2 apples
    this.powerUps.add(this.physics.add.image(this.pear.width, this.pear.height, "pear"));
    this.pear.setRandomPosition(0, 0, this.scale.width, this.scale.height);
    this.powerUps.add(this.physics.add.image(this.ruby.width, this.ruby.height, "ruby"));
    this.ruby.setRandomPosition(0, 0, this.scale.width, this.scale.height); */


    //this.cameras.main.startFollow(this.player);
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
    let randomY = Phaser.Math.Between(0, this.scale.height);
    obj.y = randomY;
  }

  destroy(pointer, gameObject) {
    gameObject.setTexture("explosion");
    gameObject.play("explode");
  }

  shootBeam() {
    let beam = new Beam(this);
  }

  pickPowerUp(player, powerUp) {
    powerUp.disableBody(true, true);
  }

  update() {
    this.move(this.ship, -5);
    this.move(this.ship2, -5);

    this.mt_back.tilePositionX += 2;
    this.mt_mid.tilePositionX += 3;
    this.mt_front.tilePositionX += 4;

    this.movePlayerManager();

    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      //console.log("Fire!");
      this.shootBeam();
    }
    /* for (let i = 0; this.projectiles.getChildren().length; i++) {
      let beam = this.projectiles.getChildren()[i];
      beam.update();
    } */
  }

  movePlayerManager() {
    if (this.cursorKeys.left?.isDown) {
      this.player.setVelocityX(-100);
    } else if (this.cursorKeys.right?.isDown) {
      this.player.setVelocityX(100);
    } else if (this.cursorKeys.up?.isDown) {
      this.player.setVelocityY(-100);
    } else if (this.cursorKeys.down?.isDown) {
      this.player.setVelocityY(100);
    } else {
      this.player.setVelocity(0, 0);
    }
  }
}
