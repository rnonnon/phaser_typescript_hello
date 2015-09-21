/// <reference path="../../bower_components/phaser/typescript/phaser.d.ts"/>;
module Castlevania {
 
    export class MainMenu extends Phaser.State {
        background:Phaser.Sprite;
        logo:Phaser.Sprite;
        music: Phaser.Sound;
        startText: Phaser.Text;
        tweenStartText: Phaser.Tween;
        create() {
            this.background = this.add.sprite(0, 0, "titlepage");
            this.logo = this.add.sprite(this.world.centerX, -300, "logo");
            this.logo.anchor.set(0.5);
            this.music = this.add.audio("music", 1, true);
            this.music.play();

            this.startText = this.add.text(this.world.centerX, 500, "Click to start", {fill:"white"});
            this.startText.alpha = 0;
            this.startText.anchor.set(0.5);

            this.tweenStartText = this.add.tween(this.startText).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, Number.MAX_VALUE, true);
            this.add.tween(this.logo).to({ y: 220 }, 1000, Phaser.Easing.Bounce.Out, true);

            this.input.onDown.addOnce(this.fadeOut, this);
        }

        fadeOut() {
            this.tweenStartText.stop();

            var group = this.add.group();
            group.addMultiple([this.background, this.logo, this.startText]);

            var tween = this.add.tween(group).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startGame, this);
        }

        startGame(){
            this.music.stop();
            this.music.destroy();
            this.game.state.start("Level1");
        }

    }
}