
var backgroundSpace;

var mainmenuState = {
  	create: function(){
    	backgroundSpace = game.add.tileSprite(0, 0, 800, 640, 'backgroundSpace');
        var title = this.add.sprite(game.width/2,game.height-540,"title");
        title.anchor.setTo(0.5,0.5);
        var menuText = game.add.text(game.width/2, 180, 'Main Menu', {font: 'Impact', fontSize: '32px', fill: '#00f6ff' });
        menuText.anchor.setTo(0.5,0.5);
        
		var playButton = this.game.add.button(game.width/2,280,"play_button",this.playGame1,this, 2, 0, 1);
		playButton.anchor.setTo(0.5,0.5);

		playButton = this.game.add.button(game.width/2,380,"level_button",this.moveToLS,this, 2, 0, 1);
		playButton.anchor.setTo(0.5,0.5);

		playButton = this.game.add.button(game.width/2,480,"control_button",this.moveToControls,this, 2, 0, 1);
		playButton.anchor.setTo(0.5,0.5);

		playButton = this.game.add.button(game.width/2,580,"help_button",this.moveToHelp,this, 2, 0, 1);
		playButton.anchor.setTo(0.5,0.5);
		//No apparent need to create a variable for each button, let one variable do all the work.
	},
	playGame1: function(){
		this.game.state.start("Level1");
	},
	moveToLS: function(){
		this.game.state.start("level_select");
	},
	moveToControls: function(){
		this.game.state.start("controls");
	},
	moveToHelp: function(){
		this.game.state.start("help");
	},
	
  	update: function(){
    	//  Scroll the background
    	backgroundSpace.tilePosition.y += 2;
	 }
}