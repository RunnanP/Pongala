
var game = new Phaser.Game(800, 640, Phaser.AUTO, 'gameDiv');

game.state.add('boot', bootState);
game.state.add('preload', preloadState);
game.state.add('splash', splashState);
game.state.add('main_menu', mainmenuState);
game.state.add('help', helpState);
game.state.add('controls', controlState);
game.state.add('level_select', levelSelectState);
game.state.add("Level1",Level1);
game.state.add("Level2",Level2);
game.state.add("Level3",Level3);
/*
game.state.add('level_select', level_selectState);
game.state.add('controls', controlsState); //NOTE: This is contrlols help menu, NOT actual controls.
game.state.add('help', helpState);
game.state.add('play', playState);*/

game.state.start('boot');
