export default class Level5 extends Phaser.Scene {
    constructor() {
        super({ key: 'Level5' });
        this.failedAttempts = 0;
        this.hintShown = false;
    }

    preload() {
        this.load.image('background', 'assets/background5.png');
        this.load.audio('bgMusic', 'assets/bgMusic5.mp3');
        this.load.audio('success', 'assets/success.mp3');
        this.load.audio('failure', 'assets/failure.mp3');
        this.load.audio('hint', 'assets/hint.mp3');
    }

    create() {
        this.add.image(400, 300, 'background');
        this.bgMusic = this.sound.add('bgMusic', { loop: true });
        this.bgMusic.play();

        let storyText = this.add.text(100, 100, 'Level 5: Audit and Refine Firewall Rules.', { fontSize: '20px', fill: '#fff' });

        let auditRulesButton = this.add.text(100, 200, 'Audit Rules', { fontSize: '24px', fill: '#0f0' })
            .setInteractive()
            .on('pointerdown', () => this.handleSuccess());

        let refineRulesButton = this.add.text(100, 300, 'Refine Rules', { fontSize: '24px', fill: '#f00' })
            .setInteractive()
            .on('pointerdown', () => this.handleFailure());
    }

    handleSuccess() {
        this.sound.play('success');
        this.add.text(100, 400, 'Correct! Rules have been audited and refined.', { fontSize: '18px', fill: '#0f0' });
        this.bgMusic.stop();
        this.add.text(100, 450, 'Congratulations! You have successfully managed the firewall.', { fontSize: '20px', fill: '#0f0' });
    }

    handleFailure() {
        this.failedAttempts++;
        this.sound.play('failure');
        this.add.text(100, 400, 'Incorrect! Auditing rules helps maintain security.', { fontSize: '18px', fill: '#f00' });

        if (this.failedAttempts >= 3 && !this.hintShown) {
            this.showHint();
        }
    }

    showHint() {
        this.hintShown = true;
        this.sound.play('hint');
        this.add.text(100, 450, 'Hint: Regularly auditing and refining rules is essential for firewall maintenance.', { fontSize: '18px', fill: '#ff0' });
    }
}
