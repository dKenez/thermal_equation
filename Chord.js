class Chord {
  constructor(thermalCoeff, res, fourierRes) {
    this.length = length;
    this.thermalCoeff = thermalCoeff;
    this.res = res;
    this.fourierRes = fourierRes;
    this.points = [];
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

}
