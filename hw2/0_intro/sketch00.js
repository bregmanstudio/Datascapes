

var ex1 = function( p ) {
  var jitterX=10, jitterY=10, jitterD=50;
  var x, y, diam=20;
  var c;
  p.setup = function() {
    c = p.createCanvas(p.random(300)+100,p.random(300)+200);
    x = c.width/2;
    y = c.height/2;
    p.noStroke();
  };

  p.draw = function() {
    p.background(0,1); 
    p.fill(p.random(255)); 
    p.ellipse(x+p.random(-jitterX,jitterX), y+p.random(-jitterY,jitterY), diam+p.random(-jitterD,jitterD), diam+p.random(-jitterD,jitterD));
    x = x + p.random(-jitterX, jitterX); 
    y = y + p.random(-jitterY,jitterY);
    x = p.constrain(x, 0, c.width);
    y = p.constrain(y, 0, c.height);
  };
};

var c1p5 = new p5(ex1, "example01");
var c2p5 = new p5(ex1, "example02");
