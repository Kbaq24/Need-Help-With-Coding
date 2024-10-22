import Level1 from './Level1.js';
import Level2 from './Level2.js';
import Level3 from './Level3.js';
import Level4 from './Level4.js';
import Level5 from './Level5.js';

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [Level1, Level2, Level3, Level4, Level5],
    physics: {
        default: 'arcade',
        arcade: { debug: false }
    }
};

let game = new Phaser.Game(config);

document.getElementById("startButton").addEventListener("click", function () {
    this.classList.add("hidden");
    game.scene.start('Level1');
});
