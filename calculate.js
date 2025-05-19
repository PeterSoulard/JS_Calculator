/* This calculator class is able to perform calculations and store a certain number of intermediate results in memory.
 * The calculator will first contain at least the following MVP operations:
 * - addition
 * - subtraction
 * - multiplication
 * - division
 * As well as the following trig operations (doable in both degree mode and radian mode):
 * - sine
 * - cosine
 * - tangent
 * - cosecant
 * - secant
 * - cotangent
 */
class Calculator {
    constructor() {
        this.memory = [];
        this.degrees_mode = true;
    }

    addition(a, b) {
        if (isNaN(a) || isNaN(b)) {
            console.log("method addition called with NaN");
            return null;
        }
        return a + b;
    }

    subtraction(a, b) {
        if (isNaN(a) || isNaN(b)) {
            console.log("method subtraction called with NaN");
            return null;
        }
        return a - b;
    }

    multiplication(a, b) {
        if (isNaN(a) || isNaN(b)) {
            console.log("method multiplication called with NaN");
            return null;
        }
        return a * b;
    }

    division(a, b) {
        if (isNaN(a) || isNaN(b)) {
            console.log("method division called with NaN");
            return null;
        }
        return a / b;
    }

    toggleDegreesRadians() {
        this.degrees_mode = !this.degrees_mode;
    }

    sine(a) {
        if (isNaN(a)) {
            console.log("method sine called with NaN");
            return null;
        }

        if (this.degrees_mode) {
            a *= (Math.PI / 180);
        }

        return Math.sin(a);
    }

    cosine(a) {
        if (isNaN(a)) {
            console.log("method cosine called with NaN");
            return null;
        }

        if (this.degrees_mode) {
            a *= (Math.PI / 180);
        }

        return Math.cos(a);
    }

    tangent(a) {
        if (isNaN(a)) {
            console.log("method tangent called with NaN");
            return null;
        }

        if (this.degrees_mode) {
            a *= (Math.PI / 180);
        }

        return Math.tan(a);
    }

    cosecant(a) {
        if (isNaN(a)) {
            console.log("method cosecant called with NaN");
            return null;
        }

        if (this.degrees_mode) {
            a *= (Math.PI / 180);
        }

        return 1 / Math.sin(a);
    }

    secant(a) {
        if (isNaN(a)) {
            console.log("method secant called with NaN");
            return null;
        }

        if (this.degrees_mode) {
            a *= (Math.PI / 180);
        }

        return 1 / Math.cos(a);
    }

    cotangent(a) {
        if (isNaN(a)) {
            console.log("method cotangent called with NaN");
            return null;
        }

        if (this.degrees_mode) {
            a *= (Math.PI / 180);
        }

        return 1 / Math.tan(a);
    }
}

obj = new Calculator();

console.log(obj.sine(90));
obj.toggleDegreesRadians();
console.log(obj.sine(90));
