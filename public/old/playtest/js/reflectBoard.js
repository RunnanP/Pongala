// Helper function delete elem from arr
function del(arr, elem){
	for (var i = arr.length -1; i >= 0; i--){
		if(arr[i] == elem)
			arr.splice(i, 1);
	}
}

// Assign some mass to both bullet and player.
m1 = 0.1; // bullet mass
m2 = 1000; // ship mass
function reflect(board, bullet,player){


	if (player.angle==0){  
	bullet.body.velocity.y = -bullet.body.velocity.y;
	if(player.body.velocity.x != 0){
		var x = bullet.body.velocity.x;
		var z = player.body.velocity.x
		bullet.body.velocity.x = (m1*x + 2*m2*z - m2*x)/(m1 + m2);
		//player.body.velocity.z = (m2*z + 2*m1*x - m1*z)/(m1 + m2);
	}
   }else{
		var angle =Math.PI * (2 * board.angle + 180 - 2 * bullet.angle)/180;
		//console.log("ANGLE" + angle); 
		var x1 = bullet.body.velocity.x;
		var y1 = bullet.body.velocity.y;
	    bullet.body.velocity.x = x1 * Math.cos(angle) - y1 * Math.sin(angle);
		bullet.body.velocity.y = x1 * Math.sin(angle) + y1 * Math.cos(angle);
		/* console.log(game.physics.arcade.angleBetween(board, bullet));
	   console.log(player.angle);
	   console.log(bullet.body.velocity.y);
	   console.log(Math.sin(player.angle));
       console.log(Math.cos(player.angle));*/

	//   }else{

	  // }
	  
     }
} 