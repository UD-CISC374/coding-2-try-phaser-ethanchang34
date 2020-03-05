import { GameObjects } from 'phaser';

export default class WinScene extends Phaser.Scene {
    winBackground: Phaser.GameObjects.Image;

    constructor() {
        super({ key: 'WinScene' });
    }

    create() {
        this.winBackground = this.add.image(400, 250, "aincrad");

        this.add.text(300, 300, "YOU WIN!!!", {font: "40px Arial", fill: "black"});
    }
}