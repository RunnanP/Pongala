var preloadState =  function(game){}

preloadState.prototype ={
	preload: function(){ 
        
        var loadText = game.add.text(game.width/2, 240, 'Loading...', {font: 'Impact', fontSize: '32px', fill: '#00f6ff' });
        loadText.anchor.setTo(0.5,0.5);
        var loadBar = this.add.sprite(game.width/2,360,"loading");
        loadBar.anchor.setTo(0.5,0.5);
        this.load.setPreloadSprite(loadBar);
        game.load.spritesheet('play_button', 'assets/images/play_button_sprite_sheet.png', 293, 84);
        game.load.spritesheet('level_button', 'assets/images/level_button_sprite_sheet.png', 293, 84);
        game.load.spritesheet('control_button', 'assets/images/control_button_sprite_sheet.png', 293, 84);
        game.load.spritesheet('help_button', 'assets/images/help_button_sprite_sheet.png', 293, 84);
        game.load.spritesheet('menu_button', 'assets/images/menu_button_sprite_sheet.png', 293, 84);
        game.load.spritesheet('generic_button', 'assets/images/generic_button_sprite_sheet.png', 293, 84);
		this.game.load.image("placeholder","assets/images/placeholder.png");
		this.game.load.image("title","assets/images/title.png");
		this.game.load.image("splash","assets/images/splashimage.png");

		this.game.load.image("arrow_control_help","assets/images/arrow_controls.png");
		this.game.load.image("paddle_control_help","assets/images/paddle_controls.png");
		this.game.load.image("esc_control_help","assets/images/esc_controls.png");

		this.game.load.image("backgroundSpace","assets/images/background.png");
		
		this.load.image('health','assets/images/health.png');
		
        game.load.spritesheet('select_button', 'assets/images/select_button_sprite_sheet.png', 64, 64);

		
	// Load the assets of the game, including the scripts.
	// load the tilemap
	this.load.tilemap('map', 'assets/tilemaps/tilemap.json', null, Phaser.Tilemap.TILED_JSON);
	this.load.image('tiles', 'assets/images/tileset.png');
	//this.load.pack("preload", "assets/pack.json");
	this.load.spritesheet('selfSpaceship','assets/images/player.png',64,64);
	this.load.spritesheet('selfBullet','assets/images/bullet.png',16,16);
	this.load.spritesheet('selfEnemy','assets/images/enemy.png',64,64);
	this.load.image('selfPad','assets/images/PongalaPaddle.png');
	this.load.image('back','assets/images/bck3.png');


	},
  	create: function(){
		this.game.state.start("splash");
	}
}