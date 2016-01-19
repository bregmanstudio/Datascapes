
function setup(){
  createCanvas(400,300); // Make a canvas that is 400 px width and 300 px tall
}

function draw(){
  // draw ellipse with random variation
  stroke(random(255));
  strokeWeight(random(50));
  ellipse(width/2+random(-100,100), height/2+random(-100,100), random(50),random(50)); // Make an ellipse
}

