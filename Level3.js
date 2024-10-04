export default class Level3 extends Phaser.Scene {
    constructor() {
        super({ key: 'Level3' });
        this.failedAttempts = 0;
        this.hintShown = false;
    }

    preload() {
        this.load.image('background', 'assets/background3.png');
        this.load.audio('bgMusic', 'assets/bgMusic3.mp3');
        this.load.audio('success', 'assets/success.mp3');
        this.load.audio('failure', 'assets/failure.mp3');
        this.load.audio('hint', 'assets/hint.mp3');
    }

    create() {
        this.add.image(400, 300, 'background');
        this.bgMusic = this.sound.add('bgMusic', { loop: true });
        this.bgMusic.play();

        let storyText = this.add.text(100, 100, 'Level 3: Configure Stateful Rules and Set Up NAT.', { fontSize: '20px', fill: '#fff' });

        let statefulButton = this.add.text(100, 200, 'Configure Stateful Rule', { fontSize: '24px', fill: '#0f0' })
            .setInteractive()
            .on('pointerdown', () => this.handleSuccess());

        let natButton = this.add.text(100, 300, 'Set Up NAT', { fontSize: '24px', fill: '#f00' })
            .setInteractive()
            .on('pointerdown', () => this.handleFailure());
    }

    handleSuccess() {
        this.sound.play('success');
        this.add.text(100, 400, 'Correct! Stateful rule configured.', { fontSize: '18px', fill: '#0f0' });
        this.bgMusic.stop();
        this.time.delayedCall(2000, () => {
            this.scene.start('Level4');
        });
    }

    handleFailure() {
        this.failedAttempts++;
        this.sound.play('failure');
        this.add.text(100, 400, 'Incorrect! Stateful rules are essential for tracking connections.', { fontSize: '18px', fill: '#f00' });

        if (this.failedAttempts >= 3 && !this.hintShown) {
            this.showHint();
        }
    }

    showHint() {
        this.hintShown = true;
        this.sound.play('hint');
        this.add.text(100, 450, 'Hint: Stateful rules track active connections and help secure NAT.', { fontSize: '18px', fill: '#ff0' });
    }
}


