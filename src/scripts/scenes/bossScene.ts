import { GameObjects } from 'phaser';
import Beam from '../objects/beam';
import BossBeam from '../objects/BossBeam';
import Explosion from '../objects/explosion';

export default class BossScene extends Phaser.Scene {
    mt_back: Phaser.GameObjects.TileSprite;
    mt_mid: Phaser.GameObjects.TileSprite;
    mt_front: Phaser.GameObjects.TileSprite;

    boss: Phaser.Physics.Arcade.Sprite;
    enemies: Phaser.Physics.Arcade.Group;
    player: Phaser.Physics.Arcade.Sprite;
    cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
    spacebar: Phaser.Input.Keyboard.Key;
    projectiles: Phaser.GameObjects.Group;
    bossProjectiles: Phaser.GameObjects.Group;
    bossHealth: number = 25;
   
    scoreLabel: GameObjects.BitmapText;
    score: number;

    constructor() {
        super({ key: 'BossScene' });
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
            maxSize: 15,
            runChildUpdate: true
        });

        //Boss
        this.enemies = this.physics.add.group();
        this.boss = this.physics.add.sprite(this.scale.width - 50, this.scale.height / 2, "boss");
        this.enemies.add(this.boss);
        this.boss.setScale(1);
        this.boss.flipX = true;
        this.enemies.setVelocityY(-200);
        this.boss.setCollideWorldBounds(true);
        this.bossProjectiles = this.add.group({
            classType: BossBeam,
            maxSize: 20,
            runChildUpdate: true
        });

        //Interactions
        this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, undefined, this);
        this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, undefined, this);
        this.physics.add.overlap(this.bossProjectiles, this.player, this.hurtPlayer, undefined, this);
    
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
        this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", "Boss HP: " + this.bossHealth, 16);
    }
    
    resetPos(obj) {
        obj.x = this.scale.width - 10;
        let randomY = Phaser.Math.Between(0, this.scale.height);
        obj.y = randomY;
    }

    move(obj, speed) {
        obj.x += speed;
        if (obj.x < 0) {
          this.resetPos(obj);
        }
    }
    moveBoss(boss) {
        if (boss.y <= 80) {
            boss.setVelocityY(200);
        } else if (boss.y >= 420) {
            boss.setVelocityY(-200);
        }
    }

    shootBeam(shooter) {
        let beam = new Beam(this, shooter.x, shooter.y);
    }
    bossShoot(shooter) {
        let bossBeam = new BossBeam(this, shooter.x, shooter.y);
    }

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
        player.x = 100;
        player.y = this.scale.height / 2;
    }
    
    resetPlayer() {
        let x = 100;
        let y = this.scale.height / 2 - 50;
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

    hitEnemy(projectile, enemy) {
        projectile.destroy();
        this.bossHealth -= 1;
        this.scoreLabel.text = "Boss HP: " + this.bossHealth;
        let explosion = new Explosion(this, enemy.x + Math.random()*128 - 64, enemy.x + Math.random()*128 - 64);
        if (this.bossHealth <= 0) {
            this.scene.start('WinScene');
        }
    }

    update() {
        this.mt_back.tilePositionX += 2;
        this.mt_mid.tilePositionX += 3;
        this.mt_front.tilePositionX += 4;

        this.moveBoss(this.boss);
        this.movePlayerManager();
        this.bossShoot(this.boss);
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.shootBeam(this.player);
        }
    }

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