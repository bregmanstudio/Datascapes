var osc1; // <a href="http://p5js.org/reference/#/p5.Oscillator" target=_blank>Oscillator object</a>
var osc2; // <a href="http://p5js.org/reference/#/p5.Oscillator" target=_blank>Oscillator object</a>
var env1; //<a href="http://p5js.org/reference/#/p5.Env" target=_blank>ADSR Envelope object</a>(Attack-Decay-Sustain-Release)</a>
var env2; //<a href="http://p5js.org/reference/#/p5.Env" target=_blank>ADSR Envelope object</a>(Attack-Decay-Sustain-Release)</a>
var reverb; //<a href="http://p5js.org/reference/#/p5.Reverb" target=_blank>Reverb object</a>
var px, py; // screen 2D plot position will map to 2 x oscillator pitches
var easing = 0.2; // lag in following mouse position 

var middleC = 48; // Pitch of MiddleC 
var maj_scale = [0,2,4,5,7,9,11]; // Intervals (in half-steps) of the Western Major Scale
var diam = 8; // How big our "note heads" will be

function setup() {
  createCanvas(400,300);
  colorMode(HSB,1,1,1,1); // Work in normalized HSB color space (see 0_Intro)
  rectMode(CENTER); // Position rectangles by their center point (alternative: CORNER)
  background(1,1,0); // background brightness=0 (HSB mode) 

  env1 = new p5.Env(.025, 1.0, .025, .2, .2, .05, .1); // aT, aL, dT, dL, sT, sL, rT
  env2 = new p5.Env(.025, 1.0, .025, .2, .2, .05, .1); // aT, aL, dT, dL, sT, sL, rT
  osc1 = new p5.Oscillator('triangle'); // choice of waveforms, connects to master output
  osc2 = new p5.Oscillator('square'); // choice of waveforms, connects to master output
  osc1.amp(0.0); // change amplitude to 0.0 (silence)
  osc1.start();  // begin unit generator output (to soundcard)
  osc2.amp(0.0); // change amplitude to 0.0 (silence)
  osc2.start();  // begin unit generator output (to soundcard)
  reverb = new p5.Reverb(); // Reverberation object
  reverb.process(osc1);      // Connect osc to reverb, reverb output to master output
  reverb.process(osc2);      // Connect osc to reverb, reverb output to master output
  frameRate(16); // set the tempo (frames/beats per second)
  px = width/2; // x co-ordinate
  py = height/2; // y co-ordinate
  noStroke(); textAlign(CENTER);
}

function draw() {
  background(1.0,1.0,0.0,0.05); // color: Hue=1.0, Sat=1.0, Bright=0.0, Alpha(transparency)=0.05
  if(mouseIsPressed){
    fill(dist(mouseX, mouseY, px, py)/100.0,1,1);  // color by distance to mouse
    ellipse(px, py, diam, diam,diam);
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
    // Update rule for 2D coordinates   
    px = px + (mouseX - px) * easing;
    py = py + (mouseY - py) * easing;
    diam = constrain(diam+random(-10,10), 2, 20);
}

// convert -ve/+ve scale steps from middleC in maj_scale to a MIDI pitch 
function mapmode(n){
	n = int(round(n));
	pc = n % maj_scale.length;
	octave = int(n / maj_scale.length);
	return maj_scale[pc] + octave*12;
}

// Begin generating a new note on the oscillator.
// This is a two-voice (polyphonic) instrument, using two oscillators
function synthesize(){
  var freq;
  freq = midiToFreq( mapmode( ( px / width - 0.5) * 48 + middleC )); // x co-ordinate mapping
  osc1.freq(freq); // Modulate the oscillator frequency
  env1.play(osc1); // Modulate the oscillator amplitude
  freq = midiToFreq( mapmode( ( 0.5 - py / height) * 48 + middleC )); // y co-ordinate mapping
  osc2.freq(freq); // Modulate the oscillator frequency
  env2.play(osc2); // Modulate the oscillator amplitude
}


