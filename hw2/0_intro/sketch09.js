var x = 0; // Declare a global variable, this will be updated in draw()
var y; // Random height
var c; // Random color

function setup(){
  createCanvas(400,300); 
  background(0); 
  noStroke(); // Turn off shape outlines
  colorMode(HSB,360,1,1,100); // Set Mode to: Hue, Saturation, Brighness
  y = height / 2;
  c = random(360);
}

function draw(){
  background(0,1,0,10)
  fill(c, 1, 1); // hue, saturation, brightness
  ellipse(x, y, 10, 10);

  // Update rules
  x = (x + 4) % width; // wrap at screen edge
  y = constrain(y+random(-10,10), 5, height); // stay on screen
  c = constrain(c+random(-10,10), 0, 360); // stay within 360 degrees
} 