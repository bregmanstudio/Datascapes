function setup(){
  createCanvas(400,300); 
  background(0); 
  noStroke(); // Turn off shape outlines
  frameRate(8); // Only draw 4 frames per second
  colorMode(HSB,360,1,1); // Set Mode to: Hue, Saturation, Brighness
}

function draw(){
  fill(random(360),1,random(0.5)+0.5); // random hue, random brightness
  ellipse(random(width), random(height), random(200), random(200));
}	
