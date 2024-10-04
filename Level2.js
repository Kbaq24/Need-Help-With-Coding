export default class Level2 extends Phaser.Scene {
    constructor() {
        super({ key: 'Level2' });
        this.failedAttempts = 0;
        this.hintShown = false;
    }

    preload() {
        this.load.image('background', 'assets/background2.png');
        this.load.audio('bgMusic', 'assets/bgMusic2.mp3');
        this.load.audio('success', 'assets/success.mp3');
        this.load.audio('failure', 'assets/failure.mp3');
        this.load.audio('hint', 'assets/hint.mp3');
    }

    create() {
        this.add.image(400, 300, 'background');
        this.bgMusic = this.sound.add('bgMusic', { loop: true });
        this.bgMusic.play();

        let storyText = this.add.text(100, 100, 'Level 2: Allow HTTP Traffic and Deny SSH.', { fontSize: '20px', fill: '#fff' });

        let allowHTTP = this.add.text(100, 200, 'Allow HTTP (Port 80)', { fontSize: '24px', fill: '#0f0' })
            .setInteractive()
            .on('pointerdown', () => this.handleSuccess());

        let denySSH = this.add.text(100, 300, 'Deny SSH (Port 22)', { fontSize: '24px', fill: '#f00' })
            .setInteractive()
            .on('pointerdown', () => this.handleFailure());
    }

    handleSuccess() {
        this.sound.play('success');
        this.add.text(100, 400, 'HTTP Traffic Allowed!', { fontSize: '18px', fill: '#0f0' });
        this.bgMusic.stop();
        this.time.delayedCall(2000, () => {
            this.scene.start('Level3');
        });
    }

    handleFailure() {
        this.failedAttempts++;
        this.sound.play('failure');
        this.add.text(100, 400, 'Incorrect! You should allow HTTP traffic.', { fontSize: '18px', fill: '#f00' });

        if (this.failedAttempts >= 3 && !this.hintShown) {
            this.showHint();
        }
    }

    showHint() {
        this.hintShown = true;
        this.sound.play('hint');
        this.add.text(100, 450, 'Hint: Allow HTTP (Port 80) to enable web browsing.', { fontSize: '18px', fill: '#ff0' });
    }
}


