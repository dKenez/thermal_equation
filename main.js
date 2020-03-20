const USER = 0;
const SIMULATION = 1;

let time = 0;
let timeStart = 0;
let timeInt = 0.1;
let timePrev = 0;
let points = [];
let state = -1;
let test = false;


myChord = new Chord(10, 100, 20);
console.log(myChord.thermalCoeff);
console.log(myChord.res);
console.log(myChord.fourierRes);

function setup() {
  // put setup code here
    createCanvas(windowWidth, windowHeight);
}


function draw() {
  // put drawing code here

    if (state == USER) {
      background(220);
      beginShape();

      stroke(0);
      noFill();
      for (p of myChord.points) {
        vertex(p[0], p[1]);
      }
      endShape();

    }

    else if (state == SIMULATION) {
      t = (millis() / 1000) - timeStart;
      if (t - timePrev > timeInt) {
        background(220);
        timePrev = t;
        // console.log(t);
        myChord.getPoints(t);
        translate(myChord.displacement[0], myChord.displacement[1]);

        if (!test) {
          // console.log(myChord.shape.length);
          // console.log(myChord.shape);

          test = true;
        }
        beginShape();
        stroke(0);
        noFill();
        for (p of myChord.shape) {
          vertex(p[0], p[1]);
        }
        endShape();

        translate(-myChord.displacement[0], -myChord.displacement[1]);
        beginShape();
        stroke(0);
        noFill();
        for (p of myChord.points) {
          vertex(p[0], p[1]);
        }
        endShape();
      }
    }


}


function mouseReleased() {
  if (state === USER){
    myChord.newPoint([mouseX, mouseY]);
  }
  return false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyTyped() {
  if (key === 's') {
    state = SIMULATION;
    myChord.mirrorPoints();

    myChord.calcFuncList();
    myChord.fourierCalc();

    timeStart = millis() / 1000;
    timePrev = timeStart;


  } else if (key === 'd') {
    state = USER;
  } else if (key === 'r' && state === USER) {
    myChord.points = [];
  } else if (key === 'x') {
    console.log(myChord.shape);
    console.log(myChord.E_k);
  }

  return false;
}
