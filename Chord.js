class Chord {
  constructor(thermalCoeff, res, fourierRes) {
    this.length = length;
    this.thermalCoeff = thermalCoeff;
    this.res = res;
    this.fourierRes = fourierRes;
    this.points = [];
    this.mirroredPoints = []; // valtozas 20/03/19
    this.displacement = False; // valtozas 20/03/19
  }

  newPoint(point) {
    var added = false;
    if (this.points.length === 0) {
      this.points.push(point);
      added = true;

    } else {
      var i;
      for (i = 0; i < this.points.length; i++){
        if (point[0] === this.points[i][0]) {
          this.points[i] = point;
          added = true;
          break;
        }
        if (point[0] < this.points[i][0]) {
          var front = this.points.slice(0, i);
          var back = this.points.slice(i);

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
    return added;
  }

  mirrorPoints() { // valtozas 20/03/19
    this.displacement = this.points[0];
    var i = 0;
    var x;
    var y;
    for (p of this.points) {
      if (i === 0) {
        this.mirroredPoints.push([0, 0]);
      } else {
        x = p[0] - this.displacement[0];
        y = p[1] - this.displacement[1];
        this.mirroredPoints.push([x, y]);
        this.mirroredPoints.unshift([-x, -y]);
      }
      i++;
    }
    this.mirroredPoints.concat()
  }

}
