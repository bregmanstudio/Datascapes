
function setup(){
  createCanvas(400,300); 
  background(0); 
  noStroke(); // Turn off shape outlines
}

function draw(){
  fill(255,0,255,32); // Fourth argument is transpareny: 0=transparent, 255=opaque
  ellipse(width/2+50, height/2, 200, 200);

  fill(0,255,255,32); // Fourth argument is transpareny: 0=transparent, 255=opaque
  ellipse(width/2-50, height/2, 200, 200);
}

