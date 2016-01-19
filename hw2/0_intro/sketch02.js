
function setup(){
  createCanvas(400,300); // Make a canvas that is 400 px width and 300 px tall
}

function draw(){
	background(0);
	// draw ellipse with random variation
  fill(255);
  ellipse(width/2, height/2, 50,50); // Make an ellipse
  fill(127);
  ellipse(width/2, height-100, 30,30); // Make another ellipse
}

