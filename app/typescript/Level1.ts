/// <reference path="../../bower_components/phaser/typescript/phaser.d.ts"/>;
/// <reference path="Player.ts"/>;
module Castlevania {
    export class Level1 extends Phaser.State {
        game: Castlevania.Game;
        background: Phaser.Sprite;
        music: Phaser.Sound;
        player: Castlevania.Player;
        text: Phaser.Text;
        platforms: Phaser.Group;

        create() {
            this.game.add.sprite(0, 0);

            this.platforms = this.game.add.group();
            this.platforms.enableBody = true;

            var ledges:Array<Phaser.Sprite> = [];
            var ground = this.add.sprite(0, 380);
            ground.scale.x = this.game.world.width;
            ledges.push(ground);
            
            var ledge = this.add.sprite(0, 150);
            ledge.scale.x = 10;
            ledges.push(ledge);
            
            this.game.physics.enable(ledges);

            this.platforms.addMultiple(ledges);
            this.platforms.setAllChildren("body.immovable", true);
            

            this.background = this.add.sprite(0, 0, 'level1');

            this.music = this.add.audio('music', 1, false);
            this.music.play();

            this.player = new Player(this.game, 130, 280);

            this.text = this.add.text(0, 0, "Score: " + this.game.score, { fill: "white", backgroundColor: "black"});
        }

        update() {
            this.game.physics.arcade.collide(this.player, this.platforms);
            this.text.setText("Score: " + this.game.score);
        }
    }
}