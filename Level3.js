export default class Level3 extends Phaser.Scene {
    constructor() {
        super({ key: 'Level3' });
    }

    preload() {
        this.load.image('background3', 'assets/background3.png');
        this.load.audio('bgMusic3', 'assets/bgMusic3.mp3');
    }

    create() {
        this.add.image(400, 300, 'background3').setOrigin(0.5, 0.5);
        this.music = this.sound.add('bgMusic3');
        this.music.play();

        this.storyText = this.add.text(50, 50, 'Level 3: Advanced security protocols activated!', { fontSize: '20px', fill: '#fff' });

        this.part = 1;
        this.setupPrompts();
    }

    setupPrompts() {
        let feedbackText = this.add.text(100, 350, '', { fontSize: '20px', fill: '#fff' });

        if (this.part === 1) {
            let option1 = this.add.text(100, 150, 'Enable IDS', { fontSize: '24px', fill: '#0f0' });
            let option2 = this.add.text(100, 200, 'Allow All Traffic', { fontSize: '24px', fill: '#f00' });
            let option3 = this.add.text(100, 250, 'Block All Ports', { fontSize: '24px', fill: '#00f' });

            option1.setInteractive();
            option1.on('pointerdown', () => {
                feedbackText.setText("Correct! Enabling IDS provides deeper monitoring.");
                this.part += 1;
                this.time.delayedCall(2000, () => { this.nextPart(); });
            });

            option2.setInteractive();
            option2.on('pointerdown', () => {
                feedbackText.setText("Allowing all traffic exposes the network.");
            });

            option3.setInteractive();
            option3.on('pointerdown', () => {
                feedbackText.setText("Blocking all ports may disrupt services.");
            });
        }
    }

    nextPart() {
        if (this.part === 2) {
            this.children.removeAll();
            this.storyText.setText('Level 3: Protecting critical infrastructure.');

            let feedbackText = this.add.text(100, 350, '', { fontSize: '20px', fill: '#fff' });
            let option1 = this.add.text(100, 150, 'Implement VPN', { fontSize: '24px', fill: '#0f0' });
            let option2 = this.add.text(100, 200, 'Allow Remote Access', { fontSize: '24px', fill: '#f00' });

            option1.setInteractive();
            option1.on('pointerdown', () => {
                feedbackText.setText("Correct! VPNs enhance remote access security.");
                this.part += 1;
                this.time.delayedCall(2000, () => { this.nextPart(); });
            });

            option2.setInteractive();
            option2.on('pointerdown', () => {
                feedbackText.setText("Remote access without VPN is risky.");
            });
        }

        if (this.part === 6) {
            this.scene.start('Level4');
        }
    }
}
