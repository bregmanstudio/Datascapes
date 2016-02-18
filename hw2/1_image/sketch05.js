var im; // Global variable we will use to hold an image loaded from a file
var sz = 16; // scale up window by this amount
var n =10;	 // number of pixels in window

function preload(){
	im = loadImage("assets/chdm_big.jpg");	
}

function setup(){
	createCanvas(400,300);
	image(im, 0, 0, width, height);	// draw the image
	noStroke();
}

function draw(){
	loadPixels();
	sort(pixels);
	updatePixels();	
}
