import ExampleObject from '../objects/exampleObject';
import { GameObjects } from 'phaser';

export default class MainScene extends Phaser.Scene {
  //background: Phaser.GameObjects.TileSprite;
  mt_back: Phaser.GameObjects.TileSprite;
  mt_mid: Phaser.GameObjects.TileSprite;
  mt_front: Phaser.GameObjects.TileSprite;
/*   ship1: Phaser.GameObjects.Image;
  ship2: Phaser.GameObjects.Image;
  ship3: Phaser.GameObjects.Image; */
  /* golem: Phaser.GameObjects.Sprite;
  golemDie: Phaser.GameObjects.Sprite; */
  /* apple: Phaser.GameObjects.Image;
  pear: Phaser.GameObjects.Image; */

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.mt_back = this.add.tileSprite(0, 0, 0, 0, "mt_back");
    this.mt_back.setOrigin(0, 0);
    this.mt_mid = this.add.tileSprite(0, 100, 0, 0, "mt_mid");
    this.mt_mid.setOrigin(0, 0);
    this.mt_front = this.add.tileSprite(0, 500, 0, 0, "mt_front");
    this.mt_front.setOrigin(0, 0);

    /*this.apple = this.add.image(this.scale.width / 2 - 100, this.scale.height / 2, "apple");
    this.pear = this.add.image(this.scale.width / 2, this.scale.height / 2, "pear");
    this.apple.setScale(0.05);
    this.pear.setScale(0.05); */

    //this.golem = this.add.sprite(this.scale.width / 2 - 100, this.scale.height / 2, "golem");
    /* this.anims.create({
      key: "golem_anim",
      frames: this.anims.generateFrameNumbers("golem", {}),
      frameRate: 50,
      repeat: -1
    });
    this.anims.create({
      key: "golem_die_anim", 
      frames: this.anims.generateFrameNumbers("golemDie", {}),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true
    }); */

    //this.golem.play("golem_anim");

    //this.golem.setInteractive();

    //this.input.on('gameobjectdown', this.destroyGolem, this);

    /* this.ship1.setScale(2);
    this.ship1.flipY = true; */


    this.add.text(20, 20, "Playing game", {font: "25px Arial", fill: "yellow"});
  }

  /* moveShip(ship, speed) {
    ship.y += speed;
    if (ship.y > this.scale.height) {
      this.resetShipPos(ship);
    }
  } */

  /* resetShipPos(ship) {
    ship.y = 0;
    var randomX = Phaser.Math.Between(0, this.scale.width);
    ship.x = randomX;
  } */

  /* destroyGolem(pointer, gameObject) {
    gameObject.setTexture("golemDie");
    gameObject.play("golem_die_anim");
  } */

  update() {
    /* this.moveShip(this.ship1, 1);
    this.moveShip(this.ship2, 2);
    this.moveShip(this.ship3, 3); */
    //this.moveShip(this.golem, 3); 
    this.mt_back.tilePositionX += 2;
    this.mt_mid.tilePositionX += 3;
    this.mt_front.tilePositionX += 4;
  }
}
