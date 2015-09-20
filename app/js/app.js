/// <reference path="../../bower_components/phaser/typescript/phaser.d.ts"/>;
var SimpleGame = (function () {
    function SimpleGame() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: this.preload, create: this.create });
    }
    SimpleGame.prototype.preload = function () {
        this.game.load.image('logo', 'img/phaser-logo-small.png');
    };
    SimpleGame.prototype.create = function () {
        var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        logo.anchor.setTo(0.5, 0.5);
        logo.scale.setTo(0.2);
        this.game.add.tween(logo.scale).to({ x: 1, y: 1 }, 1000, Phaser.Easing.Bounce.Out, true, 0, Number.MAX_VALUE, true);
    };
    return SimpleGame;
})();
window.onload = function () {
    var game = new SimpleGame();
};
