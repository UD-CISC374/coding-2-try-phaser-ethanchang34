import ExampleObject from '../objects/exampleObject';
import { GameObjects } from 'phaser';

export default class MainScene extends Phaser.Scene {
  background: Phaser.GameObjects.TileSprite;
/*   ship1: Phaser.GameObjects.Image;
  ship2: Phaser.GameObjects.Image;
  ship3: Phaser.GameObjects.Image; */
  golem: Phaser.GameObjects.Sprite;
  golemDie: Phaser.GameObjects.Sprite;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.background = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, "background");
    this.background.setOrigin(0, 0);

    /* this.ship1 = this.add.image(this.scale.width / 2 - 50, this.scale.height / 2, "ship");
    this.ship2 = this.add.image(this.scale.width / 2, this.scale.height / 2, "ship2");
    this.ship3 = this.add.image(this.scale.width / 2 + 50, this.scale.height / 2, "ship3"); */
    this.golem = this.add.sprite(this.scale.width / 2 - 100, this.scale.height / 2, "golem");

    this.anims.create({
      key: "golem_anim",
      frames: this.anims.generateFrameNumbers("golem"),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "golem_die_anim", 
      frames: this.anims.generateFrameNumbers("golemDie"),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true
    });

    this.golem.play("golem_anim");

    this.golem.setInteractive();

    this.input.on('gameobjectdown', this.destroyGolem, this);

    /* this.ship1.setScale(2);
    this.ship1.flipY = true; */


    this.add.text(20, 20, "Playing game", {font: "25px Arial", fill: "yellow"});
  }

  moveShip(ship, speed) {
    ship.y += speed;
    if (ship.y > this.scale.height) {
      this.resetShipPos(ship);
    }
  }

  resetShipPos(ship) {
    ship.y = 0;
    var randomX = Phaser.Math.Between(0, this.scale.width);
    ship.x = randomX;
  }

  destroyGolem(pointer, gameObject) {
    gameObject.setTexture("golemDie");
    gameObject.play("golem_die_anim");
  }

  update() {
    /* this.moveShip(this.ship1, 1);
    this.moveShip(this.ship2, 2);
    this.moveShip(this.ship3, 3); */
    this.moveShip(this.golem, 3); 
    this.background.tilePositionY -= 0.5;
  }
}
