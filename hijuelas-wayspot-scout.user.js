// ==UserScript==
// @name         Wayfinder — S2 Overlay
// @namespace    https://hijuelas-wayspot-scout.local/
// @version      0.7.1
// @description  Herramientas Wayfinder: lectura local S14/S17 y regla empírica de 22 m sobre Wayfarer.
// @match        https://wayfarer.nianticlabs.com/new/mapview*
// @match        https://wayfarer.scopely.com/new/mapview*
// @updateURL    https://raw.githubusercontent.com/atodomorris/wayfarer_tool_s2/main/hijuelas-wayspot-scout.user.js
// @downloadURL  https://raw.githubusercontent.com/atodomorris/wayfarer_tool_s2/main/hijuelas-wayspot-scout.user.js
// @supportURL   https://github.com/atodomorris/wayfarer_tool_s2/issues
// @sandbox      raw
// @run-at       document-start
// @grant        none
// ==/UserScript==
"use strict";
(() => {
  // <define:__WAYFINDER_COUNT_ICONS__>
  var define_WAYFINDER_COUNT_ICONS_default = { pokestop: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCiAgICA8cGF0aCBkPSJNMTIgOS4yNUMxMy4wMTI1IDkuMjUgMTMuODMzMyAxMC4wNzA4IDEzLjgzMzMgMTEuMDgzM0MxMy44MzMzIDEyLjA5NTkgMTMuMDEyNSAxMi45MTY3IDEyIDEyLjkxNjdDMTAuOTg3NSAxMi45MTY3IDEwLjE2NjcgMTIuMDk1OSAxMC4xNjY3IDExLjA4MzNDMTAuMTY2NyAxMC4wNzA4IDEwLjk4NzUgOS4yNSAxMiA5LjI1WiIgZmlsbD0iY3VycmVudENvbG9yIj48L3BhdGg+DQogICAgPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMiA1LjU4MzMzQzE1LjAzNzYgNS41ODMzMyAxNy41IDguMDQ1NzcgMTcuNSAxMS4wODMzQzE3LjUgMTQuMTIwOSAxNS4wMzc2IDE2LjU4MzMgMTIgMTYuNTgzM0M4Ljk2MjQzIDE2LjU4MzMgNi41IDE0LjEyMDkgNi41IDExLjA4MzNDNi41IDguMDQ1NzcgOC45NjI0MyA1LjU4MzMzIDEyIDUuNTgzMzNaTTEyIDcuNDE2NjdDOS45NzQ5NiA3LjQxNjY3IDguMzMzMzMgOS4wNTgyOSA4LjMzMzMzIDExLjA4MzNDOC4zMzMzMyAxMy4xMDg0IDkuOTc0OTYgMTQuNzUgMTIgMTQuNzVDMTQuMDI1IDE0Ljc1IDE1LjY2NjcgMTMuMTA4NCAxNS42NjY3IDExLjA4MzNDMTUuNjY2NyA5LjA1ODI5IDE0LjAyNSA3LjQxNjY3IDEyIDcuNDE2NjdaIiBmaWxsPSJjdXJyZW50Q29sb3IiPjwvcGF0aD4NCiAgICA8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTEyIDFDMTguMDc1MSAxIDIzIDUuOTI0ODcgMjMgMTJDMjMgMTguMDc1MSAxOC4wNzUxIDIzIDEyIDIzQzUuOTI0ODcgMjMgMSAxOC4wNzUxIDEgMTJDMSA1LjkyNDg3IDUuOTI0ODcgMSAxMiAxWk0xMiAyLjgzMzMzQzYuOTM3MzkgMi44MzMzMyAyLjgzMzMzIDYuOTM3MzkgMi44MzMzMyAxMkMyLjgzMzMzIDE2Ljk1NDEgNi43NjM0NSAyMC45ODc5IDExLjY3NTkgMjEuMTU4NkMxMS42NzcyIDIwLjYxOCAxMS42Nzg2IDIwLjA3NzIgMTEuNjc4NiAxOS41MzY1VjE5LjQ0NDNDMTEuNDIwNCAxOS40NDQzIDExLjE3NDYgMTkuNDQxNyAxMC45Mjk0IDE5LjQ0NDNDMTAuNTQ2MyAxOS40NDkyIDEwLjI0MzIgMTkuMzUxMSAxMC4wNDU4IDE5LjEzNDZDOS44NDYxMyAxOC45MTU0IDkuODQ4NDEgMTguNjg2MiAxMC4wNDY3IDE4LjQ2NTlDMTAuMjM2MiAxOC4yNTU1IDEwLjUzODEgMTguMTU0MSAxMC44OTYyIDE4LjE0OTlDMTEuNjMyMiAxOC4xNDEzIDEyLjM2ODcgMTguMTQ0MyAxMy4xMDQ3IDE4LjE0OUMxMy42MzY4IDE4LjE1MjQgMTQuMDUzOCAxOC40MTA0IDE0LjEwMDEgMTguNzUxNUMxNC4xMTk1IDE4LjkwODMgMTQuMDUwMyAxOS4wNjQ2IDEzLjkwNjcgMTkuMTkwMUMxMy43NjMyIDE5LjMxNTUgMTMuNTU0NiAxOS40MDE1IDEzLjMyMTMgMTkuNDMxOEMxMy4yNzEzIDE5LjQzODMgMTMuMjIgMTkuNDQxIDEzLjE2ODIgMTkuNDQxN0gxMi4zMTY5VjE5LjUzNDdDMTIuMzE2OSAyMC4wNzYxIDEyLjMxNjkgMjAuNjE3MyAxMi4zMTc4IDIxLjE1ODZDMTcuMjMzMiAyMC45OTExIDIxLjE2NjcgMTYuOTU2MiAyMS4xNjY3IDEyQzIxLjE2NjcgNi45MzczOSAxNy4wNjI2IDIuODMzMzMgMTIgMi44MzMzM1oiIGZpbGw9ImN1cnJlbnRDb2xvciI+PC9wYXRoPg0KICA8L3N2Zz4=", gym: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCiAgICA8cGF0aCBkPSJNMTkuMDUgMjEuNTk4NEwxNi4xMjUgMTguNjk4NEwxMy45MjUgMjAuODk4NEwxMy4yMjUgMjAuMTk4NEMxMi44NDE3IDE5LjgxNTEgMTIuNjUgMTkuMzQwMSAxMi42NSAxOC43NzM0QzEyLjY1IDE4LjIwNjggMTIuODQxNyAxNy43MzE4IDEzLjIyNSAxNy4zNDg0TDE3LjQ1IDEzLjEyMzRDMTcuODMzMyAxMi43NDAxIDE4LjMwODMgMTIuNTQ4NCAxOC44NzUgMTIuNTQ4NEMxOS40NDE3IDEyLjU0ODQgMTkuOTE2NyAxMi43NDAxIDIwLjMgMTMuMTIzNEwyMSAxMy44MjM0TDE4LjggMTYuMDIzNEwyMS43IDE4Ljk0ODRDMjEuOSAxOS4xNDg0IDIyIDE5LjM4MTggMjIgMTkuNjQ4NEMyMiAxOS45MTUxIDIxLjkgMjAuMTQ4NCAyMS43IDIwLjM0ODRMMjAuNDUgMjEuNTk4NEMyMC4yNSAyMS43OTg0IDIwLjAxNjcgMjEuODk4NCAxOS43NSAyMS44OTg0QzE5LjQ4MzMgMjEuODk4NCAxOS4yNSAyMS43OTg0IDE5LjA1IDIxLjU5ODRaTTIyIDUuODk4NDRMMTAuNjUgMTcuMjQ4NEwxMC43NzUgMTcuMzQ4NEMxMS4xNTgzIDE3LjczMTggMTEuMzUgMTguMjA2OCAxMS4zNSAxOC43NzM0QzExLjM1IDE5LjM0MDEgMTEuMTU4MyAxOS44MTUxIDEwLjc3NSAyMC4xOTg0TDEwLjA3NSAyMC44OTg0TDcuODc1IDE4LjY5ODRMNC45NSAyMS41OTg0QzQuNzUgMjEuNzk4NCA0LjUxNjY3IDIxLjg5ODQgNC4yNSAyMS44OTg0QzMuOTgzMzMgMjEuODk4NCAzLjc1IDIxLjc5ODQgMy41NSAyMS41OTg0TDIuMyAyMC4zNDg0QzIuMSAyMC4xNDg0IDIgMTkuOTE1MSAyIDE5LjY0ODRDMiAxOS4zODE4IDIuMSAxOS4xNDg0IDIuMyAxOC45NDg0TDUuMiAxNi4wMjM0TDMgMTMuODIzNEwzLjcgMTMuMTIzNEM0LjA4MzMzIDEyLjc0MDEgNC41NTgzMyAxMi41NDg0IDUuMTI1IDEyLjU0ODRDNS42OTE2NyAxMi41NDg0IDYuMTY2NjcgMTIuNzQwMSA2LjU1IDEzLjEyMzRMNi42NSAxMy4yNDg0TDE4IDEuODk4NDRIMjJWNS44OTg0NFpNNi45NSAxMC44NDg0TDIgNS44OTg0NFYxLjg5ODQ0SDZMMTAuOTUgNi44NDg0NEw2Ljk1IDEwLjg0ODRaIiBmaWxsPSJjdXJyZW50Q29sb3IiPjwvcGF0aD4NCiAgPC9zdmc+", powerspot: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCiAgICA8cGF0aCBkPSJNNyAyMkwxMSAxNC41TDMgMTMuNUwxNSAySDE3TDEzIDkuNUwyMSAxMC41TDkgMjJIN1oiIGZpbGw9ImN1cnJlbnRDb2xvciI+PC9wYXRoPg0KICA8L3N2Zz4=" };

  // node_modules/nodes2ts/dist/export.js
  var R2Vector = class _R2Vector {
    constructor(_x, _y) {
      this._x = _x;
      this._y = _y;
    }
    get x() {
      return this._x;
    }
    get y() {
      return this._y;
    }
    get(index) {
      if (index < 0 || index > 1) {
        throw new Error(`Index out fo bounds error ${index}`);
      }
      return index == 0 ? this._x : this._y;
    }
    static fromPointFace(p, face) {
      return p.toR2Vector(face);
    }
    static add(p1, p2) {
      return new _R2Vector(p1._x + p2._x, p1._y + p2._y);
    }
    static mul(p, m) {
      return new _R2Vector(m * p._x, m * p._y);
    }
    norm2() {
      return this.x * this.x + this.y * this.y;
    }
    static dotProd(p1, p2) {
      return p1.x * p2.x + p1.y * p2.y;
    }
    dotProd(that) {
      return _R2Vector.dotProd(this, that);
    }
    crossProd(that) {
      return this.x * that.y - this.y * that.x;
    }
    lessThan(vb) {
      if (this.x < vb.x) {
        return true;
      }
      if (vb.x < this.x) {
        return false;
      }
      if (this.y < vb.y) {
        return true;
      }
      return false;
    }
    //
    // @Override
    // public boolean equals(Object that) {
    //   if (!(that instanceof R2Vector)) {
    //     return false;
    //   }
    //   R2Vector thatPoint = (R2Vector) that;
    //   return this.x == thatPoint.x && this.y == thatPoint.y;
    // }
    // /**
    //  * Calcualates hashcode based on stored coordinates. Since we want +0.0 and
    //  * -0.0 to be treated the same, we ignore the sign of the coordinates.
    //  */
    // @Override
    // public int hashCode() {
    //   long value = 17;
    //   value += 37 * value + Double.doubleToLongBits(Math.abs(x));
    //   value += 37 * value + Double.doubleToLongBits(Math.abs(y));
    //   return (int) (value ^ (value >>> 32));
    // }
    //
    static fromSTVector(stVector) {
      return new _R2Vector(
        _R2Vector.singleStTOUV(stVector.x),
        _R2Vector.singleStTOUV(stVector.y)
      );
    }
    // from S2Projections.stToUV (QUADRATIC)
    static singleStTOUV(s) {
      if (s >= 0.5) {
        return 1 / 3 * (4 * s * s - 1);
      } else {
        return 1 / 3 * (1 - 4 * (1 - s) * (1 - s));
      }
    }
    static singleUVToST(u) {
      if (u >= 0) {
        return 0.5 * Math.sqrt(1 + 3 * u);
      } else {
        return 1 - 0.5 * Math.sqrt(1 - 3 * u);
      }
    }
    /**
     * To be used only if this vector is representing uv.
     * @param face
     * @returns {S2Point}
     */
    toPoint(face) {
      switch (face) {
        case 0:
          return new S2Point(1, this.x, this.y);
        case 1:
          return new S2Point(this.x * -1, 1, this.y);
        case 2:
          return new S2Point(this.x * -1, this.y * -1, 1);
        case 3:
          return new S2Point(-1, this.y * -1, this.x * -1);
        case 4:
          return new S2Point(this.y, -1, this.x * -1);
        default:
          return new S2Point(this.y, this.x, -1);
      }
    }
    toSt(which) {
      return which == 0 ? _R2Vector.singleUVToST(this.x) : _R2Vector.singleUVToST(this.y);
    }
    toString() {
      return "(" + this.x.toString() + ", " + this.y.toString() + ")";
    }
  };
  var _S2Point = class _S2Point2 {
    constructor(x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
    }
    static minus(p1, p2) {
      return _S2Point2.sub(p1, p2);
    }
    static neg(p) {
      return new _S2Point2(p.x * -1, p.y * -1, p.z * -1);
    }
    norm2() {
      return Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2);
    }
    norm() {
      return Math.sqrt(this.norm2());
    }
    static crossProd(p1, p2) {
      return new _S2Point2(
        p1.y * p2.z - p1.z * p2.y,
        p1.z * p2.x - p1.x * p2.z,
        // p1.z * p2.x - p1.x * p2.z,
        p1.x * p2.y - p1.y * p2.x
        // p1.x * p2.y - p1.y * p2.x
      );
    }
    static add(p1, p2) {
      return new _S2Point2(p1.x + p2.x, p1.y + p2.y, p1.z + p2.z);
    }
    static sub(p1, p2) {
      return new _S2Point2(p1.x - p2.x, p1.y - p2.y, p1.z - p2.z);
    }
    dotProd(that) {
      return this.x * that.x + this.y * that.y + this.z * that.z;
    }
    static mul(p, m) {
      return new _S2Point2(m * p.x, m * p.y, m * p.z);
    }
    static div(p, m) {
      return new _S2Point2(p.x / m, p.y / m, p.z / m);
    }
    /**
     * Returns the distance in 3D coordinates from this to that.
     *
     * <p>Equivalent to {@code a.sub(b).norm()}, but significantly faster.
     *
     * <p>If ordering points by angle, this is faster than {@link #norm}, and much faster than {@link
    * #angle}, but consider using {@link S1ChordAngle}.
    */
    getDistance(that) {
      return Math.sqrt(this.getDistance2(that));
    }
    /**
     * Returns the square of the distance in 3D coordinates from this to that.
     *
     * <p>Equivalent to {@code getDistance(that)<sup>2</sup>}, but significantly faster.
     *
     * <p>If ordering points by angle, this is much faster than {@link #angle}, but consider using
     * {@link S1ChordAngle}.
     */
    getDistance2(that) {
      const dx = this.x - that.x;
      const dy = this.y - that.y;
      const dz = this.z - that.z;
      return dx * dx + dy * dy + dz * dz;
    }
    /** return a vector orthogonal to this one */
    ortho() {
      const k = this.largestAbsComponent();
      let temp;
      if (k == 1) {
        temp = new _S2Point2(1, 0, 0);
      } else if (k == 2) {
        temp = new _S2Point2(0, 1, 0);
      } else {
        temp = new _S2Point2(0, 0, 1);
      }
      return _S2Point2.normalize(_S2Point2.crossProd(this, temp));
    }
    /** Return the index of the largest component fabs */
    largestAbsComponent() {
      return _S2Point2.largestAbsComponent(this.x, this.y, this.z);
    }
    static largestAbsComponent(x, y, z) {
      const absX = Math.abs(x);
      const absY = Math.abs(y);
      const absZ = Math.abs(z);
      if (absX > absY) {
        if (absX > absZ) {
          return 0;
        } else {
          return 2;
        }
      } else {
        if (absY > absZ) {
          return 1;
        } else {
          return 2;
        }
      }
    }
    get(axis) {
      return axis == 0 ? this.x : axis == 1 ? this.y : this.z;
    }
    static fabs(p) {
      return new _S2Point2(Math.abs(p.x), Math.abs(p.y), Math.abs(p.z));
    }
    /** Returns a copy of 'p' rescaled to be unit-length. */
    static normalize(p) {
      let norm = p.norm();
      if (norm != 0) {
        norm = 1 / norm;
      }
      return _S2Point2.mul(p, norm);
    }
    axis(axis) {
      return axis == 0 ? this.x : axis == 1 ? this.y : this.z;
    }
    /** Return the angle between two vectors in radians */
    angle(va) {
      return Math.atan2(_S2Point2.crossProd(this, va).norm(), this.dotProd(va));
    }
    /**
     * Compare two vectors, return true if all their components are within a
     * difference of margin.
     */
    aequal(that, margin) {
      return this.x - Math.abs(that.x) < margin && this.y - Math.abs(that.y) < margin && this.z - Math.abs(that.z) < margin;
    }
    equals(that) {
      if (!(that instanceof _S2Point2)) {
        return false;
      }
      return this.x == that.x && this.y == that.y && this.z == that.z;
    }
    lessThan(vb) {
      if (this.x < vb.x) {
        return true;
      }
      if (vb.x < this.x) {
        return false;
      }
      if (this.y < vb.y) {
        return true;
      }
      if (vb.y < this.y) {
        return false;
      }
      if (this.z < vb.z) {
        return true;
      }
      return false;
    }
    compareTo(other) {
      return this.lessThan(other) ? -1 : this.equals(other) ? 0 : 1;
    }
    toFace() {
      let face = this.largestAbsComponent();
      if (this.axis(face) < 0) {
        face += 3;
      }
      return face;
    }
    toR2Vector(face = this.toFace()) {
      let u;
      let v;
      switch (face) {
        case 0:
          u = this.y / this.x;
          v = this.z / this.x;
          break;
        case 1:
          u = this.x * -1 / this.y;
          v = this.z / this.y;
          break;
        case 2:
          u = this.x * -1 / this.z;
          v = this.y * -1 / this.z;
          break;
        case 3:
          u = this.z / this.x;
          v = this.y / this.x;
          break;
        case 4:
          u = this.z / this.y;
          v = this.x * -1 / this.y;
          break;
        case 5:
          u = this.y * -1 / this.z;
          v = this.x * -1 / this.z;
          break;
        default:
          throw new Error("Invalid face");
      }
      return new R2Vector(u, v);
    }
    toString() {
      return `Point(${this.x}, ${this.y}, ${this.z})`;
    }
  };
  _S2Point.ORIGIN = new _S2Point(0, 0, 0);
  _S2Point.X_POS = new _S2Point(1, 0, 0);
  _S2Point.X_NEG = new _S2Point(-1, 0, 0);
  _S2Point.Y_POS = new _S2Point(0, 1, 0);
  _S2Point.Y_NEG = new _S2Point(0, -1, 0);
  _S2Point.Z_POS = new _S2Point(0, 0, 1);
  _S2Point.Z_NEG = new _S2Point(0, 0, -1);
  var S2Point = _S2Point;
  var exponentBuffer = new ArrayBuffer(8);
  var exponentView = new DataView(exponentBuffer);
  function getFloat64Exponent(value) {
    exponentView.setFloat64(0, value, false);
    const highWord = exponentView.getUint32(0, false);
    return ((highWord & 2146435072) >>> 20) - 1023;
  }
  var Platform = class {
    static IEEEremainder(f1, f2) {
      if (Number.isNaN(f1)) {
        return f1;
      }
      if (Number.isNaN(f2)) {
        return f2;
      }
      if ((f2 === Number.POSITIVE_INFINITY || f2 === Number.NEGATIVE_INFINITY) && Number.isFinite(f1)) {
        return f1;
      }
      return f1 - Math.round(f1 / f2) * f2;
    }
    /**
     * If v is non-zero, return an integer {@code exp} such that
     * {@code (0.5 <= |v|*2^(-exp) < 1)}. If v is zero, return 0.
     *
     * <p>Note that this arguably a bad definition of exponent because it makes
     * {@code exp(9) == 4}. In decimal this would be like saying that the
     * exponent of 1234 is 4, when in scientific 'exponent' notation 1234 is
     * {@code 1.234 x 10^3}.
     *
     * TODO(dbeaumont): Replace this with "DoubleUtils.getExponent(v) - 1" ?
     */
    static getExponent(v) {
      return getFloat64Exponent(v);
    }
  };
  var S2Metric = class {
    /**
     * Defines a cell metric of the given dimension (1 == length, 2 == area).
     */
    constructor(_dim, _deriv) {
      this._dim = _dim;
      this._deriv = _deriv;
    }
    deriv() {
      return this._deriv;
    }
    dim() {
      return this._dim;
    }
    /** Return the value of a metric for cells at the given level. */
    getValue(level) {
      return this.deriv() * Math.pow(2, -this.dim() * level);
    }
    /**
     * Return the level at which the metric has approximately the given value.
     * For example, S2::kAvgEdge.GetClosestLevel(0.1) returns the level at which
     * the average cell edge length is approximately 0.1. The return value is
     * always a valid level.
     */
    getClosestLevel(value) {
      return this.getMinLevel((this.dim() == 1 ? S2.M_SQRT2 : 2) * value);
    }
    /**
     * Return the minimum level such that the metric is at most the given value,
     * or S2CellId::kMaxLevel if there is no such level. For example,
     * S2::kMaxDiag.GetMinLevel(0.1) returns the minimum level such that all
     * cell diagonal lengths are 0.1 or smaller. The return value is always a
     * valid level.
     */
    getMinLevel(value) {
      if (value <= 0) {
        return S2.MAX_LEVEL;
      }
      const exponent = Platform.getExponent(this.deriv() / value);
      const level = Math.max(0, Math.min(S2.MAX_LEVEL, -(exponent >> this.dim() - 1)));
      return level;
    }
    /**
     * Return the maximum level such that the metric is at least the given
     * value, or zero if there is no such level. For example,
     * S2.kMinWidth.GetMaxLevel(0.1) returns the maximum level such that all
     * cells have a minimum width of 0.1 or larger. The return value is always a
     * valid level.
     */
    getMaxLevel(value) {
      if (value <= 0) {
        return S2.MAX_LEVEL;
      }
      const exponent = Platform.getExponent(this.deriv() / value);
      const level = Math.max(0, Math.min(S2.MAX_LEVEL, exponent >> this.dim() - 1));
      return level;
    }
  };
  var _S2 = class _S22 {
    static IEEEremainder(f1, f2) {
      return Platform.IEEEremainder(f1, f2);
    }
    /**
     * Return true if the given point is approximately unit length (this is mainly
     * useful for assertions).
     */
    static isUnitLength(p) {
      return Math.abs(p.norm2() - 1) <= 1e-15;
    }
    /**
     * If v is non-zero, return an integer {@code exp} such that
     * {@code (0.5 <= |v|*2^(-exp) < 1)}. If v is zero, return 0.
     *
     * <p>Note that this arguably a bad definition of exponent because it makes
     * {@code exp(9) == 4}. In decimal this would be like saying that the
     * exponent of 1234 is 4, when in scientific 'exponent' notation 1234 is
     * {@code 1.234 x 10^3}.
     *
     * TODO(dbeaumont): Replace this with "DoubleUtils.getExponent(v) - 1" ?
     */
    static exp(v) {
      return Platform.getExponent(v);
    }
    /**
     * Return a vector "c" that is orthogonal to the given unit-length vectors "a"
     * and "b". This function is similar to a.CrossProd(b) except that it does a
     * better job of ensuring orthogonality when "a" is nearly parallel to "b",
     * and it returns a non-zero result even when a == b or a == -b.
     *
     *  It satisfies the following properties (RCP == RobustCrossProd):
     *
     *  (1) RCP(a,b) != 0 for all a, b (2) RCP(b,a) == -RCP(a,b) unless a == b or
     * a == -b (3) RCP(-a,b) == -RCP(a,b) unless a == b or a == -b (4) RCP(a,-b)
     * == -RCP(a,b) unless a == b or a == -b
     */
    static robustCrossProd(a, b) {
      const x = S2Point.crossProd(S2Point.add(b, a), S2Point.sub(b, a));
      if (!x.equals(new S2Point(0, 0, 0))) {
        return x;
      }
      return a.ortho();
    }
    /**
     * Return the area of triangle ABC. The method used is about twice as
     * expensive as Girard's formula, but it is numerically stable for both large
     * and very small triangles. The points do not need to be normalized. The area
     * is always positive.
     *
     *  The triangle area is undefined if it contains two antipodal points, and
     * becomes numerically unstable as the length of any edge approaches 180
     * degrees.
     */
    static area(a, b, c) {
      const sa = b.angle(c);
      const sb = c.angle(a);
      const sc = a.angle(b);
      const s = sa + sb + sc * 0.5;
      if (s >= 3e-4) {
        const s2 = s * 2;
        const dmin = s - Math.max(
          sa,
          sb,
          sc
        );
        if (dmin < s2 * s2 * s * 0.01) {
          const area = _S22.girardArea(a, b, c);
          if (dmin < s * (area * 0.1)) {
            return area;
          }
        }
      }
      return 4 * Math.atan(
        Math.sqrt(
          Math.max(
            0,
            Math.tan(s * 0.5) * Math.tan(s - sa * 0.5) * Math.tan(s - sb * 0.5) * Math.tan(s - sc * 0.5)
          )
        )
      );
    }
    /**
     * Return the area of the triangle computed using Girard's formula. This is
     * slightly faster than the Area() method above is not accurate for very small
     * triangles.
     */
    static girardArea(a, b, c) {
      const ab = S2Point.crossProd(a, b);
      const bc = S2Point.crossProd(b, c);
      const ac = S2Point.crossProd(a, c);
      return Math.max(
        0,
        ab.angle(ac) - ab.angle(bc) + bc.angle(ac)
      );
    }
    /**
     * Return true if the points A, B, C are strictly counterclockwise. Return
     * false if the points are clockwise or colinear (i.e. if they are all
     * contained on some great circle).
     *
     *  Due to numerical errors, situations may arise that are mathematically
     * impossible, e.g. ABC may be considered strictly CCW while BCA is not.
     * However, the implementation guarantees the following:
     *
     *  If SimpleCCW(a,b,c), then !SimpleCCW(c,b,a) for all a,b,c.
     *
     * In other words, ABC and CBA are guaranteed not to be both CCW
     */
    static simpleCCW(a, b, c) {
      return S2Point.crossProd(c, a).dotProd(b) > 0;
    }
    /**
     *
     * Return true if edge AB crosses CD at a point that is interior to both
     * edges. Properties:
     *
     *  (1) SimpleCrossing(b,a,c,d) == SimpleCrossing(a,b,c,d) (2)
     * SimpleCrossing(c,d,a,b) == SimpleCrossing(a,b,c,d)
     */
    static simpleCrossing(a, b, c, d) {
      const ab = S2Point.crossProd(a, b);
      const cd = S2Point.crossProd(c, d);
      const acb = ab.dotProd(c) * -1;
      const cbd = cd.dotProd(b) * -1;
      const bda = ab.dotProd(d);
      const dac = cd.dotProd(a);
      return acb * cbd > 0 && cbd * bda > 0 && bda * dac > 0;
    }
    static approxEqualsPointError(a, b, maxError) {
      return a.angle(b) <= maxError;
    }
    static approxEqualsPoint(a, b) {
      return this.approxEqualsPointError(a, b, 1e-15);
    }
    static approxEqualsNumberError(a, b, maxError) {
      return Math.abs(a - b) <= maxError;
    }
    static approxEqualsNumber(a, b) {
      return this.approxEqualsNumberError(a, b, 1e-15);
    }
  };
  _S2.M_PI = Math.PI;
  _S2.M_1_PI = 1 / Math.PI;
  _S2.M_PI_2 = Math.PI / 2;
  _S2.M_PI_4 = Math.PI / 4;
  _S2.M_SQRT2 = Math.sqrt(2);
  _S2.M_E = Math.E;
  _S2.SWAP_MASK = 1;
  _S2.INVERT_MASK = 2;
  _S2.POS_TO_ORIENTATION = [_S2.SWAP_MASK, 0, 0, _S2.INVERT_MASK + _S2.SWAP_MASK];
  _S2.DBL_EPSILON = 2 * Number.EPSILON;
  _S2.POS_TO_IJ = [
    // 0 1 2 3
    [0, 1, 3, 2],
    // canonical order: (0,0), (0,1), (1,1), (1,0)
    [0, 2, 3, 1],
    // axes swapped: (0,0), (1,0), (1,1), (0,1)
    [3, 2, 0, 1],
    // bits inverted: (1,1), (1,0), (0,0), (0,1)
    [3, 1, 0, 2]
    // swapped & inverted: (1,1), (0,1), (0,0), (1,0)
  ];
  _S2.MAX_LEVEL = 30;
  _S2.Metric = S2Metric;
  var S2 = _S2;
  var _S1Angle = class _S1Angle2 {
    constructor(radians) {
      this.radians = radians;
    }
    degrees() {
      return this.radians * 180 / Math.PI;
    }
    //
    // public long e5() {
    //   return Math.round(degrees() * 1e5);
    // }
    //
    // public long e6() {
    //   return Math.round(degrees() * 1e6);
    // }
    //
    // public long e7() {
    //   return Math.round(degrees() * 1e7);
    // }
    /**
     * Return the angle between two points, which is also equal to the distance
     * between these points on the unit sphere. The points do not need to be
     * normalized.
     */
    static fromPoints(x, y) {
      return new _S1Angle2(x.angle(y));
    }
    lessThan(that) {
      return this.radians < that.radians;
    }
    greaterThan(that) {
      return this.radians > that.radians;
    }
    lessOrEquals(that) {
      return this.radians <= that.radians;
    }
    greaterOrEquals(that) {
      return this.radians >= that.radians;
    }
    static max(left, right) {
      return right.greaterThan(left) ? right : left;
    }
    static min(left, right) {
      return right.greaterThan(left) ? left : right;
    }
    static radians(radians) {
      return new _S1Angle2(radians);
    }
    static degrees(degrees) {
      return new _S1Angle2(degrees * (Math.PI / 180));
    }
    /**
    * Retuns an {@link S1Angle} whose angle is <code>(this + a)</code>.
    */
    add(a) {
      return new _S1Angle2(this.radians + a.radians);
    }
    /**
     * Retuns an {@link S1Angle} whose angle is <code>(this - a)</code>.
     */
    sub(a) {
      return new _S1Angle2(this.radians - a.radians);
    }
    /**
     * Retuns an {@link S1Angle} whose angle is <code>(this * m)</code>.
     */
    mul(m) {
      return new _S1Angle2(this.radians * m);
    }
    /**
     * Retuns an {@link S1Angle} whose angle is <code>(this / d)</code>.
     */
    div(d) {
      return new _S1Angle2(this.radians / d);
    }
    /**
     * Returns the trigonometric cosine of the angle.
     */
    cos() {
      return Math.cos(this.radians);
    }
    /**
     * Returns the trigonometric sine of the angle.
     */
    sin() {
      return Math.sin(this.radians);
    }
    /**
     * Returns the trigonometric tangent of the angle.
     */
    tan() {
      return Math.tan(this.radians);
    }
    /** Returns the distance along the surface of a sphere of the given radius. */
    distance(radius) {
      return this.radians * radius;
    }
    //
    // public static S1Angle e5(long e5) {
    //   return degrees(e5 * 1e-5);
    // }
    //
    // public static S1Angle e6(long e6) {
    //   // Multiplying by 1e-6 isn't quite as accurate as dividing by 1e6,
    //   // but it's about 10 times faster and more than accurate enough.
    //   return degrees(e6 * 1e-6);
    // }
    //
    // public static S1Angle e7(long e7) {
    //   return degrees(e7 * 1e-7);
    // }
    /**
     * Writes the angle in degrees with a "d" suffix, e.g. "17.3745d". By default
     * 6 digits are printed; this can be changed using setprecision(). Up to 17
     * digits are required to distinguish one angle from another.
     */
    toString() {
      return this.degrees() + "d";
    }
    compareTo(that) {
      return this.radians < that.radians ? -1 : this.radians > that.radians ? 1 : 0;
    }
    equals(that) {
      return this.compareTo(that) === 0;
    }
  };
  _S1Angle.INFINITY = new _S1Angle(Number.POSITIVE_INFINITY);
  _S1Angle.ZERO = new _S1Angle(0);
  var S1Angle = _S1Angle;
  var Interval = class _Interval {
    constructor(lo, hi) {
      this.lo = lo;
      this.hi = hi;
    }
    toString() {
      return "[" + this.lo.toString() + ", " + this.hi.toString() + "]";
    }
    /**
     * Return true if two intervals contains the same set of points.
     */
    equals(that) {
      if (that instanceof _Interval) {
        return this.lo == that.lo && this.hi == that.hi;
      }
      return false;
    }
  };
  var S1Interval = class _S1Interval extends Interval {
    constructor(lo, hi, checked = false) {
      super(lo, hi);
      if (!checked) {
        if (this.lo == -S2.M_PI && this.hi != S2.M_PI) {
          this.lo = S2.M_PI;
        }
        if (this.hi == -S2.M_PI && this.lo != S2.M_PI) {
          this.hi = S2.M_PI;
        }
      }
    }
    /**
     * An interval is valid if neither bound exceeds Pi in absolute value, and the
     * value -Pi appears only in the Empty() and Full() intervals.
     */
    isValid() {
      return Math.abs(this.lo) <= S2.M_PI && Math.abs(this.hi) <= S2.M_PI && !(this.lo == -S2.M_PI && this.hi != S2.M_PI) && !(this.hi == -S2.M_PI && this.lo != S2.M_PI);
    }
    /** Return true if the interval contains all points on the unit circle. */
    isFull() {
      return this.hi - this.lo == 2 * S2.M_PI;
    }
    /** Return true if the interval is empty, i.e. it contains no points. */
    isEmpty() {
      return this.lo - this.hi == 2 * S2.M_PI;
    }
    /* Return true if this.lo > this.hi. (This is true for empty intervals.) */
    isInverted() {
      return this.lo > this.hi;
    }
    /**
     * Return the midpoint of the interval. For full and empty intervals, the
     * result is arbitrary.
     */
    getCenter() {
      const center = (this.lo + this.hi) / 2;
      if (!this.isInverted()) {
        return center;
      }
      return center <= 0 ? center + S2.M_PI : center - S2.M_PI;
    }
    /**
     * Return the length of the interval. The length of an empty interval is
     * negative.
     */
    getLength() {
      let length = this.hi - this.lo;
      if (length >= 0) {
        return length;
      }
      length = length + 2 * S2.M_PI;
      return length > 0 ? length : -1;
    }
    /**
     * Return the complement of the interior of the interval. An interval and its
     * complement have the same boundary but do not share any interior values. The
     * complement operator is not a bijection, since the complement of a singleton
     * interval (containing a single value) is the same as the complement of an
     * empty interval.
     */
    complement() {
      if (this.lo == this.hi) {
        return _S1Interval.full();
      }
      return new _S1Interval(this.hi, this.lo, true);
    }
    /** Return true if the interval (which is closed) contains the point 'p'. */
    contains(_p) {
      let p = _p;
      if (p == -S2.M_PI) {
        p = S2.M_PI;
      }
      return this.fastContains(p);
    }
    /**
     * Return true if the interval (which is closed) contains the point 'p'. Skips
     * the normalization of 'p' from -Pi to Pi.
     *
     */
    fastContains(_p) {
      const p = _p;
      if (this.isInverted()) {
        return (p >= this.lo || p <= this.hi) && !this.isEmpty();
      } else {
        return p >= this.lo && p <= this.hi;
      }
    }
    /** Return true if the interior of the interval contains the point 'p'. */
    interiorContains(_p) {
      let p = _p;
      if (p == -S2.M_PI) {
        p = S2.M_PI;
      }
      if (this.isInverted()) {
        return p > this.lo || p < this.hi;
      } else {
        return p > this.lo && p < this.hi || this.isFull();
      }
    }
    /**
     * Return true if the interval contains the given interval 'y'. Works for
     * empty, full, and singleton intervals.
     */
    containsI(y) {
      if (this.isInverted()) {
        if (y.isInverted()) {
          return y.lo >= this.lo && y.hi <= this.hi;
        }
        return (y.lo >= this.lo || y.hi <= this.hi) && !this.isEmpty();
      } else {
        if (y.isInverted()) {
          return this.isFull() || y.isEmpty();
        }
        return y.lo >= this.lo && y.hi <= this.hi;
      }
    }
    /**
     * Returns true if the interior of this interval contains the entire interval
     * 'y'. Note that x.InteriorContains(x) is true only when x is the empty or
     * full interval, and x.InteriorContains(S1Interval(p,p)) is equivalent to
     * x.InteriorContains(p).
     */
    interiorContainsI(y) {
      if (this.isInverted()) {
        if (!y.isInverted()) {
          return this.lo > this.lo || y.hi < this.hi;
        }
        return y.lo > this.lo && y.hi < this.hi || y.isEmpty();
      } else {
        if (y.isInverted()) {
          return this.isFull() || y.isEmpty();
        }
        return y.lo > this.lo && y.hi < this.hi || this.isFull();
      }
    }
    /**
     * Return true if the two intervals contain any points in common. Note that
     * the point +/-Pi has two representations, so the intervals [-Pi,-3] and
     * [2,Pi] intersect, for example.
     */
    intersects(y) {
      if (this.isEmpty() || y.isEmpty()) {
        return false;
      }
      if (this.isInverted()) {
        return y.isInverted() || y.lo <= this.hi || y.hi >= this.lo;
      } else {
        if (y.isInverted()) {
          return y.lo <= this.hi || y.hi >= this.lo;
        }
        return y.lo <= this.hi && y.hi >= this.lo;
      }
    }
    /**
     * Return true if the interior of this interval contains any point of the
     * interval 'y' (including its boundary). Works for empty, full, and singleton
     * intervals.
     */
    interiorIntersects(y) {
      if (this.isEmpty() || y.isEmpty() || this.lo == this.hi) {
        return false;
      }
      if (this.isInverted()) {
        return y.isInverted() || y.lo < this.hi || y.hi > this.lo;
      } else {
        if (y.isInverted()) {
          return y.lo < this.hi || y.hi > this.lo;
        }
        return y.lo < this.hi && y.hi > this.lo || this.isFull();
      }
    }
    /**
     * Expand the interval by the minimum amount necessary so that it contains the
     * given point "p" (an angle in the range [-Pi, Pi]).
     */
    addPoint(_p) {
      let p = _p;
      if (p == -S2.M_PI) {
        p = S2.M_PI;
      }
      if (this.fastContains(p)) {
        return new _S1Interval(this.lo, this.hi);
      }
      if (this.isEmpty()) {
        return _S1Interval.fromPoint(p);
      } else {
        const dlo = _S1Interval.positiveDistance(p, this.lo);
        const dhi = _S1Interval.positiveDistance(this.hi, p);
        if (dlo < dhi) {
          return new _S1Interval(p, this.hi);
        } else {
          return new _S1Interval(this.lo, p);
        }
      }
    }
    /**
     * Return an interval that contains all points within a distance "radius" of
     * a point in this interval. Note that the expansion of an empty interval is
     * always empty. The radius must be non-negative.
     */
    expanded(radius) {
      if (this.isEmpty()) {
        return this;
      }
      if (this.getLength() + radius * 2 >= 2 * S2.M_PI - 1e-15) {
        return _S1Interval.full();
      }
      let lo = Platform.IEEEremainder(this.lo - radius, 2 * S2.M_PI);
      const hi = Platform.IEEEremainder(this.hi + radius, 2 * S2.M_PI);
      if (lo == -S2.M_PI) {
        lo = S2.M_PI;
      }
      return new _S1Interval(lo, hi);
    }
    /**
     * Return the smallest interval that contains this interval and the given
     * interval "y".
     */
    union(y) {
      if (y.isEmpty()) {
        return this;
      }
      if (this.fastContains(y.lo)) {
        if (this.fastContains(y.hi)) {
          if (this.containsI(y)) {
            return this;
          }
          return _S1Interval.full();
        }
        return new _S1Interval(this.lo, this.hi, true);
      }
      if (this.fastContains(y.hi)) {
        return new _S1Interval(y.lo, this.hi, true);
      }
      if (this.isEmpty() || y.fastContains(this.lo)) {
        return y;
      }
      const dlo = _S1Interval.positiveDistance(y.hi, this.lo);
      const dhi = _S1Interval.positiveDistance(this.hi, y.lo);
      if (dlo < dhi) {
        return new _S1Interval(y.lo, this.hi, true);
      } else {
        return new _S1Interval(this.lo, y.hi, true);
      }
    }
    /**
     * Return the smallest interval that contains the intersection of this
     * interval with "y". Note that the region of intersection may consist of two
     * disjoint intervals.
     */
    intersection(y) {
      if (y.isEmpty()) {
        return _S1Interval.empty();
      }
      if (this.fastContains(y.lo)) {
        if (this.fastContains(y.hi)) {
          if (y.getLength() < this.getLength()) {
            return y;
          }
          return this;
        }
        return new _S1Interval(y.lo, this.hi, true);
      }
      if (this.fastContains(y.hi)) {
        return new _S1Interval(this.lo, y.hi, true);
      }
      if (y.fastContains(this.lo)) {
        return this;
      }
      return _S1Interval.empty();
    }
    /**
     * Return true if the length of the symmetric difference between the two
     * intervals is at most the given tolerance.
     */
    approxEquals(y, maxError = 1e-9) {
      if (this.isEmpty()) {
        return y.getLength() <= maxError;
      }
      if (y.isEmpty()) {
        return this.getLength() <= maxError;
      }
      return Math.abs(Platform.IEEEremainder(y.lo - this.lo, 2 * S2.M_PI)) + Math.abs(Platform.IEEEremainder(y.hi - this.hi, 2 * S2.M_PI)) <= maxError;
    }
    static empty() {
      return new _S1Interval(S2.M_PI, -S2.M_PI, true);
    }
    static full() {
      return new _S1Interval(-S2.M_PI, S2.M_PI, true);
    }
    static fromPoint(_p) {
      let p = _p;
      if (p == -S2.M_PI) {
        p = S2.M_PI;
      }
      return new _S1Interval(p, p, true);
    }
    /**
     * Convenience method to construct the minimal interval containing the two
     * given points. This is equivalent to starting with an empty interval and
     * calling AddPoint() twice, but it is more efficient.
     */
    static fromPointPair(_p1, _p2) {
      let p1 = _p1;
      let p2 = _p2;
      if (p1 == -S2.M_PI) {
        p1 = S2.M_PI;
      }
      if (p2 == -S2.M_PI) {
        p2 = S2.M_PI;
      }
      if (_S1Interval.positiveDistance(p1, p2) <= S2.M_PI) {
        return new _S1Interval(p1, p2, true);
      } else {
        return new _S1Interval(p2, p1, true);
      }
    }
    /**
     * Compute the distance from "a" to "b" in the range [0, 2*Pi). This is
     * equivalent to (drem(b - a - S2.M_PI, 2 * S2.M_PI) + S2.M_PI), except that
     * it is more numerically stable (it does not lose precision for very small
     * positive distances).
     */
    static positiveDistance(_a, _b) {
      const a = _a;
      const b = _b;
      const d = b - a;
      if (d >= 0) {
        return d;
      }
      return b + S2.M_PI - (a - S2.M_PI);
    }
  };
  var R1Interval = class _R1Interval extends Interval {
    /** Return true if the interval is empty, i.e. it contains no points. */
    isEmpty() {
      return this.lo > this.hi;
    }
    getCenter() {
      return (this.lo + this.hi) / 2;
    }
    getLength() {
      return this.hi - this.lo;
    }
    contains(p) {
      return p >= this.lo && p <= this.hi;
    }
    /** Return true if the interior of the interval contains the point 'p'. */
    interiorContains(p) {
      return p > this.lo && p < this.hi;
    }
    /**
     * Return true if the interval contains the given interval 'y'. Works for
     * empty, full, and singleton intervals.
     */
    containsI(y) {
      if (y.isEmpty()) {
        return true;
      }
      return y.lo >= this.lo && y.hi <= this.hi;
    }
    interiorContainsI(y) {
      if (y.isEmpty()) {
        return true;
      }
      return y.lo > this.lo && y.hi < this.hi;
    }
    /**
     * Return true if this interval intersects the given interval, i.e. if they
     * have any points in common.
     */
    intersects(y) {
      if (this.lo <= y.lo) {
        return y.lo <= this.hi && y.lo <= y.hi;
      } else {
        return this.lo <= y.hi && this.lo <= this.hi;
      }
    }
    /**
     * Return true if the interior of this interval intersects any point of the
     * given interval (including its boundary).
     */
    interiorIntersects(y) {
      return y.lo < this.hi && this.lo < y.hi && this.lo < this.hi && y.lo <= y.hi;
    }
    /** Expand the interval so that it contains the given point "p". */
    addPoint(p) {
      if (this.isEmpty()) {
        return _R1Interval.fromPoint(p);
      } else if (p < this.lo) {
        return new _R1Interval(p, this.hi);
      } else if (p > this.hi) {
        return new _R1Interval(this.lo, p);
      } else {
        return new _R1Interval(this.lo, this.hi);
      }
    }
    /**
     * Return an interval that contains all points with a distance "radius" of a
     * point in this interval. Note that the expansion of an empty interval is
     * always empty.
     */
    expanded(radius) {
      if (this.isEmpty()) {
        return this;
      }
      return new _R1Interval(this.lo - radius, this.hi + radius);
    }
    /**
     * Return the smallest interval that contains this interval and the given
     * interval "y".
     */
    union(y) {
      if (this.isEmpty()) {
        return y;
      }
      if (y.isEmpty()) {
        return this;
      }
      return new _R1Interval(
        Math.min(this.lo, y.lo),
        Math.max(this.hi, y.hi)
      );
    }
    /**
     * Return the intersection of this interval with the given interval. Empty
     * intervals do not need to be special-cased.
     */
    intersection(y) {
      return new _R1Interval(
        Math.max(this.lo, y.lo),
        Math.min(this.hi, y.hi)
      );
    }
    /**
     * Return true if the length of the symmetric difference between the two
     * intervals is at most the given tolerance.
     */
    approxEquals(y, maxError = 1e-15) {
      if (this.isEmpty()) {
        return y.getLength() <= maxError;
      }
      if (y.isEmpty()) {
        return this.getLength() <= maxError;
      }
      return Math.abs(y.lo - this.lo) + Math.abs(y.hi - this.hi) <= maxError;
    }
    static empty() {
      return new _R1Interval(1, 0);
    }
    static fromPoint(p) {
      return new _R1Interval(p, p);
    }
    /**
     * Convenience method to construct the minimal interval containing the two
     * given points. This is equivalent to starting with an empty interval and
     * calling AddPoint() twice, but it is more efficient.
     */
    static fromPointPair(p1, p2) {
      if (p1 <= p2) {
        return new _R1Interval(p1, p2);
      } else {
        return new _R1Interval(p2, p1);
      }
    }
  };
  var _S2LatLng = class _S2LatLng2 {
    constructor(latRadians, lngRadians) {
      this.latRadians = latRadians;
      this.lngRadians = lngRadians;
    }
    get latDegrees() {
      return new S1Angle(this.latRadians).degrees();
    }
    get lngDegrees() {
      return new S1Angle(this.lngRadians).degrees();
    }
    // Clamps the latitude to the range [-90, 90] degrees, and adds or subtracts
    // a multiple of 360 degrees to the longitude if necessary to reduce it to
    // the range [-180, 180].
    /** Convert an S2LatLng to the equivalent unit-length vector (S2Point). */
    toPoint() {
      const phi = this.latRadians;
      const theta = this.lngRadians;
      const cosphi = Math.cos(phi);
      return new S2Point(
        Math.cos(theta) * cosphi,
        Math.sin(theta) * cosphi,
        Math.sin(phi)
      );
    }
    /**
     * Returns a new S2LatLng based on this instance for which {@link #isValid()}
     * will be {@code true}.
     * <ul>
     * <li>Latitude is clipped to the range {@code [-90, 90]}
     * <li>Longitude is normalized to be in the range {@code [-180, 180]}
     * </ul>
     * <p>If the current point is valid then the returned point will have the same
     * coordinates.
     */
    normalized() {
      return new _S2LatLng2(
        Math.max(
          -S2.M_PI_2,
          Math.min(
            S2.M_PI_2,
            this.latRadians
          )
        ),
        Platform.IEEEremainder(
          this.lngRadians,
          2 * S2.M_PI
        )
      );
    }
    static fromDegrees(latDegrees, lngDegrees) {
      return new _S2LatLng2(S1Angle.degrees(latDegrees).radians, S1Angle.degrees(lngDegrees).radians);
    }
    static fromRadians(latRadians, lngRadians) {
      return new _S2LatLng2(latRadians, lngRadians);
    }
    static fromPoint(p) {
      return new _S2LatLng2(
        _S2LatLng2.latitude(p).radians,
        _S2LatLng2.longitude(p).radians
      );
    }
    /** Returns the latitude of this point as a new S1Angle. */
    lat() {
      return S1Angle.radians(this.latRadians);
    }
    /** Returns the longitude of this point as a new S1Angle. */
    lng() {
      return S1Angle.radians(this.lngRadians);
    }
    /**
     * Return true if the latitude is between -90 and 90 degrees inclusive and the
     * longitude is between -180 and 180 degrees inclusive.
     */
    isValid() {
      return Math.abs(this.latRadians) <= S2.M_PI_2 && Math.abs(this.lngRadians) <= S2.M_PI;
    }
    /**
     * Scales this point by the given scaling factor.
     * Note that there is no guarantee that the new point will be <em>valid</em>.
     */
    mul(m) {
      return new _S2LatLng2(this.latRadians * m, this.lngRadians * m);
    }
    static latitude(p) {
      return new S1Angle(Math.atan2(p.z, Math.sqrt(p.x * p.x + p.y * p.y)));
    }
    static longitude(p) {
      return new S1Angle(Math.atan2(p.y, p.x));
    }
    equals(other) {
      return other.latRadians === this.latRadians && other.lngRadians === this.lngRadians;
    }
    pointAtDistance(distanceInKM, bearingRadians) {
      const distanceInM = distanceInKM * 1e3;
      const distanceToRadius = distanceInM / _S2LatLng2.EARTH_RADIUS_METERS;
      const newLat = Math.asin(Math.sin(this.latRadians) * Math.cos(distanceToRadius) + Math.cos(this.latRadians) * Math.sin(distanceToRadius) * Math.cos(bearingRadians));
      const newLng = this.lngRadians + Math.atan2(
        Math.sin(bearingRadians) * Math.sin(distanceToRadius) * Math.cos(this.latRadians),
        Math.cos(distanceToRadius) - Math.sin(this.latRadians) * Math.sin(newLat)
      );
      return new _S2LatLng2(newLat, newLng);
    }
    /**
     * Generates n LatLngs given a distance in km and the number of points wanted.
     * Generated points will be returned in a Clockwise order starting from North.
     * @param _distanceInKm
     * @param nPoints
     * @returns {S2LatLng[]}
     */
    pointsAtDistance(_distanceInKm, nPoints = 4) {
      return [...new Array(nPoints)].map((p, idx) => 360 / nPoints * idx).map((bearingDegree) => S1Angle.degrees(bearingDegree).radians).map((bearingRadians) => this.pointAtDistance(_distanceInKm, bearingRadians));
    }
    getEarthDistance(other) {
      return this.getDistance(other).radians * _S2LatLng2.EARTH_RADIUS_METERS;
    }
    getDistance(other) {
      const lat1 = this.latRadians;
      const lat2 = other.latRadians;
      const lng1 = this.lngRadians;
      const lng2 = other.lngRadians;
      const dLat = Math.sin(0.5 * (lat2 - lat1));
      const dLng = Math.sin(0.5 * (lng2 - lng1));
      const x = dLat * dLat + dLng * dLng * Math.cos(lat1) * Math.cos(lat2);
      return S1Angle.radians(2 * Math.asin(Math.sqrt(Math.min(1, x))));
    }
    toString() {
      return "(" + this.latRadians + ", " + this.lngRadians + ")";
    }
    toStringDegrees() {
      return "(" + this.latDegrees + ", " + this.lngDegrees + ")";
    }
    toGEOJSON() {
      return {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [this.lngDegrees, this.latDegrees]
        },
        properties: {}
      };
    }
  };
  _S2LatLng.EARTH_RADIUS_METERS = 6367e3;
  _S2LatLng.CENTER = new _S2LatLng(0, 0);
  var S2LatLng = _S2LatLng;
  var S2EdgeUtil = class {
    //   /**
    //    * IEEE floating-point operations have a maximum error of 0.5 ULPS (units in
    //    * the last place). For double-precision numbers, this works out to 2**-53
    //    * (about 1.11e-16) times the magnitude of the result. It is possible to
    //    * analyze the calculation done by getIntersection() and work out the
    //    * worst-case rounding error. I have done a rough version of this, and my
    //    * estimate is that the worst case distance from the intersection point X to
    //    * the great circle through (a0, a1) is about 12 ULPS, or about 1.3e-15. This
    //    * needs to be increased by a factor of (1/0.866) to account for the
    //    * edgeSpliceFraction() in S2PolygonBuilder. Note that the maximum error
    //    * measured by the unittest in 1,000,000 trials is less than 3e-16.
    //    */
    //   public static final S1Angle DEFAULT_INTERSECTION_TOLERANCE = S1Angle.radians(1.5e-15);
    //
    //   /**
    //    * This class allows a vertex chain v0, v1, v2, ... to be efficiently tested
    //    * for intersection with a given fixed edge AB.
    //    */
    //   public static class EdgeCrosser {
    //   // The fields below are all constant.
    //
    //   private final S2Point a;
    //   private final S2Point b;
    //   private final S2Point aCrossB;
    //
    //   // The fields below are updated for each vertex in the chain.
    //
    //   // Previous vertex in the vertex chain.
    //   private S2Point c;
    //   // The orientation of the triangle ACB.
    //   private int acb;
    //
    //   /**
    //    * AB is the given fixed edge, and C is the first vertex of the vertex
    //    * chain. All parameters must point to fixed storage that persists for the
    //    * lifetime of the EdgeCrosser object.
    //    */
    //   public EdgeCrosser(S2Point a, S2Point b, S2Point c) {
    //   this.a = a;
    //   this.b = b;
    //   this.aCrossB = S2Point.crossProd(a, b);
    //   restartAt(c);
    // }
    //
    // /**
    //  * Call this function when your chain 'jumps' to a new place.
    //  */
    // public void restartAt(S2Point c) {
    //   this.c = c;
    //   this.acb = -S2.robustCCW(this.a, this.b, c, this.aCrossB);
    // }
    //
    // /**
    //  * This method is equivalent to calling the S2EdgeUtil.robustCrossing()
    //  * function (defined below) on the edges AB and CD. It returns +1 if there
    //  * is a crossing, -1 if there is no crossing, and 0 if two points from
    //  * different edges are the same. Returns 0 or -1 if either edge is
    //  * degenerate. As a side effect, it saves vertex D to be used as the next
    //  * vertex C.
    //  */
    // public int robustCrossing(S2Point d) {
    //   // For there to be an edge crossing, the triangles ACB, CBD, BDA, DAC must
    //   // all be oriented the same way (CW or CCW). We keep the orientation
    //   // of ACB as part of our state. When each new point D arrives, we
    //   // compute the orientation of BDA and check whether it matches ACB.
    //   // This checks whether the points C and D are on opposite sides of the
    //   // great circle through AB.
    //
    //   // Recall that robustCCW is invariant with respect to rotating its
    //   // arguments, i.e. ABC has the same orientation as BDA.
    //   int bda = S2.robustCCW(this.a, this.b, d, this.aCrossB);
    //   int result;
    //
    //   if (bda == -this.acb && bda != 0) {
    //     // Most common case -- triangles have opposite orientations.
    //     result = -1;
    //   } else if ((bda & this.acb) == 0) {
    //     // At least one value is zero -- two vertices are identical.
    //     result = 0;
    //   } else {
    //     // assert (bda == acb && bda != 0);
    //     result = robustCrossingInternal(d); // Slow path.
    //   }
    //   // Now save the current vertex D as the next vertex C, and also save the
    //   // orientation of the new triangle ACB (which is opposite to the current
    //   // triangle BDA).
    //   this.c = d;
    //   this.acb = -bda;
    //   return result;
    // }
    //
    // /**
    //  * This method is equivalent to the S2EdgeUtil.edgeOrVertexCrossing() method
    //  * defined below. It is similar to robustCrossing, but handles cases where
    //  * two vertices are identical in a way that makes it easy to implement
    //  * point-in-polygon containment tests.
    //  */
    // public boolean edgeOrVertexCrossing(S2Point d) {
    //   // We need to copy c since it is clobbered by robustCrossing().
    //   S2Point c2 = new S2Point(this.c.get(0), this.c.get(1), this.c.get(2));
    //
    //   int crossing = robustCrossing(d);
    //   if (crossing < 0) {
    //     return false;
    //   }
    //   if (crossing > 0) {
    //     return true;
    //   }
    //
    //   return vertexCrossing(this.a, this.b, c2, d);
    // }
    //
    // /**
    //  * This function handles the "slow path" of robustCrossing().
    //  */
    // private int robustCrossingInternal(S2Point d) {
    //   // ACB and BDA have the appropriate orientations, so now we check the
    //   // triangles CBD and DAC.
    //   S2Point cCrossD = S2Point.crossProd(this.c, d);
    //   int cbd = -S2.robustCCW(this.c, d, this.b, cCrossD);
    //   if (cbd != this.acb) {
    //     return -1;
    //   }
    //
    //   int dac = S2.robustCCW(this.c, d, this.a, cCrossD);
    //   return (dac == this.acb) ? 1 : -1;
    // }
    // }
    //
    // /**
    //  * This class computes a bounding rectangle that contains all edges defined by
    //  * a vertex chain v0, v1, v2, ... All vertices must be unit length. Note that
    //  * the bounding rectangle of an edge can be larger than the bounding rectangle
    //  * of its endpoints, e.g. consider an edge that passes through the north pole.
    //  */
    // public static class RectBounder {
    //   // The previous vertex in the chain.
    //   private S2Point a;
    //
    //   // The corresponding latitude-longitude.
    //   private S2LatLng aLatLng;
    //
    //   // The current bounding rectangle.
    //   private S2LatLngRect bound;
    //
    //   public RectBounder() {
    //     this.bound = S2LatLngRect.empty();
    //   }
    //
    //   /**
    //    * This method is called to add each vertex to the chain. 'b' must point to
    //    * fixed storage that persists for the lifetime of the RectBounder.
    //    */
    //   public void addPoint(S2Point b) {
    //   // assert (S2.isUnitLength(b));
    //
    //   S2LatLng bLatLng = new S2LatLng(b);
    //
    //   if (this.bound.isEmpty()) {
    //   this.bound = this.bound.addPoint(bLatLng);
    // } else {
    //   // We can't just call bound.addPoint(bLatLng) here, since we need to
    //   // ensure that all the longitudes between "a" and "b" are included.
    //   this.bound = this.bound.union(S2LatLngRect.fromPointPair(this.aLatLng, bLatLng));
    //
    //   // Check whether the min/max latitude occurs in the edge interior.
    //   // We find the normal to the plane containing AB, and then a vector
    //   // "dir" in this plane that also passes through the equator. We use
    //   // RobustCrossProd to ensure that the edge normal is accurate even
    //   // when the two points are very close together.
    //   S2Point aCrossB = S2.robustCrossProd(this.a, b);
    //   S2Point dir = S2Point.crossProd(aCrossB, new S2Point(0, 0, 1));
    //   double da = dir.dotProd(this.a);
    //   double db = dir.dotProd(b);
    //
    //   if (da * db < 0) {
    //     // Minimum/maximum latitude occurs in the edge interior. This affects
    //     // the latitude bounds but not the longitude bounds.
    //     double absLat = Math.acos(Math.abs(aCrossB.get(2) / aCrossB.norm()));
    //     R1Interval lat = this.bound.lat();
    //     if (da < 0) {
    //       // It's possible that absLat < lat.lo() due to numerical errors.
    //       lat = new R1Interval(lat.lo(), Math.max(absLat, this.bound.lat().hi()));
    //     } else {
    //       lat = new R1Interval(Math.min(-absLat, this.bound.lat().lo()), lat.hi());
    //     }
    //     this.bound = new S2LatLngRect(lat, this.bound.lng());
    //   }
    // }
    // this.a = b;
    // this.aLatLng = bLatLng;
    // }
    //
    // /**
    //  * Return the bounding rectangle of the edge chain that connects the
    //  * vertices defined so far.
    //  */
    // public S2LatLngRect getBound() {
    //   return this.bound;
    // }
    //
    // }
    //
    // /**
    //  * The purpose of this class is to find edges that intersect a given XYZ
    //  * bounding box. It can be used as an efficient rejection test when attempting to
    //  * find edges that intersect a given region. It accepts a vertex chain v0, v1,
    //  * v2, ... and returns a boolean value indicating whether each edge intersects
    //  * the specified bounding box.
    //  *
    //  * We use XYZ intervals instead of something like longitude intervals because
    //  * it is cheap to collect from S2Point lists and any slicing strategy should
    //  * give essentially equivalent results.  See S2Loop for an example of use.
    //  */
    // public static class XYZPruner {
    //   private S2Point lastVertex;
    //
    //   // The region to be tested against.
    //   private boolean boundSet;
    //   private double xmin;
    //   private double ymin;
    //   private double zmin;
    //   private double xmax;
    //   private double ymax;
    //   private double zmax;
    //   private double maxDeformation;
    //
    //   public XYZPruner() {
    //     this.boundSet = false;
    //   }
    //
    //   /**
    //    * Accumulate a bounding rectangle from provided edges.
    //    *
    //    * @param from start of edge
    //    * @param to end of edge.
    //    */
    //   public void addEdgeToBounds(S2Point from, S2Point to) {
    //   if (!this.boundSet) {
    //   this.boundSet = true;
    //   this.xmin = this.xmax = from.x;
    //   this.ymin = this.ymax = from.y;
    //   this.zmin = this.zmax = from.z;
    // }
    // this.xmin = Math.min(this.xmin, Math.min(to.x, from.x));
    // this.ymin = Math.min(this.ymin, Math.min(to.y, from.y));
    // this.zmin = Math.min(this.zmin, Math.min(to.z, from.z));
    // this.xmax = Math.max(this.xmax, Math.max(to.x, from.x));
    // this.ymax = Math.max(this.ymax, Math.max(to.y, from.y));
    // this.zmax = Math.max(this.zmax, Math.max(to.z, from.z));
    //
    // // Because our arcs are really geodesics on the surface of the earth
    // // an edge can have intermediate points outside the xyz bounds implicit
    // // in the end points.  Based on the length of the arc we compute a
    // // generous bound for the maximum amount of deformation.  For small edges
    // // it will be very small but for some large arcs (ie. from (1N,90W) to
    // // (1N,90E) the path can be wildly deformed.  I did a bunch of
    // // experiments with geodesics to get safe bounds for the deformation.
    // double approxArcLen =
    //     Math.abs(from.x - to.x) + Math.abs(from.y - to.y) + Math.abs(from.z - to.z);
    // if (approxArcLen < 0.025) { // less than 2 degrees
    //   this.maxDeformation = Math.max(this.maxDeformation, approxArcLen * 0.0025);
    // } else if (approxArcLen < 1.0) { // less than 90 degrees
    //   this.maxDeformation = Math.max(this.maxDeformation, approxArcLen * 0.11);
    // } else {
    //   this.maxDeformation = approxArcLen * 0.5;
    // }
    // }
    //
    // public void setFirstIntersectPoint(S2Point v0) {
    //   this.xmin = this.xmin - this.maxDeformation;
    //   this.ymin = this.ymin - this.maxDeformation;
    //   this.zmin = this.zmin - this.maxDeformation;
    //   this.xmax = this.xmax + this.maxDeformation;
    //   this.ymax = this.ymax + this.maxDeformation;
    //   this.zmax = this.zmax + this.maxDeformation;
    //   this.lastVertex = v0;
    // }
    //
    // /**
    //  * Returns true if the edge going from the last point to this point passes
    //  * through the pruner bounding box, otherwise returns false.  So the
    //  * method returns false if we are certain there is no intersection, but it
    //  * may return true when there turns out to be no intersection.
    //  */
    // public boolean intersects(S2Point v1) {
    //   boolean result = true;
    //
    //   if ((v1.x < this.xmin && this.lastVertex.x < this.xmin) || (v1.x > this.xmax && this.lastVertex.x > this.xmax)) {
    //     result = false;
    //   } else if ((v1.y < this.ymin && this.lastVertex.y < this.ymin) || (v1.y > this.ymax && this.lastVertex.y > this.ymax)) {
    //     result = false;
    //   } else if ((v1.z < this.zmin && this.lastVertex.z < this.zmin) || (v1.z > this.zmax && this.lastVertex.z > this.zmax)) {
    //     result = false;
    //   }
    //
    //   this.lastVertex = v1;
    //   return result;
    // }
    // }
    //
    // /**
    //  * The purpose of this class is to find edges that intersect a given longitude
    //  * interval. It can be used as an efficient rejection test when attempting to
    //  * find edges that intersect a given region. It accepts a vertex chain v0, v1,
    //  * v2, ... and returns a boolean value indicating whether each edge intersects
    //  * the specified longitude interval.
    //  *
    //  * This class is not currently used as the XYZPruner is preferred for
    //  * S2Loop, but this should be usable in similar circumstances.  Be wary
    //  * of the cost of atan2() in conversions from S2Point to longitude!
    //  */
    // public static class LongitudePruner {
    //   // The interval to be tested against.
    //   private S1Interval interval;
    //
    //   // The longitude of the next v0.
    //   private double lng0;
    //
    //   /**
    //    *'interval' is the longitude interval to be tested against, and 'v0' is
    //    * the first vertex of edge chain.
    //    */
    //   public LongitudePruner(S1Interval interval, S2Point v0) {
    //   this.interval = interval;
    //   this.lng0 = S2LatLng.longitude(v0).radians();
    // }
    //
    // /**
    //  * Returns true if the edge (v0, v1) intersects the given longitude
    //  * interval, and then saves 'v1' to be used as the next 'v0'.
    //  */
    // public boolean intersects(S2Point v1) {
    //   double lng1 = S2LatLng.longitude(v1).radians();
    //   boolean result = this.interval.intersects(S1Interval.fromPointPair(this.lng0, lng1));
    //   this.lng0 = lng1;
    //   return result;
    // }
    // }
    //
    // /**
    //  * A wedge relation's test method accepts two edge chains A=(a0,a1,a2) and
    //  * B=(b0,b1,b2) where a1==b1, and returns either -1, 0, or 1 to indicate the
    //  * relationship between the region to the left of A and the region to the left
    //  * of B. Wedge relations are used to determine the local relationship between
    //  * two polygons that share a common vertex.
    //  *
    //  *  All wedge relations require that a0 != a2 and b0 != b2. Other degenerate
    //  * cases (such as a0 == b2) are handled as expected. The parameter "ab1"
    //  * denotes the common vertex a1 == b1.
    //  */
    // public interface WedgeRelation {
    //   int test(S2Point a0, S2Point ab1, S2Point a2, S2Point b0, S2Point b2);
    // }
    //
    // public static class WedgeContains implements WedgeRelation {
    //   /**
    //    * Given two edge chains (see WedgeRelation above), this function returns +1
    //    * if the region to the left of A contains the region to the left of B, and
    //    * 0 otherwise.
    //    */
    //   @Override
    //   public int test(S2Point a0, S2Point ab1, S2Point a2, S2Point b0, S2Point b2) {
    //   // For A to contain B (where each loop interior is defined to be its left
    //   // side), the CCW edge order around ab1 must be a2 b2 b0 a0. We split
    //   // this test into two parts that test three vertices each.
    //   return S2.orderedCCW(a2, b2, b0, ab1) && S2.orderedCCW(b0, a0, a2, ab1) ? 1 : 0;
    // }
    // }
    //
    // public static class WedgeIntersects implements WedgeRelation {
    //   /**
    //    * Given two edge chains (see WedgeRelation above), this function returns -1
    //    * if the region to the left of A intersects the region to the left of B,
    //    * and 0 otherwise. Note that regions are defined such that points along a
    //    * boundary are contained by one side or the other, not both. So for
    //    * example, if A,B,C are distinct points ordered CCW around a vertex O, then
    //    * the wedges BOA, AOC, and COB do not intersect.
    //    */
    //   @Override
    //   public int test(S2Point a0, S2Point ab1, S2Point a2, S2Point b0, S2Point b2) {
    //   // For A not to intersect B (where each loop interior is defined to be
    //   // its left side), the CCW edge order around ab1 must be a0 b2 b0 a2.
    //   // Note that it's important to write these conditions as negatives
    //   // (!OrderedCCW(a,b,c,o) rather than Ordered(c,b,a,o)) to get correct
    //   // results when two vertices are the same.
    //   return (S2.orderedCCW(a0, b2, b0, ab1) && S2.orderedCCW(b0, a2, a0, ab1) ? 0 : -1);
    // }
    // }
    //
    // public static class WedgeContainsOrIntersects implements WedgeRelation {
    //   /**
    //    * Given two edge chains (see WedgeRelation above), this function returns +1
    //    * if A contains B, 0 if A and B are disjoint, and -1 if A intersects but
    //    * does not contain B.
    //    */
    //   @Override
    //   public int test(S2Point a0, S2Point ab1, S2Point a2, S2Point b0, S2Point b2) {
    //   // This is similar to WedgeContainsOrCrosses, except that we want to
    //   // distinguish cases (1) [A contains B], (3) [A and B are disjoint],
    //   // and (2,4,5,6) [A intersects but does not contain B].
    //
    //   if (S2.orderedCCW(a0, a2, b2, ab1)) {
    //   // We are in case 1, 5, or 6, or case 2 if a2 == b2.
    //   return S2.orderedCCW(b2, b0, a0, ab1) ? 1 : -1; // Case 1 vs. 2,5,6.
    // }
    // // We are in cases 2, 3, or 4.
    // if (!S2.orderedCCW(a2, b0, b2, ab1)) {
    //   return 0; // Case 3.
    // }
    //
    // // We are in case 2 or 4, or case 3 if a2 == b0.
    // return (a2.equals(b0)) ? 0 : -1; // Case 3 vs. 2,4.
    // }
    // }
    //
    // public static class WedgeContainsOrCrosses implements WedgeRelation {
    //   /**
    //    * Given two edge chains (see WedgeRelation above), this function returns +1
    //    * if A contains B, 0 if B contains A or the two wedges do not intersect,
    //    * and -1 if the edge chains A and B cross each other (i.e. if A intersects
    //    * both the interior and exterior of the region to the left of B). In
    //    * degenerate cases where more than one of these conditions is satisfied,
    //    * the maximum possible result is returned. For example, if A == B then the
    //    * result is +1.
    //    */
    //   @Override
    //   public int test(S2Point a0, S2Point ab1, S2Point a2, S2Point b0, S2Point b2) {
    //   // There are 6 possible edge orderings at a shared vertex (all
    //   // of these orderings are circular, i.e. abcd == bcda):
    //   //
    //   // (1) a2 b2 b0 a0: A contains B
    //   // (2) a2 a0 b0 b2: B contains A
    //   // (3) a2 a0 b2 b0: A and B are disjoint
    //   // (4) a2 b0 a0 b2: A and B intersect in one wedge
    //   // (5) a2 b2 a0 b0: A and B intersect in one wedge
    //   // (6) a2 b0 b2 a0: A and B intersect in two wedges
    //   //
    //   // In cases (4-6), the boundaries of A and B cross (i.e. the boundary
    //   // of A intersects the interior and exterior of B and vice versa).
    //   // Thus we want to distinguish cases (1), (2-3), and (4-6).
    //   //
    //   // Note that the vertices may satisfy more than one of the edge
    //   // orderings above if two or more vertices are the same. The tests
    //   // below are written so that we take the most favorable
    //   // interpretation, i.e. preferring (1) over (2-3) over (4-6). In
    //   // particular note that if orderedCCW(a,b,c,o) returns true, it may be
    //   // possible that orderedCCW(c,b,a,o) is also true (if a == b or b == c).
    //
    //   if (S2.orderedCCW(a0, a2, b2, ab1)) {
    //   // The cases with this vertex ordering are 1, 5, and 6,
    //   // although case 2 is also possible if a2 == b2.
    //   if (S2.orderedCCW(b2, b0, a0, ab1)) {
    //   return 1; // Case 1 (A contains B)
    // }
    //
    // // We are in case 5 or 6, or case 2 if a2 == b2.
    // return (a2.equals(b2)) ? 0 : -1; // Case 2 vs. 5,6.
    // }
    // // We are in case 2, 3, or 4.
    // return S2.orderedCCW(a0, b0, a2, ab1) ? 0 : -1; // Case 2,3 vs. 4.
    // }
    // }
    //
    // /**
    //  * Return true if edge AB crosses CD at a point that is interior to both
    //  * edges. Properties:
    //  *
    //  *  (1) simpleCrossing(b,a,c,d) == simpleCrossing(a,b,c,d) (2)
    //  * simpleCrossing(c,d,a,b) == simpleCrossing(a,b,c,d)
    //  */
    // public static boolean simpleCrossing(S2Point a, S2Point b, S2Point c, S2Point d) {
    //   // We compute simpleCCW() for triangles ACB, CBD, BDA, and DAC. All
    //   // of these triangles need to have the same orientation (CW or CCW)
    //   // for an intersection to exist. Note that this is slightly more
    //   // restrictive than the corresponding definition for planar edges,
    //   // since we need to exclude pairs of line segments that would
    //   // otherwise "intersect" by crossing two antipodal points.
    //
    //   S2Point ab = S2Point.crossProd(a, b);
    //   double acb = -(ab.dotProd(c));
    //   double bda = ab.dotProd(d);
    //   if (acb * bda <= 0) {
    //     return false;
    //   }
    //
    //   S2Point cd = S2Point.crossProd(c, d);
    //   double cbd = -(cd.dotProd(b));
    //   double dac = cd.dotProd(a);
    //   return (acb * cbd > 0) && (acb * dac > 0);
    // }
    //
    // /**
    //  * Like SimpleCrossing, except that points that lie exactly on a line are
    //  * arbitrarily classified as being on one side or the other (according to the
    //  * rules of S2.robustCCW). It returns +1 if there is a crossing, -1 if there
    //  * is no crossing, and 0 if any two vertices from different edges are the
    //  * same. Returns 0 or -1 if either edge is degenerate. Properties of
    //  * robustCrossing:
    //  *
    //  *  (1) robustCrossing(b,a,c,d) == robustCrossing(a,b,c,d) (2)
    //  * robustCrossing(c,d,a,b) == robustCrossing(a,b,c,d) (3)
    //  * robustCrossing(a,b,c,d) == 0 if a==c, a==d, b==c, b==d (3)
    //  * robustCrossing(a,b,c,d) <= 0 if a==b or c==d
    //  *
    //  *  Note that if you want to check an edge against a *chain* of other edges,
    //  * it is much more efficient to use an EdgeCrosser (above).
    //  */
    // public static int robustCrossing(S2Point a, S2Point b, S2Point c, S2Point d) {
    //   // For there to be a crossing, the triangles ACB, CBD, BDA, DAC must
    //   // all have the same orientation (clockwise or counterclockwise).
    //   //
    //   // First we compute the orientation of ACB and BDA. We permute the
    //   // arguments to robustCCW so that we can reuse the cross-product of A and B.
    //   // Recall that when the arguments to robustCCW are permuted, the sign of the
    //   // result changes according to the sign of the permutation. Thus ACB and
    //   // ABC are oppositely oriented, while BDA and ABD are the same.
    //   S2Point aCrossB = S2Point.crossProd(a, b);
    //   int acb = -S2.robustCCW(a, b, c, aCrossB);
    //   int bda = S2.robustCCW(a, b, d, aCrossB);
    //
    //   // If any two vertices are the same, the result is degenerate.
    //   if ((bda & acb) == 0) {
    //     return 0;
    //   }
    //
    //   // If ABC and BDA have opposite orientations (the most common case),
    //   // there is no crossing.
    //   if (bda != acb) {
    //     return -1;
    //   }
    //
    //   // Otherwise we compute the orientations of CBD and DAC, and check whether
    //   // their orientations are compatible with the other two triangles.
    //   S2Point cCrossD = S2Point.crossProd(c, d);
    //   int cbd = -S2.robustCCW(c, d, b, cCrossD);
    //   if (cbd != acb) {
    //     return -1;
    //   }
    //
    //   int dac = S2.robustCCW(c, d, a, cCrossD);
    //   return (dac == acb) ? 1 : -1;
    // }
    //
    // /**
    //  * Given two edges AB and CD where at least two vertices are identical (i.e.
    //  * robustCrossing(a,b,c,d) == 0), this function defines whether the two edges
    //  * "cross" in a such a way that point-in-polygon containment tests can be
    //  * implemented by counting the number of edge crossings. The basic rule is
    //  * that a "crossing" occurs if AB is encountered after CD during a CCW sweep
    //  * around the shared vertex starting from a fixed reference point.
    //  *
    //  *  Note that according to this rule, if AB crosses CD then in general CD does
    //  * not cross AB. However, this leads to the correct result when counting
    //  * polygon edge crossings. For example, suppose that A,B,C are three
    //  * consecutive vertices of a CCW polygon. If we now consider the edge
    //  * crossings of a segment BP as P sweeps around B, the crossing number changes
    //  * parity exactly when BP crosses BA or BC.
    //  *
    //  *  Useful properties of VertexCrossing (VC):
    //  *
    //  *  (1) VC(a,a,c,d) == VC(a,b,c,c) == false (2) VC(a,b,a,b) == VC(a,b,b,a) ==
    //  * true (3) VC(a,b,c,d) == VC(a,b,d,c) == VC(b,a,c,d) == VC(b,a,d,c) (3) If
    //  * exactly one of a,b equals one of c,d, then exactly one of VC(a,b,c,d) and
    //  * VC(c,d,a,b) is true
    //  *
    //  * It is an error to call this method with 4 distinct vertices.
    //  */
    // public static boolean vertexCrossing(S2Point a, S2Point b, S2Point c, S2Point d) {
    //   // If A == B or C == D there is no intersection. We need to check this
    //   // case first in case 3 or more input points are identical.
    //   if (a.equals(b) || c.equals(d)) {
    //     return false;
    //   }
    //
    //   // If any other pair of vertices is equal, there is a crossing if and only
    //   // if orderedCCW() indicates that the edge AB is further CCW around the
    //   // shared vertex than the edge CD.
    //   if (a.equals(d)) {
    //     return S2.orderedCCW(S2.ortho(a), c, b, a);
    //   }
    //   if (b.equals(c)) {
    //     return S2.orderedCCW(S2.ortho(b), d, a, b);
    //   }
    //   if (a.equals(c)) {
    //     return S2.orderedCCW(S2.ortho(a), d, b, a);
    //   }
    //   if (b.equals(d)) {
    //     return S2.orderedCCW(S2.ortho(b), c, a, b);
    //   }
    //
    //   // assert (false);
    //   return false;
    // }
    //
    // /**
    //  * A convenience function that calls robustCrossing() to handle cases where
    //  * all four vertices are distinct, and VertexCrossing() to handle cases where
    //  * two or more vertices are the same. This defines a crossing function such
    //  * that point-in-polygon containment tests can be implemented by simply
    //  * counting edge crossings.
    //  */
    // public static boolean edgeOrVertexCrossing(S2Point a, S2Point b, S2Point c, S2Point d) {
    //   int crossing = robustCrossing(a, b, c, d);
    //   if (crossing < 0) {
    //     return false;
    //   }
    //   if (crossing > 0) {
    //     return true;
    //   }
    //   return vertexCrossing(a, b, c, d);
    // }
    //
    // static class CloserResult {
    //   private double dmin2;
    //   private S2Point vmin;
    //
    //   public double getDmin2() {
    //   return this.dmin2;
    // }
    //
    //   public S2Point getVmin() {
    //   return this.vmin;
    // }
    //
    //   public CloserResult(double dmin2, S2Point vmin) {
    //   this.dmin2 = dmin2;
    //   this.vmin = vmin;
    // }
    //
    // public void replaceIfCloser(S2Point x, S2Point y) {
    //   // If the squared distance from x to y is less than dmin2, then replace
    //   // vmin by y and update dmin2 accordingly.
    //   double d2 = S2Point.minus(x, y).norm2();
    //   if (d2 < this.dmin2 || (d2 == this.dmin2 && y.lessThan(this.vmin))) {
    //     this.dmin2 = d2;
    //     this.vmin = y;
    //   }
    // }
    // }
    //
    // /*
    //  * Given two edges AB and CD such that robustCrossing() is true, return their
    //  * intersection point. Useful properties of getIntersection (GI):
    //  *
    //  * (1) GI(b,a,c,d) == GI(a,b,d,c) == GI(a,b,c,d) (2) GI(c,d,a,b) ==
    //  * GI(a,b,c,d)
    //  *
    //  * The returned intersection point X is guaranteed to be close to the edges AB
    //  * and CD, but if the edges intersect at a very small angle then X may not be
    //  * close to the true mathematical intersection point P. See the description of
    //  * "DEFAULT_INTERSECTION_TOLERANCE" below for details.
    //  */
    // public static S2Point getIntersection(S2Point a0, S2Point a1, S2Point b0, S2Point b1) {
    //   Preconditions.checkArgument(robustCrossing(a0, a1, b0, b1) > 0,
    //       "Input edges a0a1 and b0b1 muct have a true robustCrossing.");
    //
    //   // We use robustCrossProd() to get accurate results even when two endpoints
    //   // are close together, or when the two line segments are nearly parallel.
    //   S2Point aNorm = S2Point.normalize(S2.robustCrossProd(a0, a1));
    //   S2Point bNorm = S2Point.normalize(S2.robustCrossProd(b0, b1));
    //   S2Point x = S2Point.normalize(S2.robustCrossProd(aNorm, bNorm));
    //
    //   // Make sure the intersection point is on the correct side of the sphere.
    //   // Since all vertices are unit length, and edges are less than 180 degrees,
    //   // (a0 + a1) and (b0 + b1) both have positive dot product with the
    //   // intersection point. We use the sum of all vertices to make sure that the
    //   // result is unchanged when the edges are reversed or exchanged.
    //   if (x.dotProd(S2Point.add(S2Point.add(a0, a1), S2Point.add(b0, b1))) < 0) {
    //     x = S2Point.neg(x);
    //   }
    //
    //   // The calculation above is sufficient to ensure that "x" is within
    //   // DEFAULT_INTERSECTION_TOLERANCE of the great circles through (a0,a1) and
    //   // (b0,b1).
    //   // However, if these two great circles are very close to parallel, it is
    //   // possible that "x" does not lie between the endpoints of the given line
    //   // segments. In other words, "x" might be on the great circle through
    //   // (a0,a1) but outside the range covered by (a0,a1). In this case we do
    //   // additional clipping to ensure that it does.
    //
    //   if (S2.orderedCCW(a0, x, a1, aNorm) && S2.orderedCCW(b0, x, b1, bNorm)) {
    //     return x;
    //   }
    //
    //   // Find the acceptable endpoint closest to x and return it. An endpoint is
    //   // acceptable if it lies between the endpoints of the other line segment.
    //   CloserResult r = new CloserResult(10, x);
    //   if (S2.orderedCCW(b0, a0, b1, bNorm)) {
    //     r.replaceIfCloser(x, a0);
    //   }
    //   if (S2.orderedCCW(b0, a1, b1, bNorm)) {
    //     r.replaceIfCloser(x, a1);
    //   }
    //   if (S2.orderedCCW(a0, b0, a1, aNorm)) {
    //     r.replaceIfCloser(x, b0);
    //   }
    //   if (S2.orderedCCW(a0, b1, a1, aNorm)) {
    //     r.replaceIfCloser(x, b1);
    //   }
    //   return r.getVmin();
    // }
    //
    // /**
    //  * Given a point X and an edge AB, return the distance ratio AX / (AX + BX).
    //  * If X happens to be on the line segment AB, this is the fraction "t" such
    //  * that X == Interpolate(A, B, t). Requires that A and B are distinct.
    //  */
    // public static double getDistanceFraction(S2Point x, S2Point a0, S2Point a1) {
    //   Preconditions.checkArgument(!a0.equals(a1));
    //   double d0 = x.angle(a0);
    //   double d1 = x.angle(a1);
    //   return d0 / (d0 + d1);
    // }
    //
    // /**
    //  * Return the minimum distance from X to any point on the edge AB. The result
    //  * is very accurate for small distances but may have some numerical error if
    //  * the distance is large (approximately Pi/2 or greater). The case A == B is
    //  * handled correctly. Note: x, a and b must be of unit length. Throws
    //  * IllegalArgumentException if this is not the case.
    //  */
    // public static getDistance(x:S2Point , a:S2Point , b:S2Point ):S1Angle  {
    //   return this.getDistance(x, a, b, S2.robustCrossProd(a, b));
    // }
    /**
     * A slightly more efficient version of getDistance() where the cross product
     * of the two endpoints has been precomputed. The cross product does not need
     * to be normalized, but should be computed using S2.robustCrossProd() for the
     * most accurate results.
     */
    static getDistance(x, a, b, aCrossB = S2.robustCrossProd(a, b)) {
      if (S2.simpleCCW(aCrossB, a, x) && S2.simpleCCW(x, b, aCrossB)) {
        const sinDist = Math.abs(x.dotProd(aCrossB)) / aCrossB.norm();
        return new S1Angle(Math.asin(Math.min(1, sinDist)));
      }
      const linearDist2 = Math.min(S2Point.minus(x, a).norm2(), S2Point.minus(x, b).norm2());
      return new S1Angle(
        Math.asin(
          Math.min(
            1,
            Math.sqrt(linearDist2) * 0.5
          )
        ) * 2
      );
    }
    //
    // /**
    //  * Returns the point on edge AB closest to X. x, a and b must be of unit
    //  * length. Throws IllegalArgumentException if this is not the case.
    //  *
    //  */
    // public static S2Point getClosestPoint(S2Point x, S2Point a, S2Point b) {
    //   Preconditions.checkArgument(S2.isUnitLength(x));
    //   Preconditions.checkArgument(S2.isUnitLength(a));
    //   Preconditions.checkArgument(S2.isUnitLength(b));
    //
    //   S2Point crossProd = S2.robustCrossProd(a, b);
    //   // Find the closest point to X along the great circle through AB.
    //   S2Point p = S2Point.minus(x, S2Point.mul(crossProd, x.dotProd(crossProd) / crossProd.norm2()));
    //
    //   // If p is on the edge AB, then it's the closest point.
    //   if (S2.simpleCCW(crossProd, a, p) && S2.simpleCCW(p, b, crossProd)) {
    //     return S2Point.normalize(p);
    //   }
    //   // Otherwise, the closest point is either A or B.
    //   return S2Point.minus(x, a).norm2() <= S2Point.minus(x, b).norm2() ? a : b;
    // }
    //
    // /** Constructor is private so that this class is never instantiated. */
    // private S2EdgeUtil() {
    // }
  };
  var S2LatLngRect = class _S2LatLngRect {
    constructor(lat, lng) {
      this.lat = lat;
      this.lng = lng;
    }
    static fromLatLng(lo, hi) {
      return new _S2LatLngRect(
        new R1Interval(
          lo.latRadians,
          hi.latRadians
        ),
        new S1Interval(
          lo.lngRadians,
          hi.lngRadians
        )
      );
    }
    /** The canonical empty rectangle */
    static empty() {
      return new _S2LatLngRect(R1Interval.empty(), S1Interval.empty());
    }
    /** The canonical full rectangle. */
    static full() {
      return new _S2LatLngRect(_S2LatLngRect.fullLat(), S1Interval.full());
    }
    /** The full allowable range of latitudes. */
    static fullLat() {
      return new R1Interval(-S2.M_PI_2, S2.M_PI_2);
    }
    /**
     * Construct a rectangle from a center point (in lat-lng space) and size in
     * each dimension. If size.lng is greater than 360 degrees it is clamped,
     * and latitudes greater than +/- 90 degrees are also clamped. So for example,
     * FromCenterSize((80,170),(20,20)) -> (lo=(60,150),hi=(90,-170)).
     */
    static fromCenterSize(center, size) {
      return _S2LatLngRect.fromPoint(center).expanded(size.mul(0.5));
    }
    /** Convenience method to construct a rectangle containing a single point. */
    static fromPoint(p) {
      return _S2LatLngRect.fromLatLng(p, p);
    }
    /**
     * Convenience method to construct the minimal bounding rectangle containing
     * the two given points. This is equivalent to starting with an empty
     * rectangle and calling AddPoint() twice. Note that it is different than the
     * S2LatLngRect(lo, hi) constructor, where the first point is always used as
     * the lower-left corner of the resulting rectangle.
     */
    static fromPointPair(p1, p2) {
      return new _S2LatLngRect(R1Interval.fromPointPair(p1.latRadians, p2.latRadians), S1Interval.fromPointPair(p1.lngRadians, p2.lngRadians));
    }
    /**
     * Return a latitude-longitude rectangle that contains the edge from "a" to
     * "b". Both points must be unit-length. Note that the bounding rectangle of
     * an edge can be larger than the bounding rectangle of its endpoints.
     */
    static fromEdge(a, b) {
      const r = _S2LatLngRect.fromPointPair(S2LatLng.fromPoint(a), S2LatLng.fromPoint(b));
      const ab = S2.robustCrossProd(a, b);
      const dir = S2Point.crossProd(ab, new S2Point(0, 0, 1));
      const da = dir.dotProd(a);
      const db = dir.dotProd(b);
      if (da * db >= 0) {
        return r;
      }
      const absLat = Math.acos(ab.z / Math.abs(ab.norm()));
      if (da < 0) {
        return new _S2LatLngRect(new R1Interval(r.lat.lo, absLat), r.lng);
      } else {
        return new _S2LatLngRect(new R1Interval(-absLat, r.lat.hi), r.lng);
      }
    }
    /**
     * Return true if the rectangle is valid, which essentially just means that
     * the latitude bounds do not exceed Pi/2 in absolute value and the longitude
     * bounds do not exceed Pi in absolute value.
     *
     */
    isValid() {
      return Math.abs(this.lat.lo) <= S2.M_PI_2 && Math.abs(this.lat.hi) <= S2.M_PI_2 && this.lng.isValid() && this.lat.isEmpty() == this.lng.isEmpty();
    }
    lo() {
      return new S2LatLng(this.lat.lo, this.lng.lo);
    }
    hi() {
      return new S2LatLng(this.lat.hi, this.lng.hi);
    }
    latLo() {
      return S1Angle.radians(this.lat.lo);
    }
    latHi() {
      return S1Angle.radians(this.lat.hi);
    }
    lngLo() {
      return S1Angle.radians(this.lng.lo);
    }
    lngHi() {
      return S1Angle.radians(this.lng.hi);
    }
    /**
     * Return true if the rectangle is empty, i.e. it contains no points at all.
     */
    isEmpty() {
      return this.lat.isEmpty();
    }
    // Return true if the rectangle is full, i.e. it contains all points.
    isFull() {
      return this.lat.equals(_S2LatLngRect.fullLat()) && this.lng.isFull();
    }
    /**
     * Return true if lng_.lo() > lng_.hi(), i.e. the rectangle crosses the 180
     * degree latitude line.
     */
    isInverted() {
      return this.lng.isInverted();
    }
    /** Return the k-th vertex of the rectangle (k = 0,1,2,3) in CCW order. */
    getVertex(k) {
      switch (k) {
        case 0:
          return this.lo();
        case 1:
          return new S2LatLng(this.lat.lo, this.lng.hi);
        case 2:
          return this.hi();
        case 3:
          return new S2LatLng(this.lat.hi, this.lng.lo);
        default:
          throw new Error("Invalid vertex index.");
      }
    }
    /**
     * Return the center of the rectangle in latitude-longitude space (in general
     * this is not the center of the region on the sphere).
     */
    getCenter() {
      return new S2LatLng(this.lat.getCenter(), this.lng.getCenter());
    }
    /**
     * Return the minimum distance (measured along the surface of the sphere)
     * from a given point to the rectangle (both its boundary and its interior).
     * The latLng must be valid.
     */
    getDistanceLL(p) {
      if (this.isEmpty()) {
        throw new Error();
      }
      if (!p.isValid()) {
        throw new Error("point is not valid");
      }
      if (this.lng.contains(p.lngRadians)) {
        return new S1Angle(
          Math.max(
            0,
            Math.max(
              p.latRadians - this.lat.hi,
              this.lat.lo - p.latRadians
            )
          )
        );
      }
      const interval = new S1Interval(this.lng.hi, this.lng.complement().getCenter());
      let aLng = this.lng.lo;
      if (interval.contains(p.lngRadians)) {
        aLng = this.lng.hi;
      }
      const lo = new S2LatLng(this.lat.lo, aLng).toPoint();
      const hi = new S2LatLng(this.lat.hi, aLng).toPoint();
      const loCrossHi = new S2LatLng(0, aLng - S2.M_PI_2).normalized().toPoint();
      return S2EdgeUtil.getDistance(p.toPoint(), lo, hi, loCrossHi);
    }
    /**
     * Return the minimum distance (measured along the surface of the sphere) to
     * the given S2LatLngRect. Both S2LatLngRects must be non-empty.
     */
    getDistanceLLR(other) {
      const b = other;
      if (this.isEmpty()) {
        throw new Error();
      }
      if (b.isEmpty()) {
        throw new Error();
      }
      if (this.lng.intersects(b.lng)) {
        if (this.lat.intersects(b.lat)) {
          return new S1Angle(0);
        }
        let lo, hi;
        if (this.lat.lo > b.lat.hi) {
          lo = b.lat.hi;
          hi = this.lat.lo;
        } else {
          lo = this.lat.hi;
          hi = b.lat.lo;
        }
        return S1Angle.radians(hi.radians() - lo.radians());
      }
      let aLng, bLng;
      const loHi = S1Interval.fromPointPair(this.lng.lo, b.lng.hi);
      const hiLo = S1Interval.fromPointPair(this.lng.hi, b.lng.lo);
      if (loHi.getLength() < hiLo.getLength()) {
        aLng = this.lng.lo;
        bLng = b.lng.hi;
      } else {
        aLng = this.lng.hi;
        bLng = b.lng.lo;
      }
      const aLo = new S2LatLng(this.lat.lo, aLng).toPoint();
      const aHi = new S2LatLng(this.lat.hi, aLng).toPoint();
      const aLoCrossHi = new S2LatLng(0, aLng.radians().minus(S2.M_PI_2)).normalized().toPoint();
      const bLo = new S2LatLng(b.lat.lo, bLng).toPoint();
      const bHi = new S2LatLng(b.lat.hi, bLng).toPoint();
      const bLoCrossHi = new S2LatLng(0, bLng.radians().minus(S2.M_PI_2)).normalized().toPoint();
      return S1Angle.min(
        S2EdgeUtil.getDistance(aLo, bLo, bHi, bLoCrossHi),
        S1Angle.min(
          S2EdgeUtil.getDistance(aHi, bLo, bHi, bLoCrossHi),
          S1Angle.min(
            S2EdgeUtil.getDistance(bLo, aLo, aHi, aLoCrossHi),
            S2EdgeUtil.getDistance(bHi, aLo, aHi, aLoCrossHi)
          )
        )
      );
    }
    /**
     * Return the width and height of this rectangle in latitude-longitude space.
     * Empty rectangles have a negative width and height.
     */
    getSize() {
      return new S2LatLng(this.lat.getLength(), this.lng.getLength());
    }
    /**
     * More efficient version of Contains() that accepts a S2LatLng rather than an
     * S2Point.
     */
    containsLL(ll) {
      return this.lat.contains(ll.latRadians) && this.lng.contains(ll.lngRadians);
    }
    /**
     * Return true if and only if the given point is contained in the interior of
     * the region (i.e. the region excluding its boundary). The point 'p' does not
     * need to be normalized.
     */
    interiorContainsP(p) {
      return this.interiorContainsLL(S2LatLng.fromPoint(p));
    }
    /**
     * More efficient version of InteriorContains() that accepts a S2LatLng rather
     * than an S2Point.
     */
    interiorContainsLL(ll) {
      return this.lat.interiorContains(ll.latRadians) && this.lng.interiorContains(ll.lngRadians);
    }
    /**
     * Return true if and only if the rectangle contains the given other
     * rectangle.
     */
    containsLLR(other) {
      return this.lat.containsI(other.lat) && this.lng.containsI(other.lng);
    }
    /**
     * Return true if and only if the interior of this rectangle contains all
     * points of the given other rectangle (including its boundary).
     */
    interiorContainsLLR(other) {
      return this.lat.interiorContainsI(other.lat) && this.lng.interiorContainsI(other.lng);
    }
    /** Return true if this rectangle and the given other rectangle have any
     points in common. */
    intersectsLLR(other) {
      return this.lat.intersects(other.lat) && this.lng.intersects(other.lng);
    }
    /**
     * Returns true if this rectangle intersects the given cell. (This is an exact
     * test and may be fairly expensive, see also MayIntersect below.)
     */
    intersects(cell) {
      if (this.isEmpty()) {
        return false;
      }
      if (this.containsP(cell.getCenterRaw())) {
        return true;
      }
      if (cell.contains(this.getCenter().toPoint())) {
        return true;
      }
      if (!this.intersectsLLR(cell.getRectBound())) {
        return false;
      }
      const cellV = new Array(4);
      const cellLl = new Array(4);
      for (let i = 0; i < 4; ++i) {
        cellV[i] = cell.getVertex(i);
        cellLl[i] = S2LatLng.fromPoint(cellV[i]);
        if (this.containsLL(cellLl[i])) {
          return true;
        }
      }
      for (let i = 0; i < 4; ++i) {
        const edgeLng = S1Interval.fromPointPair(
          cellLl[i].lngRadians,
          cellLl[i + 1 & 3].lngRadians
        );
        if (!this.lng.intersects(edgeLng)) {
          continue;
        }
        const a = cellV[i];
        const b = cellV[i + 1 & 3];
        if (edgeLng.contains(this.lng.lo)) {
          if (_S2LatLngRect.intersectsLngEdge(a, b, this.lat, this.lng.lo)) {
            return true;
          }
        }
        if (edgeLng.contains(this.lng.hi)) {
          if (_S2LatLngRect.intersectsLngEdge(a, b, this.lat, this.lng.hi)) {
            return true;
          }
        }
        if (_S2LatLngRect.intersectsLatEdge(a, b, this.lat.lo, this.lng)) {
          return true;
        }
        if (_S2LatLngRect.intersectsLatEdge(a, b, this.lat.hi, this.lng)) {
          return true;
        }
      }
      return false;
    }
    /**
     * Return true if and only if the interior of this rectangle intersects any
     * point (including the boundary) of the given other rectangle.
     */
    interiorIntersects(other) {
      return this.lat.interiorIntersects(other.lat) && this.lng.interiorIntersects(other.lng);
    }
    addPoint(p) {
      return this.addPointLL(S2LatLng.fromPoint(p));
    }
    // Increase the size of the bounding rectangle to include the given point.
    // The rectangle is expanded by the minimum amount possible.
    addPointLL(ll) {
      const newLat = this.lat.addPoint(ll.latRadians);
      const newLng = this.lng.addPoint(ll.lngRadians);
      return new _S2LatLngRect(newLat, newLng);
    }
    /**
     * Return a rectangle that contains all points whose latitude distance from
     * this rectangle is at most margin.lat, and whose longitude distance from
     * this rectangle is at most margin.lng. In particular, latitudes are
     * clamped while longitudes are wrapped. Note that any expansion of an empty
     * interval remains empty, and both components of the given margin must be
     * non-negative.
     *
     * NOTE: If you are trying to grow a rectangle by a certain *distance* on the
     * sphere (e.g. 5km), use the ConvolveWithCap() method instead.
     */
    expanded(margin) {
      if (this.isEmpty()) {
        return this;
      }
      return new _S2LatLngRect(
        this.lat.expanded(margin.latRadians).intersection(
          _S2LatLngRect.fullLat()
        ),
        this.lng.expanded(margin.lngRadians)
      );
    }
    polarClosure() {
      if (this.lat.lo == -S2.M_PI_2 || this.lat.hi == S2.M_PI_2) {
        return new _S2LatLngRect(this.lat, S1Interval.full());
      } else {
        return this;
      }
    }
    /**
     * Return the smallest rectangle containing the union of this rectangle and
     * the given rectangle.
     */
    union(other) {
      return new _S2LatLngRect(this.lat.union(other.lat), this.lng.union(other.lng));
    }
    /**
     * Return the smallest rectangle containing the intersection of this rectangle
     * and the given rectangle. Note that the region of intersection may consist
     * of two disjoint rectangles, in which case a single rectangle spanning both
     * of them is returned.
     */
    intersection(other) {
      const intersectLat = this.lat.intersection(other.lat);
      const intersectLng = this.lng.intersection(other.lng);
      if (intersectLat.isEmpty() || intersectLng.isEmpty()) {
        return _S2LatLngRect.empty();
      }
      return new _S2LatLngRect(intersectLat, intersectLng);
    }
    //
    // /**
    //  * Return a rectangle that contains the convolution of this rectangle with a
    //  * cap of the given angle. This expands the rectangle by a fixed distance (as
    //  * opposed to growing the rectangle in latitude-longitude space). The returned
    //  * rectangle includes all points whose minimum distance to the original
    //  * rectangle is at most the given angle.
    //  */
    // public S2LatLngRect convolveWithCap(/*S1Angle*/ angle) {
    //   // The most straightforward approach is to build a cap centered on each
    //   // vertex and take the union of all the bounding rectangles (including the
    //   // original rectangle; this is necessary for very large rectangles).
    //
    //   // Optimization: convert the angle to a height exactly once.
    //   S2Cap cap = S2Cap.fromAxisAngle(new S2Point(1, 0, 0), angle);
    //
    //   S2LatLngRect r = this;
    //   for (int k = 0; k < 4; ++k) {
    //     S2Cap vertexCap = S2Cap.fromAxisHeight(getVertex(k).toPoint(), cap
    //         .height());
    //     r = r.union(vertexCap.getRectBound());
    //   }
    //   return r;
    // }
    /** Return the surface area of this rectangle on the unit sphere. */
    area() {
      if (this.isEmpty()) {
        return 0;
      }
      return this.lng.getLength() * (Math.sin(this.lat.hi) - Math.abs(Math.sin(this.lat.lo)));
    }
    /** Return true if two rectangles contains the same set of points. */
    equals(that) {
      if (!(that instanceof _S2LatLngRect)) {
        return false;
      }
      return this.lat.equals(that.lat) && this.lng.equals(that.lng);
    }
    /**
     * Return true if the latitude and longitude intervals of the two rectangles
     * are the same up to the given tolerance (see r1interval.h and s1interval.h
     * for details).
     */
    approxEquals(other, maxError = 1e-15) {
      return this.lat.approxEquals(other.lat, maxError) && this.lng.approxEquals(
        other.lng,
        maxError
      );
    }
    // //////////////////////////////////////////////////////////////////////
    // S2Region interface (see {@code S2Region} for details):
    clone() {
      return new _S2LatLngRect(this.lat, this.lng);
    }
    getCapBound() {
      if (this.isEmpty()) {
        return S2Cap.empty();
      }
      const useSouthPole = this.lat.lo + this.lat.hi < 0;
      const poleZ = useSouthPole ? -1 : 1;
      const poleAngle = useSouthPole ? S2.M_PI_2 + this.lat.hi : S2.M_PI_2 - this.lat.lo;
      const poleCap = S2Cap.fromAxisAngle(new S2Point(0, 0, poleZ), S1Angle.radians(poleAngle));
      const lngSpan = this.lng.hi - this.lng.lo;
      if (Platform.IEEEremainder(lngSpan, 2 * S2.M_PI) >= 0) {
        if (lngSpan < 2 * S2.M_PI) {
          let midCap = S2Cap.fromAxisAngle(this.getCenter().toPoint(), S1Angle.radians(0));
          for (let k = 0; k < 4; ++k) {
            midCap = midCap.addPoint(this.getVertex(k).toPoint());
          }
          if (midCap.height() < poleCap.height()) {
            return midCap;
          }
        }
      }
      return poleCap;
    }
    getRectBound() {
      return this;
    }
    containsC(cell) {
      return this.containsLLR(cell.getRectBound());
    }
    /**
     * This test is cheap but is NOT exact. Use Intersects() if you want a more
     * accurate and more expensive test. Note that when this method is used by an
     * S2RegionCoverer, the accuracy isn't all that important since if a cell may
     * intersect the region then it is subdivided, and the accuracy of this method
     * goes up as the cells get smaller.
     */
    mayIntersectC(cell) {
      return this.intersectsLLR(cell.getRectBound());
    }
    /** The point 'p' does not need to be normalized. */
    containsP(p) {
      return this.containsLL(S2LatLng.fromPoint(p));
    }
    /**
     * Return true if the edge AB intersects the given edge of constant longitude.
     */
    static intersectsLngEdge(a, b, lat, lng) {
      return S2.simpleCrossing(a, b, new S2LatLng(lat.lo, lng).toPoint(), new S2LatLng(lat.hi, lng).toPoint());
    }
    /**
     * Return true if the edge AB intersects the given edge of constant latitude.
     */
    static intersectsLatEdge(a, b, lat, lng) {
      let z = S2Point.normalize(S2.robustCrossProd(a, b));
      if (z.z < 0) {
        z = S2Point.neg(z);
      }
      const y = S2Point.normalize(S2.robustCrossProd(z, new S2Point(0, 0, 1)));
      const x = S2Point.crossProd(y, z);
      const sinLat = Math.sin(lat);
      if (Math.abs(sinLat) >= x.z) {
        return false;
      }
      const cosTheta = sinLat / x.z;
      const sinTheta = Math.sqrt(1 - cosTheta * cosTheta);
      const theta = Math.atan2(sinTheta, cosTheta);
      const abTheta = S1Interval.fromPointPair(Math.atan2(
        a.dotProd(y),
        a.dotProd(x)
      ), Math.atan2(b.dotProd(y), b.dotProd(x)));
      if (abTheta.contains(theta)) {
        const isect = S2Point.add(S2Point.mul(x, cosTheta), S2Point.mul(
          y,
          sinTheta
        ));
        if (lng.contains(Math.atan2(isect.y, isect.x))) {
          return true;
        }
      }
      if (abTheta.contains(theta * -1)) {
        const intersection = S2Point.sub(S2Point.mul(x, cosTheta), S2Point.mul(y, sinTheta));
        if (lng.contains(Math.atan2(intersection.y, intersection.x))) {
          return true;
        }
      }
      return false;
    }
    allVertex() {
      return [
        this.getVertex(0),
        this.getVertex(1),
        this.getVertex(2),
        this.getVertex(3)
      ];
    }
    toGEOJSON() {
      return {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [this.allVertex().concat(this.getVertex(0)).map((v) => [parseFloat(v.lngDegrees.toFixed(5)), parseFloat(v.latDegrees.toFixed(5))])]
        },
        properties: {}
      };
    }
    toString() {
      return "[Lo=" + this.lo().toString() + ", Hi=" + this.hi().toString() + "]";
    }
  };
  function checkArgument(condition, message) {
    if (!condition) {
      throw Error("IllegalArgumentException: " + (message || ""));
    }
  }
  var _S1ChordAngle = class _S1ChordAngle2 {
    /**
     * S1ChordAngles are represented by the squared chord length, which can range from 0 to {@code
     * MAX_LENGTH2}. {@link #INFINITY} uses an infinite squared length.
     */
    constructor(length2) {
      this.length2 = length2;
      checkArgument(this.isValid());
    }
    /**
     * Constructs the S1ChordAngle corresponding to the distance between the two given points. The
     * points must be unit length.
     */
    static fromS2Point(x, y) {
      checkArgument(S2.isUnitLength(x));
      checkArgument(S2.isUnitLength(y));
      const length2 = Math.min(_S1ChordAngle2.MAX_LENGTH2, x.getDistance2(y));
      return new _S1ChordAngle2(length2);
    }
    /**
     * Returns a new chord angle approximated from {@code angle} (see {@link
     * #getS1AngleConstructorMaxError()} for the max magnitude of the error).
     *
     * <p>Angles outside the range [0, Pi] are handled as follows:
     *
     * <ul>
     *   <li>{@link S1Angle#INFINITY} is mapped to {@link #INFINITY}
     *   <li>negative angles are mapped to {@link #NEGATIVE}
     *   <li>finite angles larger than Pi are mapped to {@link #STRAIGHT}
     * </ul>
     *
     * <p>Note that this operation is relatively expensive and should be avoided. To use {@link
     * S1ChordAngle} effectively, you should structure your code so that input arguments are converted
     * to S1ChordAngles at the beginning of your algorithm, and results are converted back to {@link
     * S1Angle}s only at the end.
     */
    static fromS1Angle(angle) {
      if (angle.radians < 0) {
        return _S1ChordAngle2.NEGATIVE;
      } else if (angle.equals(S1Angle.INFINITY)) {
        return _S1ChordAngle2.INFINITY;
      } else {
        const length = 2 * Math.sin(0.5 * Math.min(Math.PI, angle.radians));
        return new _S1ChordAngle2(length * length);
      }
    }
    /**
     * Construct an S1ChordAngle from the squared chord length. Note that the argument is
     * automatically clamped to a maximum of {@code MAX_LENGTH2} to handle possible roundoff errors.
     * The argument must be non-negative.
     */
    static fromLength2(length2) {
      return new _S1ChordAngle2(Math.min(_S1ChordAngle2.MAX_LENGTH2, length2));
    }
    /** Returns whether the chord distance is exactly 0. */
    isZero() {
      return this.length2 == 0;
    }
    /** Returns whether the chord distance is negative. */
    isNegative() {
      return this.length2 < 0;
    }
    /** Returns whether the chord distance is exactly (positive) infinity. */
    isInfinity() {
      return this.length2 == Number.POSITIVE_INFINITY;
    }
    /** Returns true if the angle is negative or infinity. */
    isSpecial() {
      return this.isNegative() || this.isInfinity();
    }
    /**
     * Returns true if getLength2() is within the normal range of 0 to 4 (inclusive) or the angle is
     * special.
     */
    isValid() {
      return this.length2 >= 0 && this.length2 <= _S1ChordAngle2.MAX_LENGTH2 || this.isNegative() || this.isInfinity();
    }
    /**
     * Convert the chord angle to an {@link S1Angle}. {@link #INFINITY} is converted to {@link
     * S1Angle#INFINITY}, and {@link #NEGATIVE} is converted to a negative {@link S1Angle}. This
     * operation is relatively expensive.
     */
    toAngle() {
      if (this.isNegative()) {
        return S1Angle.radians(-1);
      } else if (this.isInfinity()) {
        return S1Angle.INFINITY;
      } else {
        return S1Angle.radians(2 * Math.asin(0.5 * Math.sqrt(this.length2)));
      }
    }
    /** The squared length of the chord. (Most clients will not need this.) */
    getLength2() {
      return this.length2;
    }
    /**
     * Returns the smallest representable S1ChordAngle larger than this object. This can be used to
     * convert a "<" comparison to a "<=" comparison.
     *
     * <p>Note the following special cases:
     *
     * <ul>
     *   <li>NEGATIVE.successor() == ZERO
     *   <li>STRAIGHT.successor() == INFINITY
     *   <li>INFINITY.Successor() == INFINITY
     * </ul>
     */
    //   public successor(): S1ChordAngle {
    //     if (this.length2 >= S1ChordAngle.MAX_LENGTH2) {
    //       return S1ChordAngle.INFINITY;
    //     }
    //     if (this.length2 < 0.0) {
    //       return S1ChordAngle.ZERO;
    //     }
    //     return new S1ChordAngle(Platform.nextAfter(this.length2, 10.0));
    //   }
    /**
     * As {@link #successor}, but returns the largest representable S1ChordAngle less than this
     * object.
     *
     * <p>Note the following special cases:
     *
     * <ul>
     *   <li>INFINITY.predecessor() == STRAIGHT
     *   <li>ZERO.predecessor() == NEGATIVE
     *   <li>NEGATIVE.predecessor() == NEGATIVE
     * </ul>
     */
    //   public predecessor(): S1ChordAngle {
    //     if (this.length2 <= 0.0) {
    //       return S1ChordAngle.NEGATIVE;
    //     }
    //     if (this.length2 > S1ChordAngle.MAX_LENGTH2) {
    //       return S1ChordAngle.STRAIGHT;
    //     }
    //     return new S1ChordAngle(Platform.nextAfter(this.length2, -10.0));
    //   }
    /**
     * Returns a new S1ChordAngle whose chord distance represents the sum of the angular distances
     * represented by the 'a' and 'b' chord angles.
     *
     * <p>Note that this method is much more efficient than converting the chord angles to S1Angles
     * and adding those. It requires only one square root plus a few additions and multiplications.
     */
    static add(a, b) {
      checkArgument(!a.isSpecial());
      checkArgument(!b.isSpecial());
      const a2 = a.length2;
      const b2 = b.length2;
      if (b2 == 0) {
        return a;
      }
      if (a2 + b2 >= _S1ChordAngle2.MAX_LENGTH2) {
        return _S1ChordAngle2.STRAIGHT;
      }
      const x = a2 * (1 - 0.25 * b2);
      const y = b2 * (1 - 0.25 * a2);
      return new _S1ChordAngle2(Math.min(_S1ChordAngle2.MAX_LENGTH2, x + y + 2 * Math.sqrt(x * y)));
    }
    /**
     * Subtract one S1ChordAngle from another.
     *
     * <p>Note that this method is much more efficient than converting the chord angles to S1Angles
     * and adding those. It requires only one square root plus a few additions and multiplications.
     */
    static sub(a, b) {
      checkArgument(!a.isSpecial());
      checkArgument(!b.isSpecial());
      const a2 = a.length2;
      const b2 = b.length2;
      if (b2 == 0) {
        return a;
      }
      if (a2 <= b2) {
        return _S1ChordAngle2.ZERO;
      }
      const x = a2 * (1 - 0.25 * b2);
      const y = b2 * (1 - 0.25 * a2);
      return new _S1ChordAngle2(Math.max(0, x + y - 2 * Math.sqrt(x * y)));
    }
    /** Returns the smaller of the given instances. */
    static min(a, b) {
      return a.length2 <= b.length2 ? a : b;
    }
    /** Returns the larger of the given instances. */
    static max(a, b) {
      return a.length2 > b.length2 ? a : b;
    }
    /** Returns the square of Math.sin(toAngle().radians()), but computed more efficiently. */
    static sin2(a) {
      checkArgument(!a.isSpecial());
      return a.length2 * (1 - 0.25 * a.length2);
    }
    /** Returns Math.sin(toAngle().radians()), but computed more efficiently. */
    static sin(a) {
      return Math.sqrt(this.sin2(a));
    }
    /** Returns Math.cos(toAngle().radians()), but computed more efficiently. */
    static cos(a) {
      checkArgument(!a.isSpecial());
      return 1 - 0.5 * a.length2;
    }
    /** Returns Math.tan(toAngle().radians()), but computed more efficiently. */
    static tan(a) {
      return this.sin(a) / this.cos(a);
    }
    /**
     * Returns a new S1ChordAngle that has been adjusted by the given error bound (which can be
     * positive or negative). {@code error} should be the value returned by one of the error bound
     * methods below. For example:
     *
     * <pre>
     *    {@code S1ChordAngle a = new S1ChordAngle(x, y);}
     *    {@code S1ChordAngle a1 = a.plusError(a.getS2PointConstructorMaxError());}
     * </pre>
     *
     * <p>If this {@link #isSpecial}, we return {@code this}.
     */
    plusError(error) {
      return this.isSpecial() ? this : _S1ChordAngle2.fromLength2(Math.max(0, Math.min(_S1ChordAngle2.MAX_LENGTH2, this.length2 + error)));
    }
    /** Returns the error in {@link #fromS1Angle}. */
    getS1AngleConstructorMaxError() {
      return S2.DBL_EPSILON * this.length2;
    }
    /**
     * There is a relative error of {@code 2.5 * DBL_EPSILON} when computing the squared distance,
     * plus a relative error of {@code 2 * DBL_EPSILON} and an absolute error of {@code 16 *
     * DBL_EPSILON^2} because the lengths of the input points may differ from 1 by up to {@code 2 *
     * DBL_EPSILON} each. (This is the maximum length error in {@link S2Point#normalize}).
     */
    getS2PointConstructorMaxError() {
      return 4.5 * S2.DBL_EPSILON * this.length2 + 16 * S2.DBL_EPSILON * S2.DBL_EPSILON;
    }
    /** Returns the string of the closest {@link S1Angle} to this chord distance. */
    toString() {
      return this.toAngle().toString();
    }
    compareTo(that) {
      return this.length2 - that.length2;
    }
    equals(that) {
      return this.compareTo(that) === 0;
    }
  };
  _S1ChordAngle.MAX_LENGTH2 = 4;
  _S1ChordAngle.ZERO = new _S1ChordAngle(0);
  _S1ChordAngle.RIGHT = new _S1ChordAngle(2);
  _S1ChordAngle.STRAIGHT = new _S1ChordAngle(_S1ChordAngle.MAX_LENGTH2);
  _S1ChordAngle.INFINITY = new _S1ChordAngle(Number.POSITIVE_INFINITY);
  _S1ChordAngle.NEGATIVE = new _S1ChordAngle(-1);
  var S1ChordAngle = _S1ChordAngle;
  var _S2Cap = class _S2Cap2 {
    /**
     * Create a cap given its axis and the cap height, i.e. the maximum projected
     * distance along the cap axis from the cap center. 'axis' should be a
     * unit-length vector.
     */
    constructor(axis, radius) {
      this.axis = axis;
      this.radius = radius;
    }
    static fromAxisChord(center, radius) {
      return new _S2Cap2(center, radius);
    }
    /**
     * Create a cap given its axis and the cap height, i.e. the maximum projected distance along the
     * cap axis from the cap center. 'axis' should be a unit-length vector.
     */
    static fromAxisHeight(axis, height) {
      return new _S2Cap2(axis, S1ChordAngle.fromLength2(2 * height));
    }
    /**
     * Create a cap given its axis and the cap opening angle, i.e. maximum angle
     * between the axis and a point on the cap. 'axis' should be a unit-length
     * vector, and 'angle' should be between 0 and 180 degrees.
     */
    static fromAxisAngle(axis, angle) {
      return this.fromAxisChord(
        axis,
        S1ChordAngle.fromS1Angle(S1Angle.radians(Math.min(angle.radians, S2.M_PI)))
      );
    }
    /**
     * Create a cap given its axis and its area in steradians. 'axis' should be a unit-length vector,
     * and 'area' should be between 0 and 4 * M_PI.
     */
    static fromAxisArea(axis, area) {
      return new _S2Cap2(axis, S1ChordAngle.fromLength2(area / S2.M_PI));
    }
    /** Return an empty cap, i.e. a cap that contains no points. */
    static empty() {
      return new _S2Cap2(S2Point.X_POS, S1ChordAngle.NEGATIVE);
    }
    /** Return a full cap, i.e. a cap that contains all points. */
    static full() {
      return new _S2Cap2(S2Point.X_POS, S1ChordAngle.STRAIGHT);
    }
    getCapBound() {
      return this;
    }
    height() {
      return 0.5 * this.radius.getLength2();
    }
    area() {
      return 2 * S2.M_PI * Math.max(0, this.height());
    }
    /**
     * Returns the cap radius as an S1Angle. Since the cap angle is stored internally as an
     * S1ChordAngle, this method requires a trigonometric operation and may yield a slightly different
     * result than the value passed to {@link #fromAxisAngle(S2Point, S1Angle)}.
     */
    angle() {
      return this.radius.toAngle();
    }
    /**
     * Returns true if the axis is {@link S2#isUnitLength unit length}, and the angle is less than Pi.
     *
     * <p>Negative angles or heights are valid, and represent empty caps.
     */
    isValid() {
      return S2.isUnitLength(this.axis) && this.radius.getLength2() <= 4;
    }
    /** Return true if the cap is empty, i.e. it contains no points. */
    isEmpty() {
      return this.radius.isNegative();
    }
    /** Return true if the cap is full, i.e. it contains all points. */
    isFull() {
      return S1ChordAngle.STRAIGHT.equals(this.radius);
    }
    /**
     * Return the complement of the interior of the cap. A cap and its complement have the same
     * boundary but do not share any interior points. The complement operator is not a bijection,
     * since the complement of a singleton cap (containing a single point) is the same as the
     * complement of an empty cap.
     */
    complement() {
      if (this.isFull()) {
        return _S2Cap2.empty();
      }
      if (this.isEmpty()) {
        return _S2Cap2.full();
      }
      return _S2Cap2.fromAxisChord(S2Point.neg(this.axis), S1ChordAngle.fromLength2(4 - this.radius.getLength2()));
    }
    /**
     * Return true if and only if this cap contains the given other cap (in a set
     * containment sense, e.g. every cap contains the empty cap).
     */
    containsCap(other) {
      if (this.isFull() || other.isEmpty()) {
        return true;
      } else {
        const axialDistance = S1ChordAngle.fromS2Point(this.axis, other.axis);
        return this.radius.compareTo(S1ChordAngle.add(axialDistance, other.radius)) >= 0;
      }
    }
    /**
     * Return true if and only if the interior of this cap intersects the given other cap. (This
     * relationship is not symmetric, since only the interior of this cap is used.)
     */
    interiorIntersects(other) {
      return !this.complement().containsCap(other);
    }
    /**
     * Return true if and only if the given point is contained in the interior of the region (i.e. the
     * region excluding its boundary). 'p' should be a unit-length vector.
     */
    interiorContains(p) {
      return this.isFull() || S1ChordAngle.fromS2Point(this.axis, p).compareTo(this.radius) < 0;
    }
    /**
     * Increase the cap radius if necessary to include the given point. If the cap is empty the axis
     * is set to the given point, but otherwise it is left unchanged.
     *
     * @param p must be {@link S2#isUnitLength unit length}
     */
    addPoint(p) {
      if (this.isEmpty()) {
        return new _S2Cap2(p, S1ChordAngle.ZERO);
      } else {
        return new _S2Cap2(
          this.axis,
          S1ChordAngle.fromLength2(Math.max(this.radius.getLength2(), this.axis.getDistance2(p)))
        );
      }
    }
    // Increase the cap height if necessary to include "other". If the current
    // cap is empty it is set to the given other cap.
    addCap(other) {
      if (this.isEmpty()) {
        return other;
      } else if (other.isEmpty()) {
        return this;
      } else {
        const dist = S1ChordAngle.add(S1ChordAngle.fromS2Point(this.axis, other.axis), other.radius);
        const roundedUp = dist.plusError(S2.DBL_EPSILON * dist.getLength2());
        return new _S2Cap2(this.axis, S1ChordAngle.max(this.radius, roundedUp));
      }
    }
    // //////////////////////////////////////////////////////////////////////
    // S2Region interface (see {@code S2Region} for details):
    getRectBound() {
      if (this.isEmpty()) {
        return S2LatLngRect.empty();
      }
      if (this.isFull()) {
        return S2LatLngRect.full();
      }
      const axisLatLng = S2LatLng.fromPoint(this.axis);
      const capAngle = this.angle().radians;
      let allLongitudes = false;
      const lat = [];
      const lng = [];
      lng[0] = -S2.M_PI;
      lng[1] = S2.M_PI;
      lat[0] = axisLatLng.lat().radians - capAngle;
      if (lat[0] <= -S2.M_PI_2) {
        lat[0] = -S2.M_PI_2;
        allLongitudes = true;
      }
      lat[1] = axisLatLng.lat().radians + capAngle;
      if (lat[1] >= S2.M_PI_2) {
        lat[1] = S2.M_PI_2;
        allLongitudes = true;
      }
      if (!allLongitudes) {
        const sinA = S1ChordAngle.sin(this.radius);
        const sinC = Math.cos(axisLatLng.lat().radians);
        if (sinA <= sinC) {
          const angleA = Math.asin(sinA / sinC);
          lng[0] = Platform.IEEEremainder(axisLatLng.lng().radians - angleA, 2 * S2.M_PI);
          lng[1] = Platform.IEEEremainder(axisLatLng.lng().radians + angleA, 2 * S2.M_PI);
        }
      }
      return new S2LatLngRect(new R1Interval(lat[0], lat[1]), new S1Interval(lng[0], lng[1]));
    }
    // public mayIntersectC(cell:S2Cell):boolean {
    //   const toRet = this._mayIntersectC(cell);
    //   console.log("intersects? ",toRet, cell.id.pos().toString(16), cell.level);
    //   return toRet;
    // }
    mayIntersectC(cell) {
      const vertices = new Array(4);
      for (let k = 0; k < 4; ++k) {
        vertices[k] = cell.getVertex(k);
        if (this.contains(vertices[k])) {
          return true;
        }
      }
      return this.intersects(cell, vertices);
    }
    /**
     * Return true if the cap intersects 'cell', given that the cap vertices have
     * alrady been checked.
     */
    intersects(cell, vertices) {
      if (this.radius.compareTo(S1ChordAngle.RIGHT) >= 0) {
        return false;
      }
      if (this.isEmpty()) {
        return false;
      }
      if (cell.contains(this.axis)) {
        return true;
      }
      const sin2Angle = S1ChordAngle.sin2(this.radius);
      for (let k = 0; k < 4; ++k) {
        const edge = cell.getEdgeRaw(k);
        const dot = this.axis.dotProd(edge);
        if (dot > 0) {
          continue;
        }
        if (dot * dot > sin2Angle * edge.norm2()) {
          return false;
        }
        const dir = S2Point.crossProd(edge, this.axis);
        if (dir.dotProd(vertices[k]) < 0 && dir.dotProd(vertices[k + 1 & 3]) > 0) {
          return true;
        }
      }
      return false;
    }
    contains(p) {
      return S1ChordAngle.fromS2Point(this.axis, p).compareTo(this.radius) <= 0;
    }
    containsC(cell) {
      const vertices = [];
      for (let k = 0; k < 4; ++k) {
        vertices[k] = cell.getVertex(k);
        if (!this.contains(vertices[k])) {
          return false;
        }
      }
      return !this.complement().intersects(cell, vertices);
    }
    //
    // /** Return true if two caps are identical. */
    // public equals(that:Object ):boolean  {
    //
    //   if (!(that instanceof S2Cap)) {
    //     return false;
    //   }
    //
    //   S2Cap other = (S2Cap) that;
    //   return (this.axis.equals(other.axis) && this.height == other.height)
    //       || (isEmpty() && other.isEmpty()) || (isFull() && other.isFull());
    //
    // }
    //
    // @Override
    // public int hashCode() {
    //   if (isFull()) {
    //     return 17;
    //   } else if (isEmpty()) {
    //     return 37;
    //   }
    //   int result = 17;
    //   result = 37 * result + this.axis.hashCode();
    //   long heightBits = Double.doubleToLongBits(this.height);
    //   result = 37 * result + (int) ((heightBits >>> 32) ^ heightBits);
    //   return result;
    // }
    // /////////////////////////////////////////////////////////////////////
    // The following static methods are convenience functions for assertions
    // and testing purposes only.
    /**
     * Return true if the cap axis and height differ by at most "max_error" from
     * the given cap "other".
     */
    approxEquals(other, maxError = 1e-14) {
      const r2 = this.radius.getLength2();
      const otherR2 = other.radius.getLength2();
      return S2.approxEqualsPointError(this.axis, other.axis, maxError) && Math.abs(r2 - otherR2) <= maxError || this.isEmpty() && otherR2 <= maxError || other.isEmpty() && r2 <= maxError || this.isFull() && otherR2 >= 2 - maxError || other.isFull() && r2 >= 2 - maxError;
    }
    toString() {
      return "[Point = " + this.axis + " Radius = " + this.radius + "]";
    }
    toGEOJSON() {
      return this.getRectBound().toGEOJSON();
    }
  };
  _S2Cap.ROUND_UP = 1 / Number(1n << 52n) + 1;
  var S2Cap = _S2Cap;
  function u64(n) {
    return BigInt.asUintN(64, n);
  }
  function low32s(n) {
    return Number(BigInt.asIntN(32, n));
  }
  var UINT64_MAX = 0xFFFFFFFFFFFFFFFFn;
  var _S2Projections = class _S2Projections2 {
    /**
     * The maximum value of an si- or ti-coordinate. The range of valid (si,ti) values is
     * [0..MAX_SiTi].
     */
    static get MAX_SITI() {
      return 1n << BigInt(_S2Projections2.MAX_LEVEL + 1);
    }
    static getUNorm(face, u) {
      switch (face) {
        case 0:
          return new S2Point(u, -1, 0);
        case 1:
          return new S2Point(1, u, 0);
        case 2:
          return new S2Point(1, 0, u);
        case 3:
          return new S2Point(-u, 0, 1);
        case 4:
          return new S2Point(0, -u, 1);
        default:
          return new S2Point(0, -1, -u);
      }
    }
    static getVNorm(face, v) {
      switch (face) {
        case 0:
          return new S2Point(-v, 0, 1);
        case 1:
          return new S2Point(0, -v, 1);
        case 2:
          return new S2Point(0, -1, -v);
        case 3:
          return new S2Point(v, -1, 0);
        case 4:
          return new S2Point(1, v, 0);
        default:
          return new S2Point(1, 0, v);
      }
    }
    static getUAxis(face) {
      return _S2Projections2.getUVWAxis(face, 0);
    }
    static getVAxis(face) {
      return _S2Projections2.getUVWAxis(face, 1);
    }
    static getNorm(face) {
      return _S2Projections2.getUVWAxis(face, 2);
    }
    /** Returns the given axis of the given face (u=0, v=1, w=2). */
    static getUVWAxis(face, axis) {
      return _S2Projections2.FACE_UVW_AXES[face][axis];
    }
    /**
     * Convert (face, si, ti) coordinates (see s2.h) to a direction vector (not
     * necessarily unit length).
     */
    static faceSiTiToXYZ(face, si, ti) {
      const u = R2Vector.singleStTOUV(this.siTiToSt(si));
      const v = R2Vector.singleStTOUV(this.siTiToSt(ti));
      return this.faceUvToXyz(face, u, v);
    }
    static faceUvToXyz(face, u, v) {
      const t = this.faceToXyzTransform(face);
      return new S2Point(t.uvToX(u, v), t.uvToY(u, v), t.uvToZ(u, v));
    }
    static faceXyzToUv(face, p) {
      if (face < 3) {
        if (p.get(face) <= 0) {
          return null;
        }
      } else {
        if (p.get(face - 3) >= 0) {
          return null;
        }
      }
      return _S2Projections2.validFaceXyzToUv(face, p);
    }
    static validFaceXyzToUv(face, p) {
      const t = _S2Projections2.faceToUvTransform(face);
      return new R2Vector(t.xyzToU(p.x, p.y, p.z), t.xyzToV(p.x, p.y, p.z));
    }
    static ijToStMin(i) {
      return 1 / S2CellId.MAX_SIZE * i;
    }
    static stToIj(s) {
      return Math.max(
        0,
        Math.min(S2CellId.MAX_SIZE - 1, Math.round(S2CellId.MAX_SIZE * s - 0.5))
      );
    }
    static siTiToSt(si) {
      return 1 / Number(this.MAX_SITI) * si;
    }
    static ijToUV(ij, cellSize) {
      return R2Vector.singleStTOUV(_S2Projections2.ijToStMin(ij & -cellSize));
    }
    static xyzToFaceP(p) {
      return this.xyzToFace(p.x, p.y, p.z);
    }
    static xyzToFace(x, y, z) {
      switch (S2Point.largestAbsComponent(x, y, z)) {
        case 0:
          return x < 0 ? 3 : 0;
        case 1:
          return y < 0 ? 4 : 1;
        default:
          return z < 0 ? 5 : 2;
      }
    }
    static faceToUvTransform(face) {
      return _S2Projections2.UV_TRANSFORMS[face];
    }
    static faceToXyzTransform(face) {
      return _S2Projections2.XYZ_TRANSFORMS[Math.min(5, face)];
    }
  };
  _S2Projections.MIN_WIDTH = new S2Metric(1, 2 * S2.M_SQRT2 / 3);
  _S2Projections.AVG_AREA = new S2Metric(2, 4 * S2.M_PI / 6);
  _S2Projections.MAX_LEVEL = 30;
  _S2Projections.FACE_UVW_AXES = [
    [S2Point.Y_POS, S2Point.Z_POS, S2Point.X_POS],
    [S2Point.X_NEG, S2Point.Z_POS, S2Point.Y_POS],
    [S2Point.X_NEG, S2Point.Y_NEG, S2Point.Z_POS],
    [S2Point.Z_NEG, S2Point.Y_NEG, S2Point.X_NEG],
    [S2Point.Z_NEG, S2Point.X_POS, S2Point.Y_NEG],
    [S2Point.Y_POS, S2Point.X_POS, S2Point.Z_NEG]
  ];
  _S2Projections.UV_TRANSFORMS = [
    {
      xyzToU: function xyzToU(x, y, _z) {
        return y / x;
      },
      xyzToV: function xyzToV(x, _y, z) {
        return z / x;
      }
    },
    {
      xyzToU: function xyzToU2(x, y, _z) {
        return -x / y;
      },
      xyzToV: function xyzToV2(_x, y, z) {
        return z / y;
      }
    },
    {
      xyzToU: function xyzToU3(x, _y, z) {
        return -x / z;
      },
      xyzToV: function xyzToV3(_x, y, z) {
        return -y / z;
      }
    },
    {
      xyzToU: function xyzToU4(x, _y, z) {
        return z / x;
      },
      xyzToV: function xyzToV4(x, y, _z) {
        return y / x;
      }
    },
    {
      xyzToU: function xyzToU5(_x, y, z) {
        return z / y;
      },
      xyzToV: function xyzToV5(x, y, _z) {
        return -x / y;
      }
    },
    {
      xyzToU: function xyzToU6(_x, y, z) {
        return -y / z;
      },
      xyzToV: function xyzToV6(x, _y, z) {
        return -x / z;
      }
    }
  ];
  _S2Projections.XYZ_TRANSFORMS = [
    {
      uvToX: function uvToX(_u, _v) {
        return 1;
      },
      uvToY: function uvToY(u, _v) {
        return u;
      },
      uvToZ: function uvToZ(_u, v) {
        return v;
      }
    },
    {
      uvToX: function uvToX2(u, _v) {
        return -u;
      },
      uvToY: function uvToY2(_u, _v) {
        return 1;
      },
      uvToZ: function uvToZ2(_u, v) {
        return v;
      }
    },
    {
      uvToX: function uvToX3(u, _v) {
        return -u;
      },
      uvToY: function uvToY3(_u, v) {
        return -v;
      },
      uvToZ: function uvToZ3(_u, _v) {
        return 1;
      }
    },
    {
      uvToX: function uvToX4(_u, _v) {
        return -1;
      },
      uvToY: function uvToY4(_u, v) {
        return -v;
      },
      uvToZ: function uvToZ4(u, _v) {
        return -u;
      }
    },
    {
      uvToX: function uvToX5(_u, v) {
        return v;
      },
      uvToY: function uvToY5(_u, _v) {
        return -1;
      },
      uvToZ: function uvToZ5(u, _v) {
        return -u;
      }
    },
    {
      uvToX: function uvToX6(_u, v) {
        return v;
      },
      uvToY: function uvToY6(u, _v) {
        return u;
      },
      uvToZ: function uvToZ6(_u, _v) {
        return -1;
      }
    }
  ];
  var S2Projections = _S2Projections;
  var _S2CellId = class _S2CellId2 {
    /**
     * Construct an S2CellId from a bigint, decimal string, or number.
     *
     * The string may be signed ("-6533045114107854848") or unsigned
     * ("11913698959601696768"); both are handled via BigInt.asUintN(64, ...).
     *
     * Numbers must be finite integers within the safe-integer range
     * (|n| ≤ Number.MAX_SAFE_INTEGER = 2^53 − 1). Values outside that range
     * may have silently lost precision in JS before reaching this constructor,
     * so a RangeError is thrown. Use a bigint literal for large cell IDs
     * (e.g. `-9182983676231680000n`).
     *
     * @throws {TypeError}  if `id` is a non-integer or non-finite number.
     * @throws {RangeError} if `id` exceeds safe-integer precision (> 2^53 − 1).
     */
    constructor(id) {
      if (typeof id === "string") {
        this.id = BigInt.asUintN(64, BigInt(id));
      } else if (typeof id === "number") {
        if (!Number.isInteger(id) || !isFinite(id)) {
          throw new TypeError(`S2CellId: non-integer or non-finite number: ${id}`);
        }
        if (!Number.isSafeInteger(id)) {
          throw new RangeError(
            `S2CellId: number ${id} exceeds safe integer precision (> 2^53). Use a bigint literal instead, e.g. ${BigInt(id)}n`
          );
        }
        this.id = BigInt.asUintN(64, BigInt(id));
      } else {
        this.id = BigInt.asUintN(64, id);
      }
    }
    // -------------------------------------------------------------------------
    // Migration helpers (v3 → v4 compatibility)
    // -------------------------------------------------------------------------
    /**
     * Construct an S2CellId from a **signed**-decimal string produced by Java's
     * Long.toString() or the v3 Long-based API. Equivalent to `new S2CellId(s)`
     * but makes the intent explicit.
     *
     * @example
     * S2CellId.fromSignedDecimalString('-6533045114107854848')
     */
    static fromSignedDecimalString(s) {
      return new _S2CellId2(BigInt.asUintN(64, BigInt(s)));
    }
    /**
     * Return this cell id as a signed-decimal string, matching the output of
     * Java's Long.toString() and the v3 Long-based API.
     *
     * @example
     * cellId.toSignedDecimalString() // '-6533045114107854848'
     */
    toSignedDecimalString() {
      return BigInt.asIntN(64, this.id).toString();
    }
    /**
     * Return this cell id as an unsigned-decimal string (same as `this.id.toString()`).
     *
     * @example
     * cellId.toUnsignedDecimalString() // '11913698959601696768'
     */
    toUnsignedDecimalString() {
      return this.id.toString();
    }
    // -------------------------------------------------------------------------
    // Core geometry
    // -------------------------------------------------------------------------
    /** Which cube face this cell belongs to, in the range 0..5. */
    get face() {
      return Number(this.id >> BigInt(_S2CellId2.POS_BITS));
    }
    /** Return the lowest-numbered bit that is on for this cell. */
    lowestOnBit() {
      return _S2CellId2.lowestOnBit(this.id);
    }
    static lowestOnBit(id) {
      return id & u64(-id);
    }
    /** Return an invalid cell id (id == 0). */
    static none() {
      return new _S2CellId2(0n);
    }
    /**
     * Returns an invalid cell id guaranteed to be larger than any valid cell id.
     * Useful for creating indexes.
     */
    static sentinel() {
      return new _S2CellId2(UINT64_MAX);
    }
    getBits1(i, j, k, bits) {
      const nbits = k === 7 ? _S2CellId2.MAX_LEVEL - 7 * _S2CellId2.LOOKUP_BITS : _S2CellId2.LOOKUP_BITS;
      const shift = k * 2 * _S2CellId2.LOOKUP_BITS + 1;
      const mask = (1 << 2 * nbits) - 1;
      bits += Number(this.id >> BigInt(shift) & BigInt(mask)) << 2;
      bits = _S2CellId2.LOOKUP_IJ[bits];
      i.val = i.val + (bits >> _S2CellId2.LOOKUP_BITS + 2 << k * _S2CellId2.LOOKUP_BITS);
      j.val = j.val + ((bits >> 2 & (1 << _S2CellId2.LOOKUP_BITS) - 1) << k * _S2CellId2.LOOKUP_BITS);
      bits &= S2.SWAP_MASK | S2.INVERT_MASK;
      return bits;
    }
    /** Return the lowest-numbered bit that is on for cells at the given level. */
    static lowestOnBitForLevel(level) {
      return 1n << BigInt(2 * (_S2CellId2.MAX_LEVEL - level));
    }
    /**
     * @deprecated use `toIJOrientation` instead
     */
    toFaceIJOrientation(pi, pj, orientation) {
      const face = this.face;
      let bits = face & S2.SWAP_MASK;
      for (let k = 7; k >= 0; --k) {
        bits = this.getBits1(pi, pj, k, bits);
      }
      if (orientation != null) {
        if ((0x1111111111111110n & this.lowestOnBit()) !== 0n) {
          bits ^= S2.SWAP_MASK;
        }
        orientation.val = bits;
      }
      return face;
    }
    /**
     * Return a packed bigint encoding (i << I_SHIFT | j << J_SHIFT | orientation).
     * Use getI(), getJ(), getOrientation() to unpack.
     */
    toIJOrientation() {
      const face = this.face;
      let bits = face & S2.SWAP_MASK;
      let i = 0;
      let j = 0;
      for (let k = 7; k >= 0; --k) {
        const nbits = k === 7 ? _S2CellId2.MAX_LEVEL - 7 * _S2CellId2.LOOKUP_BITS : _S2CellId2.LOOKUP_BITS;
        const shift = k * 2 * _S2CellId2.LOOKUP_BITS + 1;
        const mask = (1 << 2 * nbits) - 1;
        bits += Number(this.id >> BigInt(shift) & BigInt(mask)) << 2;
        bits = _S2CellId2.LOOKUP_IJ[bits];
        i += bits >> _S2CellId2.LOOKUP_BITS + 2 << k * _S2CellId2.LOOKUP_BITS;
        j += (bits >> 2 & (1 << _S2CellId2.LOOKUP_BITS) - 1) << k * _S2CellId2.LOOKUP_BITS;
        bits &= S2.SWAP_MASK | S2.INVERT_MASK;
      }
      if ((0x1111111111111110n & this.lowestOnBit()) !== 0n) {
        bits ^= S2.SWAP_MASK;
      }
      const orientation = bits;
      return BigInt(i) << BigInt(_S2CellId2.I_SHIFT) | BigInt(j) << BigInt(_S2CellId2.J_SHIFT) | BigInt(orientation);
    }
    getI() {
      return _S2CellId2.getI(this.toIJOrientation());
    }
    static getI(ijo) {
      return Number(ijo >> BigInt(_S2CellId2.I_SHIFT));
    }
    getJ() {
      return _S2CellId2.getJ(this.toIJOrientation());
    }
    static getJ(ijo) {
      return Number(ijo >> BigInt(_S2CellId2.J_SHIFT) & _S2CellId2.J_MASK);
    }
    static getOrientation(ijo) {
      return Number(ijo & _S2CellId2.ORIENTATION_MASK);
    }
    /** Return true if this is a leaf cell (level() == MAX_LEVEL). */
    isLeaf() {
      return (this.id & 1n) !== 0n;
    }
    /**
     * Return the cell at the given level (which must be ≤ the current level).
     */
    parentL(level) {
      const newLsb = _S2CellId2.lowestOnBitForLevel(level);
      return new _S2CellId2(this.id & u64(-newLsb) | newLsb);
    }
    parent() {
      const oldLsb = this.lowestOnBit();
      const newLsb = oldLsb << 2n;
      return new _S2CellId2(this.id & u64(-newLsb) | newLsb);
    }
    /**
     * Return a cell given its face (range 0..5), 61-bit Hilbert curve position
     * within that face, and level (range 0..MAX_LEVEL).
     *
     * v4: `pos` is now `bigint` (was `Long`).
     */
    static fromFacePosLevel(face, pos, level) {
      return new _S2CellId2(
        (BigInt(face) << BigInt(_S2CellId2.POS_BITS)) + (pos | 1n)
      ).parentL(level);
    }
    static fromFace(face) {
      return new _S2CellId2(_S2CellId2.fromFaceAsBigInt(face));
    }
    static fromPoint(p) {
      const face = S2Projections.xyzToFaceP(p);
      const t = S2Projections.faceToUvTransform(face);
      const i = S2Projections.stToIj(
        R2Vector.singleUVToST(t.xyzToU(p.x, p.y, p.z))
      );
      const j = S2Projections.stToIj(
        R2Vector.singleUVToST(t.xyzToV(p.x, p.y, p.z))
      );
      return this.fromFaceIJ(face, i, j);
    }
    getCenterUV() {
      const center = this.getCenterSiTi();
      return new R2Vector(
        R2Vector.singleStTOUV(
          S2Projections.siTiToSt(_S2CellId2.getSi(center))
        ),
        R2Vector.singleStTOUV(
          S2Projections.siTiToSt(_S2CellId2.getTi(center))
        )
      );
    }
    toPoint() {
      return S2Point.normalize(this.toPointRaw());
    }
    /**
     * Returns packed (si << 32 | ti) as a bigint.
     * v4: return type changed from Long to bigint.
     */
    getCenterSiTi() {
      const ijo = this.toIJOrientation();
      const i = _S2CellId2.getI(ijo);
      const j = _S2CellId2.getJ(ijo);
      const delta = this.isLeaf() ? 1 : ((i ^ low32s(this.id) >>> 2) & 1) !== 0 ? 2 : 0;
      return BigInt(2 * i + delta) << BigInt(_S2CellId2.SI_SHIFT) | _S2CellId2.TI_MASK & BigInt(2 * j + delta);
    }
    static getSi(center) {
      return Number(center >> BigInt(_S2CellId2.SI_SHIFT));
    }
    static getTi(center) {
      return Number(center & _S2CellId2.TI_MASK);
    }
    toPointRaw() {
      const center = this.getCenterSiTi();
      return S2Projections.faceSiTiToXYZ(
        this.face,
        _S2CellId2.getSi(center),
        _S2CellId2.getTi(center)
      );
    }
    toLatLng() {
      return S2LatLng.fromPoint(this.toPointRaw());
    }
    /** Return true if id() represents a valid cell. */
    isValid() {
      return this.face < _S2CellId2.NUM_FACES && (this.lowestOnBit() & 0x1555555555555555n) !== 0n;
    }
    /**
     * The position of the cell center along the Hilbert curve over this face,
     * in the range 0..(2**kPosBits-1).
     *
     * v4: return type changed from Long to bigint.
     */
    pos() {
      return this.id & UINT64_MAX >> BigInt(_S2CellId2.FACE_BITS);
    }
    /** Return the subdivision level of the cell (range 0..MAX_LEVEL). */
    level() {
      if (this.isLeaf()) {
        return _S2CellId2.MAX_LEVEL;
      }
      let x = low32s(this.id);
      let level = -1;
      if (x !== 0) {
        level += 16;
      } else {
        x = low32s(this.id >> 32n);
      }
      x &= -x;
      if ((x & 21845) !== 0) {
        level += 8;
      }
      if ((x & 5570645) !== 0) {
        level += 4;
      }
      if ((x & 84215045) !== 0) {
        level += 2;
      }
      if ((x & 286331153) !== 0) {
        level += 1;
      }
      return level;
    }
    getSizeIJ() {
      return _S2CellId2.getSizeIJ(this.level());
    }
    static getSizeIJ(level) {
      return 1 << S2.MAX_LEVEL - level;
    }
    getSizeST() {
      return _S2CellId2.getSizeST(this.level());
    }
    static getSizeST(level) {
      return S2Projections.ijToStMin(_S2CellId2.getSizeIJ(level));
    }
    isFace() {
      return this.level() === 0;
    }
    childPosition(level) {
      return Number(
        this.id >> BigInt(2 * (_S2CellId2.MAX_LEVEL - level) + 1) & 3n
      );
    }
    rangeMin() {
      return new _S2CellId2(u64(this.id - this.lowestOnBit() + 1n));
    }
    rangeMax() {
      return new _S2CellId2(this.id + this.lowestOnBit() - 1n);
    }
    contains(other) {
      return other.greaterOrEquals(this.rangeMin()) && other.lessOrEquals(this.rangeMax());
    }
    intersects(other) {
      return other.rangeMin().lessOrEquals(this.rangeMax()) && other.rangeMax().greaterOrEquals(this.rangeMin());
    }
    childBegin() {
      return new _S2CellId2(_S2CellId2.childBeginAsBigInt(this.id));
    }
    childBeginL(level) {
      return new _S2CellId2(_S2CellId2.childBeginAsBigIntL(this.id, level));
    }
    childEnd() {
      return new _S2CellId2(_S2CellId2.childEndAsBigInt(this.id));
    }
    childEndL(level) {
      return new _S2CellId2(_S2CellId2.childEndAsBigIntL(this.id, level));
    }
    static childBeginAsBigInt(id) {
      const oldLsb = _S2CellId2.lowestOnBit(id);
      return u64(id - oldLsb + (oldLsb >> 2n));
    }
    static childBeginAsBigIntL(id, level) {
      return u64(
        id - _S2CellId2.lowestOnBit(id) + _S2CellId2.lowestOnBitForLevel(level)
      );
    }
    static childEndAsBigInt(id) {
      const oldLsb = _S2CellId2.lowestOnBit(id);
      return u64(id + oldLsb + (oldLsb >> 2n));
    }
    static childEndAsBigIntL(id, level) {
      return u64(
        id + _S2CellId2.lowestOnBit(id) + _S2CellId2.lowestOnBitForLevel(level)
      );
    }
    static fromFaceAsBigInt(face) {
      return (BigInt(face) << BigInt(_S2CellId2.POS_BITS)) + _S2CellId2.lowestOnBitForLevel(0);
    }
    /** Return the next cell at the same level along the Hilbert curve. */
    next() {
      return new _S2CellId2(u64(this.id + (this.lowestOnBit() << 1n)));
    }
    /** Return the previous cell at the same level along the Hilbert curve. */
    prev() {
      return new _S2CellId2(u64(this.id - (this.lowestOnBit() << 1n)));
    }
    nextWrap() {
      const n = this.next();
      if (n.id < _S2CellId2.WRAP_OFFSET) {
        return n;
      }
      return new _S2CellId2(u64(n.id - _S2CellId2.WRAP_OFFSET));
    }
    prevWrap() {
      const p = this.prev();
      if (p.id < _S2CellId2.WRAP_OFFSET) {
        return p;
      }
      return new _S2CellId2(p.id + _S2CellId2.WRAP_OFFSET);
    }
    static begin(level) {
      return _S2CellId2.fromFacePosLevel(0, 0n, 0).childBeginL(level);
    }
    static end(level) {
      return _S2CellId2.fromFacePosLevel(5, 0n, 0).childEndL(level);
    }
    /**
     * Decodes a cell id from a compact hex token string.
     * The maximum token length is 16 hex characters.
     */
    static fromToken(token) {
      if (token == null) {
        throw new Error("Null string in S2CellId.fromToken");
      }
      if (token.length === 0) {
        throw new Error("Empty string in S2CellId.fromToken");
      }
      if (token.length > 16 || token === "X") {
        return _S2CellId2.none();
      }
      const padded = token.padEnd(16, "0");
      return new _S2CellId2(BigInt("0x" + padded));
    }
    /**
     * Encodes the cell id to a compact hex token string.
     * Cells at lower levels are encoded into fewer characters.
     */
    toToken() {
      if (this.id === 0n) {
        return "X";
      }
      const hex = this.id.toString(16).padStart(16, "0");
      let len = 16;
      while (len > 0 && hex[len - 1] === "0") {
        len--;
      }
      return hex.substring(0, len);
    }
    getEdgeNeighbors() {
      const level = this.level();
      const size = this.getSizeIJ();
      const face = this.face;
      const ijo = this.toIJOrientation();
      const i = _S2CellId2.getI(ijo);
      const j = _S2CellId2.getJ(ijo);
      return [
        _S2CellId2.fromFaceIJSame(face, i, j - size, j - size >= 0).parentL(
          level
        ),
        _S2CellId2.fromFaceIJSame(
          face,
          i + size,
          j,
          i + size < _S2CellId2.MAX_SIZE
        ).parentL(level),
        _S2CellId2.fromFaceIJSame(
          face,
          i,
          j + size,
          j + size < _S2CellId2.MAX_SIZE
        ).parentL(level),
        _S2CellId2.fromFaceIJSame(face, i - size, j, i - size >= 0).parentL(
          level
        )
      ];
    }
    getVertexNeighbors(level) {
      const ijo = this.toIJOrientation();
      const i = _S2CellId2.getI(ijo);
      const j = _S2CellId2.getJ(ijo);
      const halfsize = _S2CellId2.getSizeIJ(level + 1);
      const size = halfsize << 1;
      let isame, jsame;
      let ioffset, joffset;
      if ((i & halfsize) !== 0) {
        ioffset = size;
        isame = i + size < _S2CellId2.MAX_SIZE;
      } else {
        ioffset = -size;
        isame = i - size >= 0;
      }
      if ((j & halfsize) !== 0) {
        joffset = size;
        jsame = j + size < _S2CellId2.MAX_SIZE;
      } else {
        joffset = -size;
        jsame = j - size >= 0;
      }
      const face = this.face;
      const toRet = [this.parentL(level)];
      toRet.push(
        _S2CellId2.fromFaceIJSame(face, i + ioffset, j, isame).parentL(level)
      );
      toRet.push(
        _S2CellId2.fromFaceIJSame(face, i, j + joffset, jsame).parentL(level)
      );
      if (isame || jsame) {
        toRet.push(
          _S2CellId2.fromFaceIJSame(
            face,
            i + ioffset,
            j + joffset,
            isame && jsame
          ).parentL(level)
        );
      }
      return toRet;
    }
    getAllNeighbors(nbrLevel) {
      const ijo = this.toIJOrientation();
      const size = this.getSizeIJ();
      const face = this.face;
      const i = _S2CellId2.getI(ijo) & -size;
      const j = _S2CellId2.getJ(ijo) & -size;
      const nbrSize = _S2CellId2.getSizeIJ(nbrLevel);
      const output = [];
      for (let k = -nbrSize; ; k += nbrSize) {
        let sameFace;
        if (k < 0) {
          sameFace = j + k >= 0;
        } else if (k >= size) {
          sameFace = j + k < _S2CellId2.MAX_SIZE;
        } else {
          sameFace = true;
          output.push(
            _S2CellId2.fromFaceIJSame(
              face,
              i + k,
              j - nbrSize,
              j - size >= 0
            ).parentL(nbrLevel)
          );
          output.push(
            _S2CellId2.fromFaceIJSame(
              face,
              i + k,
              j + size,
              j + size < _S2CellId2.MAX_SIZE
            ).parentL(nbrLevel)
          );
        }
        output.push(
          _S2CellId2.fromFaceIJSame(
            face,
            i - nbrSize,
            j + k,
            sameFace && i - size >= 0
          ).parentL(nbrLevel)
        );
        output.push(
          _S2CellId2.fromFaceIJSame(
            face,
            i + size,
            j + k,
            sameFace && i + size < _S2CellId2.MAX_SIZE
          ).parentL(nbrLevel)
        );
        if (k >= size) {
          break;
        }
      }
      return output;
    }
    // ///////////////////////////////////////////////////////////////////
    // Low-level methods.
    static fromFaceIJ(face, i, j) {
      const n = [0n, BigInt(face) << BigInt(_S2CellId2.POS_BITS - 33)];
      let bits = face & _S2CellId2.SWAP_MASK;
      for (let k = 7; k >= 0; --k) {
        bits = _S2CellId2.getBits(n, i, j, k, bits);
      }
      return new _S2CellId2((n[1] << 32n | n[0]) << 1n | 1n);
    }
    static getBits(n, i, j, k, bits) {
      const mask = (1 << _S2CellId2.LOOKUP_BITS) - 1;
      bits += (i >> k * _S2CellId2.LOOKUP_BITS & mask) << _S2CellId2.LOOKUP_BITS + 2;
      bits += (j >> k * _S2CellId2.LOOKUP_BITS & mask) << 2;
      const lookupBits = _S2CellId2.LOOKUP_POS[bits];
      n[k >> 2] = n[k >> 2] | lookupBits >> 2n << BigInt((k & 3) * 2 * _S2CellId2.LOOKUP_BITS);
      return Number(lookupBits) & (_S2CellId2.SWAP_MASK | _S2CellId2.INVERT_MASK);
    }
    static stToIJ(s) {
      const m = _S2CellId2.MAX_SIZE / 2;
      return Math.max(0, Math.min(m * 2 - 1, Math.round(m * s + m - 0.5)));
    }
    static fromFaceIJWrap(face, i, j) {
      i = Math.max(-1, Math.min(_S2CellId2.MAX_SIZE, i));
      j = Math.max(-1, Math.min(_S2CellId2.MAX_SIZE, j));
      const kScale = 1 / _S2CellId2.MAX_SIZE;
      const s = kScale * (2 * i + 1 - _S2CellId2.MAX_SIZE);
      const t = kScale * (2 * j + 1 - _S2CellId2.MAX_SIZE);
      const p = new R2Vector(s, t).toPoint(face);
      face = p.toFace();
      const st = p.toR2Vector(face);
      return _S2CellId2.fromFaceIJ(
        face,
        _S2CellId2.stToIJ(st.x),
        _S2CellId2.stToIJ(st.y)
      );
    }
    static fromFaceIJSame(face, i, j, sameFace) {
      return sameFace ? _S2CellId2.fromFaceIJ(face, i, j) : _S2CellId2.fromFaceIJWrap(face, i, j);
    }
    // -------------------------------------------------------------------------
    // Unsigned comparison helpers (trivial now that bigint is always positive)
    // -------------------------------------------------------------------------
    /** Returns true if x1 < x2 (unsigned comparison). */
    static unsignedLongLessThan(x1, x2) {
      return x1 < x2;
    }
    /** Returns true if x1 > x2 (unsigned comparison). */
    static unsignedLongGreaterThan(x1, x2) {
      return x1 > x2;
    }
    lessThan(x) {
      return this.id < x.id;
    }
    greaterThan(x) {
      return this.id > x.id;
    }
    lessOrEquals(x) {
      return this.id <= x.id;
    }
    greaterOrEquals(x) {
      return this.id >= x.id;
    }
    toString() {
      return "(face=" + this.face + ", pos=" + this.pos().toString(16) + ", level=" + this.level() + ")";
    }
    compareTo(that) {
      return this.id < that.id ? -1 : this.id > that.id ? 1 : 0;
    }
    equals(that) {
      return this.id === that.id;
    }
    /**
     * Binary search in a sorted S2CellId array.
     * Returns index if found, or -(insertionPoint+1) if not found.
     *
     * v4: `_id` accepts bigint, string, number, or S2CellId (was Long, string, or S2CellId).
     */
    static binarySearch(ids, _id, low = 0) {
      let id;
      if (_id instanceof _S2CellId2) {
        id = _id;
      } else {
        id = new _S2CellId2(_id);
      }
      let high = ids.length - 1;
      while (low <= high) {
        const mid = low + high >>> 1;
        const midVal = ids[mid];
        const cmp = midVal.compareTo(id);
        if (cmp < 0) low = mid + 1;
        else if (cmp > 0) high = mid - 1;
        else return mid;
      }
      return -(low + 1);
    }
    static indexedBinarySearch(ids, id, low = 0) {
      const toRet = this.binarySearch(ids, id, low);
      return toRet >= 0 ? toRet : -(toRet + 1);
    }
  };
  _S2CellId.FACE_BITS = 3;
  _S2CellId.NUM_FACES = 6;
  _S2CellId.MAX_LEVEL = 30;
  _S2CellId.POS_BITS = 2 * 30 + 1;
  _S2CellId.MAX_SIZE = 1 << 30;
  _S2CellId.MAX_UNSIGNED = UINT64_MAX;
  _S2CellId.LOOKUP_BITS = 4;
  _S2CellId.SWAP_MASK = 1;
  _S2CellId.INVERT_MASK = 2;
  _S2CellId.I_SHIFT = 33;
  _S2CellId.J_SHIFT = 2;
  _S2CellId.J_MASK = (1n << 31n) - 1n;
  _S2CellId.SI_SHIFT = 32;
  _S2CellId.ORIENTATION_MASK = 3n;
  _S2CellId.TI_MASK = 0xFFFFFFFFn;
  _S2CellId.LOOKUP_POS = [];
  _S2CellId.LOOKUP_IJ = [];
  _S2CellId.WRAP_OFFSET = BigInt(_S2CellId.NUM_FACES) << BigInt(_S2CellId.POS_BITS);
  var S2CellId = _S2CellId;
  function initLookupCell(level, i, j, origOrientation, pos, orientation) {
    if (level === S2CellId.LOOKUP_BITS) {
      const ij = (i << S2CellId.LOOKUP_BITS) + j;
      S2CellId.LOOKUP_POS[(ij << 2) + origOrientation] = (pos << 2n) + BigInt(orientation);
      S2CellId.LOOKUP_IJ[Number((pos << 2n) + BigInt(origOrientation))] = (ij << 2) + orientation;
    } else {
      level++;
      i <<= 1;
      j <<= 1;
      pos = pos << 2n;
      for (let subPos = 0; subPos < 4; subPos++) {
        const ij = S2.POS_TO_IJ[orientation][subPos];
        const orientationMask = S2.POS_TO_ORIENTATION[subPos];
        initLookupCell(
          level,
          i + (ij >>> 1),
          j + (ij & 1),
          origOrientation,
          pos + BigInt(subPos),
          orientation ^ orientationMask
        );
      }
    }
  }
  initLookupCell(0, 0, 0, 0, 0n, 0);
  initLookupCell(0, 0, 0, S2.SWAP_MASK, 0n, S2.SWAP_MASK);
  initLookupCell(0, 0, 0, S2.INVERT_MASK, 0n, S2.INVERT_MASK);
  initLookupCell(
    0,
    0,
    0,
    S2.SWAP_MASK | S2.INVERT_MASK,
    0n,
    S2.SWAP_MASK | S2.INVERT_MASK
  );
  var _S2Cell = class _S2Cell2 {
    constructor(cellID) {
      this.cellID = cellID;
      if (cellID != null) {
        this.init(cellID);
      }
    }
    static get MAX_CELL_SIZE() {
      return 1 << S2CellId.MAX_LEVEL;
    }
    get id() {
      return this.cellID;
    }
    static fromFace(face) {
      return new _S2Cell2(S2CellId.fromFace(face));
    }
    // This is a static method in order to provide named parameters.
    static fromFacePosLevel(face, pos, level) {
      return new _S2Cell2(S2CellId.fromFacePosLevel(face, BigInt(pos), level));
    }
    // Convenience methods.
    static fromPoint(p) {
      return new _S2Cell2(S2CellId.fromPoint(p));
    }
    static fromLatLng(ll) {
      return new _S2Cell2(S2CellId.fromPoint(ll.toPoint()));
    }
    isLeaf() {
      return this._level == S2CellId.MAX_LEVEL;
    }
    getVertex(k) {
      return S2Point.normalize(this.getVertexRaw(k));
    }
    /**
     * Return the k-th vertex of the cell (k = 0,1,2,3). Vertices are returned in
     * CCW order. The points returned by GetVertexRaw are not necessarily unit
     * length.
     */
    getVertexRaw(k) {
      return S2Projections.faceUvToXyz(
        this._face,
        (k >> 1 ^ k & 1) == 0 ? this.uMin : this.uMax,
        k >> 1 == 0 ? this.vMin : this.vMax
      );
    }
    getEdge(k) {
      return S2Point.normalize(this.getEdgeRaw(k));
    }
    getEdgeRaw(k) {
      switch (k) {
        case 0:
          return S2Projections.getVNorm(this._face, this.vMin);
        // South
        case 1:
          return S2Projections.getUNorm(this._face, this.uMax);
        // East
        case 2:
          return S2Point.neg(S2Projections.getVNorm(this._face, this.vMax));
        // North
        default:
          return S2Point.neg(S2Projections.getUNorm(this._face, this.uMin));
      }
    }
    /**
     * Return the inward-facing normal of the great circle passing through the
     * edge from vertex k to vertex k+1 (mod 4). The normals returned by
     * GetEdgeRaw are not necessarily unit length.
     *
     *  If this is not a leaf cell, set children[0..3] to the four children of
     * this cell (in traversal order) and return true. Otherwise returns false.
     * This method is equivalent to the following:
     *
     *  for (pos=0, id=child_begin(); id != child_end(); id = id.next(), ++pos)
     * children[i] = S2Cell(id);
     *
     * except that it is more than two times faster.
     */
    subdivide() {
      if (this.id.isLeaf()) {
        return null;
      }
      const children = new Array(4);
      for (let i = 0; i < 4; ++i) {
        children[i] = new _S2Cell2();
      }
      let id = this.id.childBegin();
      const mid = this.getCenterUV();
      const uMid = mid.x;
      const vMid = mid.y;
      for (let pos = 0; pos < 4; ++pos, id = id.next()) {
        const child = children[pos];
        child._face = this.face;
        child._level = this.level + 1;
        child._orientation = this.orientation ^ S2.POS_TO_ORIENTATION[pos];
        child.cellID = id;
        const ij = S2.POS_TO_IJ[this.orientation][pos];
        if ((ij & 2) != 0) {
          child.uMin = uMid;
          child.uMax = this.uMax;
        } else {
          child.uMin = this.uMin;
          child.uMax = uMid;
        }
        if ((ij & 1) != 0) {
          child.vMin = vMid;
          child.vMax = this.vMax;
        } else {
          child.vMin = this.vMin;
          child.vMax = vMid;
        }
      }
      return children;
    }
    /**
     * Return the direction vector corresponding to the center in (s,t)-space of
     * the given cell. This is the point at which the cell is divided into four
     * subcells; it is not necessarily the centroid of the cell in (u,v)-space or
     * (x,y,z)-space. The point returned by GetCenterRaw is not necessarily unit
     * length.
     */
    getCenter() {
      return S2Point.normalize(this.getCenterRaw());
    }
    getCenterRaw() {
      return this.cellID.toPointRaw();
    }
    /**
     * Return the center of the cell in (u,v) coordinates (see {@code
     * S2Projections}). Note that the center of the cell is defined as the point
     * at which it is recursively subdivided into four children; in general, it is
     * not at the midpoint of the (u,v) rectangle covered by the cell
     */
    getCenterUV() {
      return this.cellID.getCenterUV();
    }
    /**
     * Return the average area of cells at this level. This is accurate to within
     * a factor of 1.7 (for S2_QUADRATIC_PROJECTION) and is extremely cheap to
     * compute.
     */
    static averageArea(level) {
      return S2Projections.AVG_AREA.getValue(level);
    }
    /**
     * Return the average area of cells at this level. This is accurate to within
     * a factor of 1.7 (for S2_QUADRATIC_PROJECTION) and is extremely cheap to
     * compute.
     */
    averageArea() {
      return S2Projections.AVG_AREA.getValue(this._level);
    }
    /**
     * Return the approximate area of this cell. This method is accurate to within
     * 3% percent for all cell sizes and accurate to within 0.1% for cells at
     * level 5 or higher (i.e. 300km square or smaller). It is moderately cheap to
     * compute.
     */
    approxArea() {
      if (this._level < 2) {
        return this.averageArea();
      }
      const flatArea = S2Point.crossProd(
        S2Point.sub(this.getVertex(2), this.getVertex(0)),
        S2Point.sub(this.getVertex(3), this.getVertex(1))
      ).norm() * 0.5;
      return flatArea * 2 / (Math.sqrt(Math.min(flatArea * S2.M_1_PI, 1) * -1 + 1) + 1);
    }
    //
    // /**
    //  * Return the area of this cell as accurately as possible. This method is more
    //  * expensive but it is accurate to 6 digits of precision even for leaf cells
    //  * (whose area is approximately 1e-18).
    //  */
    exactArea() {
      const v0 = this.getVertex(0);
      const v1 = this.getVertex(1);
      const v2 = this.getVertex(2);
      const v3 = this.getVertex(3);
      return S2.area(v0, v1, v2) + S2.area(v0, v2, v3);
    }
    // //////////////////////////////////////////////////////////////////////
    // S2Region interface (see {@code S2Region} for details):
    getCapBound() {
      const uv = this.getCenterUV();
      const center = S2Point.normalize(S2Projections.faceUvToXyz(this._face, uv.x, uv.y));
      let cap = S2Cap.fromAxisHeight(center, 0);
      for (let k = 0; k < 4; ++k) {
        cap = cap.addPoint(this.getVertex(k));
      }
      return cap;
    }
    // 35.26 degrees
    getPoint(i, j) {
      return S2Projections.faceUvToXyz(this._face, i == 0 ? this.uMin : this.uMax, j == 0 ? this.vMin : this.vMax);
    }
    getRectBound() {
      if (this._level > 0) {
        const u = this.uMin + this.uMax;
        const v = this.vMin + this.vMax;
        const i = S2Projections.getUAxis(this._face).z == 0 ? u < 0 ? 1 : 0 : u > 0 ? 1 : 0;
        const j = S2Projections.getVAxis(this._face).z == 0 ? v < 0 ? 1 : 0 : v > 0 ? 1 : 0;
        const lat = R1Interval.fromPointPair(
          S2LatLng.latitude(this.getPoint(i, j)).radians,
          S2LatLng.latitude(this.getPoint(1 - i, 1 - j)).radians
        );
        const lng = S1Interval.fromPointPair(
          S2LatLng.longitude(this.getPoint(i, 1 - j)).radians,
          S2LatLng.longitude(this.getPoint(1 - i, j)).radians
        );
        return new S2LatLngRect(lat, lng).expanded(S2LatLng.fromRadians(S2.DBL_EPSILON, S2.DBL_EPSILON)).polarClosure();
      }
      switch (this._face) {
        case 0:
          return new S2LatLngRect(
            new R1Interval(-S2.M_PI_4, S2.M_PI_4),
            new S1Interval(-S2.M_PI_4, S2.M_PI_4)
          );
        case 1:
          return new S2LatLngRect(
            new R1Interval(-S2.M_PI_4, S2.M_PI_4),
            new S1Interval(S2.M_PI_4, 3 * S2.M_PI_4)
          );
        case 2:
          return new S2LatLngRect(
            new R1Interval(_S2Cell2.POLE_MIN_LAT, S2.M_PI_2),
            new S1Interval(-S2.M_PI, S2.M_PI)
          );
        case 3:
          return new S2LatLngRect(
            new R1Interval(-S2.M_PI_4, S2.M_PI_4),
            new S1Interval(3 * S2.M_PI_4, -3 * S2.M_PI_4)
          );
        case 4:
          return new S2LatLngRect(
            new R1Interval(-S2.M_PI_4, S2.M_PI_4),
            new S1Interval(-3 * S2.M_PI_4, -S2.M_PI_4)
          );
        default:
          return new S2LatLngRect(
            new R1Interval(-S2.M_PI_2, -_S2Cell2.POLE_MIN_LAT),
            new S1Interval(-S2.M_PI, S2.M_PI)
          );
      }
    }
    mayIntersectC(cell) {
      return this.cellID.intersects(cell.cellID);
    }
    contains(p) {
      const uvPoint = S2Projections.faceXyzToUv(this._face, p);
      if (uvPoint == null) {
        return false;
      }
      return uvPoint.x >= this.uMin && uvPoint.x <= this.uMax && uvPoint.y >= this.vMin && uvPoint.y <= this.vMax;
    }
    // The point 'p' does not need to be normalized.
    containsC(cell) {
      return this.cellID.contains(cell.cellID);
    }
    init(id) {
      this.cellID = id;
      this._face = id.face;
      const ijo = id.toIJOrientation();
      this._orientation = S2CellId.getOrientation(ijo);
      this._level = id.level();
      const i = S2CellId.getI(ijo);
      const j = S2CellId.getJ(ijo);
      const cellSize = id.getSizeIJ();
      this.uMin = S2Projections.ijToUV(i, cellSize);
      this.uMax = S2Projections.ijToUV(i + cellSize, cellSize);
      this.vMin = S2Projections.ijToUV(j, cellSize);
      this.vMax = S2Projections.ijToUV(j + cellSize, cellSize);
    }
    get face() {
      return this._face;
    }
    get orientation() {
      return this._orientation;
    }
    get level() {
      return this._level;
    }
    // Return the latitude or longitude of the cell vertex given by (i,j),
    // where "i" and "j" are either 0 or 1.
    toString() {
      return "[" + this._face + ", " + this._level + ", " + this.orientation + ", " + this.cellID + "]";
    }
    toGEOJSON() {
      const coords = [this.getVertex(0), this.getVertex(1), this.getVertex(2), this.getVertex(3), this.getVertex(0)].map((v) => S2LatLng.fromPoint(v)).map((v) => [v.lngDegrees, v.latDegrees]);
      return {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [coords]
        },
        properties: {},
        title: `Cell: ${this.id.toToken()} lvl: ${this._level}`
      };
    }
  };
  _S2Cell.MAX_ERROR = 1 / Number(1n << 51n);
  _S2Cell.POLE_MIN_LAT = Math.asin(Math.sqrt(1 / 3)) - _S2Cell.MAX_ERROR;
  var S2Cell = _S2Cell;
  var S2CellUnion = class {
    constructor() {
      this.cellIds = [];
    }
    /**
     * Populates a cell union with the given S2CellIds or 64-bit cell ids, and
     * then calls Normalize().
     *
     * v4: `cellIds` accepts `bigint[] | string[] | number[]` (was `Long[] | string[]`).
     */
    initFromIds(cellIds) {
      this.initRawIds(cellIds);
      this.normalize();
    }
    initFromCellIds(cellIds) {
      this.initRawCellIds(cellIds);
      this.normalize();
    }
    initSwap(cellIds) {
      this.initRawSwap(cellIds);
      this.normalize();
    }
    initRawCellIds(cellIds) {
      this.cellIds = cellIds;
    }
    initRawIds(cellIds) {
      const size = cellIds.length;
      this.cellIds = [];
      for (let i = 0; i < size; i++) {
        this.cellIds.push(new S2CellId(cellIds[i]));
      }
    }
    initRawSwap(cellIds) {
      this.cellIds = [].concat(cellIds);
    }
    size() {
      return this.cellIds.length;
    }
    cellId(i) {
      return this.cellIds[i];
    }
    getCellIds() {
      return this.cellIds;
    }
    denormalize(minLevel, levelMod) {
      const output = [];
      for (let i = 0; i < this.cellIds.length; i++) {
        const id = this.cellIds[i];
        const level = id.level();
        let newLevel = Math.max(minLevel, level);
        if (levelMod > 1) {
          newLevel += (S2CellId.MAX_LEVEL - (newLevel - minLevel)) % levelMod;
          newLevel = Math.min(S2CellId.MAX_LEVEL, newLevel);
        }
        if (newLevel === level) {
          output.push(id);
        } else {
          const end = id.childEndL(newLevel);
          for (let iid = id.childBeginL(newLevel); !iid.equals(end); iid = iid.next()) {
            output.push(iid);
          }
        }
      }
      return output;
    }
    pack() {
      throw new Error("useless");
    }
    containsC(cell) {
      return this.containsCell(cell);
    }
    mayIntersectC(cell) {
      return this.mayIntersectCell(cell);
    }
    contains(id) {
      let pos = S2CellId.binarySearch(this.cellIds, id.id);
      if (pos < 0) {
        pos = -pos - 1;
      }
      if (pos < this.cellIds.length && this.cellIds[pos].rangeMin().lessOrEquals(id)) {
        return true;
      }
      return pos !== 0 && this.cellIds[pos - 1].rangeMax().greaterOrEquals(id);
    }
    intersects(id) {
      let pos = S2CellId.binarySearch(this.cellIds, id.id);
      if (pos < 0) {
        pos = -pos - 1;
      }
      if (pos < this.cellIds.length && this.cellIds[pos].rangeMin().lessOrEquals(id.rangeMax())) {
        return true;
      }
      return pos !== 0 && this.cellIds[pos - 1].rangeMax().greaterOrEquals(id.rangeMin());
    }
    containsUnion(that) {
      for (let i = 0; i < that.cellIds.length; i++) {
        if (!this.contains(that.cellIds[i])) {
          return false;
        }
      }
      return true;
    }
    containsCell(cell) {
      return this.contains(cell.id);
    }
    intersectsUnion(that) {
      for (let i = 0; i < that.cellIds.length; i++) {
        if (this.intersects(that.cellIds[i])) {
          return true;
        }
      }
      return false;
    }
    getUnion(x, y) {
      this.cellIds = [].concat(x.cellIds).concat(y.cellIds);
      this.normalize();
    }
    getIntersection(x, id) {
      this.cellIds = [];
      if (x.contains(id)) {
        this.cellIds.push(id);
      } else {
        let pos = S2CellId.binarySearch(x.cellIds, id.rangeMin().id);
        if (pos < 0) {
          pos = -pos - 1;
        }
        const idmax = id.rangeMax();
        const size = x.cellIds.length;
        while (pos < size && x.cellIds[pos].lessOrEquals(idmax)) {
          this.cellIds.push(x.cellIds[pos++]);
        }
      }
    }
    getIntersectionUU(x, y) {
      this.cellIds = [];
      let i = 0;
      let j = 0;
      while (i < x.cellIds.length && j < y.cellIds.length) {
        const imin = x.cellId(i).rangeMin();
        const jmin = y.cellId(j).rangeMin();
        if (imin.greaterThan(jmin)) {
          if (x.cellId(i).lessOrEquals(y.cellId(j).rangeMax())) {
            this.cellIds.push(x.cellId(i++));
          } else {
            j = S2CellId.indexedBinarySearch(y.cellIds, imin, j + 1);
            if (x.cellId(i).lessOrEquals(y.cellId(j - 1).rangeMax())) {
              --j;
            }
          }
        } else if (jmin.greaterThan(imin)) {
          if (y.cellId(j).lessOrEquals(x.cellId(i).rangeMax())) {
            this.cellIds.push(y.cellId(j++));
          } else {
            i = S2CellId.indexedBinarySearch(x.cellIds, jmin, i + 1);
            if (y.cellId(j).lessOrEquals(x.cellId(i - 1).rangeMax())) {
              --i;
            }
          }
        } else {
          if (x.cellId(i).lessThan(y.cellId(j))) {
            this.cellIds.push(x.cellId(i++));
          } else {
            this.cellIds.push(y.cellId(j++));
          }
        }
      }
    }
    expand(level) {
      let output = [];
      const levelLsb = S2CellId.lowestOnBitForLevel(level);
      let i = this.size() - 1;
      do {
        let id = this.cellId(i);
        if (id.lowestOnBit() < levelLsb) {
          id = id.parentL(level);
          while (i > 0 && id.contains(this.cellId(i - 1))) {
            --i;
          }
        }
        output.push(id);
        output = output.concat(id.getAllNeighbors(level));
      } while (--i >= 0);
      this.initSwap(output);
    }
    expandA(minRadius, maxLevelDiff) {
      let minLevel = S2CellId.MAX_LEVEL;
      for (let i = 0; i < this.cellIds.length; i++) {
        minLevel = Math.min(minLevel, this.cellId(i).level());
      }
      const radiusLevel = S2Projections.MIN_WIDTH.getMaxLevel(minRadius.radians);
      if (radiusLevel === 0 && minRadius.radians > S2Projections.MIN_WIDTH.getValue(0)) {
        this.expand(0);
      }
      this.expand(Math.min(minLevel + maxLevelDiff, radiusLevel));
    }
    getCapBound() {
      if (this.cellIds.length === 0) {
        return S2Cap.empty();
      }
      let centroid = new S2Point(0, 0, 0);
      this.cellIds.forEach((id) => {
        const area = S2Cell.averageArea(id.level());
        centroid = S2Point.add(centroid, S2Point.mul(id.toPoint(), area));
      });
      if (centroid.equals(S2Point.ORIGIN)) {
        centroid = S2Point.X_POS;
      } else {
        centroid = S2Point.normalize(centroid);
      }
      let cap = S2Cap.fromAxisChord(centroid, S1ChordAngle.ZERO);
      this.cellIds.forEach((id) => {
        cap = cap.addCap(new S2Cell(id).getCapBound());
      });
      return cap;
    }
    getRectBound() {
      let bound = S2LatLngRect.empty();
      this.cellIds.forEach((id) => {
        bound = bound.union(new S2Cell(id).getRectBound());
      });
      return bound;
    }
    mayIntersectCell(cell) {
      return this.intersects(cell.id);
    }
    containsPoint(p) {
      return this.contains(S2CellId.fromPoint(p));
    }
    /**
     * The number of leaf cells covered by the union.
     *
     * v4: return type changed from Long to bigint.
     */
    leafCellsCovered() {
      let numLeaves = 0n;
      this.cellIds.forEach((id) => {
        const invertedLevel = S2CellId.MAX_LEVEL - id.level();
        numLeaves += 1n << BigInt(invertedLevel << 1);
      });
      return numLeaves;
    }
    /**
     * Approximate area by summing the average area of each contained cell.
     *
     * v4: uses Number(bigint) instead of Long.toNumber().
     */
    averageBasedArea() {
      return Number(this.leafCellsCovered()) * S2Projections.AVG_AREA.getValue(S2CellId.MAX_LEVEL);
    }
    approxArea() {
      let area = 0;
      this.cellIds.forEach((id) => {
        area += new S2Cell(id).approxArea();
      });
      return area;
    }
    exactArea() {
      let area = 0;
      this.cellIds.forEach((id) => {
        area += new S2Cell(id).exactArea();
      });
      return area;
    }
    normalize() {
      const output = [];
      this.cellIds.sort((a, b) => a.compareTo(b));
      this.cellIds.forEach((id) => {
        let size = output.length;
        if (output.length !== 0 && output[size - 1].contains(id)) {
          return;
        }
        while (output.length !== 0 && id.contains(output[output.length - 1])) {
          output.splice(output.length - 1, 1);
        }
        while (output.length >= 3) {
          size = output.length;
          if ((output[size - 3].id ^ output[size - 2].id ^ output[size - 1].id) !== id.id) {
            break;
          }
          let mask = id.lowestOnBit() << 1n;
          mask = u64(~(mask + (mask << 1n)));
          const idMasked = id.id & mask;
          if ((output[size - 3].id & mask) !== idMasked || (output[size - 2].id & mask) !== idMasked || (output[size - 1].id & mask) !== idMasked || id.isFace()) {
            break;
          }
          output.splice(size - 3);
          id = id.parent();
        }
        output.push(id);
      });
      if (output.length < this.size()) {
        this.initRawSwap(output);
        return true;
      }
      return false;
    }
  };
  var _S2RegionCoverer = class _S2RegionCoverer2 {
    /**
     * Default constructor, sets all fields to default values.
     */
    constructor() {
      this.minLevel = 0;
      this.maxLevel = S2CellId.MAX_LEVEL;
      this.levelMod = 1;
      this.maxCells = _S2RegionCoverer2.DEFAULT_MAX_CELLS;
      this.region = null;
      this.result = [];
      this.candidateQueue = new PriorityQueue();
    }
    // Set the minimum and maximum cell level to be used. The default is to use
    // all cell levels. Requires: max_level() >= min_level().
    //
    // To find the cell level corresponding to a given physical distance, use
    // the S2Cell metrics defined in s2.h. For example, to find the cell
    // level that corresponds to an average edge length of 10km, use:
    //
    // int level = S2::kAvgEdge.GetClosestLevel(
    // geostore::S2Earth::KmToRadians(length_km));
    //
    // Note: min_level() takes priority over max_cells(), i.e. cells below the
    // given level will never be used even if this causes a large number of
    // cells to be returned.
    /**
     * Sets the minimum level to be used.
     */
    setMinLevel(minLevel) {
      this.minLevel = Math.max(0, Math.min(S2CellId.MAX_LEVEL, minLevel));
      return this;
    }
    /**
     * Sets the maximum level to be used.
     */
    setMaxLevel(maxLevel) {
      this.maxLevel = Math.max(0, Math.min(S2CellId.MAX_LEVEL, maxLevel));
      return this;
    }
    /**
     * If specified, then only cells where (level - min_level) is a multiple of
     * "level_mod" will be used (default 1). This effectively allows the branching
     * factor of the S2CellId hierarchy to be increased. Currently the only
     * parameter values allowed are 1, 2, or 3, corresponding to branching factors
     * of 4, 16, and 64 respectively.
     */
    setLevelMod(levelMod) {
      this.levelMod = Math.max(1, Math.min(3, levelMod));
      return this;
    }
    /**
     * Sets the maximum desired number of cells in the approximation (defaults to
     * kDefaultMaxCells). Note the following:
     *
     * <ul>
     * <li>For any setting of max_cells(), up to 6 cells may be returned if that
     * is the minimum number of cells required (e.g. if the region intersects all
     * six face cells). Up to 3 cells may be returned even for very tiny convex
     * regions if they happen to be located at the intersection of three cube
     * faces.
     *
     * <li>For any setting of max_cells(), an arbitrary number of cells may be
     * returned if min_level() is too high for the region being approximated.
     *
     * <li>If max_cells() is less than 4, the area of the covering may be
     * arbitrarily large compared to the area of the original region even if the
     * region is convex (e.g. an S2Cap or S2LatLngRect).
     * </ul>
     *
     * Accuracy is measured by dividing the area of the covering by the area of
     * the original region. The following table shows the median and worst case
     * values for this area ratio on a test case consisting of 100,000 spherical
     * caps of random size (generated using s2regioncoverer_unittest):
     *
     * <pre>
     * max_cells: 3 4 5 6 8 12 20 100 1000
     * median ratio: 5.33 3.32 2.73 2.34 1.98 1.66 1.42 1.11 1.01
     * worst case: 215518 14.41 9.72 5.26 3.91 2.75 1.92 1.20 1.02
     * </pre>
     */
    setMaxCells(maxCells) {
      this.maxCells = maxCells;
      return this;
    }
    getMinLevel() {
      return this.minLevel;
    }
    getMaxLevel() {
      return this.maxLevel;
    }
    getMaxCells() {
      return this.maxCells;
    }
    getLevelMod() {
      return this.levelMod;
    }
    /**
     * Computes a list of cell ids that covers the given region and satisfies the
     * various restrictions specified above.
     *
     * @param region The region to cover
     * @param covering The list filled in by this method
     */
    getCoveringCells(region) {
      const tmp = this.getCoveringUnion(region);
      return tmp.denormalize(this.minLevel, this.levelMod);
    }
    /**
     * Computes a list of cell ids that is contained within the given region and
     * satisfies the various restrictions specified above.
     *
     * @param region The region to fill
     * @param interior The list filled in by this method
     */
    getInteriorCoveringCells(region) {
      const tmp = this.getInteriorCoveringUnion(region);
      return tmp.denormalize(this.minLevel, this.levelMod);
    }
    /**
     * Return a normalized cell union that covers the given region and satisfies
     * the restrictions *EXCEPT* for min_level() and level_mod(). These criteria
     * cannot be satisfied using a cell union because cell unions are
     * automatically normalized by replacing four child cells with their parent
     * whenever possible. (Note that the list of cell ids passed to the cell union
     * constructor does in fact satisfy all the given restrictions.)
     */
    getCoveringUnion(region, covering = new S2CellUnion()) {
      this.interiorCovering = false;
      this.getCoveringInternal(region);
      covering.initSwap(this.result);
      this.result = [];
      return covering;
    }
    /**
     * Return a normalized cell union that is contained within the given region
     * and satisfies the restrictions *EXCEPT* for min_level() and level_mod().
     */
    getInteriorCoveringUnion(region, covering = new S2CellUnion()) {
      this.interiorCovering = true;
      this.getCoveringInternal(region);
      covering.initSwap(this.result);
      this.result = [];
      return covering;
    }
    /**
     * Given a connected region and a starting point, return a set of cells at the given level that
     * cover the region.
     */
    static getSimpleCovering(region, start, level) {
      return this.floodFill(region, S2CellId.fromPoint(start).parentL(level));
    }
    /**
     * If the cell intersects the given region, return a new candidate with no
     * children, otherwise return null. Also marks the candidate as "terminal" if
     * it should not be expanded further.
     */
    newCandidate(cell) {
      if (!this.region.mayIntersectC(cell)) {
        return null;
      }
      let isTerminal = false;
      if (cell.level >= this.minLevel) {
        if (this.interiorCovering) {
          if (this.region.containsC(cell)) {
            isTerminal = true;
          } else if (cell.level + this.levelMod > this.maxLevel) {
            return null;
          }
        } else {
          if (cell.level + this.levelMod > this.maxLevel || this.region.containsC(cell)) {
            isTerminal = true;
          }
        }
      }
      const candidate = new Candidate();
      candidate.cell = cell;
      candidate.isTerminal = isTerminal;
      candidate.numChildren = 0;
      if (!isTerminal) {
        candidate.children = [];
        const numOfChildren = 1 << this.maxChildrenShift();
        for (let i = 0; i < numOfChildren; i++) {
          candidate.children.push(new Candidate());
        }
      }
      this.candidatesCreatedCounter++;
      return candidate;
    }
    /** Return the log base 2 of the maximum number of children of a candidate. */
    maxChildrenShift() {
      return 2 * this.levelMod;
    }
    /**
     * Process a candidate by either adding it to the result list or expanding its
     * children and inserting it into the priority queue. Passing an argument of
     * NULL does nothing.
     */
    addCandidate(candidate) {
      if (candidate == null) {
        return;
      }
      if (candidate.isTerminal) {
        this.result.push(candidate.cell.id);
        return;
      }
      const numLevels = candidate.cell.level < this.minLevel ? 1 : this.levelMod;
      const numTerminals = this.expandChildren(candidate, candidate.cell, numLevels);
      if (candidate.numChildren == 0) {
      } else if (!this.interiorCovering && numTerminals == 1 << this.maxChildrenShift() && candidate.cell.level >= this.minLevel) {
        candidate.isTerminal = true;
        this.addCandidate(candidate);
      } else {
        const priority = -(((candidate.cell.level << this.maxChildrenShift()) + candidate.numChildren << this.maxChildrenShift()) + numTerminals);
        this.candidateQueue.add(new QueueEntry(priority, candidate));
      }
    }
    /**
     * Populate the children of "candidate" by expanding the given number of
     * levels from the given cell. Returns the number of children that were marked
     * "terminal".
     */
    expandChildren(candidate, cell, numLevels) {
      numLevels--;
      const childCells = cell.subdivide();
      let numTerminals = 0;
      for (let i = 0; i < 4; ++i) {
        if (numLevels > 0) {
          if (this.region.mayIntersectC(childCells[i])) {
            numTerminals += this.expandChildren(candidate, childCells[i], numLevels);
          }
          continue;
        }
        const child = this.newCandidate(childCells[i]);
        if (child != null) {
          candidate.children[candidate.numChildren++] = child;
          if (child.isTerminal) {
            ++numTerminals;
          }
        }
      }
      return numTerminals;
    }
    /** Computes a set of initial candidates that cover the given region. */
    getInitialCandidates() {
      if (this.maxCells >= 4) {
        const cap = this.region.getCapBound();
        let level = Math.min(
          S2Projections.MIN_WIDTH.getMaxLevel(2 * cap.angle().radians),
          Math.min(this.maxLevel, S2CellId.MAX_LEVEL - 1)
        );
        if (this.levelMod > 1 && level > this.minLevel) {
          level -= (level - this.minLevel) % this.levelMod;
        }
        if (level > 0) {
          const id = S2CellId.fromPoint(cap.axis);
          const base = id.getVertexNeighbors(level);
          for (let i = 0; i < base.length; ++i) {
            this.addCandidate(this.newCandidate(new S2Cell(base[i])));
          }
          return;
        }
      }
      for (let face = 0; face < 6; ++face) {
        this.addCandidate(this.newCandidate(_S2RegionCoverer2.FACE_CELLS[face]));
      }
    }
    /** Generates a covering and stores it in result. */
    getCoveringInternal(region) {
      if (!(this.candidateQueue.size() == 0 && this.result.length == 0)) {
        throw new Error("preconditions are not satisfied");
      }
      this.region = region;
      this.candidatesCreatedCounter = 0;
      this.getInitialCandidates();
      while (this.candidateQueue.size() !== 0 && (!this.interiorCovering || this.result.length < this.maxCells)) {
        const candidate = this.candidateQueue.poll().candidate;
        if (this.interiorCovering || candidate.cell.level < this.minLevel || candidate.numChildren == 1 || this.result.length + this.candidateQueue.size() + candidate.numChildren <= this.maxCells) {
          for (let i = 0; i < candidate.numChildren; ++i) {
            if (!this.interiorCovering || this.result.length < this.maxCells) {
              this.addCandidate(candidate.children[i]);
            }
          }
        } else {
          candidate.isTerminal = true;
          this.addCandidate(candidate);
        }
      }
      this.candidateQueue.clear();
      this.region = null;
    }
    /**
     * Given a region and a starting cell, return the set of all the edge-connected cells at the same
     * level that intersect "region". The output cells are returned in arbitrary order.
     */
    static floodFill(region, start) {
      const all = /* @__PURE__ */ new Set();
      const frontier = [];
      const output = [];
      all.add(start.toToken());
      frontier.push(start);
      while (frontier.length !== 0) {
        const id = frontier.pop();
        if (!region.mayIntersectC(new S2Cell(id))) {
          continue;
        }
        output.push(id);
        const neighbors = id.getEdgeNeighbors();
        for (let edge = 0; edge < 4; ++edge) {
          const nbr = neighbors[edge];
          if (!all.has(nbr.toToken())) {
            frontier.push(nbr);
            all.add(nbr.toToken());
          }
        }
      }
      return output;
    }
  };
  _S2RegionCoverer.DEFAULT_MAX_CELLS = 8;
  _S2RegionCoverer.FACE_CELLS = [0, 1, 2, 3, 4, 5].map((face) => S2Cell.fromFace(face));
  var S2RegionCoverer = _S2RegionCoverer;
  var Candidate = class {
    // Actual size may be 0, 4, 16, or 64
    // elements.
    toString() {
      return `isTerminal: ${this.isTerminal} - Cell: ${this.cell.toString()}`;
    }
  };
  var PriorityQueue = class {
    constructor() {
      this.clear();
    }
    add(item) {
      this.items.push(item);
      this.items.sort((a, b) => a.compare(b));
    }
    clear() {
      this.items = [];
    }
    size() {
      return this.items.length;
    }
    poll() {
      return this.items.splice(0, 1)[0];
    }
  };
  var QueueEntry = class {
    constructor(id, candidate) {
      this.id = id;
      this.candidate = candidate;
    }
    compare(other) {
      return this.id < other.id ? 1 : this.id > other.id ? -1 : 0;
    }
  };

  // userscript/src/geometry.ts
  var finite = (value) => typeof value === "number" && Number.isFinite(value);
  function haversineMeters(a, b) {
    const radians = Math.PI / 180;
    const dLat = (b.lat - a.lat) * radians;
    const dLng = (b.lng - a.lng) * radians;
    const lat1 = a.lat * radians;
    const lat2 = b.lat * radians;
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
    return 63710088e-1 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
  }
  function cellGeometry(cellId) {
    const cell = new S2Cell(cellId);
    const vertices = [0, 1, 2, 3].map((index) => {
      const vertex = S2LatLng.fromPoint(cell.getVertex(index));
      return { lat: vertex.latDegrees, lng: vertex.lngDegrees };
    });
    return { id: cellId.toToken(), level: cellId.level(), vertices };
  }
  function s2Geometry(point, level) {
    const latLng = S2LatLng.fromDegrees(point.lat, point.lng);
    return cellGeometry(S2CellId.fromPoint(latLng.toPoint()).parentL(level));
  }
  function viewportS2Coverage(south, west, north, east, level, maxCells) {
    if (![south, west, north, east, level, maxCells].every(Number.isFinite) || south >= north || west >= east || south < -90 || north > 90 || west < -180 || east > 180 || level < 0 || level > 30 || maxCells < 1) {
      return { cells: [], complete: false, requiredCells: 0 };
    }
    const meanLatitudeRadians = (south + north) / 2 * (Math.PI / 180);
    const viewportAreaKm2 = Math.abs(north - south) * Math.abs(east - west) * Math.max(0.01, Math.cos(meanLatitudeRadians)) * 12392.14;
    const averageCellAreaKm2 = 510065621724e-3 / (6 * 4 ** level);
    const conservativeEstimate = Math.ceil(viewportAreaKm2 / averageCellAreaKm2 * 2.5);
    if (conservativeEstimate > maxCells) {
      return { cells: [], complete: false, requiredCells: conservativeEstimate };
    }
    const region = S2LatLngRect.fromLatLng(S2LatLng.fromDegrees(south, west), S2LatLng.fromDegrees(north, east));
    const coverer = new S2RegionCoverer().setMinLevel(level).setMaxLevel(level).setMaxCells(maxCells + 1);
    const ids = coverer.getCoveringCells(region);
    if (ids.length > maxCells) return { cells: [], complete: false, requiredCells: ids.length };
    return { cells: ids.map(cellGeometry), complete: true, requiredCells: ids.length };
  }
  function pickNumber(record, keys) {
    for (const key of keys) {
      if (finite(record[key])) return record[key];
    }
    return null;
  }
  function coordinateFromRecord(record) {
    const directLat = pickNumber(record, ["lat", "latitude", "y"]);
    const directLng = pickNumber(record, ["lng", "lon", "longitude", "x"]);
    if (directLat !== null && directLng !== null && Math.abs(directLat) <= 90 && Math.abs(directLng) <= 180) {
      return { lat: directLat, lng: directLng };
    }
    const latE6 = pickNumber(record, ["latE6"]);
    const lngE6 = pickNumber(record, ["lngE6", "lonE6"]);
    if (latE6 !== null && lngE6 !== null) {
      const lat = latE6 / 1e6;
      const lng = lngE6 / 1e6;
      if (Math.abs(lat) <= 90 && Math.abs(lng) <= 180) return { lat, lng };
    }
    for (const key of ["location", "position", "coordinates", "point"]) {
      const nested = record[key];
      if (nested && typeof nested === "object" && !Array.isArray(nested)) {
        const candidate = coordinateFromRecord(nested);
        if (candidate) return candidate;
      }
    }
    return null;
  }
  function statusFromRecord(record) {
    for (const key of ["isInGame", "inGame", "isLive", "live"]) {
      if (typeof record[key] === "boolean") return record[key] ? "in-game" : "not-in-game";
    }
    const raw = ["gameStatus", "status", "availability", "pokemonGoStatus"].map((key) => record[key]).find((value) => typeof value === "string");
    if (typeof raw === "string") {
      const value = raw.toLowerCase();
      if (/(not|none|out|removed|inactive|no[_ -]?game)/.test(value)) return "not-in-game";
      if (/(game|live|active|pokestop|gym|powerspot|in[_ -]?game)/.test(value)) return "in-game";
    }
    const games = record.games;
    if (Array.isArray(games) && games.length > 0) return "in-game";
    const gmo = record.gmo;
    if (Array.isArray(gmo) && gmo.length > 0) return "in-game";
    return "unknown";
  }
  function kindFromRecord(record) {
    const descriptor = JSON.stringify({
      gmo: record.gmo,
      type: record.poiType ?? record.type ?? record.gameObjectType ?? record.gameStatus ?? record.status,
      games: record.games
    }).toUpperCase();
    if (descriptor.includes("GYM")) return "gym";
    if (descriptor.includes("POKESTOP") || descriptor.includes("POK\xC9STOP")) return "pokestop";
    if (descriptor.includes("HOLOHOLO") || descriptor.includes("POWERSPOT") || descriptor.includes("POWER_SPOT")) return "powerspot";
    return "other";
  }
  function hasPoiIdentity(record) {
    return ["id", "guid", "poiId", "title", "name", "gameStatus", "isInGame", "inGame", "games"].some(
      (key) => key in record
    );
  }
  function titleFromRecord(record) {
    for (const key of ["title", "name", "label"]) {
      if (typeof record[key] === "string" && record[key].trim()) return record[key].trim();
    }
    return "Wayspot sin t\xEDtulo";
  }
  function idFromRecord(record, point, title) {
    for (const key of ["guid", "id", "poiId", "uuid"]) {
      if (typeof record[key] === "string" || typeof record[key] === "number") return String(record[key]);
    }
    return `${point.lat.toFixed(6)},${point.lng.toFixed(6)}:${title}`;
  }
  function parseObservedPois(payload) {
    const result = /* @__PURE__ */ new Map();
    const visited = /* @__PURE__ */ new Set();
    const visit = (value, depth) => {
      if (depth > 12 || value === null || typeof value !== "object" || visited.has(value)) return;
      visited.add(value);
      if (Array.isArray(value)) {
        value.forEach((item) => visit(item, depth + 1));
        return;
      }
      const record = value;
      const point = coordinateFromRecord(record);
      if (point && hasPoiIdentity(record)) {
        const title = titleFromRecord(record);
        const id = idFromRecord(record, point, title);
        const kind = kindFromRecord(record);
        result.set(id, { id, title, ...point, gameState: statusFromRecord(record), is22mReference: kind !== "other", kind });
      }
      Object.values(record).forEach((child) => visit(child, depth + 1));
    };
    visit(payload, 0);
    return [...result.values()];
  }
  function countPoiKinds(pois) {
    return pois.reduce(
      (counts, poi) => {
        counts[poi.kind] += 1;
        return counts;
      },
      { pokestop: 0, gym: 0, powerspot: 0, other: 0 }
    );
  }
  function assessPoint(point, pois) {
    const s17 = s2Geometry(point, 17);
    const s14 = s2Geometry(point, 14);
    const withCells = pois.map((poi) => ({
      poi,
      s17: s2Geometry(poi, 17).id,
      s14: s2Geometry(poi, 14).id
    }));
    const inGame = pois.filter((poi) => poi.gameState === "in-game" && poi.is22mReference);
    const nearestInGame = inGame.map((poi) => ({ poi, meters: haversineMeters(point, poi) })).sort((a, b) => a.meters - b.meters)[0] ?? null;
    const s17References = withCells.filter((item) => item.s17 === s17.id).map((item) => item.poi);
    const s14References = withCells.filter((item) => item.s14 === s14.id).map((item) => item.poi);
    return {
      point,
      s17,
      s14,
      s17References,
      s14References,
      s17Counts: countPoiKinds(s17References),
      s14Counts: countPoiKinds(s14References),
      nearestInGame
    };
  }

  // userscript/src/candidate-store.ts
  var CANDIDATE_STORAGE_KEY = "hws-candidates-v1";
  var MAX_CANDIDATES = 200;
  function text(value, limit) {
    return typeof value === "string" ? value.trim().slice(0, limit) : "";
  }
  function finite2(value) {
    return typeof value === "number" && Number.isFinite(value);
  }
  function normalize(value) {
    if (!value || typeof value !== "object") return null;
    const item = value;
    if (!finite2(item.lat) || !finite2(item.lng) || Math.abs(item.lat) > 90 || Math.abs(item.lng) > 180) return null;
    const id = text(item.id, 120);
    const createdAt = finite2(item.createdAt) ? item.createdAt : 0;
    if (!id || !createdAt) return null;
    return {
      id,
      lat: item.lat,
      lng: item.lng,
      title: text(item.title, 80) || "Candidato sin t\xEDtulo",
      note: text(item.note, 600),
      createdAt
    };
  }
  function loadCandidates(storage) {
    try {
      const raw = storage.getItem(CANDIDATE_STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(parsed)) return [];
      return parsed.map(normalize).filter((candidate) => Boolean(candidate)).slice(0, MAX_CANDIDATES);
    } catch {
      return [];
    }
  }
  function saveCandidates(storage, candidates) {
    try {
      storage.setItem(CANDIDATE_STORAGE_KEY, JSON.stringify(candidates.slice(0, MAX_CANDIDATES)));
      return true;
    } catch {
      return false;
    }
  }
  function createCandidate(point, title, note, createdAt = Date.now(), id = `${createdAt.toString(36)}-${Math.round(point.lat * 1e6)}-${Math.round(point.lng * 1e6)}`) {
    return {
      id,
      lat: point.lat,
      lng: point.lng,
      title: text(title, 80) || "Candidato sin t\xEDtulo",
      note: text(note, 600),
      createdAt
    };
  }

  // userscript/src/hijuelas-wayspot-scout.user.ts
  function browserStorage() {
    try {
      return window.localStorage;
    } catch {
      return null;
    }
  }
  var candidateStorage = browserStorage();
  var MAP_ROUTE = "/new/mapview";
  var GCS_PATH = "/api/v1/vault/mapview/gcs";
  var MAX_DRAWN_CIRCLES = 220;
  var MAX_VISIBLE_S17 = 1500;
  var MAX_VISIBLE_S14 = 350;
  var CELL_COLORS = [
    { value: "#2a84e8", name: "Azul" },
    { value: "#ffab24", name: "\xC1mbar" },
    { value: "#e53935", name: "Rojo" },
    { value: "#1f9d70", name: "Verde" },
    { value: "#8e5cc7", name: "Morado" },
    { value: "#00a9c0", name: "Turquesa" },
    { value: "#f57c00", name: "Naranja" },
    { value: "#3949ab", name: "\xCDndigo" },
    { value: "#795548", name: "Caf\xE9" },
    { value: "#eceff1", name: "Blanco" }
  ];
  var state = {
    map: null,
    mapClickListener: null,
    pois: /* @__PURE__ */ new Map(),
    polygons: [],
    circles: [],
    markers: [],
    candidateMarkers: [],
    evaluation: null,
    evaluationSource: null,
    locationMessage: "Toca un punto del mapa para evaluar su S17, S14 y distancia de 22 m.",
    showS17: true,
    showS14: true,
    showCircles: true,
    panel: null,
    counter: null,
    result: null,
    gcsStamp: 0,
    s17Color: "#2a84e8",
    s14Color: "#ffab24",
    pokestopColor: "#ff4d4f",
    gymColor: "#1f9d70",
    powerspotColor: "#f0b429",
    lineMultiplier: 1,
    gridMessage: "Esperando l\xEDmites del mapa",
    candidates: candidateStorage ? loadCandidates(candidateStorage) : [],
    candidateList: null,
    candidateCount: null
  };
  function isMapCandidate(value) {
    return !!value && typeof value.getCenter === "function" && typeof value.getDiv === "function";
  }
  function findMap() {
    const host = document.querySelector("app-wf-base-map");
    if (!host) return null;
    const context = host.__ngContext__;
    if (!Array.isArray(context)) return null;
    for (const item of context) {
      if (isMapCandidate(item)) return item;
      if (item && typeof item === "object") {
        for (const key of ["map", "googleMap", "componentRef"]) {
          const candidate = item[key];
          if (isMapCandidate(candidate)) return candidate;
          if (isMapCandidate(candidate?.map)) return candidate.map;
        }
      }
    }
    return null;
  }
  function mapIsActive() {
    return window.location.pathname.startsWith(MAP_ROUTE);
  }
  function updatePanel() {
    const loaded = countPoiKinds([...state.pois.values()]);
    if (state.counter) state.counter.textContent = `${state.gridMessage} \xB7 ${state.pois.size} referencias cargadas`;
    if (!state.result) return;
    if (!state.evaluation) {
      renderCountCards(loaded, "Conteo de referencias cargadas en la vista actual");
      state.result.innerHTML = `<strong>Toca un punto del mapa</strong><span>${state.locationMessage}</span><small>Los contadores superiores muestran los datos que Wayfarer ya carg\xF3 en esta vista.</small>`;
      return;
    }
    const assessment = assessPoint(state.evaluation, [...state.pois.values()]);
    renderCountCards(assessment.s14Counts, `Celda S14 del punto \xB7 ${assessment.s14References.length} referencia(s)`);
    const nearest = assessment.nearestInGame;
    const within22 = nearest && nearest.meters < 22;
    const s17Text = assessment.s17References.length ? `S17: ${assessment.s17References.length} referencia(s) observada(s)` : "S17: sin referencias observadas";
    const otherText = assessment.s14Counts.other ? ` \xB7 ${assessment.s14Counts.other} otra(s) referencia(s)` : "";
    const distanceText = nearest ? `${nearest.meters.toFixed(1)} m a \xAB${nearest.poi.title}\xBB (${nearest.poi.gameState})` : "sin referencias clasificadas en el juego";
    const sourceText = state.evaluationSource === "candidato" ? "Candidato local" : "Punto tocado en el mapa";
    state.result.innerHTML = `
    <strong>${within22 ? "Conflicto de 22 m" : "Revisi\xF3n de 22 m"}</strong>
    <span>${within22 ? "Hay una referencia en juego a menos de 22 m." : "No se detect\xF3 una referencia en juego a menos de 22 m en los datos cargados."}</span>
    <span>${s17Text}</span>
    <span>Celda S14: ${assessment.s14References.length} referencia(s)${otherText}</span>
    <span>M\xE1s cercana: ${distanceText}</span>
    <span>${sourceText}: ${state.evaluation.lat.toFixed(6)}, ${state.evaluation.lng.toFixed(6)}</span>
    <small>Resultado local y orientativo: no garantiza inclusi\xF3n en Pok\xE9mon GO ni activaci\xF3n de un nodo.</small>`;
  }
  function renderCountCards(counts, context) {
    const contextElement = document.getElementById("hws-count-context");
    if (contextElement) contextElement.textContent = context;
    const cards = [
      ["pokestop", "Pok\xE9paradas", state.pokestopColor],
      ["gym", "Gimnasios", state.gymColor],
      ["powerspot", "Nodos", state.powerspotColor]
    ];
    cards.forEach(([kind, label, color]) => {
      const number = document.getElementById(`hws-count-${kind}`);
      if (!number) return;
      number.textContent = String(counts[kind]);
      const box = number.parentElement;
      if (box) {
        box.style.setProperty("--hws-count", color);
        box.style.color = color;
      }
      number.setAttribute("aria-label", `${counts[kind]} ${label}`);
    });
  }
  function countIconMarkup(kind) {
    const source = define_WAYFINDER_COUNT_ICONS_default[kind];
    return `<img class="hws-count-icon" src="${source}" alt="" aria-hidden="true">`;
  }
  function clearVisuals() {
    state.polygons.forEach((polygon) => polygon.setMap?.(null));
    state.circles.forEach((circle) => circle.setMap?.(null));
    state.markers.forEach((marker) => marker.setMap?.(null));
    state.candidateMarkers.forEach((marker) => marker.setMap?.(null));
    state.polygons = [];
    state.circles = [];
    state.markers = [];
    state.candidateMarkers = [];
  }
  function addCellGeometry(geometry, color, opacity) {
    const google = window.google;
    if (!google?.maps || !state.map) return;
    const polygon = new google.maps.Polygon({
      paths: geometry.vertices,
      strokeColor: color,
      strokeOpacity: 0.92,
      strokeWeight: (geometry.level === 14 ? 2.4 : 1.4) * state.lineMultiplier,
      fillColor: color,
      fillOpacity: opacity,
      clickable: false,
      zIndex: geometry.level === 14 ? 91 : 90,
      map: state.map
    });
    state.polygons.push(polygon);
  }
  function circleColor(kind) {
    if (kind === "gym") return state.gymColor;
    if (kind === "powerspot") return state.powerspotColor;
    return state.pokestopColor;
  }
  function mapBounds() {
    const bounds = state.map?.getBounds?.();
    if (!bounds) return null;
    const southWest = bounds.getSouthWest?.();
    const northEast = bounds.getNorthEast?.();
    if (!southWest || !northEast) return null;
    return { south: southWest.lat(), west: southWest.lng(), north: northEast.lat(), east: northEast.lng() };
  }
  function redraw() {
    clearVisuals();
    if (!state.map || !window.google?.maps) return;
    const bounds = mapBounds();
    if (bounds && bounds.west < bounds.east) {
      const s17 = viewportS2Coverage(bounds.south, bounds.west, bounds.north, bounds.east, 17, MAX_VISIBLE_S17);
      const s14 = viewportS2Coverage(bounds.south, bounds.west, bounds.north, bounds.east, 14, MAX_VISIBLE_S14);
      if (state.showS17 && s17.complete) s17.cells.forEach((cell) => addCellGeometry(cell, state.s17Color, 0.012));
      if (state.showS14 && s14.complete) s14.cells.forEach((cell) => addCellGeometry(cell, state.s14Color, 8e-3));
      const details = [
        s17.complete ? `${s17.requiredCells} S17` : `S17: acerca el mapa (${s17.requiredCells}+ celdas)`,
        s14.complete ? `${s14.requiredCells} S14` : `S14: acerca el mapa (${s14.requiredCells}+ celdas)`
      ];
      state.gridMessage = `Cuadr\xEDcula completa: ${details.join(" \xB7 ")}`;
    } else {
      state.gridMessage = "Cuadr\xEDcula no disponible: mueve el mapa fuera del antimeridiano";
    }
    if (state.evaluation) {
      if (state.showS17) addCellGeometry(s2Geometry(state.evaluation, 17), state.s17Color, 0.11);
      const evaluationMarker = new window.google.maps.Circle({
        center: state.evaluation,
        radius: 3,
        strokeColor: "#125eac",
        strokeOpacity: 1,
        strokeWeight: 1.5,
        fillColor: "#e7f2ff",
        fillOpacity: 1,
        clickable: false,
        zIndex: 97,
        map: state.map
      });
      state.markers.push(evaluationMarker);
    }
    if (state.showCircles) {
      [...state.pois.values()].filter((poi) => poi.gameState === "in-game" && poi.is22mReference).slice(0, MAX_DRAWN_CIRCLES).forEach((poi) => {
        const color = circleColor(poi.kind);
        const circle = new window.google.maps.Circle({
          center: poi,
          radius: 22,
          strokeColor: color,
          strokeOpacity: 0.9,
          strokeWeight: 1.5,
          fillColor: color,
          fillOpacity: 0.08,
          clickable: false,
          zIndex: 92,
          map: state.map
        });
        state.circles.push(circle);
      });
    }
    state.candidates.forEach((candidate) => {
      const marker = new window.google.maps.Circle({
        center: candidate,
        radius: 8,
        strokeColor: "#6e42bd",
        strokeOpacity: 1,
        strokeWeight: 2,
        fillColor: "#d9c6ff",
        fillOpacity: 0.9,
        clickable: false,
        zIndex: 95,
        map: state.map
      });
      state.candidateMarkers.push(marker);
    });
    renderCandidates();
    updatePanel();
  }
  function evaluatePoint(point, source) {
    state.evaluation = point;
    state.evaluationSource = source;
    state.locationMessage = source === "toque" ? "Punto tocado evaluado." : "Candidato local evaluado.";
    redraw();
  }
  function clearLocalData() {
    state.pois.clear();
    state.evaluation = null;
    state.evaluationSource = null;
    state.locationMessage = "Datos del mapa limpiados. Toca el mapa para evaluar un punto.";
    redraw();
  }
  function persistCandidates() {
    if (!candidateStorage || !saveCandidates(candidateStorage, state.candidates)) {
      state.locationMessage = "No se pudieron guardar candidatos locales. Revisa el almacenamiento del navegador.";
      updatePanel();
      return false;
    }
    return true;
  }
  function renderCandidates() {
    if (state.candidateCount) state.candidateCount.textContent = String(state.candidates.length);
    const list = state.candidateList;
    if (!list) return;
    list.replaceChildren();
    if (!state.candidates.length) {
      const empty = document.createElement("p");
      empty.className = "hws-candidate-empty";
      empty.textContent = "No hay candidatos guardados en este navegador.";
      list.appendChild(empty);
      return;
    }
    state.candidates.forEach((candidate) => {
      const row = document.createElement("div");
      row.className = "hws-candidate-row";
      const open = document.createElement("button");
      open.className = "hws-candidate-open";
      open.textContent = `${candidate.title} \xB7 ${candidate.lat.toFixed(5)}, ${candidate.lng.toFixed(5)}`;
      open.addEventListener("click", () => {
        state.map?.panTo?.(candidate);
        evaluatePoint(candidate, "candidato");
      });
      const remove = document.createElement("button");
      remove.className = "hws-candidate-remove";
      remove.setAttribute("aria-label", `Eliminar ${candidate.title}`);
      remove.textContent = "\xD7";
      remove.addEventListener("click", () => {
        const before = state.candidates;
        state.candidates = state.candidates.filter((item) => item.id !== candidate.id);
        if (!persistCandidates()) state.candidates = before;
        redraw();
      });
      row.append(open, remove);
      if (candidate.note) {
        const note = document.createElement("small");
        note.textContent = candidate.note;
        row.appendChild(note);
      }
      list.appendChild(row);
    });
  }
  function addCandidate() {
    if (!state.evaluation) {
      state.locationMessage = "Primero toca un punto del mapa antes de guardar un punto Wayfinder.";
      updatePanel();
      return;
    }
    const titleInput = document.getElementById("hws-candidate-title");
    const noteInput = document.getElementById("hws-candidate-note");
    const candidate = createCandidate(state.evaluation, titleInput?.value ?? "", noteInput?.value ?? "");
    const before = state.candidates;
    state.candidates = [candidate, ...state.candidates];
    if (!persistCandidates()) {
      state.candidates = before;
      return;
    }
    if (titleInput) titleInput.value = "";
    if (noteInput) noteInput.value = "";
    state.locationMessage = "Candidato guardado \xFAnicamente en este navegador.";
    redraw();
  }
  function clearCandidates() {
    const before = state.candidates;
    state.candidates = [];
    if (!persistCandidates()) state.candidates = before;
    else {
      state.locationMessage = "Candidatos locales eliminados.";
      redraw();
    }
  }
  function paletteMarkup(layer) {
    const current = layer === "s17" ? state.s17Color : layer === "s14" ? state.s14Color : layer === "pokestop" ? state.pokestopColor : layer === "gym" ? state.gymColor : state.powerspotColor;
    return CELL_COLORS.map(
      (color) => `<button class="hws-color${color.value === current ? " hws-color--active" : ""}" data-hws-color="${color.value}" data-hws-layer="${layer}" style="--hws-color:${color.value}" title="${color.name}" aria-label="Color ${color.name} para ${layer.toUpperCase()}"></button>`
    ).join("");
  }
  function createUi() {
    if (document.getElementById("hws-root")) return;
    const root = document.createElement("div");
    root.id = "hws-root";
    root.innerHTML = `
    <button id="hws-toggle" aria-label="Abrir Wayfinder"><img src="${"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA+gAAAPoCAIAAADCwUOzAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGl2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDEgNzkuYThkNDc1MywgMjAyMy8wMy8yMy0wODo1NjozNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI0LjYgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyNi0wOC0yNlQwNzozNjo1My0wNDowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyNi0wOC0yNlQwNzozNjo1My0wNDowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjYtMDgtMjZUMDc6MzY6NTMtMDQ6MDAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTgxYTFiZmItNDBiNC1mMDQyLThkYjItZDJhOTU4OGYzMzRmIiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MjhmNmEwZGUtMWY1Yy00NDQxLWI0NGItZDQ1NWQxMmI3MDc0IiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6OTg5NWIyYTQtZDQ0NC1iODQ5LTg3ZWQtMzM4YTRmOTk0ZjRmIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6OTg5NWIyYTQtZDQ0NC1iODQ5LTg3ZWQtMzM4YTRmOTk0ZjRmIiBzdEV2dDp3aGVuPSIyMDI2LTA4LTI2VDA3OjM2OjUzLTA0OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjQuNiAoV2luZG93cykiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjU4MWExYmZiLTQwYjQtZjA0Mi04ZGIyLWQyYTk1ODhmMzM0ZiIgc3RFdnQ6d2hlbj0iMjAyNi0wOC0yNlQwNzozNjo1My0wNDowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDI0LjYgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8cGhvdG9zaG9wOkRvY3VtZW50QW5jZXN0b3JzPiA8cmRmOkJhZz4gPHJkZjpsaT54bXAuZGlkOmE0MTljYTdjLWRiNTctNTQ0NC1iYmIyLTVkM2YwOTQzNDdkOTwvcmRmOmxpPiA8cmRmOmxpPnhtcC5kaWQ6ZjRmYTg5ZTItZTQyMy0zMTQ3LWIwYmItODA0OTA1OGUwMGYwPC9yZGY6bGk+IDwvcmRmOkJhZz4gPC9waG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+cFUAogAClKxJREFUeJzs/Xm4JctVH4hG7rPPfKpOzXceJV0JzRKDBTIyCAuEAIPMZJAB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"}" alt=""><span>S2</span></button>
    <section id="hws-panel" aria-label="Wayfinder" hidden>
      <header><div class="hws-brand"><img class="hws-brand-logo" src="${"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA+gAAAPoCAIAAADCwUOzAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGl2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDEgNzkuYThkNDc1MywgMjAyMy8wMy8yMy0wODo1NjozNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI0LjYgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyNi0wOC0yNlQwNzozNjo1My0wNDowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyNi0wOC0yNlQwNzozNjo1My0wNDowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjYtMDgtMjZUMDc6MzY6NTMtMDQ6MDAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTgxYTFiZmItNDBiNC1mMDQyLThkYjItZDJhOTU4OGYzMzRmIiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MjhmNmEwZGUtMWY1Yy00NDQxLWI0NGItZDQ1NWQxMmI3MDc0IiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6OTg5NWIyYTQtZDQ0NC1iODQ5LTg3ZWQtMzM4YTRmOTk0ZjRmIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6OTg5NWIyYTQtZDQ0NC1iODQ5LTg3ZWQtMzM4YTRmOTk0ZjRmIiBzdEV2dDp3aGVuPSIyMDI2LTA4LTI2VDA3OjM2OjUzLTA0OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjQuNiAoV2luZG93cykiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjU4MWExYmZiLTQwYjQtZjA0Mi04ZGIyLWQyYTk1ODhmMzM0ZiIgc3RFdnQ6d2hlbj0iMjAyNi0wOC0yNlQwNzozNjo1My0wNDowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDI0LjYgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8cGhvdG9zaG9wOkRvY3VtZW50QW5jZXN0b3JzPiA8cmRmOkJhZz4gPHJkZjpsaT54bXAuZGlkOmE0MTljYTdjLWRiNTctNTQ0NC1iYmIyLTVkM2YwOTQzNDdkOTwvcmRmOmxpPiA8cmRmOmxpPnhtcC5kaWQ6ZjRmYTg5ZTItZTQyMy0zMTQ3LWIwYmItODA0OTA1OGUwMGYwPC9yZGY6bGk+IDwvcmRmOkJhZz4gPC9waG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+cFUAogAClKxJREFUeJzs/Xm4JctVH4hG7rPPfKpOzXceJV0JzRKDBTIyCAuEAIPMZJAB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"}" alt=""><div><strong>Wayfinder</strong><small>Inteligencia de mapa \xB7 S2 + 22 m</small></div></div><button id="hws-close" aria-label="Cerrar Wayfinder">\xD7</button></header>
      <div class="hws-status"><span>MAPA ACTIVO</span><span>LECTURA LOCAL</span></div>
      <p id="hws-counter">Esperando referencias del mapa</p>
      <section class="hws-counts" aria-label="Conteo de referencias en la celda seleccionada">
        <div class="hws-count-grid">
          <div class="hws-count-item"><div class="hws-count-number">${countIconMarkup("pokestop")}<span id="hws-count-pokestop">0</span></div><small>Pok\xE9paradas</small></div>
          <div class="hws-count-item"><div class="hws-count-number">${countIconMarkup("gym")}<span id="hws-count-gym">0</span></div><small>Gimnasios</small></div>
          <div class="hws-count-item"><div class="hws-count-number">${countIconMarkup("powerspot")}<span id="hws-count-powerspot">0</span></div><small>Nodos</small></div>
        </div>
        <small id="hws-count-context">Conteo de referencias cargadas en la vista actual</small>
      </section>
      <div id="hws-result" class="hws-result"></div>
      <p class="hws-hint">Toca un punto del mapa para revisar S17, S14 y la distancia emp\xEDrica de 22 m.</p>
      <div class="hws-switches">
        <label class="hws-chip"><input id="hws-s17" type="checkbox" checked> S17</label>
        <label class="hws-chip"><input id="hws-s14" type="checkbox" checked> S14</label>
        <label class="hws-chip"><input id="hws-22m" type="checkbox" checked> 22 m</label>
      </div>
      <details class="hws-style">
        <summary>Capas del mapa</summary>
        <div class="hws-color-row"><span>S17</span><div class="hws-palette">${paletteMarkup("s17")}</div></div>
        <div class="hws-color-row"><span>S14</span><div class="hws-palette">${paletteMarkup("s14")}</div></div>
        <label class="hws-width">Grosor <select id="hws-width"><option value="1">Est\xE1ndar</option><option value="2">Gruesa (2\xD7)</option><option value="3">Muy gruesa (3\xD7)</option></select></label>
      </details>
      <details class="hws-style">
        <summary>Radios y colores de 22 m</summary>
        <div class="hws-color-row"><span>Parada</span><div class="hws-palette">${paletteMarkup("pokestop")}</div></div>
        <div class="hws-color-row"><span>Gimnasio</span><div class="hws-palette">${paletteMarkup("gym")}</div></div>
        <div class="hws-color-row"><span>Nodo</span><div class="hws-palette">${paletteMarkup("powerspot")}</div></div>
      </details>
      <details class="hws-candidates">
        <summary>Puntos Wayfinder (<span id="hws-candidate-count">0</span>)</summary>
        <input id="hws-candidate-title" maxlength="80" placeholder="Nombre del objeto real">
        <textarea id="hws-candidate-note" maxlength="600" placeholder="Notas de visita o foto pendiente"></textarea>
        <button id="hws-save-candidate" class="hws-candidate-save">Guardar punto evaluado</button>
        <div id="hws-candidate-list"></div>
        <button id="hws-clear-candidates" class="hws-candidate-clear">Borrar todos los candidatos</button>
      </details>
      <button id="hws-clear" class="hws-secondary">Limpiar datos de esta vista</button>
      <footer>Wayfinder analiza solo los datos que el mapa ya carg\xF3. No env\xEDa, modifica ni guarda informaci\xF3n fuera de este navegador.</footer>
    </section>`;
    document.body.appendChild(root);
    const style = document.createElement("style");
    style.textContent = `
    #hws-root{position:fixed;left:16px;bottom:26px;z-index:2147483000;font-family:system-ui,-apple-system,Arial,sans-serif;color:#eef6ff}
    #hws-toggle{width:56px;height:56px;border:1px solid #6dc3ff;background:linear-gradient(145deg,#1671ab,#0d4773);border-radius:28px;color:#fff;font-weight:800;font-size:17px;box-shadow:0 7px 20px #0009}
    #hws-panel{position:absolute;left:0;bottom:68px;width:min(330px,calc(100vw - 32px));max-height:min(60dvh,calc(100dvh - 210px));overflow:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch;touch-action:pan-y;background:rgba(9,19,31,.94);border:1px solid rgba(157,209,244,.28);border-radius:18px;box-shadow:0 14px 34px #000a;backdrop-filter:blur(16px);padding:12px;box-sizing:border-box}
    #hws-panel header{display:flex;justify-content:space-between;align-items:center;margin-bottom:3px;font-size:16px}#hws-panel header div{display:flex;flex-direction:column;gap:1px}#hws-panel header small{color:#9eb3c7;font-size:10px;font-weight:600}#hws-close{border:0;background:transparent;font-size:28px;line-height:1;color:#eaf6ff}
    #hws-counter{margin:5px 0 7px;color:#a9c5dc;font-size:11px;line-height:1.35}.hws-counts{margin:0 0 9px;padding:9px;background:rgba(15,38,55,.84);border:1px solid rgba(128,204,251,.26);border-radius:12px}.hws-count-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.hws-count-item{display:flex;flex-direction:column;align-items:center;gap:5px;min-width:0}.hws-count-number{display:flex;align-items:center;justify-content:center;gap:6px;width:100%;min-height:45px;border:2px solid var(--hws-count,#6dc3ff);border-radius:11px;background:rgba(6,16,27,.18);font-size:25px;font-weight:850;line-height:1;box-shadow:inset 0 1px 0 #ffffff22,0 3px 8px #0004}.hws-count-number span{font-variant-numeric:tabular-nums}.hws-count-icon{width:20px;height:20px;flex:0 0 auto}.hws-count-item small{color:#c0d6e7;font-size:10px;font-weight:700;text-align:center;line-height:1.1}#hws-count-context{display:block;margin-top:8px;color:#93b3c9;font-size:10px;line-height:1.25}.hws-secondary{width:100%;border:1px solid #48637a;border-radius:10px;padding:10px 8px;margin-top:9px;background:transparent;color:#c9d9e8;font-weight:750;font-size:12px}.hws-hint{margin:8px 1px 0;color:#a5bbce;font-size:10px;line-height:1.35}.hws-switches{display:flex;gap:6px;flex-wrap:wrap;margin:10px 0 8px;font-size:12px}.hws-chip{display:flex;gap:5px;align-items:center;background:#132c41;border:1px solid #335d7e;border-radius:999px;padding:6px 9px;color:#e9f6ff;font-weight:700}.hws-chip input{accent-color:#62c0ff;margin:0}
    .hws-style,.hws-candidates{margin:8px 0;padding:0 9px;background:rgba(28,51,70,.67);border:1px solid rgba(142,190,224,.19);border-radius:10px}.hws-style summary,.hws-candidates summary{cursor:pointer;padding:10px 0;font-size:12px;font-weight:750;color:#edf7ff}.hws-color-row{display:flex;align-items:center;gap:8px;margin:7px 0;font-size:11px;font-weight:700}.hws-color-row>span{width:49px;color:#b9d0e3}.hws-palette{display:flex;gap:5px;flex-wrap:wrap}.hws-color{width:21px;height:21px;border-radius:50%;border:2px solid #daeafa;background:var(--hws-color);box-shadow:0 0 0 1px #557289;box-sizing:border-box}.hws-color--active{box-shadow:0 0 0 3px #fff;transform:scale(1.05)}.hws-width{display:flex;align-items:center;justify-content:space-between;margin:10px 0;font-size:12px;font-weight:700;color:#dcecf8}.hws-width select{border:1px solid #4b718e;border-radius:8px;background:#10263a;padding:6px;color:#eef8ff;font-size:12px}
    .hws-candidates input,.hws-candidates textarea{width:100%;box-sizing:border-box;border:1px solid #4a6b83;border-radius:8px;background:#10263a;color:#eef8ff;padding:8px;margin-top:7px;font:inherit;font-size:12px}.hws-candidates textarea{min-height:54px;resize:vertical}.hws-candidate-save,.hws-candidate-clear{width:100%;border:0;border-radius:9px;padding:9px;font-weight:750;font-size:12px;margin-top:7px}.hws-candidate-save{background:#7551c8;color:#fff}.hws-candidate-clear{background:#302546;color:#e7dcff}.hws-candidate-empty{font-size:11px;color:#abc0d1;margin:9px 0}.hws-candidate-row{display:grid;grid-template-columns:1fr auto;gap:3px 7px;padding:8px 0;border-bottom:1px solid #365269}.hws-candidate-open{border:0;background:transparent;padding:0;text-align:left;color:#91d3ff;font-size:12px;font-weight:700;line-height:1.3}.hws-candidate-remove{border:0;border-radius:50%;width:22px;height:22px;background:#5b3037;color:#ffd7d2;font-size:18px;line-height:1}.hws-candidate-row small{grid-column:1/-1;color:#abc0d1;font-size:11px;line-height:1.3}
    #hws-result{display:flex;flex-direction:column;gap:5px;background:linear-gradient(145deg,rgba(20,58,82,.9),rgba(13,33,48,.92));border:1px solid rgba(112,202,255,.34);border-radius:12px;padding:10px;font-size:11px;line-height:1.35;color:#d6e8f5}#hws-result strong{font-size:13px;color:#fff}#hws-result small{color:#9fbed2;margin-top:2px}#hws-panel footer{font-size:9px;line-height:1.35;color:#94aec1;margin:9px 1px 0}

    /* Wayfinder: capa visual propia, sin intervenir en controles de Wayfarer. */
    #hws-root{font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#f5f1ee}
    #hws-toggle{width:64px;height:64px;border:1px solid #df5934;background:#151515;border-radius:20px;color:#f4ede9;display:grid;grid-template-rows:42px 14px;place-items:center;padding:3px 3px 2px;font-size:9px;font-weight:850;letter-spacing:.12em;box-shadow:0 12px 28px #000b,0 0 0 3px #151515;overflow:hidden}
    #hws-toggle img{width:42px;height:42px;border-radius:13px;display:block;object-fit:cover}.hws-brand{display:flex!important;align-items:center;gap:9px}.hws-brand-logo{width:35px;height:35px;border-radius:11px;object-fit:cover;box-shadow:0 0 0 1px #e25b36}.hws-brand strong{font-size:17px;letter-spacing:-.035em}.hws-brand small{color:#c8a194!important;font-size:9px!important;letter-spacing:.045em;text-transform:uppercase}
    #hws-panel{width:min(352px,calc(100vw - 32px));max-height:min(66dvh,calc(100dvh - 184px));background:rgba(20,19,19,.965);border:1px solid rgba(236,100,62,.55);border-radius:22px;box-shadow:0 20px 44px #000d,0 0 0 1px #000;backdrop-filter:blur(20px);padding:14px}
    #hws-panel header{margin:0 0 10px}#hws-close{width:30px;height:30px;border:1px solid #4e3530!important;border-radius:50%;background:#221c1b!important;color:#f5e9e5!important;font-size:25px!important;display:grid;place-items:center}.hws-status{display:flex;gap:6px;margin:-2px 0 9px}.hws-status span{border:1px solid #52342c;border-radius:999px;padding:4px 7px;color:#ed9b82;background:#251b19;font-size:8px;font-weight:800;letter-spacing:.085em}
    #hws-counter{padding:0 1px;color:#bea79f;font-size:10px}.hws-counts{background:linear-gradient(145deg,#211d1c,#171616);border-color:#49332d;border-radius:15px;padding:10px}.hws-count-number{background:#11100f;box-shadow:inset 0 1px 0 #ffffff13,0 3px 10px #0007;border-radius:12px}.hws-count-item small{color:#d9c7c1}#hws-count-context{color:#a99087}
    #hws-result{background:linear-gradient(145deg,#2a211e,#1b1817);border-color:#7e432f;border-left:3px solid #d65331;border-radius:14px;padding:11px;color:#eadcd7}#hws-result strong{color:#fff7f4}#hws-result small,.hws-hint{color:#bea79f}.hws-switches{gap:7px}.hws-chip{background:#211d1c;border-color:#5b3b32;color:#f4e7e2;padding:7px 10px}.hws-chip input{accent-color:#d65331}
    .hws-style,.hws-candidates{background:#1d1918;border-color:#47312b;border-radius:13px;padding:0 10px}.hws-style summary,.hws-candidates summary{color:#f5e6df;font-size:12px;letter-spacing:.01em}.hws-color-row>span{color:#ceb7ae}.hws-color{border-color:#f8eee9;box-shadow:0 0 0 1px #563b32}.hws-width{color:#eadad3}.hws-width select,.hws-candidates input,.hws-candidates textarea{background:#110f0f;border-color:#604038;color:#f9efeb}.hws-candidate-save{background:linear-gradient(135deg,#dc6039,#b83d25);box-shadow:0 4px 12px #0006}.hws-candidate-clear{background:#38201d;color:#ffdfd5}.hws-candidate-open{color:#f09a7c}.hws-candidate-row{border-color:#51362e}.hws-candidate-empty,.hws-candidate-row small{color:#c5aaa0}.hws-secondary{border-color:#694238;background:#231b19;color:#f4d8cd}.hws-hint{font-size:10px}#hws-panel footer{color:#a88f85;margin-top:11px}.hws-count-icon{width:22px;height:22px;object-fit:contain;filter:brightness(0) invert(1);opacity:.94}
  `;
    document.head.appendChild(style);
    const panel = root.querySelector("#hws-panel");
    state.panel = panel;
    state.counter = root.querySelector("#hws-counter");
    state.result = root.querySelector("#hws-result");
    state.candidateList = root.querySelector("#hws-candidate-list");
    state.candidateCount = root.querySelector("#hws-candidate-count");
    root.querySelector("#hws-toggle")?.addEventListener("click", () => panel.hidden = !panel.hidden);
    root.querySelector("#hws-close")?.addEventListener("click", () => panel.hidden = true);
    root.querySelector("#hws-clear")?.addEventListener("click", clearLocalData);
    root.querySelector("#hws-save-candidate")?.addEventListener("click", addCandidate);
    root.querySelector("#hws-clear-candidates")?.addEventListener("click", clearCandidates);
    root.querySelector("#hws-s17").addEventListener("change", (event) => {
      state.showS17 = event.target.checked;
      redraw();
    });
    root.querySelector("#hws-s14").addEventListener("change", (event) => {
      state.showS14 = event.target.checked;
      redraw();
    });
    root.querySelector("#hws-22m").addEventListener("change", (event) => {
      state.showCircles = event.target.checked;
      redraw();
    });
    root.querySelectorAll("[data-hws-color]").forEach((button) => {
      button.addEventListener("click", () => {
        const color = button.dataset.hwsColor;
        const layer = button.dataset.hwsLayer;
        if (!color || !["s17", "s14", "pokestop", "gym", "powerspot"].includes(layer ?? "")) return;
        if (layer === "s17") state.s17Color = color;
        else if (layer === "s14") state.s14Color = color;
        else if (layer === "pokestop") state.pokestopColor = color;
        else if (layer === "gym") state.gymColor = color;
        else state.powerspotColor = color;
        root.querySelectorAll(`[data-hws-layer="${layer}"]`).forEach((candidate) => {
          candidate.classList.toggle("hws-color--active", candidate.dataset.hwsColor === color);
        });
        redraw();
      });
    });
    root.querySelector("#hws-width").addEventListener("change", (event) => {
      state.lineMultiplier = Number(event.target.value);
      redraw();
    });
    updatePanel();
    renderCandidates();
  }
  function installMap() {
    if (!mapIsActive()) return;
    createUi();
    const map = findMap();
    if (!map) {
      state.gridMessage = "Esperando el mapa de Wayfarer";
      updatePanel();
      return;
    }
    if (state.map === map) return;
    clearVisuals();
    state.map = map;
    if (state.mapClickListener?.remove) state.mapClickListener.remove();
    state.mapClickListener = map.addListener?.("idle", () => redraw());
    map.addListener?.("click", (event) => {
      const latLng = event?.latLng;
      if (!latLng) return;
      evaluatePoint({ lat: latLng.lat(), lng: latLng.lng() }, "toque");
    });
    redraw();
  }
  function observeGcsResponses() {
    if (window.__hwsXhrObserverInstalled) return;
    window.__hwsXhrObserverInstalled = true;
    const nativeOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url, ...rest) {
      this.__hwsUrl = String(url);
      return nativeOpen.call(this, method, String(url), ...rest);
    };
    const nativeSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function(...args) {
      const url = this.__hwsUrl;
      if (url?.includes(GCS_PATH)) {
        const requestStamp = ++state.gcsStamp;
        this.addEventListener("load", () => {
          if (!mapIsActive() || requestStamp !== state.gcsStamp || this.status < 200 || this.status >= 300) return;
          try {
            const observed = parseObservedPois(JSON.parse(this.responseText));
            state.pois = new Map(observed.map((poi) => [poi.id, poi]));
            redraw();
          } catch {
          }
        });
      }
      return nativeSend.apply(this, args);
    };
  }
  observeGcsResponses();
  setInterval(installMap, 800);
})();
