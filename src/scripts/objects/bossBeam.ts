export default class Beam extends Phaser.Physics.Arcade.Sprite {
    body: Phaser.Physics.Arcade.Body;

    constructor(scene, x, y) {        
        super(scene, x, y, "beam");
        scene.add.existing(this);
        scene.bossProjectiles.add(this);

        this.play("beam_anim");
        scene.physics.world.enableBody(this);
        this.body.velocity.x = -400;
        // this.body.velocity.y = -200
        this.angle -= 90;
    }

    update() {
        if (this.x < 50) {
            this.destroy();
        }
    }
}