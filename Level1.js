export default class Level1 extends Phaser.Scene {
    constructor() {
        super({ key: 'Level1' });
        this.failedAttempts = 0;
        this.hintShown = false;
    }

    preload() {
        this.load.image('background', 'assets/background1.png');
        this.load.audio('bgMusic', 'assets/bgMusic1.mp3');
        this.load.audio('success', 'assets/success.mp3');
        this.load.audio('failure', 'assets/failure.mp3');
        this.load.audio('hint', 'assets/hint.mp3');
    }

    create() {
        this.add.image(400, 300, 'background');
        this.bgMusic = this.sound.add('bgMusic', { loop: true });
        this.bgMusic.play();

        let storyText = this.add.text(100, 100, 'Level 1: Install Firewall and Block Incoming Traffic.', { fontSize: '20px', fill: '#fff' });

        let installButton = this.add.text(100, 200, 'Install Firewall', { fontSize: '24px', fill: '#0f0' })
            .setInteractive()
            .on('pointerdown', () => this.handleSuccess());

        let blockButton = this.add.text(100, 300, 'Block Incoming Traffic', { fontSize: '24px', fill: '#f00' })
            .setInteractive()
            .on('pointerdown', () => this.handleFailure());
    }

    handleSuccess() {
        this.sound.play('success');
        this.add.text(100, 400, 'Firewall Installed and Traffic Blocked!', { fontSize: '18px', fill: '#0f0' });
        this.bgMusic.stop();
        this.time.delayedCall(2000, () => {
            this.scene.start('Level2');
        });
    }

    handleFailure() {
        this.failedAttempts++;
        this.sound.play('failure');
        this.add.text(100, 400, 'Incorrect! Try again.', { fontSize: '18px', fill: '#f00' });

        if (this.failedAttempts >= 3 && !this.hintShown) {
            this.showHint();
        }
    }

    showHint() {
        this.hintShown = true;
        this.sound.play('hint');
        this.add.text(100, 450, 'Hint: Block incoming traffic to protect the network.', { fontSize: '18px', fill: '#ff0' });
    }
}

