/// <reference path="../../bower_components/phaser/typescript/phaser.d.ts"/>;
module Castlevania {
 
    export class Player extends Phaser.Sprite {
        public collisionEnable:boolean;
        constructor(public game: Castlevania.Game, x: number, y: number) {
 
            super(game, x, y, 'simon', 0);
 
            this.anchor.setTo(0.5, 0);
            

            this.animations.add('walk', [0, 1, 2, 3, 4], 10, true);
 
            game.physics.enable(this);
            this.body.gravity.y = 300;
            game.add.existing(this);
        }
 
        update() {
            this.body.velocity.x = 0;
            this.body.collideWorldBounds = true;

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
 
                this.body.velocity.x = -150;
                this.animations.play('walk');
 
                if (this.scale.x == 1) {
                    this.scale.x = -1;
                }
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
 
                this.body.velocity.x = 150;
                this.animations.play('walk');
 
                if (this.scale.x == -1) {
                    this.scale.x = 1;
                }
            }
            else {
                this.animations.frame = 0;
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
                this.collisionEnable = false;
            }
            else {
                this.collisionEnable = true;
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP) && this.body.touching.down) {
               this.body.velocity.y = -350;
               this.game.score += 1;
           }
 
       }
 
    }
 
}
