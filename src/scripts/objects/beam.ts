export default class Beam extends Phaser.Physics.Arcade.Sprite {
    body: Phaser.Physics.Arcade.Body;

    constructor(scene, x, y, ) {        
        super(scene, x, y, "beam");
        scene.add.existing(this);
        scene.projectiles.add(this);

        this.play("beam_anim");
        scene.physics.world.enableBody(this);
        this.body.velocity.x = 450;
        this.angle += 90;
    }

    update() {
        if (this.x > 750) {
            this.destroy();
        }
    }
}