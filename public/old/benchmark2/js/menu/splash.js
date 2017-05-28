var backgroundSpace;

var splashState = function(game){}

splashState.prototype = {
  	create: function(){
    	backgroundSpace = game.add.tileSprite(0, 0, 800, 640, 'backgroundSpace');
        var title = this.add.sprite(game.width/2,game.height-540,"title");
        title.anchor.setTo(0.5,0.5);
        var splashImage = this.add.sprite(game.width/2,game.height-340,"splash");
        splashImage.anchor.setTo(0.5,0.5);
        var splashText = game.add.text(game.width/2, game.height-140, 'Click to start', {font: 'Impact', fontSize: '32px', fill: '#00f6ff' });
        splashText.anchor.setTo(0.5,0.5);
        
        this.game.input.onDown.addOnce(this.advanceMain,this);
	},
	advanceMain: function(){
		this.game.state.start("main_menu");
	},
  	update: function(){
    	//  Scroll the background
    	backgroundSpace.tilePosition.y += 2;
	 }
}