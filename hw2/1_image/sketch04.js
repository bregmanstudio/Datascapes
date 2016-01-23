var im; // Global variable we will use to hold an image loaded from a file
var sz = 16; // scale up window by this amoubt
var n =10;	 // number of pixels in window

function preload(){
	im = loadImage("assets/chdm_big.jpg");	
}

function setup(){
	createCanvas(400,300);
	noStroke();
	loadPixels();
}

function draw(){
	image(im, 0, 0, width, height);	// draw the image
	loadPixels(); // A faster way to access screen image data
	for(x=0; x<n; x++){ // loop over sz*sz grid in x-direction (across)
		for(y=0; y<n; y++){ // loop over sz*sz grid in y-direction (down)
			idx = int(4*(round(mouseY+y)*width+round(mouseX+x))); // 4 values per pixel RGBA
			c = color(pixels[idx+0],pixels[idx+1],pixels[idx+2])
			fill(c); // set the fill color to the retrieved color value
			rect(mouseX+sz*x,mouseY+sz*y,sz,sz); // display the color of 1 pixel as a large square
		}
	}
}
