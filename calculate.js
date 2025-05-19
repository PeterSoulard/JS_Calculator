/* This calculator class is able to perform calculations and store a certain number of intermediate results in memory.
 * The calculator will first contain at least the following MVP operations:
 * - addition
 * - subtraction
 * - multiplication
 * - division
 * As well as the following trig operations:
 * - sin
 * - cos
 * - tan
 */
class Calculator {
    constructor() {
        this.memory = [];
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

    sin(degrees) {
        if (isNaN(a)) {
            console.log("method sin called with NaN");
            return null;
        }
        return Math.sin(degrees * (Math.PI / 180));
    }

    cos(degrees) {
        if (isNaN(a)) {
            console.log("method sin called with NaN");
            return null;
        }
        return Math.cos(degrees * (Math.PI / 180));
    }

    tan(degrees) {
        if (isNaN(a)) {
            console.log("method sin called with NaN");
            return null;
        }
        return Math.tan(degrees * (Math.PI / 180));
    }
}

obj = new Calculator();

console.log(obj.sin(90));
