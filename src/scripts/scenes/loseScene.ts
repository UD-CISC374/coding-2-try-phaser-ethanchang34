import { GameObjects } from 'phaser';

export default class LoseScene extends Phaser.Scene {
    loseBackground: Phaser.GameObjects.Image;

    constructor() {
        super({ key: 'LoseScene' });
    }

    create() {
        this.loseBackground = this.add.image(400, 250, "anime_girl");

        this.add.text(300, 300, "you lose ;(", {font: "40px Arial", fill: "black"});
    }
}