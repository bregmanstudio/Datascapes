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
	loadPixels(); // A faster way to access screen image data
	idx = int(4*(round(mouseY)*width+round(mouseX))); // 4 values per pixel RGBA
	c = color(pixels[idx+0],pixels[idx+1],pixels[idx+2]); // color channels RGB,(+A)
	fill(c); // set the fill color to the retrieved color value
	rect(mouseX+10,mouseY,30,30); // display the color of 1 pixel as a large square
	fill(255);
	text("r="+red(c)+", g="+green(c)+", b="+blue(c),5,10);
}