var backgroundSpace;

var levelSelectState ={
  	create: function(){
    	backgroundSpace = game.add.tileSprite(0, 0, 800, 640, 'backgroundSpace');

        var titleText = game.add.text(400, 100, 'Deployment - Level Select', {font: 'Impact', fontSize: '32px', fill: '#00f6ff' });
        titleText.anchor.setTo(0.5,0.5);
		
        var level1Button = this.game.add.button(200,200,"select_button",this.playGame1,this, 2, 0, 1);
		level1Button.anchor.setTo(0.5,0.5);
        var text = game.add.text(0, 0, "1", {font: "30px Arial", fill: "#ffffff"});
		text.anchor.setTo(0.5,0.5);
        level1Button.addChild(text);

		var menuButton = this.game.add.button(400,580,"menu_button",this.moveToMain,this, 2, 0, 1);
		menuButton.anchor.setTo(0.5,0.5);


	},
	moveToMain: function(){
		this.game.state.start("main_menu");
	},
	playGame1: function(){
		this.game.state.start("Level1");
	},
  	update: function(){
    	//  Scroll the background
    	backgroundSpace.tilePosition.y += 2;
	 }
    
}
