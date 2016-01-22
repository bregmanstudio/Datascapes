var im;

function preload(){
	im = loadImage("assets/chdm_big.jpg");	
}

function setup(){
	createCanvas(400,300);
	background(0);
}

function draw(){
	image(im, 0, 0, width, height);	
}