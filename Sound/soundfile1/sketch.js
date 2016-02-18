var speed=1, start=0, dur=1, pspeed, pstart, pdur;

function preload() {
	mySound = loadSound('assets/grainsST44.wav');
}

function setup(){
	createCanvas(600,400);	
	start = mySound.duration()/2-0.5;
	background(0);
	fill(255);
	rect(width*start/mySound.duration(), 0, width*dur/mySound.duration(), height);
	mySound.loop(0,speed, 1, start, dur);
	mySound.playMode('restart');
	pspeed=speed; pstart=start; pdur=dur;
}

function draw(){
	// Loop parameters continuous interaction with mouse (with SHIFT key)
	if(mouseIsPressed && (frameCount%5==0)){ // throttle the splice window control
		// Set speed based on mouseY
		speed = map(mouseY, 0, height, .0625, 2); // range of speed variation
		// Set looping based on mouseX
		if(keyIsPressed && keyCode==SHIFT)
			dur = constrain(mySound.duration() * mouseX/width - start, .1, mySound.duration());
		else
			start = constrain(mySound.duration() * mouseX/width, 0, mySound.duration()-.1);
		// Only re-trigger loop on parameter changes (mouse may not have moved since last frame)
		if( (dur!=pdur) || (start!=pstart) || (speed!=pspeed)){
			mySound.loop(0, speed, map(mouseY,0,height,.333,3), start, dur*speed);
			pdur=dur; pstart=start; pspeed=speed;
		}
		background(0); 		// Re-draw start and end points as filled rectangle
		rect(width*start/mySound.duration(), 0, width*dur/mySound.duration(), height);
	}
}
