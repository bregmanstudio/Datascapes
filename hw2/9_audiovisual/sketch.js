var osc; // this is the oscillator we will hear
var p, x, prevp;
var env;
var reverb;

var middleC = 48;
var maj_scale = [0,2,4,5,7,9,11];
var diam = 8;

var jitterX=10, jitterY=10;
var jitterP=7, jitterC=0.33;
var sfX=2.5, sfY=5;

function setup() {
  createCanvas(1380,900);
  colorMode(HSB,255,255,255,255);
  rectMode(CENTER);
  background(255,255,0);
  env = new p5.Env(.025, 1.0, .025, .2, .2, .05, .1);
  osc = new p5.Oscillator('sawtooth'); // connects to master output by default
  osc.amp(0.0);
  osc.start();
  reverb = new p5.Reverb();
  reverb.process(osc);
  frameRate(16); // tempo
  p = middleC; // initial pitch is middle-C
  x = 0;
  noStroke();
}

function draw() {
  background(0,255,32,4);	
  var dp = p - prevp;  
  fill(255*(p/48+x/width-random(-jitterC,jitterC))/2,255,255);  // color by avg pitch + time  
  rect(x,height/2-(p-middleC)*sfY*2, dp*sfX+random(-jitterX,jitterX), dp*sfY+random(-jitterY,jitterY))
  fill(255*(p/128+x/width-random(-jitterC,jitterC))/2,255,255);  // color by pitch offset by 1/2
  ellipse(x, height/2-(p-middleC)*sfY*2, random(-diam,diam), random(-diam,diam));
  x = (x + 10) % width;
  synthesize();
}

function mapmode(n){
	n = int(round(n))
	pc = n % maj_scale.length
	octave = int(n / maj_scale.length)
	return maj_scale[pc] + octave*12
}

function synthesize(){
  var freq = midiToFreq( mapmode(p) );
  osc.freq(freq);
  env.play(osc);
  // Update rules
  prevp = p;
  p = p + int(round(random(-jitterP,jitterP)));
  p = constrain(p, middleC-36, middleC+36);  
}


