var mySample;

function preload() {
	mySound = loadSound('assets/grainsST44.wav');
}

function setup(){
	createCanvas(600,400);	
	start = mySound.duration()/2-0.5;
	background(0);
	fill(255);
	mySample = new Sample(mySound);
	mySample.play();
}

function draw(){
	background(0);
	// Loop parameters continuous interaction with mouse (with SHIFT key)
	if(mouseIsPressed && (frameCount%5==0)){ // throttle the splice window control
		mySample.update();
	}
	mySample.draw();
}

// Make a javascript class for a sound Sample
function Sample(snd){
	this.speed = 1;
	this.start = 3*snd.duration()/8;
	this.dur = snd.duration()/4;

	this.snd = snd;
	this.snd.playMode('restart');

	this.play = function(){
		this.snd.loop(0, this.speed, map(mouseY,0,height,.333,3), this.start, this.dur*this.speed);		
		this.pdur=this.dur; this.pstart=this.start; this.pspeed=this.speed;
	}

	this.draw = function(){
		rect(width*this.start/this.snd.duration(), 0, width*this.dur/this.snd.duration(), height);
	}

	this.update = function(){
		// Set speed based on mouseY
		this.speed = map(mouseY, 0, height, .0625, 2); // range of speed variation
		// Set looping based on mouseX
		if(keyIsPressed && keyCode==SHIFT)
			this.dur = constrain(this.snd.duration() * mouseX/width - this.start, .1, this.snd.duration());
		else
			this.start = constrain(this.snd.duration() * mouseX/width, 0, this.snd.duration()-.1);
		// Only re-trigger loop on parameter changes (mouse may not have moved since last frame)
		if( (this.dur!=this.pdur) || (this.start!=this.pstart) || (this.speed!=this.pspeed)){
			this.play();
		}
	}
}