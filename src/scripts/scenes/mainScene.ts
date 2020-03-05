import { GameObjects } from 'phaser';
import Beam from '../objects/beam';
import Explosion from '../objects/explosion';

export default class MainScene extends Phaser.Scene {
  mt_back: Phaser.GameObjects.TileSprite;
  mt_mid: Phaser.GameObjects.TileSprite;
  mt_front: Phaser.GameObjects.TileSprite;

  apple: Phaser.Physics.Arcade.Image;
  pear: Phaser.Physics.Arcade.Image;
  ruby: Phaser.Physics.Arcade.Image;
  powerUps: Phaser.GameObjects.Group;

  ship: Phaser.GameObjects.Sprite;
  ship2: Phaser.GameObjects.Sprite;
  ship3: Phaser.GameObjects.Sprite;
  enemies: Phaser.Physics.Arcade.Group;

  player: Phaser.Physics.Arcade.Sprite;
  cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  spacebar: Phaser.Input.Keyboard.Key;
  projectiles: Phaser.GameObjects.Group;

  scoreLabel: GameObjects.BitmapText;
  score: number;

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
    this.cursorKeys = this.input.keyboard.createCursorKeys(); //Allows user to control 'player'
    this.player.setCollideWorldBounds(true);

    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.projectiles = this.add.group({
      classType: Beam,
      maxSize: 15,
      runChildUpdate: true
    });


    //Collectibles
    //Apple, pear, and ruby will bounce arond the map
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
    //3 enemy ships
    this.ship = this.add.sprite(this.scale.width - 30, this.scale.height / 2 + 30, "ship");
    this.ship2 = this.add.sprite(this.scale.width - 30, this.scale.height / 2 - 30, "ship2");
    this.ship3 = this.add.sprite(this.scale.width - 30, this.scale.height / 2 + 60, "ship3");
    this.ship.setScale(2);
    this.ship2.setScale(1.5);
    this.ship3.setScale(1);
    this.ship.angle += 90;
    this.ship2.angle += 90;
    this.ship3.angle += 90;

    //Ship animations
    this.ship.play("ship_anim");
    this.ship2.play("ship2_anim");
    this.ship3.play("ship3.anim");

    this.enemies = this.physics.add.group();
    this.enemies.add(this.ship);
    this.enemies.add(this.ship2);
    this.enemies.add(this.ship3);

    //Interactives & Physics
    this.powerUps = this.add.group();
    //Projectiles knock back powerups
    this.physics.add.collider(this.projectiles, this.powerUps, function(projectile, powerUp) {
      projectile.destroy();
    });
    //Player can pick up powerups
    this.physics.add.overlap(this.player, this.powerUps, this.pickPowerUp, undefined, this);
    //Player gets hurt when running into enemies
    this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, undefined, this);
    //Projectiles destroy enemies
    this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, undefined, this);

    
    let maxObjects = 4;
    for (let i = 0; i <= maxObjects; i++) { // Loads in powerups and makes the bounce around the map
      let powerUp = this.physics.add.sprite(16, 16, "power-up");
      powerUp.setScale(1.5);
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
    }

    this.powerUps.add(this.apple)
    this.powerUps.add(this.pear);
    this.powerUps.add(this.ruby);
  
    //Displays the score at the top
    let graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    graphics.beginPath();
    graphics.moveTo(0, 0);
    graphics.lineTo(this.scale.width, 0);
    graphics.lineTo(this.scale.width, 20);
    graphics.lineTo(0, 20);
    graphics.lineTo(0, 0);
    graphics.closePath();
    graphics.fillPath();
    this.score = 0;
    let scoreFormated = this.zeroPad(this.score, 6);
    this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", "SCORE " + scoreFormated, 16);
    this.add.text(10, 20, "Playing game...", {font: "12px Arial", fill: "black"});
    this.add.text(10, 40, "Reach 3000 points for boss", {font: "12px Arial", fill: "black"});
  }

  /*Moves the objects in the x direction at a given speed
    Takes arguments(obj, speed)
    obj = image/sprite/tilesprite to be moved
    speed = how fast to set the obj moving along the x direction
  */
  move(obj, speed) { 
    obj.x += speed;
    if (obj.x < 0) {
      this.resetPos(obj);
    }
  }

  /*Randomly resets the position of the object
    Takes arguments(obj)
    obj = takes the image/sprite and places it at a fixed x distance but random y distance on the screen
  */
  resetPos(obj) {
    obj.x = this.scale.width - 10;
    let randomY = Phaser.Math.Between(0, this.scale.height);
    obj.y = randomY;
  }

  /*Reset player's position to a certain point on the screen when hurt
    Sets the player to be invulnerable for a short period of time
    Takes no arguments
  */
  resetPlayer() {
    let x = this.scale.width / 2 - 64;
    let y = this.scale.width / 2 - 24;
    this.player.enableBody(true, x, y, true, true);
    this.player.alpha = 0.5;
    let tween = this.tweens.add({
      targets: this.player,
      y: this.scale.height - 100,
      ease: 'Power1',
      duration: 1500,
      repeat: 0,
      onComplete: () => {
        this.player.alpha = 1;
      },
      callbackScope: this
    });
  }

  /*Creates a beam object
    Takes no arguments
  */
  shootBeam() {
    let beam = new Beam(this, this.player.x, this.player.y);
  }

  /*Adds 250 points when a player picks up/collides with a powerup
    Checks to see is the condition for boss battle is true
    Takes arguements(player powerUp)
    player = the sprite that the player controls
    powerUp = an image/sprite in the 'powerUp' group
  */
  pickPowerUp(player, powerUp) {
    this.score += 250
    let scoreFormated = this.zeroPad(this.score, 6);
    this.scoreLabel.text = "SCORE " + scoreFormated;
    powerUp.disableBody(true, true);
    if (this.score >= 3000) { //boss battle
      this.scene.start('BossScene');
    }
  }

  /*When the player gets hurt, the score resets and the position is reset
    Takes arguments(player, enemy)
    player = the sprite that the player controls
    enemy = the sprite in the 'enemies' group
  */
  hurtPlayer(player, enemy) {
    if (this.player.alpha < 1) {
      return;
    }
    let explosion = new Explosion(this, player.x, player.y);
    player.disableBody(true, true);
    this.time.addEvent({
      delay: 1000,
      callback: this.resetPlayer,
      callbackScope: this,
      loop: false
    });
    this.score = 0;
    let scoreFormated = this.zeroPad(this.score, 6);
    this.scoreLabel.text = "SCORE " + scoreFormated;
    this.resetPos(enemy);
  }

  /*When a projectile hits an enemy, the enemy dies and respawns
    Also adds 100 points to score
    Checks for boss battle condition
    Takes arguments(projectile, enemy)
    projectile = the sprite in the 'projectile' group
    enemy = the sprite in the 'enemies' group
  */
  hitEnemy(projectile, enemy) {
    projectile.destroy();
    let explosion = new Explosion(this, enemy.x, enemy.y);
    this.resetPos(enemy);
    this.score += 100;
    let scoreFormated = this.zeroPad(this.score, 6);
    this.scoreLabel.text = "SCORE " + scoreFormated;
    if (this.score >= 3000) { //boss battle
      this.scene.start('BossScene');
    }
  }

  /*Makes score look retro
    Adds zeroes before the actual score
  */
  zeroPad(number, size) {
    let stringNumber = String(number);
    while (stringNumber.length < (size || 2)) {
      stringNumber = "0" + stringNumber;
    }
    return stringNumber;
  }

  update() {
    this.move(this.ship, -4);
    this.move(this.ship2, -4);
    this.move(this.ship3, -4);

    this.mt_back.tilePositionX += 2;
    this.mt_mid.tilePositionX += 3;
    this.mt_front.tilePositionX += 4;

    this.movePlayerManager();

    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      if (this.player.active) {
        this.shootBeam();
      }
    }
  }

  //Takes keyboard input and converts it to 'player' movement
  movePlayerManager() {
    if (this.cursorKeys.left?.isDown) {
      this.player.setVelocityX(-200);
    } else if (this.cursorKeys.right?.isDown) {
      this.player.setVelocityX(200);
    } else {
      this.player.setVelocityX(0);
    }
    if (this.cursorKeys.up?.isDown) {
      this.player.setVelocityY(-200);
    } else if (this.cursorKeys.down?.isDown) {
      this.player.setVelocityY(200);
    } else {
      this.player.setVelocityY(0);
    }
  }
}
