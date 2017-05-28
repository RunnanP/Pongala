var bootState =  function(game){}

bootState.prototype ={

	preload: function(){
	this.scale.scaleMode = Phaser.ScaleManager.NO_SCALEL;
	this.scale.pageAlignHorizontally = true;
	this.scale.pageAlignVertically = true;
	
	// Load all the assets and to be used in the preload state.
	// Note that the majority of the assets and scripts are loaded in the
	// preload state.
	//this.load.pack("boot", "assets/pack.json");

	    console.log("%cStarting my game", "color:white; background:red");
        this.game.load.image("loading","assets/images/loadbar.png"); 
	},
  	create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
		//this.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
		//this.scale.pageAlignHorizontally = true;
		this.scale.updateLayout();
		this.game.state.start("preload");
	}
}