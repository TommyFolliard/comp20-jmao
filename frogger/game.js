function start_game(){
	img=new Image();
	img.src="assets/frogger_sprites.png";
	img.onload = function() {
		draw_background();
		initialize_parameters();
		draw_game();
		draw_lives(numLives);
		draw_level(levelNum);
		draw_score(score, highScore);
	}
}

function draw_background(){
	c=document.getElementById("game");
	ctx=c.getContext("2d");
	ctx.fillStyle = "#191970"; //blue top half
	ctx.fillRect(0, 0, 399, 283);
	ctx.fillStyle = "#000000"; //black bottom half
	ctx.fillRect(0, 283, 399, 565);
	//header
	ctx.drawImage(img, 0, 0, 399, 115, 0, 0, 399, 115);
	//top purple roadside
	ctx.drawImage(img, 0, 116, 399, 40, 0, 263, 399, 40);
	//bottom purple roadside
	ctx.drawImage(img, 0, 116, 399, 40, 0, 485, 399, 40); 
}

function initialize_parameters(){
	xstart = 190; //starting x-coordinate of the frog
	ystart = 495; //starting y-coordinate of the frog
	left = 0; //move left
	right = 0; //move right
	up = 0; //move up
	down = 0; //move down
	move = 30; //number of pixels moved per move
	numLives = 3; 
	gameover = false; 
	levelNum = 1;
	time = 0;
	score = 0;
	highScore = 0;
	purpleX = 143;
	purpleY = 379;
	redWhiteX = 325; 
	redWhiteY = 315;
	logX = 15;
	logY = 143;
	purpleSpeed = 5; //initialize purple vehicle speed
	redWhiteSpeed = 3; //initialize red-white vehicle speed
	logSpeed = 4; // initialize log speed
}

function draw_game(){
	draw_frogger();
	draw_log();
	draw_purpleVehicle();
	draw_redWhiteVehicle();
}

function draw_frogger(){
	ctx.drawImage(img, 11, 367, 27, 20, (xstart - left * move + right * move), (ystart + down * move - up * move), 27, 20);
}

function draw_log(){
	ctx.drawImage(img, 0, 162, 200, 30, (logX + (time * logSpeed)), logY, 200, 30);
}

function draw_purpleVehicle(){
	ctx.drawImage(img, 0, 263, 40, 30, (purpleX - (time * purpleSpeed)), purpleY, 40, 30);
}

function draw_redWhiteVehicle(){
	ctx.drawImage(img, 42, 262, 33, 32, (redWhiteX + (time * redWhiteSpeed)), redWhiteY, 33, 32);
}

function draw_lives(numLives){ 
	for(i = 0; i < numLives; i++){
		ctx.drawImage(img, 11, 333, 23, 24, (18 * i), 525, 18, 18)
	}
}

function draw_level(levelNum){
	ctx.font = '20pt Calibri';
	ctx.fillStyle = "#04FF08";
	ctx.fillText("	Level " + levelNum, 70, 543);
}

function draw_score(score, highScore){
	ctx.font = '15pt Calibri';
	ctx.fillText("Score: " + score + "	     Highscore: " + highScore, 0, 560);
}