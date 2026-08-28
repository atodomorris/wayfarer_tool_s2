// ==UserScript==
// @name         Wayfinder — S2 Overlay
// @namespace    https://hijuelas-wayspot-scout.local/
// @version      0.9.2
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
    const inGameByDistance = pois.filter((poi) => poi.gameState === "in-game" && poi.is22mReference).map((poi) => ({ poi, meters: haversineMeters(point, poi) })).sort((a, b) => a.meters - b.meters);
    const nearestInGame = inGameByDistance[0] ?? null;
    const within22InGame = inGameByDistance.filter((reference) => reference.meters < 22);
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
      within22InGame,
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

  // userscript/src/color-preferences.ts
  var COLOR_PREFERENCES_STORAGE_KEY = "wayfinder-color-preferences-v1";
  var DEFAULT_COLOR_PREFERENCES = {
    pokestopColor: "#2a84e8",
    gymColor: "#e53935",
    powerspotColor: "#f0b429",
    s17Color: "#1f9d70",
    s14Color: "#f57c00"
  };
  var colorKeys = Object.keys(DEFAULT_COLOR_PREFERENCES);
  function isHexColor(value) {
    return typeof value === "string" && /^#[0-9a-f]{6}$/i.test(value);
  }
  function loadColorPreferences(storage) {
    try {
      const parsed = JSON.parse(storage.getItem(COLOR_PREFERENCES_STORAGE_KEY) ?? "{}");
      if (!parsed || typeof parsed !== "object") return { ...DEFAULT_COLOR_PREFERENCES };
      const input = parsed;
      return colorKeys.reduce((preferences, key) => {
        preferences[key] = isHexColor(input[key]) ? input[key] : DEFAULT_COLOR_PREFERENCES[key];
        return preferences;
      }, { ...DEFAULT_COLOR_PREFERENCES });
    } catch {
      return { ...DEFAULT_COLOR_PREFERENCES };
    }
  }
  function saveColorPreferences(storage, preferences) {
    try {
      storage.setItem(COLOR_PREFERENCES_STORAGE_KEY, JSON.stringify(preferences));
      return true;
    } catch {
      return false;
    }
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
  var colorPreferences = candidateStorage ? loadColorPreferences(candidateStorage) : { ...DEFAULT_COLOR_PREFERENCES };
  var THEME_STORAGE_KEY = "hws-theme";
  function loadThemePreference() {
    try {
      const raw = candidateStorage?.getItem(THEME_STORAGE_KEY);
      return raw === "light" || raw === "dark" ? raw : "auto";
    } catch {
      return "auto";
    }
  }
  function saveThemePreference(theme) {
    try {
      if (theme === "auto") candidateStorage?.removeItem(THEME_STORAGE_KEY);
      else candidateStorage?.setItem(THEME_STORAGE_KEY, theme);
      return true;
    } catch {
      return false;
    }
  }
  var MAP_ROUTE = "/new/mapview";
  var GCS_PATH = "/api/v1/vault/mapview/gcs";
  var MAX_DRAWN_CIRCLES = 220;
  var MAX_VISIBLE_S17 = 1500;
  var MAX_VISIBLE_S14 = 350;
  var CELL_COLORS = [
    { value: "#2a84e8", name: "Azul" },
    { value: "#f0b429", name: "Amarillo" },
    { value: "#e53935", name: "Rojo" },
    { value: "#1f9d70", name: "Verde" },
    { value: "#8e5cc7", name: "Morado" },
    { value: "#00a9c0", name: "Turquesa" },
    { value: "#ffab24", name: "\xC1mbar" },
    { value: "#f57c00", name: "Naranja" },
    { value: "#3949ab", name: "\xCDndigo" },
    { value: "#795548", name: "Caf\xE9" },
    { value: "#eceff1", name: "Blanco" }
  ];
  var PRIMARY_COLOR_COUNT = 6;
  var state = {
    map: null,
    mapListeners: [],
    pois: /* @__PURE__ */ new Map(),
    polygons: [],
    circles: [],
    markers: [],
    candidateMarkers: [],
    evaluation: null,
    evaluationSource: null,
    locationMessage: "Toca un punto del mapa para evaluar su L17, L14 y distancia de 22 m.",
    showS17: true,
    showS14: true,
    showCircles: true,
    panel: null,
    result: null,
    gcsStamp: 0,
    s17Color: colorPreferences.s17Color,
    s14Color: colorPreferences.s14Color,
    pokestopColor: colorPreferences.pokestopColor,
    gymColor: colorPreferences.gymColor,
    powerspotColor: colorPreferences.powerspotColor,
    lineMultiplier: 1,
    gridMessage: "Esperando l\xEDmites del mapa",
    candidates: candidateStorage ? loadCandidates(candidateStorage) : [],
    candidateList: null,
    candidateCount: null,
    deselectButton: null
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
    if (state.deselectButton) state.deselectButton.hidden = !state.evaluation;
    if (!state.result) return;
    if (!state.evaluation) {
      state.result.classList.remove("hws-result--selected");
      renderCountCards(loaded, "Wayspots en la vista actual del mapa");
      state.result.innerHTML = `<strong>Toca un punto del mapa</strong><span>${state.locationMessage}</span><small>Los contadores superiores muestran los datos que Wayfarer ya carg\xF3 en esta vista.</small>`;
      return;
    }
    const assessment = assessPoint(state.evaluation, [...state.pois.values()]);
    state.result.classList.add("hws-result--selected");
    renderCountCards(assessment.s14Counts, "Wayspots: Celda L14 seleccionada", true);
    const nearest = assessment.nearestInGame;
    const conflicts = assessment.within22InGame;
    const coordinateText = `${state.evaluation.lat.toFixed(6)}, ${state.evaluation.lng.toFixed(6)}`;
    const s17Summary = assessment.s17References.length ? wayspotCountText(assessment.s17References.length) : "Celda vac\xEDa";
    const distanceSummary = conflicts.length ? `Hay ${conflicts.length} ${conflicts.length === 1 ? "Wayspot" : "Wayspots"} a menos de 22m` : "No hay Wayspots a menos de 22m del punto seleccionado";
    const distanceDetails = conflicts.length ? conflicts.map((reference) => wayspotRowMarkup(reference.poi, reference.meters)).join("") : nearest ? wayspotRowMarkup(nearest.poi, nearest.meters, true) : `<span class="hws-card-empty">No hay Wayspots en el juego entre los datos cargados.</span>`;
    state.result.innerHTML = `
    <section class="hws-detail-card" aria-label="Wayspots de la celda L17 seleccionada">
      <strong class="hws-card-title">Wayspots: Celda L17 seleccionada</strong>
      <span class="hws-card-status">${s17Summary}</span>
      ${assessment.s17References.length ? `<div class="hws-poi-list">${assessment.s17References.map((poi) => wayspotRowMarkup(poi)).join("")}</div>` : ""}
    </section>
    <section class="hws-detail-card" aria-label="Distancia de 22 metros para Nodos Energ\xE9ticos">
      <strong class="hws-card-title">Distancia 22m para Nodos Energ\xE9ticos</strong>
      <span class="hws-card-status">${distanceSummary}</span>
      <div class="hws-poi-list">${distanceDetails}</div>
      ${coordinateMarkup(coordinateText)}
    </section>`;
    wireCoordinateCopyButton();
  }
  function renderCountCards(counts, context, selected = false) {
    const contextElement = document.getElementById("hws-count-context");
    if (contextElement) {
      contextElement.textContent = context;
      contextElement.classList.toggle("hws-count-context--selected", selected);
    }
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
  function escapeHtml(value) {
    return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] ?? character);
  }
  function wayspotCountText(count) {
    return `${count} ${count === 1 ? "Wayspot encontrado" : "Wayspots encontrados"}`;
  }
  function poiIconMarkup(kind) {
    if (kind === "other") return `<span class="hws-poi-icon hws-poi-icon--other" aria-hidden="true">\u2022</span>`;
    return `<img class="hws-poi-icon" src="${define_WAYFINDER_COUNT_ICONS_default[kind]}" alt="" aria-hidden="true">`;
  }
  function wayspotRowMarkup(poi, meters, isNearest = false) {
    const metadata = [
      isNearest ? "M\xE1s cercana" : "",
      isNearest ? "Est\xE1 en el juego" : "",
      typeof meters === "number" ? `${meters.toFixed(1)} m` : ""
    ].filter(Boolean).join(" \xB7 ");
    return `<div class="hws-poi-row">${poiIconMarkup(poi.kind)}<div class="hws-poi-copy"><span class="hws-poi-name">${escapeHtml(poi.title)}</span>${metadata ? `<small class="hws-poi-meta">${metadata}</small>` : ""}</div></div>`;
  }
  function coordinateMarkup(coordinates) {
    return `<div class="hws-coordinate"><span>Punto tocado</span><code>${coordinates}</code><button type="button" class="hws-copy-coordinate" data-hws-coordinates="${coordinates}" aria-label="Copiar coordenadas del punto tocado">Copiar</button></div>`;
  }
  async function copyText(text2) {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text2);
        return true;
      }
    } catch {
    }
    const textarea = document.createElement("textarea");
    textarea.value = text2;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    try {
      return document.execCommand("copy");
    } catch {
      return false;
    } finally {
      textarea.remove();
    }
  }
  function wireCoordinateCopyButton() {
    const button = state.result?.querySelector("[data-hws-coordinates]");
    if (!button) return;
    button.addEventListener("click", () => {
      const coordinates = button.dataset.hwsCoordinates;
      if (!coordinates) return;
      void copyText(coordinates).then((copied) => {
        if (!copied) return;
        button.textContent = "\u2713 Copiado";
        button.classList.add("hws-copy-coordinate--done");
        button.disabled = true;
      });
    });
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
        s17.complete ? `${s17.requiredCells} L17` : `L17: acerca el mapa (${s17.requiredCells}+ celdas)`,
        s14.complete ? `${s14.requiredCells} L14` : `L14: acerca el mapa (${s14.requiredCells}+ celdas)`
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
  function clearEvaluation() {
    state.evaluation = null;
    state.evaluationSource = null;
    state.locationMessage = "Vista actual restaurada. Toca otro punto para evaluar su celda.";
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
  function persistColorPreferences() {
    if (!candidateStorage) return false;
    const preferences = {
      s17Color: state.s17Color,
      s14Color: state.s14Color,
      pokestopColor: state.pokestopColor,
      gymColor: state.gymColor,
      powerspotColor: state.powerspotColor
    };
    return saveColorPreferences(candidateStorage, preferences);
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
    const swatch = (color) => `<button class="hws-color${color.value === current ? " hws-color--active" : ""}" data-hws-color="${color.value}" data-hws-layer="${layer}" style="--hws-color:${color.value}" title="${color.name}" aria-label="Color ${color.name} para ${layer.toUpperCase()}"></button>`;
    const primary = CELL_COLORS.slice(0, PRIMARY_COLOR_COUNT);
    const extra = CELL_COLORS.slice(PRIMARY_COLOR_COUNT);
    const currentInExtra = extra.some((color) => color.value === current);
    const primaryMarkup = primary.map(swatch).join("");
    if (extra.length === 0) return primaryMarkup;
    return `${primaryMarkup}<details class="hws-palette-more"${currentInExtra ? " open" : ""}><summary aria-label="M\xE1s colores para ${layer.toUpperCase()}">+${extra.length}</summary><div class="hws-palette-more-row">${extra.map(swatch).join("")}</div></details>`;
  }
  function createUi() {
    if (document.getElementById("hws-root")) return;
    const root = document.createElement("div");
    root.id = "hws-root";
    root.innerHTML = `
    <button id="hws-toggle" aria-label="Abrir Wayfinder"><img src="${"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iQ2FwYV8yIiBkYXRhLW5hbWU9IkNhcGEgMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTQyLjU2IDE1Mi40NCI+CiAgPGRlZnM+CiAgICA8c3R5bGU+CiAgICAgIC5jbHMtMSB7CiAgICAgICAgZmlsbDogI2NhNGMyYzsKICAgICAgICBzdHJva2Utd2lkdGg6IDBweDsKICAgICAgfQogICAgPC9zdHlsZT4KICA8L2RlZnM+CiAgPGcgaWQ9IkNhcGFfMS0yIiBkYXRhLW5hbWU9IkNhcGEgMSI+CiAgICA8Zz4KICAgICAgPHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMTA2Ljg5LDkyLjkxYzEuNTUtMTAuMzYsMy4xNy0yMC40MS0xLjU0LTMwLjQyLTQuNTItOS42LTguMTMtMTkuNjgtMTEuNDgtMjkuNzctNC40Ni0xMy40NSwzLjQtMjcuOCwxNi43NS0zMS42NywxMy42OC0zLjk2LDI4LjAxLDMuNDksMzEuMjQsMTcuMjUsMS4yMyw1LjIxLjc1LDExLjM5LS44MiwxNi41Ni0zLjA0LDkuOTktNy42NSwxOS40OS0xMS4xMSwyOS4zNy0xLjYyLDQuNjMtMi42Myw5LjYzLTIuOTcsMTQuNTItLjc2LDExLjEzLS44NywyMi4zLTEuMzYsMzMuNDUtLjQxLDkuMzMtNS4wOSwxMy45My0xMy41NCwxMy43Mi01LjM4LS4xMy04LjUxLTMuMzYtMTAuNzQtNy43Mi05LjQ3LTE4LjUyLTE4Ljg4LTM3LjA3LTI4LjMyLTU1LjYtMS40LTIuNzUtMi44OC01LjQ2LTUuNDEtNy45Ni0uNjIsOC43NC0xLjI1LDE3LjQ4LTEuODQsMjYuMjMtMS4wMSwxNC45NS0xLjkyLDI5LjktMyw0NC44NS0uNTUsNy42Ni0zLjY5LDExLjcxLTkuNSwxMi44Ny02Ljk0LDEuMzgtMTEuMjgtLjYyLTE0Ljg2LTcuOTEtMTAuMjUtMjAuOTEtMjAuMjctNDEuOTQtMzAuMzItNjIuOTUtMi41OC01LjQtNS4yOC0xMC43OC03LjMxLTE2LjM5LTIuMzUtNi41MS45NS0xMi4wNCw3Ljc3LTEyLjYsMi42LS4yMiw2LjI2LDEuMzcsNy45NCwzLjM4LDIuNzEsMy4yMyw0LjM1LDcuNDMsNi4xNSwxMS4zNSw3LjM1LDE2LjAzLDE0LjU5LDMyLjExLDIxLjg3LDQ4LjE2LjYzLDEuMzksMS4zMSwyLjc2LDMuMTMsMy44My40LTUuNzIuODctMTEuNDQsMS4yLTE3LjE2Ljc5LTEzLjQ3LDEuNS0yNi45NCwyLjMtNDAuNC4yLTMuMzIuNS02LjY0Ljk5LTkuOTIuODctNS44MSw0LjU1LTkuNTQsMTAuMy0xMC43Niw1LjU2LTEuMTcsMTAuMzkuNTQsMTMuNCw1LjQzLDIuODgsNC42Niw1LjMzLDkuNiw3LjgzLDE0LjQ4LDcuNzksMTUuMjMsMTUuNSwzMC41LDIzLjI1LDQ1Ljc2Wk0xMjguMTQsMjUuNzhjMC01Ljg3LTQuNjEtMTAuMzQtMTAuNTMtMTAuMjMtNS42My4xMS05Ljk5LDQuNTktOS45OCwxMC4yNy4wMiw1LjY5LDQuMzcsMTAuMTQsMTAuMDIsMTAuMjMsNS45Mi4wOSwxMC40OS00LjM4LDEwLjQ4LTEwLjI3WiIvPgogICAgICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0xMjUuNTMsMTQyLjY3Yy4wOCw0Ljk5LTQuNDUsOS42NS05LjUsOS43Ny00Ljk1LjEyLTkuNjUtNC40Ni05Ljc2LTkuNS0uMTEtNC45Niw0LjUtOS43MSw5LjQ5LTkuNzcsNS4wMS0uMDYsOS43LDQuNDksOS43Nyw5LjQ5WiIvPgogICAgPC9nPgogIDwvZz4KPC9zdmc+"}" alt=""></button>
    <section id="hws-panel" aria-label="Wayfinder" hidden>
      <header><strong class="hws-title">Wayfinder</strong><button id="hws-theme" class="hws-theme-toggle" aria-label="Cambiar tema claro/oscuro" title="Cambiar tema">\u{1F319}</button><button id="hws-close" aria-label="Cerrar Wayfinder">\xD7</button></header>
      <div class="hws-switches" aria-label="Capas visibles">
        <label class="hws-chip"><input id="hws-s17" type="checkbox" checked> Celda L17</label>
        <label class="hws-chip"><input id="hws-s14" type="checkbox" checked> Celda L14</label>
        <label class="hws-chip"><input id="hws-22m" type="checkbox" checked> Distancia 22m</label>
      </div>
      <section class="hws-counts" aria-label="Conteo de referencias en la celda seleccionada">
        <strong id="hws-count-context" class="hws-count-context">Wayspots en la vista actual del mapa</strong>
        <div class="hws-count-grid">
          <div class="hws-count-item"><div class="hws-count-number">${countIconMarkup("pokestop")}<span id="hws-count-pokestop">0</span></div><small>Pok\xE9paradas</small></div>
          <div class="hws-count-item"><div class="hws-count-number">${countIconMarkup("gym")}<span id="hws-count-gym">0</span></div><small>Gimnasios</small></div>
          <div class="hws-count-item"><div class="hws-count-number">${countIconMarkup("powerspot")}<span id="hws-count-powerspot">0</span></div><small>Nodos</small></div>
        </div>
      </section>
      <div id="hws-result" class="hws-result"></div>
      <button id="hws-deselect" class="hws-deselect" hidden>Volver a la vista actual</button>
      <p class="hws-hint">Toca un punto del mapa para revisar L17, L14 y la distancia emp\xEDrica de 22 m.</p>
      <details class="hws-style">
        <summary>Capas del mapa</summary>
        <div class="hws-color-row"><span>L17</span><div class="hws-palette">${paletteMarkup("s17")}</div></div>
        <div class="hws-color-row"><span>L14</span><div class="hws-palette">${paletteMarkup("s14")}</div></div>
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
    /* ---- Tokens Wayfinder (extra\xEDdos de la UI real de Wayfarer) ---- */
    #hws-root{
      --hws-font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
      --hws-font-size-title:18px;--hws-font-weight-title:600;
      --hws-font-size-section:13px;--hws-font-weight-section:600;
      --hws-font-size-body:12px;

      /* Tema claro (default) */
      --hws-surface:#fff;--hws-surface-raised:#f8f8f8;
      --hws-text-primary:#181718;--hws-text-secondary:#777579;--hws-text-tertiary:#929194;
      --hws-border:#e5e5e5;--hws-divider:#f2f2f2;--hws-hover:#f2f2f2;
      --hws-active-bg:#202124;--hws-active-text:#fff;
      --hws-danger:#c20000;--hws-danger-bg:#fdeceb;
      --hws-accent:#ff4713;--hws-accent-contrast:#fff;
      --hws-radius:.5rem;--hws-radius-lg:16px;--hws-radius-pill:999px;
      --hws-shadow:0 4px 12px rgba(0,0,0,.18);--hws-shadow-lg:0 14px 34px rgba(0,0,0,.28);
    }
    @media (prefers-color-scheme:dark){
      #hws-root:not([data-theme="light"]){
        --hws-surface:#202124;--hws-surface-raised:#2b2d2f;
        --hws-text-primary:#e8eaed;--hws-text-secondary:#9aa0a6;--hws-text-tertiary:#83898f;
        --hws-border:#3c4043;--hws-divider:#3c4043;--hws-hover:#2b2d2f;
        --hws-active-bg:#e8eaed;--hws-active-text:#202124;
        --hws-danger:#ff6b5b;--hws-danger-bg:#3a2320;
        --hws-shadow:0 4px 14px rgba(0,0,0,.5);--hws-shadow-lg:0 20px 44px rgba(0,0,0,.6);
      }
    }
    #hws-root[data-theme="dark"]{
      --hws-surface:#202124;--hws-surface-raised:#2b2d2f;
      --hws-text-primary:#e8eaed;--hws-text-secondary:#9aa0a6;--hws-text-tertiary:#83898f;
      --hws-border:#3c4043;--hws-divider:#3c4043;--hws-hover:#2b2d2f;
      --hws-active-bg:#e8eaed;--hws-active-text:#202124;
      --hws-danger:#ff6b5b;--hws-danger-bg:#3a2320;
      --hws-shadow:0 4px 14px rgba(0,0,0,.5);--hws-shadow-lg:0 20px 44px rgba(0,0,0,.6);
    }

    /* ---- Estructura y layout ---- */
    #hws-root{position:fixed;left:16px;bottom:30px;z-index:2147483000;font-family:var(--hws-font-family);color:var(--hws-text-primary)}
    #hws-toggle{width:48px;height:48px;border:1px solid var(--hws-border);background:var(--hws-surface);border-radius:var(--hws-radius);display:grid;place-items:center;padding:0;box-shadow:var(--hws-shadow-lg);overflow:hidden}
    #hws-toggle img{width:32px;height:32px;display:block;object-fit:contain}
    .hws-title{font-size:var(--hws-font-size-title);font-weight:var(--hws-font-weight-title);letter-spacing:-.01em;color:var(--hws-text-primary)}
    #hws-panel{position:absolute;left:0;bottom:68px;width:min(352px,calc(100vw - 32px));max-height:min(66dvh,calc(100dvh - 184px));overflow:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch;touch-action:pan-y;background:var(--hws-surface);border:1px solid var(--hws-border);border-radius:var(--hws-radius-lg);box-shadow:var(--hws-shadow-lg);padding:0 14px 14px;box-sizing:border-box}
    #hws-panel header{position:sticky;top:0;z-index:5;height:44px;margin:0 -14px 8px;padding:0 10px 0 14px;background:var(--hws-surface);display:flex;align-items:center;gap:6px;border-bottom:1px solid var(--hws-divider);border-radius:var(--hws-radius-lg) var(--hws-radius-lg) 0 0}
    .hws-title{flex:1}
    #hws-theme,#hws-close{border:1px solid var(--hws-border);border-radius:50%;background:var(--hws-surface-raised);color:var(--hws-text-primary);display:grid;place-items:center;flex:0 0 auto}
    #hws-theme{width:28px;height:28px;font-size:14px;line-height:1}
    #hws-close{width:30px;height:30px;font-size:20px;line-height:1}

    /* ---- Contadores ---- */
    #hws-counter{padding:0 1px;color:var(--hws-text-secondary);font-size:10px}
    .hws-counts{margin:0 0 9px;background:var(--hws-surface-raised);border:1px solid var(--hws-border);border-radius:var(--hws-radius-lg);padding:10px}
    .hws-count-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
    .hws-count-item{display:flex;flex-direction:column;align-items:center;gap:5px;min-width:0}
    .hws-count-number{display:flex;align-items:center;justify-content:center;gap:6px;width:100%;min-height:45px;border:1px solid var(--hws-border);border-radius:12px;background:var(--hws-surface);font-size:22px;font-weight:700;line-height:1;font-variant-numeric:tabular-nums}
    .hws-count-number span{font-variant-numeric:tabular-nums}
    .hws-count-icon{width:20px;height:20px;flex:0 0 auto}
    .hws-count-item small{color:var(--hws-text-secondary);font-size:10px;font-weight:600;text-align:center;line-height:1.1}
    #hws-count-context{display:block;margin:0 0 8px;color:var(--hws-text-secondary);font-size:10px;font-weight:700;line-height:1.25}
    #hws-count-context.hws-count-context--selected{font-size:11px;font-weight:700;color:var(--hws-text-primary)}

    /* ---- Botones y chips ---- */
    .hws-secondary{width:100%;border:1px solid var(--hws-border);border-radius:var(--hws-radius);padding:10px 8px;margin-top:9px;background:var(--hws-surface-raised);color:var(--hws-text-primary);font-weight:600;font-size:var(--hws-font-size-body)}
    .hws-hint{margin:8px 1px 0;color:var(--hws-text-secondary);font-size:10px;line-height:1.35}
    .hws-switches{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;margin:10px 0 8px}
    .hws-chip{box-sizing:border-box;min-height:36px;display:flex;gap:5px;align-items:center;justify-content:center;background:var(--hws-surface-raised);border:1px solid var(--hws-border);border-radius:var(--hws-radius-pill);padding:7px 6px;color:var(--hws-text-primary);font-weight:600;font-size:10px;white-space:nowrap}
    .hws-chip input{accent-color:var(--hws-accent);margin:0;flex:0 0 auto}

    /* ---- Secciones plegables (capas / candidatos) ---- */
    .hws-style,.hws-candidates{margin:8px 0;padding:0 9px;background:var(--hws-surface-raised);border:1px solid var(--hws-border);border-radius:13px}
    .hws-style summary,.hws-candidates summary{cursor:pointer;padding:10px 0;font-size:var(--hws-font-size-section);font-weight:var(--hws-font-weight-section);color:var(--hws-text-primary)}
    .hws-color-row{display:flex;align-items:center;gap:8px;margin:7px 0;font-size:11px;font-weight:600}
    .hws-color-row>span{width:49px;color:var(--hws-text-secondary)}
    .hws-palette{display:flex;gap:6px;flex-wrap:wrap;align-items:center}
    .hws-palette-more{display:inline-flex}
    .hws-palette-more summary{list-style:none;cursor:pointer;width:26px;height:26px;border-radius:50%;border:1px dashed var(--hws-text-tertiary);display:grid;place-items:center;font-size:9px;font-weight:700;color:var(--hws-text-secondary)}
    .hws-palette-more summary::-webkit-details-marker{display:none}
    .hws-palette-more[open] summary{border-style:solid;background:var(--hws-surface-raised)}
    .hws-palette-more-row{display:flex;gap:6px;flex-wrap:wrap;width:100%;margin-top:6px}
    .hws-color{width:26px;height:26px;border-radius:50%;border:2px solid var(--hws-surface);background:var(--hws-color);box-shadow:0 0 0 1px var(--hws-border);box-sizing:border-box}
    .hws-color--active{box-shadow:0 0 0 2px var(--hws-accent)}
    .hws-width{display:flex;align-items:center;justify-content:space-between;margin:10px 0;font-size:12px;font-weight:600;color:var(--hws-text-primary)}
    .hws-width select{border:1px solid var(--hws-border);border-radius:8px;background:var(--hws-surface);padding:6px;color:var(--hws-text-primary);font-size:12px}

    /* ---- Candidatos ---- */
    .hws-candidates input,.hws-candidates textarea{width:100%;box-sizing:border-box;border:1px solid var(--hws-border);border-radius:8px;background:var(--hws-surface);color:var(--hws-text-primary);padding:8px;margin-top:7px;font:inherit;font-size:12px}
    .hws-candidates textarea{min-height:54px;resize:vertical}
    .hws-candidate-save,.hws-candidate-clear{width:100%;border:1px solid var(--hws-border);border-radius:9px;padding:9px;font-weight:600;font-size:12px;margin-top:7px}
    .hws-candidate-save{background:var(--hws-accent);border-color:var(--hws-accent);color:var(--hws-accent-contrast)}
    .hws-candidate-clear{background:var(--hws-surface);color:var(--hws-text-primary)}
    .hws-candidate-empty{font-size:11px;color:var(--hws-text-secondary);margin:9px 0}
    .hws-candidate-row{display:grid;grid-template-columns:1fr auto;gap:3px 7px;padding:8px 0;border-bottom:1px solid var(--hws-divider)}
    .hws-candidate-open{border:0;background:transparent;padding:0;text-align:left;color:var(--hws-accent);font-size:12px;font-weight:600;line-height:1.3}
    .hws-candidate-remove{border:1px solid var(--hws-danger);border-radius:50%;width:22px;height:22px;background:var(--hws-danger-bg);color:var(--hws-danger);font-size:16px;line-height:1}
    .hws-candidate-row small{grid-column:1/-1;color:var(--hws-text-secondary);font-size:11px;line-height:1.3}

    /* ---- Resultado / detalle de punto evaluado ---- */
    #hws-result{display:flex;flex-direction:column;gap:5px;background:var(--hws-surface-raised);border:1px solid var(--hws-border);border-radius:var(--hws-radius-lg);padding:10px;font-size:11px;line-height:1.35;color:var(--hws-text-primary)}
    #hws-result strong{font-size:13px;color:var(--hws-text-primary)}
    #hws-result small{color:var(--hws-text-secondary);margin-top:2px}
    #hws-result.hws-result--selected{gap:8px;background:transparent;border:0;padding:0}
    .hws-detail-card{display:flex;flex-direction:column;gap:6px;background:var(--hws-surface-raised);border:1px solid var(--hws-border);border-radius:var(--hws-radius-lg);padding:11px;color:var(--hws-text-primary)}
    .hws-card-title{display:block;font-size:11px;font-weight:700;line-height:1.25;color:var(--hws-text-primary);letter-spacing:.02em;text-transform:uppercase;padding-bottom:6px;margin-bottom:6px;border-bottom:1px solid var(--hws-divider)}
    .hws-card-status{font-size:11px;font-weight:600;line-height:1.35;color:var(--hws-text-primary)}
    .hws-card-empty{font-size:10px;color:var(--hws-text-secondary)}
    .hws-poi-list{display:flex;flex-direction:column}
    .hws-poi-row{display:flex;align-items:center;gap:8px;padding:7px 0;border-top:1px solid var(--hws-divider)}
    .hws-poi-icon{width:20px;height:20px;flex:0 0 20px;object-fit:contain;opacity:.85}
    #hws-root[data-theme="dark"] .hws-poi-icon{filter:brightness(0) invert(1)}
    @media (prefers-color-scheme:dark){#hws-root:not([data-theme="light"]) .hws-poi-icon{filter:brightness(0) invert(1)}}
    .hws-poi-icon--other{display:grid;place-items:center;border:1px solid var(--hws-text-tertiary);border-radius:50%;color:var(--hws-text-secondary);font-size:18px;line-height:1}
    .hws-poi-copy{display:flex;flex:1;min-width:0;flex-direction:column;gap:2px}
    .hws-poi-name{font-size:11px;font-weight:600;line-height:1.3;color:var(--hws-text-primary);overflow-wrap:anywhere}
    .hws-poi-meta{font-size:10px!important;color:var(--hws-text-secondary)}
    .hws-coordinate{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:6px;margin-top:2px;padding-top:8px;border-top:1px solid var(--hws-divider);color:var(--hws-text-secondary);font-size:10px}
    .hws-coordinate code{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--hws-text-primary);font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:10px}
    .hws-copy-coordinate{border:1px solid var(--hws-border);border-radius:8px;background:var(--hws-surface);color:var(--hws-text-primary);padding:5px 7px;font-size:10px;font-weight:600}
    .hws-copy-coordinate--done{border-color:#1d9e75;color:#1d9e75;background:transparent;opacity:1}
    .hws-deselect{width:100%;margin-top:8px;padding:8px 10px;border:1px solid var(--hws-border);border-radius:11px;background:var(--hws-surface-raised);color:var(--hws-text-primary);font-size:11px;font-weight:600}
    #hws-panel footer{font-size:9px;line-height:1.35;color:var(--hws-text-tertiary);margin:9px 1px 0}
    .hws-count-icon{width:22px;height:22px;object-fit:contain;opacity:.85}
    #hws-root[data-theme="dark"] .hws-count-icon{filter:brightness(0) invert(1)}
    @media (prefers-color-scheme:dark){#hws-root:not([data-theme="light"]) .hws-count-icon{filter:brightness(0) invert(1)}}
  `;
    document.head.appendChild(style);
    let themePreference = loadThemePreference();
    const themeButton = root.querySelector("#hws-theme");
    const applyTheme = () => {
      if (themePreference === "auto") root.removeAttribute("data-theme");
      else root.setAttribute("data-theme", themePreference);
      if (themeButton) {
        const isDark = themePreference === "dark" || themePreference === "auto" && window.matchMedia?.("(prefers-color-scheme: dark)").matches;
        themeButton.textContent = isDark ? "\u2600\uFE0F" : "\u{1F319}";
        themeButton.title = isDark ? "Cambiar a tema claro" : "Cambiar a tema oscuro";
      }
    };
    applyTheme();
    themeButton?.addEventListener("click", () => {
      const isDarkNow = themePreference === "dark" || themePreference === "auto" && window.matchMedia?.("(prefers-color-scheme: dark)").matches;
      themePreference = isDarkNow ? "light" : "dark";
      if (!saveThemePreference(themePreference)) {
        state.locationMessage = "El tema se aplic\xF3, pero Firefox no permiti\xF3 guardar la preferencia local.";
      }
      applyTheme();
    });
    const panel = root.querySelector("#hws-panel");
    state.panel = panel;
    state.result = root.querySelector("#hws-result");
    state.candidateList = root.querySelector("#hws-candidate-list");
    state.candidateCount = root.querySelector("#hws-candidate-count");
    state.deselectButton = root.querySelector("#hws-deselect");
    root.querySelector("#hws-toggle")?.addEventListener("click", () => panel.hidden = !panel.hidden);
    root.querySelector("#hws-close")?.addEventListener("click", () => panel.hidden = true);
    state.deselectButton?.addEventListener("click", clearEvaluation);
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
        if (!persistColorPreferences()) {
          state.locationMessage = "El color se aplic\xF3, pero Firefox no permiti\xF3 guardar la preferencia local.";
        }
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
    state.mapListeners.forEach((listener) => listener?.remove?.());
    state.mapListeners = [
      map.addListener?.("idle", () => redraw()),
      map.addListener?.("click", (event) => {
        const latLng = event?.latLng;
        if (!latLng) return;
        evaluatePoint({ lat: latLng.lat(), lng: latLng.lng() }, "toque");
      })
    ];
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
