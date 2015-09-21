/// <reference path="../../bower_components/phaser/typescript/phaser.d.ts"/>;
/// <reference path="Player.ts"/>;
module Castlevania {
    export class Level1 extends Phaser.State {
        game: Castlevania.Game;
        background: Phaser.Sprite;
        music: Phaser.Sound;
        player: Castlevania.Player;
        text: Phaser.Text;
        create() {
            this.background = this.add.sprite(0, 0, 'level1');

            this.music = this.add.audio('music', 1, false);
            this.music.play();

            this.player = new Player(this.game, 130, 284);

            this.text = this.add.text(0, 0, "Score: " + this.game.score, { fill: "white", backgroundColor: "black"});
        }

        update() {
            this.text.setText("Score: " + this.game.score);
        }
    }
}