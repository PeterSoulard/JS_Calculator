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

    /* Called at the end of each trig method, to check if the input is in degrees or radians.
     */
    convertMode(a) {
        if (this.degrees_mode) {
            a *= (Math.PI / 180);
        }

        return a;
    }

    sine(a) {
        if (isNaN(a)) {
            console.log("method sine called with NaN");
            return null;
        }

        return Math.sin(this.convertMode(a));
    }

    cosine(a) {
        if (isNaN(a)) {
            console.log("method cosine called with NaN");
            return null;
        }

        return Math.cos(this.convertMode(a));
    }

    tangent(a) {
        if (isNaN(a)) {
            console.log("method tangent called with NaN");
            return null;
        }

        return Math.tan(this.convertMode(a));
    }

    cosecant(a) {
        if (isNaN(a)) {
            console.log("method cosecant called with NaN");
            return null;
        }

        let sine = Math.sin(this.convertMode(a));

        if (sine == 0) {
            console.log("cosecant of the input value in undefined");
            return null;
        }

        return 1 / sine;
    }

    secant(a) {
        if (isNaN(a)) {
            console.log("method secant called with NaN");
            return null;
        }

        let cosine = Math.cos(this.convertMode(a));

        if (cosine == 0) {
            console.log("secant of the input value in undefined");
            return null;
        }

        return 1 / cosine;
    }

    cotangent(a) {
        if (isNaN(a)) {
            console.log("method cotangent called with NaN");
            return null;
        }

        let tangens = Math.tan(this.convertMode(a));

        if (tangens == 0) {
            console.log("cotangent of the input value in undefined");
            return null;
        }

        return 1 / tangens;
    }
}

obj = new Calculator();

console.log(obj.sine(90));
obj.toggleDegreesRadians();
console.log(obj.sine(90));
