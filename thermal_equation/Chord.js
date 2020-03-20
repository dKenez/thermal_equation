class Chord {
  constructor(thermalCoeff, res, fourierRes) {
    this.length = 0;
    this.thermalCoeff = thermalCoeff;
    this.res = res;
    this.fourierRes = fourierRes;
    this.points = [];
    this.mirroredPoints = []; // valtozas 20/03/19
    this.displacement = false; // valtozas 20/03/19
    this.funcList = [];
    this.grad = [];
    this.E_k = [];
    this.alpha_k = [];
    this.shape = [];
    this.maxY = 0;
    this.minY = 0;
  }

  newPoint(point) {
    let added = false;
    if (this.points.length === 0) {
      this.points.push(point);
      added = true;

    } else {
      for (let i = 0; i < this.points.length; i++){
        if (point[0] === this.points[i][0]) {
          this.points[i] = point;
          added = true;
          break;
        }
        if (point[0] < this.points[i][0]) {
          let front = this.points.slice(0, i);
          let back = this.points.slice(i);

          front.push(point);
          this.points = front.concat(back);;
          added = true;
          break;
        }
      }
      if (!added) {
        this.points.push(point);
        added = true;
      }
    }

    this.length = this.points[this.points.length-1][0] - this.points[0][0]
    return added;
  }

  calcGradFunc() {
      // ax + b
      let a = (this.points[this.points.length-1][1] - this.points[0][1]) / (this.points[this.points.length-1][0] - this.points[0][0]);
      let b = this.points[0][1] - a * this.points[0][0];

      this.grad = a;
  }

  mirrorPoints() { // valtozas 20/03/19
    this.mirroredPoints = [];
    this.displacement = this.points[0];
    let i = 0;
    let x;
    let y;
    for (p of this.points) {
      if (i === 0) {
        this.mirroredPoints.push([0, 0]);
      } else {
        x = p[0] - this.displacement[0];
        y = p[1] - this.displacement[1] - this.grad * x;
        if (y > this.maxY) {
          this.maxY = y;
        }
        if (y < this.minY) {
          this.minY = y;
        }
        this.mirroredPoints.push([x, y]);
        this.mirroredPoints.unshift([-x, -y]);
      }
      i++;
    }
    this.mirroredPoints.concat();
  }

  calcFuncList() {
    //egyenes illesztés:
    this.funcList = [];
    for (let i = 0; i < this.mirroredPoints.length-1; i++) {
      //= a mint meredekség
      let a = (this.mirroredPoints[i+1][1] - this.mirroredPoints[i][1]) / (this.mirroredPoints[i+1][0] - this.mirroredPoints[i][0]);
      //konstans b értéke:
      let b = this.mirroredPoints[i][1] - a * this.mirroredPoints[i][0];
      //az egyenes értelmezési intervalluma a vásznon, az egér pozícióját kiolvasva a points-ból
      let x1 = this.mirroredPoints[i][0];
      let x2 = this.mirroredPoints[i+1][0];
      this.funcList.push([a, b, x1, x2]);
    }
  }

  fourierCalc() {
    //Fourier egutthatok kiszamitasa:
    this.E_k = [];
    this.alpha_k = [];
    let p = this.length;
    let c = this.thermalCoeff;
    let res = this.fourierRes;
    for (let k = 1; k < res; k++) {
      this.alpha_k.push((k * PI * c) / p);

      let b_k = 0;
      for (const func of this.funcList) {
        let a = func[0];
        let b = func[1];
        let i = func[2];
        let j = func[3];
        b_k += (-k * PI * a * j * cos((k * PI * j) / p)) + (p * a * sin((k * PI * j) / p)) + (-k * PI * b * cos((k * PI * j) / p));
        b_k += (k * PI * a * i * cos((k * PI * i) / p)) + (-p * a * sin((k * PI * i) / p)) + (k * PI * b * cos((k * PI * i) / p));
      }
      b_k *= 1 / ((PI**2) * (k**2));
      this.E_k.push(b_k);
    }
  }

  getPoints(t) {
    //Fourier sorfejtett ertekek meghatarozasa:

    this.shape = [];
    for (let i = 0; i < this.res; i++) {
      let x = (this.length / this.res) * i;
      let y = 0;
      for (let k = 0; k < this.fourierRes-1; k++){
        y += this.E_k[k] * sin((this.alpha_k[k] * x) / this.thermalCoeff) * exp(-this.alpha_k[k] * this.alpha_k[k] * t);
        // //Ha hoveszteseggel is szamolunk
        // y *= exp(-this.dampening*t);
      }
      y += this.grad * x;
      this.shape.push([x, y]);
    }
  }

}
