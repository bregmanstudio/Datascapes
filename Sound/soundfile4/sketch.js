var snds = []; // an array of soundfiles to load
var samples = [] // an array of interactive sample objects to play 
var numSounds = 5; // specify how many copies of the soundfile to load

function preload() {
	for(var i=0; i<numSounds; i++)
		snds.push(loadSound('assets/grainsST44.wav'));
}

function setup(){
	createCanvas(960,540);	
	sampleHeight = height/snds.length;
	for(var i=0; i<snds.length; i++){ // initialize sample objects
		samples.push(new Sample(snds[i], random(0.05, 1), i*(sampleHeight), .9*sampleHeight));
		samples[i].play();
	}
	strokeWeight(2);
}

function draw(){
	background(0,20);
	if(frameCount%5==0) { // throttle the splice window control{
		for(var i=0; i<samples.length; i++)
			samples[i].update();
	}
	for(var i=0; i<samples.length; i++)
		samples[i].draw();
}

// Make a javascript class for a sound Sample
function Sample(snd, amp, y, height){	
	this.minSpeed=.0625;
	this.maxSpeed=2;
	this.speed = random(this.minSpeed,this.maxSpeed);
	this.start = snd.duration() * random(0.9);
	this.dur = random(max(0.1,snd.duration()-this.start));
	this.angle = random(2 * Math.PI);
	this.amp = amp;
	this.snd = snd;
	this.snd.playMode('restart');
	this.snd.amp(amp);
	this.y = y;
	this.height = height;
	this.grabbed=false;
	this.vdur=.2;
	this.vstart=.1;
	this.vspeed=.01;
	this.flipCount = int(random(4,16));

	this.play = function(){
		this.snd.loop(0, this.speed, map(this.speed,0, 2, .333, 3), this.start, this.dur*this.speed);		
		this.pdur=this.dur; this.pstart=this.start; this.pspeed=this.speed;
	}

	this.draw = function(){
		ellipseMode(CORNER);
		colorMode(HSB,2*Math.PI,1,1);
		stroke((this.angle+Math.PI/3)%(2*Math.PI),1,1); this.angle=(this.angle+.001)%(2*Math.PI);
		fill((this.angle-Math.PI/3)%(2*Math.PI),1,1,this.amp);
		rect(width*this.start/this.snd.duration(), this.y, width*this.dur/this.snd.duration(), this.height);
		fill(this.angle,1,1,this.amp);
		ellipse(width*this.start/this.snd.duration(), this.y+this.height*(1-this.speed/this.maxSpeed)-3, width*this.dur/this.snd.duration(), 6);
	}

	this.update = function(){
		if(this.grabbed){
			// Set speed based on mouseY within sample graphic
			this.speed = constrain(map(mouseY-this.y, this.height, 0, this.minSpeed, this.maxSpeed), this.minSpeed, this.maxSpeed); 
			// Set looping based on mouseX
			if(keyIsPressed && keyCode==SHIFT)
				this.dur = constrain(this.snd.duration() * mouseX/width - this.start, .1, this.snd.duration());
			else
				this.start = constrain(this.snd.duration() * mouseX/width - this.dur/2, 0, this.snd.duration()-.1);
			// Only re-trigger loop on parameter changes (mouse may not have moved since last frame)
			if((this.dur!=this.pdur) || (this.start!=this.pstart) || (this.speed!=this.pspeed))
				this.play();
		}
		if(frameCount%this.flipCount==0){ // random jitter, if implemented
			this.start = constrain(this.start+random(-this.vstart/2,this.vstart/2),0,this.snd.duration()-0.1);
			this.dur = constrain(this.dur+random(-this.vdur/2,this.vdur/2),0.1,this.snd.duration()-this.start);
			this.speed = constrain(this.speed+random(-this.vspeed/2,this.vspeed/2),this.minSpeed,this.maxSpeed);
			this.play();
		}
	}

	this.checkIfGrabbed = function() {
		if(mouseY>=this.y && mouseY<this.y+this.height){
			this.grabbed=true;
		}
	}

	this.releaseGrabbed = function(){ // create motion (jitter)
		if(this.grabbed){
			this.grabbed=false; 
			if(keyIsPressed && keyCode==SHIFT)
				this.vdur = constrain((this.snd.duration()-this.start) * (mouseX-pmouseX) / width, 0.1, this.snd.duration()-this.start);
			else
				this.vstart = constrain(this.start * (mouseX-pmouseX) / width, 0.0, this.snd.duration()-this.start);
			console.log(this.vstart+", "+this.vdur)
		}
	}
}

function mousePressed(){
	for(var i=0; i<samples.length; i++)
		samples[i].checkIfGrabbed();
}

function mouseReleased(){
	for(var i=0; i<samples.length; i++)
		samples[i].releaseGrabbed();
}
