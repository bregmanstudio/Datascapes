
function setup(){
  createCanvas(400,300); // Make a canvas that is 400 px width and 300 px tall
  background(0); // Set background here for static sketches
}

function draw(){
  // draw ellipse with a thick outline, interior and exterior different tertiary colors
  stroke(127,127,255);
  strokeWeight(20);
  fill(255,127,127);
  ellipse(width/2, height/2, 100, 60);

  // draw a fat 15-pixel point, set its color with stroke()
  strokeWeight(15);
  stroke(127,255,127);
  point(width/2,height/2);
}

