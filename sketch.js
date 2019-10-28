var cnv;
var t = 0;
var a = 0;
var b = 0;
var c = 0;
var d = 1;
var e = 1;
var f = 1;

function setup() {
  //the canvas is set inside a div element #tela from the html code so that all h1 elements and the canvas are in the same position
  cnv = createCanvas(windowWidth,windowHeight);
  cnv.parent('#tela');

  colorMode(HSB,1);
  noStroke();

  //create a button selecting an element from the html code, and set the function oh pressing that element specified by the id
  // did this for the color and for the size
  var buttonColor = select("#colors");
  buttonColor.mousePressed(function(changeColor){
    a =  random(0, 1);
    b =  random(0, 1);
    c =  random(0, 1);
  });

  var buttonSize = select("#size");
  buttonSize.mousePressed(function(changeSize){
    d = random()*5;
    e = random()*5;
    f = random()*5;
  });

}

//set the function that draw the three blobs in the canvas and that will be modified by the upper function
// to do this, i created variables that added, substracted or multiplied to the initial values of the draw function

function draw() {
  push();
  blendMode(BLEND);
  background(0.98);
	blendMode(DARKEST);

  fill(0.67+a, 1-b, 1-c, 0.67);
  blob(100*d, width/2 + noise(t/2) * 200 - 100, height/2 + noise(t/2 + 1) * 200 - 100, 0.75, t);

  fill(0.16+a, 1-b, 1-c, 0.67);
  blob(100*e, width/2 + noise(t/2 + 2) * 200 - 100, height/2 + noise(t/2 + 3) * 200 - 100, 0.75, t + 1);

  fill(0+a, 1-b, 1-c, 0.67);
  blob(100*f, width/2 + noise(t/2 + 4) * 200 - 100, height/2 + noise(t/2 + 5) * 200 - 100, 0.75, t + 2);

  t += 0.005;
  pop();
}

function blob(size, xCenter, yCenter, k, t) {
  beginShape();
  for (var theta = 0; theta < 2 * PI; theta += 0.01) {
    var r1, r2;
    if (theta < PI/2) {
      r1 = cos(theta);
      r2 = 1;
    } else if (theta < PI) {
      r1 = 0;
      r2 = sin(theta);
    } else if (theta < 3 * PI/2) {
      r1 = sin(theta);
      r2 = 0;
    } else {
      r1 = 1;
      r2 = cos(theta);
    }
    var r = size + noise(k * r1, k * r2, t) * (2/3) * size;
    var x = xCenter + r * cos(theta);
    var y = yCenter + r * sin(theta);
    curveVertex(x, y);
  }
  endShape();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
