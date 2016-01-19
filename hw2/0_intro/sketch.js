
var jitterX=10, jitterY=10, jitterD=50;
var x, y, diam=20;

function setup() {
  var theCanvas = createCanvas(400,400);
  theCanvas.parent("example01");
  background(0);
  x=width/2;
  y = height/2;
  noStroke();
}

function draw() {
  background(0,1); 
  fill(random(255)); 
  ellipse(x+random(-jitterX,jitterX), y+random(-jitterY,jitterY), diam+random(-jitterD,jitterD), diam+random(-jitterD,jitterD));
  x = x + random(-jitterX, jitterX); 
  y = y + random(-jitterY,jitterY);
  x = constrain(x, 0, width);
  y = constrain(y, 0, height);
}
