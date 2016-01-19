function setup(){
  createCanvas(400,300); 
  background(0); 
  noStroke(); // Turn off shape outlines
  frameRate(8); // Only draw 4 frames per second
}

function draw(){
  fill(random(255),random(255),random(255)); // random color mix
  ellipse(random(width), random(height), random(200), random(200));
}	
