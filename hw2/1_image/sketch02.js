var im; // Global variable we will use to hold an image loaded from a file

function preload(){
	im = loadImage("assets/chdm_big.jpg");	
}

function setup(){
	createCanvas(400,300);
	noStroke();
}

function draw(){
	image(im, 0, 0, width, height);	// draw the image
	var c = get(mouseX,mouseY); // retrieve the color value at screen pixel coordinate
	fill(c); // set the fill color to the retrieved color value
	rect(mouseX+10,mouseY,30,30); // display the color of 1 pixel as a large square
}