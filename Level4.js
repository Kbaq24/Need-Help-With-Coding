export default class Level4 extends Phaser.Scene {
    constructor() {
        super('Level4');
        this.part = 1;
    }

    preload() {
        this.load.image('background4', 'assets/background4.png');
        this.load.audio('bgMusic4', 'assets/bgMusic4.mp3');
    }

    create() {
        this.add.image(400, 300, 'background4');

        let startButton = this.add.text(400, 300, 'Start Level 4', { fontSize: '32px', fill: '#ffffff' }).setOrigin(0.5);
        startButton.setInteractive();

        startButton.on('pointerdown', () => {
            startButton.destroy();
            this.startGame();
        });
    }

    startGame() {
        this.bgMusic = this.sound.add('bgMusic4', { loop: true });
        this.bgMusic.play();

        this.storyText = this.add.text(400, 50, 'Level 4: The Siege of Packets', { fontSize: '24px', fill: '#ffffff' }).setOrigin(0.5);
        this.updateStory('The firewall is now facing large-scale packet flooding attacks. Your mission is to filter out these malicious packets.');

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
                this.updateStory('First step in filtering packets:');
                prompts = ['Enable Flood Protection', 'Allow All Packets', 'Ignore Flooding'];
                explanations = [
                    'Correct! Flood protection prevents packet overload.',
                    'Incorrect. Allowing all packets lets malicious data in.',
                    'Incorrect. Ignoring flooding will lead to system failure.'
                ];
                storyUpdate = 'Flood protection enabled. System stabilizing.';
                break;
            case 2:
                this.updateStory('Next filtering decision:');
                prompts = ['Filter Suspicious Packets', 'Allow All Traffic', 'Disable All Filters'];
                explanations = [
                    'Correct! Filtering suspicious packets stops potential threats.',
                    'Incorrect. Allowing all traffic is dangerous during an attack.',
                    'Incorrect. Disabling filters exposes the network to risks.'
                ];
                storyUpdate = 'Suspicious packets filtered. Attacks continuing.';
                break;
            case 3:
                this.updateStory('Further defense required:');
                prompts = ['Enable Advanced Packet Analysis', 'Open All Ports', 'Turn Off Filtering'];
                explanations = [
                    'Correct! Advanced analysis helps identify threats in packets.',
                    'Incorrect. Opening all ports invites attackers.',
                    'Incorrect. Turning off filtering increases exposure to attacks.'
                ];
                storyUpdate = 'Advanced packet analysis activated. Attack intensity reduced.';
                break;
            case 4:
                this.updateStory('Persistent attack continues. Next action:');
                prompts = ['Review Packet Logs', 'Allow Flooded IPs', 'Disable Firewall'];
                explanations = [
                    'Correct! Reviewing logs helps understand attack vectors.',
                    'Incorrect. Allowing flooded IPs exposes the network further.',
                    'Incorrect. Disabling the firewall removes all defenses.'
                ];
                storyUpdate = 'Logs reviewed. Attack patterns identified.';
                break;
            case 5:
                this.updateStory('Final decision for Level 4:');
                prompts = ['Update Packet Filtering Rules', 'Ignore Remaining Attacks', 'Allow All Traffic'];
                explanations = [
                    'Correct! Updating rules prevents future attacks.',
                    'Incorrect. Ignoring attacks can lead to compromise.',
                    'Incorrect. Allowing all traffic defeats the purpose of the firewall.'
                ];
                storyUpdate = 'Level 4 secured! Moving to Level 5...';
                break;
            default:
                this.bgMusic.stop();
                this.scene.start('Level5');
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

