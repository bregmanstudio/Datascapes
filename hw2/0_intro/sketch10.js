var osc;

function setup(){
  createCanvas(400,300); // Make a canvas that is 400 px width and 300 px tall
  osc = new p5.Oscillator("triangle"); // Triangle wave oscillator
  osc.amp(0.0); // Set the amplitude
  osc.start()
  fill(255);
}

function draw(){
  background(0,10); // grayscale with transparency
  // draw ellipse with random variation
  if(mouseIsPressed){
  	ellipse(mouseX,mouseY,20,20);
  	osc.amp(map(mouseY,height,0,0,1)); // map mouseY to 0 bottom of screen, 1 top.
  	osc.freq(map(mouseX,0,width,50,1000)); // map mouseX to 50Hz-1000Hz
  }
  else{
  	osc.amp(0.0); // mute when mouse released
  }
}

