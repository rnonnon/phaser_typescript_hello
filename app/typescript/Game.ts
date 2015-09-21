/// <reference path="../../bower_components/phaser/typescript/phaser.d.ts"/>;
/// <reference path="Boot.ts"/>;
/// <reference path="Preloader.ts"/>;
/// <reference path="MainMenu.ts"/>;
/// <reference path="Level1.ts"/>;
module Castlevania {
    export class Game extends Phaser.Game {
        score: number = 0;
        constructor() {
            super(800, 600, Phaser.AUTO, 'game', null);
            
            this.state.add('Boot', Boot);
            this.state.add('Preloader', Preloader);
            this.state.add('MainMenu', MainMenu);
            this.state.add('Level1', Level1);

            this.physics = Phaser.Physics.ARCADE;

            this.state.start('Boot');
        }
    }
}