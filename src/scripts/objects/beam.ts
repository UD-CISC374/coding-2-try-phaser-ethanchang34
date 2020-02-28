//export default class Beam extends Phaser.GameObjects.Sprite {
export default class Beam extends Phaser.Physics.Arcade.Sprite {
    body: Phaser.Physics.Arcade.Body;

    constructor(scene) {        
        var x = scene.player.x;
        var y = scene.player.y;
        super(scene, x, y, "beam");
        scene.projectiles.add(this);

        this.play("beam_anim");
        scene.physics.world.enableBody(this);
        this.body.velocity.x = 250;
    }

    update() {
        if (this.x > 750) {
            this.destroy();
        }
    }
}