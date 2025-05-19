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
        // TODO: Constrain the types to being floats
        return a + b;
    }

    subtraction(a, b) {
        // TODO: Constrain the types to being floats
        return a - b;
    }

    multiplication(a, b) {
        // TODO: Constrain the types to being floats
        return a * b;
    }

    division(a, b) {
        // TODO: Constrain the types to being floats
        return a / b;
    }

    sin(a) {
        // TODO: Constrain the type to being a float
        return Math.sin(a);
    }

    cos(a) {
        // TODO: Constrain the type to being a float
        return Math.cos(a);
    }

    tan(a) {
        // TODO: Constrain the type to being a float
        return Math.tan(a);
    }
}

obj = new Calculator();

console.log(obj.addition(1.5, 2.2));
