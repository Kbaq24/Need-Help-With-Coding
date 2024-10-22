export default class Level5 extends Phaser.Scene {
    constructor() {
        super('Level5');
        this.part = 1;
    }

    preload() {
        this.load.image('background5', 'assets/background5.png');
        this.load.audio('bgMusic5', 'assets/bgMusic5.mp3');
    }

    create() {
        this.add.image(400, 300, 'background5');

        let startButton = this.add.text(400, 300, 'Start Level 5', { fontSize: '32px', fill: '#ffffff' }).setOrigin(0.5);
        startButton.setInteractive();

        startButton.on('pointerdown', () => {
            startButton.destroy();
            this.startGame();
        });
    }

    startGame() {
        this.bgMusic = this.sound.add('bgMusic5', { loop: true });
        this.bgMusic.play();

        this.storyText = this.add.text(400, 50, 'Level 5: The Final Defense', { fontSize: '24px', fill: '#ffffff' }).setOrigin(0.5);
        this.updateStory('The attackers are relentless, but the firewall is your last line of defense. Ensure it remains impregnable.');

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
                this.updateStory('Your first task:');
                prompts = ['Enhance Encryption', 'Disable Firewall', 'Allow All Traffic'];
                explanations = [
                    'Correct! Strong encryption ensures data protection.',
                    'Incorrect. Disabling the firewall leaves the system vulnerable.',
                    'Incorrect. Allowing all traffic opens the network to attacks.'
                ];
                storyUpdate = 'Encryption enhanced. Attackers struggle to penetrate the defenses.';
                break;
            case 2:
                this.updateStory('Next task:');
                prompts = ['Activate Intrusion Prevention System', 'Ignore Alerts', 'Shut Down Firewall'];
                explanations = [
                    'Correct! IPS helps stop ongoing attacks.',
                    'Incorrect. Ignoring alerts allows attackers to move undetected.',
                    'Incorrect. Shutting down the firewall leaves the network exposed.'
                ];
                storyUpdate = 'IPS active. Attacks being neutralized.';
                break;
            case 3:
                this.updateStory('Defense strategy required:');
                prompts = ['Limit SSH Access', 'Open All Ports', 'Disable Security Logs'];
                explanations = [
                    'Correct! Limiting SSH reduces entry points for attackers.',
                    'Incorrect. Opening all ports invites attackers.',
                    'Incorrect. Disabling logs removes critical security data.'
                ];
                storyUpdate = 'SSH access limited. Attackers finding fewer vulnerabilities.';
                break;
            case 4:
                this.updateStory('Final preparations:');
                prompts = ['Monitor Network Logs', 'Ignore Suspicious Activity', 'Allow External IPs'];
                explanations = [
                    'Correct! Monitoring logs helps detect new threats.',
                    'Incorrect. Ignoring activity can lead to a breach.',
                    'Incorrect. Allowing external IPs increases vulnerability.'
                ];
                storyUpdate = 'Network logs reveal ongoing attempts. Defense is holding.';
                break;
            case 5:
                this.updateStory('Final step to secure Level 5:');
                prompts = ['Enable Automated Security Updates', 'Do Nothing', 'Allow All IPs'];
                explanations = [
                    'Correct! Automated updates ensure the system is always secure.',
                    'Incorrect. Doing nothing leaves vulnerabilities unpatched.',
                    'Incorrect. Allowing all IPs opens the network to attackers.'
                ];
                storyUpdate = 'Level 5 secured! You have successfully defended the network.';
                break;
            default:
                this.bgMusic.stop();
                this.scene.start('Level1'); // Restart game or move to final congratulations scene
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
