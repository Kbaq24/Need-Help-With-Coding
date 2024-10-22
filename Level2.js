export default class Level2 extends Phaser.Scene {
    constructor() {
        super('Level2');
        this.part = 1;
    }

    preload() {
        this.load.image('background2', 'assets/background2.png');
        this.load.audio('bgMusic2', 'assets/bgMusic2.mp3');
    }

    create() {
        this.add.image(400, 300, 'background2');

        let startButton = this.add.text(400, 300, 'Start Level 2', { fontSize: '32px', fill: '#ffffff' }).setOrigin(0.5);
        startButton.setInteractive();

        startButton.on('pointerdown', () => {
            startButton.destroy();
            this.startGame();
        });
    }

    startGame() {
        this.bgMusic = this.sound.add('bgMusic2', { loop: true });
        this.bgMusic.play();

        this.storyText = this.add.text(400, 50, 'Level 2: The HTTP Maze', { fontSize: '24px', fill: '#ffffff' }).setOrigin(0.5);
        this.updateStory('Navigate the maze by allowing HTTP traffic and denying SSH access.');

        this.showPart();
    }

    updateStory(text) {
        if (this.storyContent) this.storyContent.destroy();
        this.storyContent = this.add.text(400, 90, text, { fontSize: '18px', fill: '#ffffff', align: 'center', wordWrap: { width: 700 } }).setOrigin(0.5);
    }

    showPart() {
        if (this.options) {
            this.options.forEach(option => option.destroy());
        }
        if (this.feedbackText) this.feedbackText.destroy();

        let prompts = [];
        let explanations = [];
        let storyUpdate = '';

        switch (this.part) {
            case 1:
                this.updateStory('First decision:');
                prompts = ['Allow HTTP Traffic', 'Allow SSH Traffic', 'Block All Traffic'];
                explanations = [
                    'Correct! HTTP traffic is essential for web services.',
                    'Incorrect. SSH access can be exploited by attackers.',
                    'Incorrect. Blocking all traffic halts all services.'
                ];
                storyUpdate = 'HTTP traffic allowed. SSH attempts detected.';
                break;
            case 2:
                this.updateStory('Next move:');
                prompts = ['Deny SSH Traffic', 'Allow All Traffic', 'Ignore SSH Attempts'];
                explanations = [
                    'Correct! Denying SSH secures remote access points.',
                    'Incorrect. Allowing all traffic invites threats.',
                    'Incorrect. Ignoring attempts risks a breach.'
                ];
                storyUpdate = 'SSH traffic denied. Anomalies in logs detected.';
                break;
            // Continue for parts 3 to 5...
            case 5:
                this.updateStory('Final decision for Level 2:');
                prompts = ['Implement Traffic Monitoring', 'Disable Firewall', 'Open All Ports'];
                explanations = [
                    'Correct! Monitoring helps detect ongoing threats.',
                    'Incorrect. Disabling firewall removes protections.',
                    'Incorrect. Opening all ports exposes the network.'
                ];
                storyUpdate = 'Level 2 completed! Moving to Level 3...';
                break;
            default:
                this.bgMusic.stop();
                this.scene.start('Level3');
                return;
        }

        this.options = prompts.map((text, index) => {
            let option = this.add.text(400, 200 + index * 50, text, { fontSize: '24px', fill: '#0f0' }).setOrigin(0.5).setInteractive();
            option.on('pointerdown', () => {
                this.handleChoice(index, explanations[index], storyUpdate);
            });
            return option;
        });
    }

    handleChoice(index, explanation, storyUpdate) {
        if (this.feedbackText) this.feedbackText.destroy();
        let isCorrect = (index === 0);

        this.feedbackText = this.add.text(400, 400, explanation, { fontSize: '20px', fill: isCorrect ? '#00ff00' : '#ff0000', wordWrap: { width: 700 } }).setOrigin(0.5);

        if (isCorrect) {
            this.part += 1;
            if (this.part <= 5) {
                this.time.delayedCall(3000, () => {
                    this.updateStory(storyUpdate);
                    this.showPart();
                });
            } else {
                this.time.delayedCall(3000, () => {
                    this.updateStory(storyUpdate);
                    this.showPart();
                });
            }
        }
    }
}


