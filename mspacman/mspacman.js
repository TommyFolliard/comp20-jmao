function draw_board(){
	c=document.getElementById("game");
	ctx=c.getContext("2d");
	img = document.getElementById("mspacman");
	ctx.drawImage(img, 322, 2, 466, 138, 0, 0, 466, 138); 
	ctx.drawImage(img, 80, 0, 22, 20, 281, 115, 20, 18);
	ctx.drawImage(img, 0, 160, 20, 20, 281, 75, 20, 18); 
}

