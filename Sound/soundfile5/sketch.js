var pks, fft, filter, res, reverb, rt;

function preload() {
  mySound = loadSound('assets/grainsST44.wav');
}

function setup() {
	createCanvas(600,400);
 	mySound.playMode('sustain');
  fft = new p5.FFT();
  filter = new p5.BandPass();
  reverb = new p5.Reverb();
  mySound.disconnect(); mySound.connect(filter); 
  filter.disconnect(); filter.connect(reverb);
  res = 1; filter.res(res);filter.amp(2);
  rt = 0.1; reverb.set(rt);reverb.amp(2);
  mySound.amp(2);
  colorMode(HSB,1);
}

function draw(){
	background(0);
	filter.freq(map(mouseX,0,width,50,20000));
	mySound.rate(map(mouseY,0,height,.03125,2));
  fft.analyze();
	if(mySound.isPlaying()){
		pk = fft.getEnergy(20,20000) / 255 ;
		fill(0.5-pk,1,1);
		pk *= width;
		ellipse(width/2, height/2, pk, pk);
	}
}

function mousePressed(){
	if(mySound.isPlaying())
		mySound.pause();
	else
		mySound.loop();
}

function keyTyped(){

	// Filter resonance +/- R/r 
	if(key=='r' || key=='R'){
		if(key == 'r')
			res  /= 1.05;
		if(key == 'R')
			res *= 1.05;
	  res = constrain(res, 1, 100);
	  filter.res(res);
	}

	// Reverb time +/- V/v 
	if(key=='v' || key=='V'){
		if(key == 'v')
			rt /= 1.1;
		if(key == 'V')
			rt *= 1.1;
	  rt = constrain(rt, .001, 10);
	  reverb.set(rt);
	}

}