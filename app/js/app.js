var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../bower_components/phaser/typescript/phaser.d.ts"/>;
var Castlevania;
(function (Castlevania) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.preload = function () {
            this.load.image('preloadBar', 'assets/loader.png');
        };
        Boot.prototype.create = function () {
            //  Unless you specifically need to support multitouch I would recommend setting this to 1
            this.input.maxPointers = 1;
            //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
            this.stage.disableVisibilityChange = true;
            if (this.game.device.desktop) {
                //  If you have any desktop specific settings, they can go in here
                this.game.scale.pageAlignHorizontally = true;
            }
            else {
            }
            this.game.state.start('Preloader', true);
        };
        return Boot;
    })(Phaser.State);
    Castlevania.Boot = Boot;
})(Castlevania || (Castlevania = {}));
/// <reference path="../../bower_components/phaser/typescript/phaser.d.ts"/>;
var Castlevania;
(function (Castlevania) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
        }
        Preloader.prototype.preload = function () {
            //  Set-up our preloader sprite
            this.preloadBar = this.add.sprite(200, 250, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar);
            //  Load our actual games assets
            this.load.image('titlepage', 'assets/titlepage.jpg');
            this.load.image('logo', 'assets/logo.png');
            this.load.audio('music', 'assets/title.mp3', true);
            this.load.spritesheet('simon', 'assets/simon.png', 58, 96, 5);
            this.load.image('level1', 'assets/level1.png');
        };
        Preloader.prototype.create = function () {
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);
        };
        Preloader.prototype.startMainMenu = function () {
            this.game.state.start('MainMenu', true, false);
        };
        return Preloader;
    })(Phaser.State);
    Castlevania.Preloader = Preloader;
})(Castlevania || (Castlevania = {}));
/// <reference path="../../bower_components/phaser/typescript/phaser.d.ts"/>;
var Castlevania;
(function (Castlevania) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            _super.apply(this, arguments);
        }
        MainMenu.prototype.create = function () {
            this.background = this.add.sprite(0, 0, "titlepage");
            this.logo = this.add.sprite(this.world.centerX, -300, "logo");
            this.logo.anchor.set(0.5);
            this.music = this.add.audio("music", 1, true);
            this.music.play();
            this.startText = this.add.text(this.world.centerX, 500, "Click to start", { fill: "white" });
            this.startText.alpha = 0;
            this.startText.anchor.set(0.5);
            this.tweenStartText = this.add.tween(this.startText).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, Number.MAX_VALUE, true);
            this.add.tween(this.logo).to({ y: 220 }, 1000, Phaser.Easing.Bounce.Out, true);
            this.input.onDown.addOnce(this.fadeOut, this);
        };
        MainMenu.prototype.fadeOut = function () {
            this.tweenStartText.stop();
            var group = this.add.group();
            group.addMultiple([this.background, this.logo, this.startText]);
            var tween = this.add.tween(group).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startGame, this);
        };
        MainMenu.prototype.startGame = function () {
            this.music.stop();
            this.music.destroy();
            this.game.state.start("Level1");
        };
        return MainMenu;
    })(Phaser.State);
    Castlevania.MainMenu = MainMenu;
})(Castlevania || (Castlevania = {}));
/// <reference path="../../bower_components/phaser/typescript/phaser.d.ts"/>;
var Castlevania;
(function (Castlevania) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(game, x, y) {
            _super.call(this, game, x, y, 'simon', 0);
            this.anchor.setTo(0.5, 0);
            this.animations.add('walk', [0, 1, 2, 3, 4], 10, true);
            game.add.existing(this);
        }
        Player.prototype.update = function () {
            this.body.velocity.x = 0;
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
        };
        return Player;
    })(Phaser.Sprite);
    Castlevania.Player = Player;
})(Castlevania || (Castlevania = {}));
/// <reference path="../../bower_components/phaser/typescript/phaser.d.ts"/>;
/// <reference path="Player.ts"/>;
var Castlevania;
(function (Castlevania) {
    var Level1 = (function (_super) {
        __extends(Level1, _super);
        function Level1() {
            _super.apply(this, arguments);
        }
        Level1.prototype.create = function () {
            this.background = this.add.sprite(0, 0, 'level1');
            this.music = this.add.audio('music', 1, false);
            this.music.play();
            this.player = new Castlevania.Player(this.game, 130, 284);
        };
        return Level1;
    })(Phaser.State);
    Castlevania.Level1 = Level1;
})(Castlevania || (Castlevania = {}));
/// <reference path="../../bower_components/phaser/typescript/phaser.d.ts"/>;
/// <reference path="Boot.ts"/>;
/// <reference path="Preloader.ts"/>;
/// <reference path="MainMenu.ts"/>;
/// <reference path="Level1.ts"/>;
var Castlevania;
(function (Castlevania) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, 800, 600, Phaser.AUTO, 'game', null);
            this.state.add('Boot', Castlevania.Boot);
            this.state.add('Preloader', Castlevania.Preloader);
            this.state.add('MainMenu', Castlevania.MainMenu);
            this.state.add('Level1', Castlevania.Level1);
            this.state.start('Boot');
        }
        return Game;
    })(Phaser.Game);
    Castlevania.Game = Game;
})(Castlevania || (Castlevania = {}));
/// <reference path="Game.ts"/>
window.onload = function () {
    var game = new Castlevania.Game();
};
