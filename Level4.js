export default class Level4 extends Phaser.Scene {
    constructor() {
        super({ key: 'Level4' });
        this.failedAttempts = 0;
        this.hintShown = false;
    }

    preload() {
        this.load.image('background', 'assets/background4.png');
        this.load.audio('bgMusic', 'assets/bgMusic4.mp3');
        this.load.audio('success', 'assets/success.mp3');
        this.load.audio('failure', 'assets/failure.mp3');
        this.load.audio('hint', 'assets/hint.mp3');
    }

    create() {
        this.add.image(400, 300, 'background');
        this.bgMusic = this.sound.add('bgMusic', { loop: true });
        this.bgMusic.play();

        let storyText = this.add.text(100, 100, 'Level 4: Analyze Logs and Block Suspicious IPs.', { fontSize: '20px', fill: '#fff' });

        let analyzeLogsButton = this.add.text(100, 200, 'Analyze Logs', { fontSize: '24px', fill: '#0f0' })
            .setInteractive()
            .on('pointerdown', () => this.handleSuccess());

        let blockIPButton = this.add.text(100, 300, 'Block Suspicious IP', { fontSize: '24px', fill: '#f00' })
            .setInteractive()
            .on('pointerdown', () => this.handleFailure());
    }

    handleSuccess() {
        this.sound.play('success');
        this.add.text(100, 400, 'Correct! Suspicious IP blocked.', { fontSize: '18px', fill: '#0f0' });
        this.bgMusic.stop();
        this.time.delayedCall(2000, () => {
            this.scene.start('Level5');
        });
    }

    handleFailure() {
        this.failedAttempts++;
        this.sound.play('failure');
        this.add.text(100, 400, 'Incorrect! You should block suspicious IP addresses.', { fontSize: '18px', fill: '#f00' });

        if (this.failedAttempts >= 3 && !this.hintShown) {
            this.showHint();
        }
    }

    showHint() {
        this.hintShown = true;
        this.sound.play('hint');
        this.add.text(100, 450, 'Hint: Suspicious IPs often show irregular activity in the logs.', { fontSize: '18px', fill: '#ff0' });
    }
}

