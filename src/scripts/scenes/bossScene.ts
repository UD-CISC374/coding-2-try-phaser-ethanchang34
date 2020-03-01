import { GameObjects } from 'phaser';
import Beam from '../objects/beam';
import Explosion from '../objects/explosion';

export default class BossScene extends Phaser.Scene {
    mt_back: Phaser.GameObjects.TileSprite;
    mt_mid: Phaser.GameObjects.TileSprite;
    mt_front: Phaser.GameObjects.TileSprite;

    // boss: Phaser.GameObjects.Sprite;
    boss: Phaser.Physics.Arcade.Sprite;
    enemies: Phaser.Physics.Arcade.Group;
    player: Phaser.Physics.Arcade.Sprite;
    cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
    spacebar: Phaser.Input.Keyboard.Key;
    projectiles: Phaser.GameObjects.Group;
   
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

        //Interactions
        this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, undefined, this);
        this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, undefined, this);
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

    hurtPlayer(player, enemy) {
        let explosion = new Explosion(this, player.x, player.y);
        player.x = 100;
        player.y = this.scale.height / 2;
    }

    hitEnemy(projectile, enemy) {
        projectile.destroy();
        let explosion = new Explosion(this, enemy.x + Math.random()*128 - 64, enemy.x + Math.random()*128 - 64);
        
    }

    update() {
        this.mt_back.tilePositionX += 2;
        this.mt_mid.tilePositionX += 3;
        this.mt_front.tilePositionX += 4;

        this.moveBoss(this.boss);
        this.movePlayerManager();
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