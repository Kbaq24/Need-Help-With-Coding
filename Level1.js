export default class Level1 extends Phaser.Scene {
    constructor() {
        super('Level1');
    }

    preload() {
        this.load.image('background', 'assets/background1.png');
    }

    create() {
        this.add.image(400, 300, 'background');
        this.story = [
            "The Barrier of Flames is under attack! Repair it.",
            "Unauthorized traffic detected. Block it.",
            "Inspect firewall integrity for vulnerabilities."
        ];

        this.currentStep = 0;
        this.showStory(this.story[this.currentStep]);

        this.choices = [
            { text: 'Repair the Firewall', correct: true },
            { text: 'Block Unauthorized Traffic', correct: false },
            { text: 'Inspect Firewall Integrity', correct: false }
        ];

        this.showChoices();
    }

    showStory(text) {
        document.getElementById('storyText').style.display = 'block';
        document.getElementById('storyText').innerText = text;
    }

    showChoices() {
        this.choices = Phaser.Utils.Array.Shuffle(this.choices);
        let y = 450;
        this.choices.forEach(choice => {
            let text = this.add.text(400, y, choice.text, { fill: choice.correct ? '#00FF00' : '#FF0000' })
                .setInteractive()
                .on('pointerdown', () => this.handleChoice(choice));
            y += 50;
        });
    }

    handleChoice(choice) {
        if (choice.correct) {
            this.currentStep++;
            if (this.currentStep < this.story.length) {
                this.showStory(this.story[this.currentStep]);
                this.clearChoices();
                this.showChoices();
            } else {
                this.scene.start('Level2');
            }
        } else {
            document.getElementById('feedbackText').innerText = "Incorrect! Try again.";
        }
    }

    clearChoices() {
        this.children.getAll('text').forEach(child => child.destroy());
    }
}


