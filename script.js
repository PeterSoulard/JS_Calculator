class Calculator {
    /* A calculator object needs to have in memory:
     * - The last succesfully calculated value.
     * - Whether or not it is in degree mode, false means radians mode.
     */
    constructor() {
        this._memory = null;
        this._degrees_mode = true;
    }

    get memory() {
        return this._memory;
    }

    /* Three simple calculations for +, -, * and /.
     * Return: The result of the claculation. OR
     *         null if the input is not a number.
     */
    addition(a, b) {
        if (isNaN(a) || isNaN(b)) {
            console.log("method addition called with NaN");
            return null;
        }
        a = Number(a);
        b = Number(b);

        return a + b;
    }
    subtraction(a, b) {
        if (isNaN(a) || isNaN(b)) {
            console.log("method subtraction called with NaN");
            return null;
        }
        a = Number(a);
        b = Number(b);

        return a - b;
    }
    multiplication(a, b) {
        if (isNaN(a) || isNaN(b)) {
            console.log("method multiplication called with NaN");
            return null;
        }
        a = Number(a);
        b = Number(b);

        return a * b;
    }
    division(a, b) {
        if (isNaN(a) || isNaN(b)) {
            console.log("method division called with NaN");
            return null;
        }
        a = Number(a);
        b = Number(b);

        return a / b;
    }
    toggleDegreesRadians() {
        this._degrees_mode = !this._degrees_mode;
    }

    /* Called at the end of each trig method,
     * to check if the input is in degrees or radians.
     */
    convertMode(a) {
        if (this._degrees_mode) {
            a *= (Math.PI / 180);
        }

        return a;
    }

    /* Six trigonometric functions, each with a NaN check and a chained method
     * call to convert degrees to radians if this is needed.
     * Return: The result of the calculation. OR
     *         null if the input is not a number, or if the input is a multiple
     *             of pi in which case a division by zero would occur.
     */
    sine(a) {
        if (isNaN(a)) {
            console.log("method sine called with NaN");
            return null;
        }
        a = Number(a);

        return Math.sin(this.convertMode(a));
    }
    cosine(a) {
        if (isNaN(a)) {
            console.log("method cosine called with NaN");
            return null;
        }
        a = Number(a);

        return Math.cos(this.convertMode(a));
    }
    tangent(a) {
        if (isNaN(a)) {
            console.log("method tangent called with NaN");
            return null;
        }
        a = Number(a);

        return Math.tan(this.convertMode(a));
    }
    cosecant(a) {
        if (isNaN(a)) {
            console.log("method cosecant called with NaN");
            return null;
        }
        a = Number(a);

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
        a = Number(a);

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
        a = Number(a);

        let tangens = Math.tan(this.convertMode(a));

        if (tangens == 0) {
            console.log("cotangent of the input value in undefined");
            return null;
        }

        return 1 / tangens;
    }

    evaluate(expression) {
        try {
            let answer = eval(expression);
            this._memory = answer;
            return answer;
        } catch (error) {
            return "error";
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const calculator = new Calculator();

    let inverted = false;
    let textOnScreen = "";
    let buttonMappings = [
        "backspace",
        "1", "4", "7", "ANS", "2", "5", "8", "0", "3", "6", "9", "=",
        "+", "-", "sin", "cos", "*", "/", "tan", "SHIFT"
    ]

    function updateScreen() {
        document.getElementById("calculation-textbox").innerHTML = textOnScreen;
    }

    function buttonClicked(id) {
        let command = buttonMappings[id];

        switch (command) {
            case "backspace":
                if (textOnScreen.length > 0) {
                    textOnScreen = textOnScreen.slice(0, -1);
                }
                break;
            case "ANS":
                if (calculator.memory) {
                    textOnScreen += calculator.memory.toString();
                }
                break;
            case "=":
                textOnScreen = calculator.evaluate(textOnScreen);
                break;
            case "SHIFT":
                inverted = !inverted;
                break;
            case "sin":
            case "cos":
            case "tan":
                textOnScreen += command;
                if (inverted) {
                    textOnScreen += "^-1";
                }
                textOnScreen += "("
                // TODO: Add a closing parenthesis button.
                break;
            default:
                textOnScreen += command;
        }

        updateScreen();
    }

    let buttons = document.getElementsByClassName("button");
    for (let i = 0; i < buttons.length; i++) {
        document.getElementsByClassName("button")[i].addEventListener("click", function() {
            buttonClicked(i);
        });
    }

});
