var osc; // <a href="http://p5js.org/reference/#/p5.Oscillator" target=_blank>Oscillator object</a>
var env; //<a href="http://p5js.org/reference/#/p5.Env" target=_blank>ADSR Envelope object</a>(Attack-Decay-Sustain-Release)</a>
var reverb; //<a href="http://p5js.org/reference/#/p5.Reverb" target=_blank>Reverb object</a>
var p, prevp; // oscillator pitch (frequency), previous time-step pitch
var x; // horizontal plotting position

var middleC = 48; // Pitch of MiddleC 
var maj_scale = [0,2,4,5,7,9,11]; // Intervals (in half-steps) of the Western Major Scale
var diam = 8; // How big our "note heads" will be

var jitterX=10, jitterY=10; // How much to jitter in X and Y each step
var jitterP=7, jitterC=0.33; // How much to jitter in pitch and color each step
var sfX=2.5, sfY=5;

function setup() {
  createCanvas(400,300);
  colorMode(HSB,1,1,1,1); // Work in normalized HSB color space (see 0_Intro)
  rectMode(CENTER); // Position rectangles by their center point (alternative: CORNER)
  background(1,1,0); // background brightness=0 (HSB mode) 

  env = new p5.Env(.025, 1.0, .025, .2, .2, .05, .1); // aT, aL, dT, dL, sT, sL, rT
  osc = new p5.Oscillator('triangle'); // choice of waveforms, connects to master output
  osc.amp(0.0); // change amplitude to 0.0 (silence)
  osc.start();  // begin unit generator output (to soundcard)
  reverb = new p5.Reverb(); // Reverberation object
  reverb.process(osc);      // Connect osc to reverb, reverb output to master output
  frameRate(16); // set the tempo (frames/beats per second)
  p = middleC; // initial pitch is middle-C
  x = 0;       // initial screen position is left
  noStroke(); textAlign(CENTER);
}

function draw() {
  background(1.0,1.0,0.0,0.05); // color: Hue=1.0, Sat=1.0, Bright=0.0, Alpha(transparency)=0.05
  if(mouseIsPressed){
    var dp = p - prevp;  // use pitch 'backward difference' as a parameter (rate of change)
    fill(((p-middleC)/48+x/width-random(-jitterC,jitterC))/2,1,1);  // color by avg pitch + time  
    rect(x,height/2-(p-middleC)*sfY*2, dp*sfX+random(-jitterX,jitterX), dp*sfY+random(-jitterY,jitterY))
    fill(((p-middleC)/128+x/width-random(-jitterC,jitterC))/2,1,1);  // color by pitch offset by 1/2
    ellipse(x, height/2-(p-middleC)*sfY*2, random(-diam,diam), random(-diam,diam));
    synthesize(); // Make sound
    update(); // update position and pitch variables
  }
  else{
    fill(random(1),1,1);
    text("Click Me!",width/2,height/2);
  }
}

// We do all global variable updates here
function update(){
    // Update rule for position
    x = (x + 10) % width;    
    // Update rule for pitch   
    prevp = p; // assign pitch to prevp
    p = p + int(round(random(-jitterP,jitterP))); // add random jitter
    p = constrain(p, middleC-24, middleC+24);  // constrain to 4-octave range
}

// convert -ve/+ve scale steps from middleC in maj_scale to a MIDI pitch 
function mapmode(n){
	n = int(round(n));
	pc = n % maj_scale.length;
	octave = int(n / maj_scale.length);
	return maj_scale[pc] + octave*12;
}

// Begin generating a new note on the oscillator.
// This is a monophonic instrument, one voice only.
function synthesize(){
  var freq = midiToFreq( mapmode(p) );
  osc.freq(freq); // Modulate the oscillator frequency
  env.play(osc); // Modulate the oscillator amplitude
}


