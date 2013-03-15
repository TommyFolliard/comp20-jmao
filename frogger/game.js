function start_game(){
	img=new Image();
	img.src="assets/frogger_sprites.png";
	deadFrog = new Image();
	deadFrog.src="assets/dead_frog.png";
	c=document.getElementById("game");
	ctx=c.getContext("2d");
	initialize_parameters();
	check_key_press();
	img.onload = function() {
		setInterval(animation, milliseconds);
	}
}

function draw_background(){
	ctx.fillStyle = "#191970"; //blue top half
	ctx.fillRect(0, 0, 399, 277);
	ctx.fillStyle = "#000000"; //black bottom half
	ctx.fillRect(0, 277, 399, 565);
	ctx.fillStyle = "#008000";
	draw_lilly_pads();
	//header
	ctx.drawImage(img, 0, 0, 399, 115, 0, 0, 399, 115);
	//top purple roadside
	ctx.drawImage(img, 0, 116, 399, 40, 0, 273, 399, 40);
	//bottom purple roadside
	ctx.drawImage(img, 0, 116, 399, 40, 0, 485, 399, 40); 
}

function draw_lilly_pads(){
	lilly_pads = new Array();
	for (var i = 0; i < 5; i++){
		lilly_pads[i] = new Object();
		lilly_pads[i].y = 80;
		lilly_pads[i].width = 27;
		lilly_pads[i].height = 20;
	}
	lilly_pads[0].x = 13;
	lilly_pads[1].x = 99;
	lilly_pads[2].x = 184;
	lilly_pads[3].x = 268;
	lilly_pads[4].x = 353;
	ctx.fillStyle = "#008000";
	for (var i = 0; i < lilly_pads.length; i++){
		ctx.fillRect(lilly_pads[i].x, lilly_pads[i].y, lilly_pads[i].width, lilly_pads[i].height);
	}	
}

function initialize_parameters(){
	frogCurrX = 185; //current x-coordinate of the frog
	frogCurrY = 495; //current y-coordinate of the frog
	frogWidth = 30;
	frogHeight = 30;
	left = 0; //move left
	right = 0; //move right
	up = 0; //move up
	down = 0; //move down
	move = 35; //number of pixels moved per move
	moveLR = 28; //number of pixels moved by frog in left or right move
	numLives = 3; 
	levelNum = 1;
	time = 0;
	score = 0;
	highScore = 0;
	milliseconds = 50;
	spriteX = 11; //x coordinate to start clipping 
	spriteY = 367; //y coordinate to start clipping
	initialize_logs();
	initialize_vehicles();
}

function initialize_logs(){
	log = new Array();
	logVertPosition = 11;
	for (var i = 0; i < 5; i++){
		log[i] = new Object();
		log[i].y = frogCurrY - logVertPosition*move;
		log[i].height = 30;
		logVertPosition--;
	}
	log[0].width = 116;
	log[1].width = 179;
	log[2].width = 179;
	log[3].width = 83;
	log[4].width = 179;
	log[0].x = 0 - log[0].width;
	log[1].x = 399;
	log[2].x = 0 + log[2].width;
	log[3].x = 0 + log[3].width;
	log[4].x = 0 - log[4].width;
	log[0].speed = .05;
	log[1].speed = .05;
	log[2].speed = .075;
	log[3].speed = .05;
	log[4].speed = .05;
}

function initialize_vehicles(){
	vehicle = new Array();
	vehicleVertPosition = 5;
	for (var i = 0; i < 5; i++){
		vehicle[i] = new Object();
		vehicle[i].y = frogCurrY - vehicleVertPosition*move;
		vehicleVertPosition--;
	}
	vehicle[0].speed = .075;
	vehicle[1].speed = .05;
	vehicle[2].speed = .075;
	vehicle[3].speed = .05;
	vehicle[4].speed = .025;
	vehicle[0].width = 50;
	vehicle[1].width = 33;
	vehicle[2].width = 40;
	vehicle[3].width = 26;
	vehicle[4].width = 26;
	vehicle[0].x = 399 - 2*vehicle[0].width;
	vehicle[1].x = 0 + vehicle[1].width;
	vehicle[2].x = 399;
	vehicle[3].x = 0;
	vehicle[4].x = 399 - 4*vehicle[4].width;
	vehicle[0].height = 21;
	vehicle[1].height = 32;
	vehicle[2].height = 30;
	vehicle[3].height = 26;
	vehicle[4].height = 28;
}

function animation(){
	clear_canvas();
	draw_background();
	draw_lives(numLives);
	draw_level(levelNum);
	draw_score(score, highScore);
	draw_game();
	check_death();
	increment_logs();
	increment_vehicles();
	check_off_board_log();
	check_off_board_vehicle();
	time++;
}

function clear_canvas(){
	ctx.clearRect(0, 0, 399, 565);
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

function draw_game(){
	draw_logs();
	draw_vehicles();
	draw_frogger();
}

function draw_frogger(){
	ctx.drawImage(img, spriteX, spriteY, frogWidth, frogHeight, frogCurrX, frogCurrY, frogWidth, frogHeight);
}

function draw_logs(){
	//medium log
	ctx.drawImage(img, 8, 196, 116, 30, log[0].x, log[0].y, 116, 30);
	//long log
	ctx.drawImage(img, 8, 162, 179, 30, log[1].x, log[1].y, 179, 30);
	//long log
	ctx.drawImage(img, 8, 162, 179, 30, log[2].x, log[2].y, 179, 30);
	//short log
	ctx.drawImage(img, 8, 228, 83, 30, log[3].x, log[3].y, 83, 30);
	//long log
	ctx.drawImage(img, 8, 162, 179, 30, log[4].x, log[4].y, 179, 30);
}

function draw_vehicles(){
	//white truck
	ctx.drawImage(img, 103, 300, 50, 21, vehicle[0].x, vehicle[0].y, 50, 21);
	//red white car
	ctx.drawImage(img, 42, 262, 33, 32, vehicle[1].x, vehicle[1].y, 33, 32);
	//purple car
	ctx.drawImage(img, 8, 263, 32, 30, vehicle[2].x, vehicle[2].y, 32, 30);
	//tractor
	ctx.drawImage(img, 8, 298, 26, 26, vehicle[3].x, vehicle[3].y, 26, 26);
	//red yellow car
	ctx.drawImage(img, 81, 263, 26, 28, vehicle[4].x, vehicle[4].y, 26, 28);
}

function increment_logs(){
	log[0].x += move*log[0].speed;
	log[1].x -= move*log[1].speed;
	log[2].x += move*log[2].speed;
	log[3].x -= move*log[3].speed;
	log[4].x += move*log[4].speed;
}

function check_off_board_log(){
	if (log[0].x > 399){
		log[0].x = 0 - log[0].width;
	}
	if (log[1].x + log[1].width < 0){
		log[1].x = 399 + log[1].width;
	}
	if (log[2].x > 399){
		log[2].x = 0 - log[2].width;
	}
	if (log[3].x + log[3].width < 0){
		log[3].x = 399 + log[3].width;
	}
	if (log[4].x > 399){
		log[4].x = 0 - log[4].width;
	}
}

function increment_vehicles(){
	vehicle[0].x -= move*vehicle[0].speed;
	vehicle[1].x += move*vehicle[1].speed;
	vehicle[2].x -= move*vehicle[2].speed;
	vehicle[3].x += move*vehicle[3].speed;
	vehicle[4].x -= move*vehicle[4].speed;
}

function check_off_board_vehicle(){
	if (vehicle[0].x + vehicle[0].width < 0){
		vehicle[0].x = 399 + vehicle[0].width;
	}
	if (vehicle[1].x > 399){
		vehicle[1].x = 0 - vehicle[1].width;
	}
	if (vehicle[2].x + vehicle[2].width < 0){
		vehicle[2].x = 399 + vehicle[2].width;
	}
	if (vehicle[3].x > 399){
		vehicle[3].x = 0 - vehicle[3].width;
	}
	if (vehicle[4].x + vehicle[4].width < 0){
		vehicle[4].x = 399 + vehicle[4].width;
	}
}

function check_intersection(b1x, b1y, b1w, b1h, b2x, b2y, b2w, b2h){
	if ((b1x >= b2x + b2w) || (b1y >= b2y + b2h) ||
		(b2x >= b1x + b1w) ||(b2y >= b1y + b1h)){
			return false;
	}
	return true;
}

function check_death(){
	if (check_drown() || check_vehicle_hit()){
		ctx.drawImage(deadFrog, 0, 0, 30, 30, frogCurrX, frogCurrY, 30, 30);
		frogCurrX = 185; 
		frogCurrY = 495; 
		spriteX = 11; 
		spriteY = 367; 
	}
}
		
function check_drown(){ 
	for (var i = 0; i < log.length; i++){ 
		if (check_intersection(frogCurrX, frogCurrY, frogWidth, frogHeight, log[i].x, log[i].y, log[i].width, log[i].height)){
			return false;
		}
	}
	if (frogCurrY > 273){
		return false;
	}
	for (var i = 0; i < lilly_pads.length; i++){
		if (check_intersection(frogCurrX, frogCurrY, frogWidth, frogHeight, lilly_pads[i].x, lilly_pads[i].y, lilly_pads[i].width, lilly_pads[i].height)){
			return false;
		}
	}
	return true;
}

function check_vehicle_hit(){
	for (var i = 0; i < 5; i++){
		if (check_intersection(frogCurrX, frogCurrY, frogWidth, frogHeight, vehicle[i].x, vehicle[i].y, vehicle[i].width, vehicle[i].height)){
			return true;
		}
	}
	return false;
}	

function check_key_press(){
	document.addEventListener("keydown", function(event){
		if (event.keyCode == 38){
			upMove();
		}	
		if (event.keyCode == 40){
			downMove();
		}
		if (event.keyCode == 37){
			leftMove();
		}
		if (event.keyCode == 39){
			rightMove();
		}
	});
}

function upMove(){
	if (frogCurrY - move >= 75){
		frogCurrY -= move;
		spriteX = 11;
		spriteY = 367;
	}
}

function downMove(){
	if (frogCurrY + move <= 495){
		frogCurrY += move;
		spriteX = 79;
		spriteY = 367;
	}
}

function leftMove(){
	if (frogCurrX - moveLR >= 0){
		frogCurrX -= moveLR;
		spriteX = 80;
		spriteY = 334;
	}
}

function rightMove(){
	frogCurrX += moveLR;
	spriteX = 11;
	spriteY = 333;
}