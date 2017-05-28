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
function reflect(player, bullet){
	bullet.body.velocity.y = -bullet.body.velocity.y;
	if(player.body.velocity.x != 0){
		var x = bullet.body.velocity.x;
		var z = player.body.velocity.x
		bullet.body.velocity.x = (m1*x + 2*m2*z - m2*x)/(m1 + m2);
		//player.body.velocity.z = (m2*z + 2*m1*x - m1*z)/(m1 + m2);
	}
} 