const USER = 0;
const SIMULATION = 1;

let time = 0;
let timeStart = 0;
let timeInt = 0.1;
let timePrev = 0;
let points = [];
let state = -1;

myChord = new Chord(50, 100, 50);

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

      background(220);
      timePrev = t;
      // console.log(t);
      beginShape();
      stroke(80);
      noFill();
      for (p of myChord.points) {
        vertex(p[0], p[1]);
      }
      endShape();

      myChord.getPoints(t);
      translate(myChord.displacement[0], myChord.displacement[1]);

      let pPrev = [0, 0];
      for (p of myChord.shape) {
        colorMode(HSB);
        let midY = (pPrev[1] + p[1]) / 2;
        let H = map(midY, myChord.minY, myChord.maxY, 0, 100, true);
        stroke(H, 204, 204);
        noFill();
        line(pPrev[0], pPrev[1], p[0], p[1]);
        pPrev[0] = p[0];
        pPrev[1] = p[1];
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
    // console.log(myChord.E_k);
  }

  return false;
}
