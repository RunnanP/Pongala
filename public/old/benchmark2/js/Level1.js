/**
 * Level1 state.
 */
function Level1() {
	Phaser.State.call(this);

}


var proto = Object.create(Phaser.State.prototype);
Level1.prototype = proto;
Level1.prototype.constructor = Level1;
var baddie=new Array();
var firingTimer=0;
var graphics;
var menuButton;
var unpauseButton;
var buttonGroup;
var enemysnumber=0;
var backgroundSpace;
var boardlife=3;
var boardTimer=0;
var playerlife=5;

var canDamage = true;
var healthMeter = [];
var healthBars;


Level1.prototype.init = function() {
	this.world.setBounds(0, 0, this.world.width, this.world.height);
	this.stage.backgroundColor = 0x5e81a1;

	this.physics.startSystem(Phaser.Physics.ARCADE);
};



Level1.prototype.create = function() {
    backgroundSpace = game.add.tileSprite(0, 0, 800, 640, 'backgroundSpace');
	// LOAD TILEMAP HERE
		this.map = this.game.add.tilemap('map');
		// add tileset
		this.map.addTilesetImage('tileset', 'tiles');
		// create (background) layer
		this.backgroundLayer = this.map.createLayer('background');
	
/*this.load.spritesheet('selfSpaceship','images/player.png');
	this.load.spritesheet('selfBullet','images/bullet.png');
	this.load.spritesheet('selfEnemy','images/enemy.png');
	this.load.image('selfPad','images/PongalaPaddle.png');
	this.load.image('back','bck3.png');*/


	graphics = this.add.graphics(0, 0);
	buttonGroup = this.add.group(); 
	
    //bars for healthBar group
    healthBars = this.add.group(); 
;
    for (var i = 0; i < playerlife; i++)
    {
        healthMeter[i] = game.add.sprite(i * 35, 0, 'health');
    }


	this.physics.startSystem(Phaser.Physics.ARCADE);
	//player
	this.player =this.add.sprite(this.world.centerX, this.world.centerY+300, "selfSpaceship");
	this.player.health=5;
	this.player.animations.add('playerstay', [0,1,2,3],8, true);
	this.player.animations.add('playerdamage',[4,5],8,true);
	this.player.animations.add('playerdying',[6,7],8,true);
	//board
	this.board =this.add.sprite(this.player.x-15,this.player.y-60,"selfPad");

	this.board.health=3;
    
     this.player.animations.play('playerstay');

    this.physics.arcade.enable(this.player);
	this.physics.arcade.enable(this.board);
    this.player.body.collideWorldBounds = true;
//enemy
    this.enemys=this.add.group();
	this.enemys.enableBody=true;
	this.enemys.physicsBodyType=Phaser.Physics.ARCADE;
	//this.createEnemys();
	
	 for(var i=0;i<5;i++){
	    var k=Math.random();
        var k2=Math.random();
        baddie[i]=this.enemys.create(k*800,10,'selfEnemy');
		enemysnumber++;
        baddie[i].body.bounce.y=0.2;
        //baddie[i].body.gravity.y=300;
        baddie[i].body.collideWorldBounds=true;
    }
	this.enemys.callAll('animations.add','animations','enemystay',[0,1,2,3],7,true);
	this.enemys.callAll('animations.add','animations','enemydying',[6,3,5,4],7,true);
	this.time.events.repeat(Phaser.Timer.SECOND, Infinity, this.enemymove, this);
	
                
   /* this.enemy=this.add.sprite(this.world.centerX,this.world.centerY-200,"selfEnemy");
	this.enemy.health=1;

	this.enemy.animations.add('enemystay',[0,1,2,3],7,true);
	this.enemy.animations.add('enemydying',[6,3,5,4],7,true);
*/
    //bullet
	this.bullets=this.add.group();
	this.bullets.enableBody=true;
	this.bullets.physicsBodyType=Phaser.Physics.ARCADE;
	this.bullets.createMultiple(20,'selfBullet');
	this.bullets.setAll('outOfBoundsKill',true);
	this.bullets.setAll('checkWorldBounds',true);
   //this.bullets.callAll('events.onOutOfBounds.add','events.onOutOfBounds',this.resetBullet);
    //this.shootTimeFunction(this.enemy);
	//this.time.events.add(Phaser.Timer.SECOND*2,this.fireBullet(this.enemy),this);
  //this.time.events.repeat(Phaser.Timer.SECOND*2,10,this.shootTimeFunction,this);
	this.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);
	this.cursors = this.input.keyboard.addKeys( { 
    'up': Phaser.KeyCode.UP, 'down': Phaser.KeyCode.DOWN, 'left': Phaser.KeyCode.LEFT, 'right': Phaser.KeyCode.RIGHT, 
    'pause': Phaser.KeyCode.ESC,} );

	this.gameOver = false;
};



Level1.prototype.createEnemys=function(){
      for(var y=0;y<4;y++){
		  for(var x=0;x<10;x++){
			  var enemy =this.enemys.create(x*48,y*50,'selfEnemy');
			  

                   enemy.health=1;

                  enemy.animations.add('enemystay',[0,1,2,3],7,true);
	              enemy.animations.add('enemydying',[6,3,5,4],7,true);

				  enemy.play('enemystay');

		  }
	  }
   this.enemys.x=100;
   this.enemys.y=50;

   var tween =this.add.tween(this.enemys).to({x:200},2000,true,0,1000,true);
   tween.onLoop.add(function(){this.enemys+=10;},this);

}

Level1.prototype.pauseFunction=function(){
    // draw a rectangle
    graphics.lineStyle(2, 0x0000FF, 1);
    graphics.drawRoundedRect(150, 100, 500, 500,9);
	graphics.beginFill(0xff0000);
	graphics.anchor.setTo(0.5,0.5);
	buttonGroup.add(graphics)
	game.physics.arcade.isPaused=true;
        var titleText = game.add.text(400, 150, 'Paused', {font: 'Verdana', fontSize: '32px', fill: '#ffffff' },buttonGroup);
		titleText.anchor.setTo(0.5,0.5);

		var unpauseButton = this.game.add.button(400,250,"generic_button",this.unpauseFunction,this, 2, 0, 1, 2,buttonGroup);
        var text = game.add.text(0, 0, "Resume Game", {font: "30px Arial", fill: "#ffffff"});
		text.anchor.setTo(0.5,0.5);
        unpauseButton.addChild(text);
		unpauseButton.anchor.setTo(0.5,0.5);

		var levelButton = this.game.add.button(400,350,"level_button",this.moveToLS,this, 2, 0, 1, 2,buttonGroup);
		levelButton.anchor.setTo(0.5,0.5);

		var menuButton = this.game.add.button(400,450,"menu_button",this.moveToMain,this, 2, 0, 1, 2,buttonGroup);
		menuButton.anchor.setTo(0.5,0.5);

        game.world.bringToTop(buttonGroup);
}

Level1.prototype.gameOverFunction=function(){
    // draw a rectangle
    graphics.lineStyle(2, 0x0000FF, 1);
    graphics.drawRoundedRect(150, 100, 500, 500,9);
	graphics.beginFill(0xff0000);
	graphics.anchor.setTo(0.5,0.5);
	buttonGroup.add(graphics)
	game.physics.arcade.isPaused=true;
        var titleText = game.add.text(400, 150, 'GAME OVER', {font: 'Verdana', fontSize: '32px', fill: '#ffffff' },buttonGroup);
		titleText.anchor.setTo(0.5,0.5);

		var levelButton = this.game.add.button(400,250,"level_button",this.moveToLS,this, 2, 0, 1, 2,buttonGroup);
		levelButton.anchor.setTo(0.5,0.5);

		var menuButton = this.game.add.button(400,350,"menu_button",this.moveToMain,this, 2, 0, 1, 2,buttonGroup);
		menuButton.anchor.setTo(0.5,0.5);

        game.world.bringToTop(buttonGroup);
}

Level1.prototype.unpauseFunction=function(){
	buttonGroup.destroy();
	graphics.clear();
	graphics = this.add.graphics(0, 0);
	buttonGroup = this.add.group(); 
	game.physics.arcade.isPaused=false;
}
Level1.prototype.moveToLS=function(){
		this.game.state.start("level_select");
		this.resetStatus();
}

Level1.prototype.moveToMain=function(){
		this.game.state.start("main_menu");
		this.resetStatus();
}

Level1.prototype.update = function() {

    //  Scroll the background
    backgroundSpace.tilePosition.y += 2;
	
	if (this.cursors.pause.isDown) {
		//console.log("test");
		this.pauseFunction();
	}
	
	if(boardlife==2){
		//YELLOW - DAMAGED
		this.board.tint = 0xFFCC00;
	}
	else if(boardlife==1){
		//RED - ABOUT TO DIE
		this.board.tint = 0xFF0000;
	}
	else{
		//NORMAL

	}


if (this.cursors.left.isDown) {
		
		this.player.body.velocity.x=-200;
	
		this.board.body.velocity.x=-200;
	
	} else if (this.cursors.right.isDown) {
		
		this.player.body.velocity.x=200;
	
		this.board.body.velocity.x=200;
	} 
	else if(this.cursors.up.isDown){
		this.player.body.velocity.y=-200;
	}else if (this.cursors.down.isDown){
		this.player.body.velocity.y=200;
	}else {
	
		this.player.body.velocity.x=0;
		this.player.body.velocity.y=0;
	
		this.board.body.velocity.x=0;
	}



    if(this.input.keyboard.isDown(Phaser.Keyboard.A)){
		this.board.body.velocity.x=-200;
	}else if(this.input.keyboard.isDown(Phaser.Keyboard.D)){
		this.board.body.velocity.x=200;
	}else{
		//this.board.body.velocity.x=0;
	}
     	

  if (baddie.length == 0){
     this.restEnemy();
  }


if (boardlife==0 ){
    this.resetBoard();
}
	

   if (this.time.now>boardTimer){
	   console.log("1");
	   console.log(boardlife);
	   if(boardlife==-1){
       console.log("2");
	   this.createBoard();
	   }
   };

/*
if(playerlife==0){
	this.player.kill();
	
}*/
   
  
  if (this.time.now > firingTimer)
        {
            this.fireBullet();
        };

  // this.fireBullet(this.enemy);
    
//this.time.events.add(Phaser.Timer.SECOND*2,this.fireBullet(this.enemy),this);


	//player and powerup
/*	this.physics.arcade.overlap(this.player, this.powerup, this.playerVsPowerup,
			null, this);

	// level lock
	this.physics.arcade.overlap(this.player, this.lockYellow,
			this.playerVsLocks, null, this);
*/
	// enemies and player
	//for (var i = 0; i < this.allEnemies.length; i += 1) {
		this.physics.arcade.overlap(this.player, this.enemys,
				this.playerVsEnemy, null, this);
	//}


// bullet and player
		this.physics.arcade.overlap(this.player, this.bullets,
				this.playerVsBullet, null, this);


//enemies and board	
//for (var i = 0; i < this.allEnemies.length; i += 1) {
		this.physics.arcade.overlap(this.board, this.enemys,
				this.boardVsEnemy, null, this);
	//} 

	//bullet and board
		
	this.physics.arcade.overlap(this.board, this.bullets,
			this.boardVsBullet, null, this);
		

	//bullet and enemies
	this.physics.arcade.overlap(this.bullets,this.enemys, 
			this.bulletVsEnemy, null, this);


};


Level1.prototype.fireBullet=function(){

	for (var i=0;i<baddie.length;i++){
	var k=Math.random();

	if (k>0.3){
	var bullet=this.bullets.getFirstExists(false);
	if(bullet){
		// Fix kill prob (Minh)
		bullet.touched = false;
		bullet.reset(baddie[i].x,baddie[i].y);
		bullet.body.velocity.y=500;
	}

}
	}

   firingTimer = this.time.now + 1000;




};

//Leve1.prototype.resetBullet=function(bullet){
  //     bullet.kill();
//}

Level1.prototype.restEnemy=function(){
	for(var i=0;i<5;i++){
	    var k=Math.random();
        var k2=Math.random();
        baddie[i]=this.enemys.create(k*800,10,'selfEnemy');
		enemysnumber++;
        baddie[i].body.bounce.y=0.2;
        //baddie[i].body.gravity.y=300;
        baddie[i].body.collideWorldBounds=true;
			}
	this.enemys.callAll('animations.add','animations','enemystay',[0,1,2,3],7,true);
	this.enemys.callAll('animations.add','animations','enemydying',[6,3,5,4],7,true);
	
	this.time.events.repeat(Phaser.Timer.SECOND, Infinity, this.enemymove, this); 
};

Level1.prototype.resetBoard=function(){
	this.board.kill();
	boardTimer=this.time.now+3000;
	boardlife=-1;
};

Level1.prototype.createBoard=function(){
    boardlife=3;
	this.board.reset(this.player.x-15,this.player.y-30);
	this.board.tint = 0xffffff;

};

Level1.prototype.playerVsEnemy = function(player, enemy) {
	


    //player.anchor.y = 1;
	//player.scale.y = -1;
    if (healthMeter.length > 0 & canDamage == true) 
    {
        healthMeter.pop().kill();
        if (healthMeter.length <= 0) {
			this.player.play("playerdying");
			//spawnmenuhere
            //setTimeout(this.playerKillHelper(), 500);
   			game.time.events.add(Phaser.Timer.SECOND , this.gameOverFunction, this);
			
        }
        else{ 
			playerlife--;
			this.player.play("playerdamage");
            this.player.tint = Math.random() * 0xffffff;
            canDamage=false;

   			game.time.events.add(Phaser.Timer.SECOND * 2, this.invincibleDuration, this);
            //setTimeout(function(){this.invincibleDuration}, 100);
        }
    }
	
	del(baddie, enemy);
    enemy.kill();
	//enemysnumber--;
	//player.damage();
	/*if (player.health==0){
		player.play("dying");
		player.kill();
		player.visible=true;

		this.gameOver=true;
	}*/



};


Level1.prototype.playerVsBullet =function(player,bullet){
	bullet.kill();
    if (healthMeter.length > 0 & canDamage == true) 
    {
        healthMeter.pop().kill();
        if (healthMeter.length <= 0) {
			this.player.play("playerdying");
			//spawnmenuhere
            //setTimeout(this.playerKillHelper(), 500);
   			game.time.events.add(Phaser.Timer.HALF , this.gameOverFunction, this);
			
        }
        else{ 
			playerlife--;
			this.player.play("playerdamage");
            this.player.tint = Math.random() * 0xffffff;
            canDamage=false;

   			game.time.events.add(Phaser.Timer.SECOND * 2, this.invincibleDuration, this);
            //setTimeout(function(){this.invincibleDuration}, 100);
        }
    }
	/*player.damage();
	if (player.health==0){
		player.play("playerdying");
		player.kill();
		player.visible=true;

		this.gameOver=true;
	}*/
};


Level1.prototype.playerKillHelper=function() {
    this.player.kill();
	this.gameOverFunction();
}

/*
function invincibleDuration() {
    canDamage=true;
    this.player.tint = 0xffffff;
	//this.player.play("playerstay");
}*/


Level1.prototype.invincibleDuration=function() {
    canDamage=true;
    this.player.tint = 0xffffff;
	this.player.play("playerstay");
}


Level1.prototype.boardVsBullet=function(board,bullet) {
	bullet.touched = true;
	board.anchor.y=1;
	board.scale.y=-1;
//	board.damage();
  boardlife--;
    reflect(this.player, bullet);
};







Level1.prototype.boardVsEnemy=function(board,enemy){
   enemy.kill();
   board.anchor.y=1;
	board.scale.y=-1;
	board.play("boarddamage");
	boardlife--;
   // board.damage();
	if(this.player.health==0){
		board.play("boarddying");
		board.kill();
		board.visble=true;
   
}
	del(baddie, enemy);
	//enemysnumber--;
};

Level1.prototype.bulletVsEnemy=function(bullet,enemy){
	if (bullet.touched){
	   bullet.kill();
	   enemy.play("enemydying");
	   del(baddie, enemy);
	   enemy.kill();
	   //enemysnumber--;
	}

	
};




Level1.prototype.resetStatus= function(sprite) {    
	boardlife=3;
	boardTimer=0;
	playerlife=5;

	canDamage = true;
	healthMeter = [];
	
	this.player =this.add.sprite(this.world.centerX, this.world.centerY+300, "selfSpaceship");

    //bars for healthBar group
    healthBars = this.add.group(); 
;
    for (var i = 0; i < playerlife; i++)
    {
        healthMeter[i] = game.add.sprite(i * 35, 0, 'health');
    }

};




Level1.prototype.moveSprite = function(sprite) {    //this one is used to move the sprite instead of player

};



/*Level1.prototype.playerVsPowerup = function(player, powerup) {
	
	//add som
	powerup.kill();
};

Level.prototype.playerVsLocks = function(player, lock) {

		alert("Win in the level1 !!!");
		this.game.state.start("level2");

};
*/



Level1.prototype.enemymove=function(){
    for(var i=0;i<baddie.length;i++){
    var k=Math.random();
    var k2=Math.random();
	var k3=Math.random();
	var k4=Math.random();
	var k5=Math.random();
	if (k>0.5){
     baddie[i].body.velocity.x=k2*-200;
	 

	}else{
      baddie[i].body.velocity.x=k2*200;
	}

	if(k3>0.5){
		baddie[i].body.velocity.y=k4*-200;
	}else{
		baddie[i].body.velocity.y=k4*200;
	}

  baddie[i].animations.play('enemystay');

    }

};

