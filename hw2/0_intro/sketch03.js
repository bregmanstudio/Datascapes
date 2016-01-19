// Example of strokeWeight and stroke commands

function setup(){
  createCanvas(400,300);   
}

function draw(){
  background(255);
  fill(255); // The color of the interior
  strokeWeight(20); // The thickness of the outline stroke
  stroke(0); // The ouline stroke color 
  ellipse(width/2, 3*height/4, 30,30); // 3/4 height
}

