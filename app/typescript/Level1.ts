/// <reference path="../../bower_components/phaser/typescript/phaser.d.ts"/>;
/// <reference path="Player.ts"/>;
module Castlevania {
    export class Level1 extends Phaser.State {
        game: Castlevania.Game;
        background: Phaser.Sprite;
        music: Phaser.Sound;
        player: Castlevania.Player;
        text: Phaser.Text;
//        platforms: Phaser.Group;
        ground:Phaser.Sprite;

        create() {
            this.game.add.sprite(0, 0);
/*
            this.platforms = this.game.add.group();

            this.platforms.enableBody = true;
*/
            this.ground = this.add.sprite(0, 380);
            this.game.physics.enable(this.ground);
            
            this.ground.scale.x = this.game.world.width;
            this.ground.body.immovable = true;
            

            this.background = this.add.sprite(0, 0, 'level1');

            this.music = this.add.audio('music', 1, false);
            this.music.play();

            this.player = new Player(this.game, 130, 280);

            this.text = this.add.text(0, 0, "Score: " + this.game.score, { fill: "white", backgroundColor: "black"});
        }

        update() {
            this.game.physics.arcade.collide(this.player, this.ground);
            this.text.setText("Score: " + this.game.score);
        }
    }
}