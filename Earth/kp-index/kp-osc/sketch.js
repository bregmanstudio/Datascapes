var osc; // this is the oscillator we will hear
var modulator; // this oscillator will modulate the amplitude of the osc
var fft; // we'll visualize the waveform 
var waveform;
var spectum;
var kpdata;
var ki = 0;

function preload(){
  kpdata = loadTable("assets/kp-index.csv", "csv", "header");
}

function setup() {
  createCanvas(750,457);
  noFill();
  background(30); // alpha
  colorMode(HSB,1);

  osc = new p5.Oscillator('sawtooth'); // connects to master output by default
  osc.freq(55);
  osc.amp(0);
  // osc's amp is 0 by default, giving our modulator total control

  osc.start();
  // create an fft to analyze the audio
  fft = new p5.FFT(0.25,1024);
}

function draw() {
  background(0,0,0,1); // alpha

  // map mouseY to moodulator freq between 0 and 20hz
  var freq = kpdata.getNum(ki, 1);
  freq = midiToFreq( freq * 3 + 60 )
  osc.freq(freq);

  var amp = map(mouseX, 0, width, 0, 1);
  osc.amp(amp, 0.00); // fade time of 0.1 for smooth fading

  // analyze the waveform
  spectrum = fft.analyze();
  waveform = fft.waveform();
  // draw the shape of the waveform
  drawWaveform();

  drawText(kpdata.getString(ki,0), amp);
  ki = (ki + 1);
}

function drawWaveform() {
  strokeWeight(1);
  stroke(6/17,1,1);
  beginShape();
  for (var i = 0; i<waveform.length; i++){
    var x = map(i, 0, waveform.length, 0, width);
    var y = map(waveform[i], -1, 1, -height/2, height/2);    
    vertex(x, y + height/2);
  }
  endShape();
  stroke(11/17,1,1);
  beginShape();
  for (var i = 0; i<spectrum.length; i++){
    var x = map(i, 0, spectrum.length, 0, width);
    var y = map(spectrum[i], 0, 255, height/2, 0);
    vertex(x, y + height/2);
  }
  endShape();
}

function drawText(date, amp) {
  stroke(3/17,1,1);
  strokeWeight(1);
  text('Date: ' + date, 20, 20);
  text(' Amp: ' + amp.toFixed(3), 20, 40);
}