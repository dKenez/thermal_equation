const USER = 0;
const SIMULATION = 1;

let time = 0;
let points = [];
let state = -1;

myChord = new Chord(1, 1000, 20);

// function addNewPoint(point) {
//   var added = false;
//   if (points.length === 0) {
//     points.push(point);
//     added = true;
//   } else {
//     for (i = 0; i < points.length; i++){
//       if (point[0] === points[i][0]) {
//         points[i] = point;
//         added = true;
//         break;
//       }
//       if (point[0] < points[i][0]) {
//         var front = points.slice(0, i);
//         var back = points.slice(i);
//
//         front.push(point);
//         points = front.concat(back);;
//         added = true;
//         break;
//       }
//     }
//     if (!added) {
//       points.push(point);
//       added = true;
//     }
//   }
//   return added;
// }

function setup() {
  // put setup code here
    createCanvas(windowWidth, windowHeight);
}


function draw() {
  // put drawing code here
    background(220);

    if (state == USER) {
      beginShape();

      stroke(0);
      noFill();
      for (p of myChord.points) {
        vertex(p[0], p[1]);
      }
      endShape();

    }

    else if (state == SIMULATION) {

    }
}

// function mousePressed() {
//   state = USER;
//   drawing = [];
//   time = 0;
//   path = [];
// }

function mouseReleased() {
  if (state === USER){
    console.log(myChord.newPoint([mouseX, mouseY]));
    console.log(myChord.points);
  }
  return false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyTyped() {
  if (key === 's') {
    state = SIMULATION;



  } else if (key === 'd') {
    state = USER;
  } else if (key === 'r' && state === USER) {
    points = [];
  }

  return false;
}
