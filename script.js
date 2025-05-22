class Calculator {
    /* A calculator object needs to have in memory:
     * - The last succesfully calculated value.
     * - Whether or not it is in degree mode, false means radians mode.
     */
    constructor() {
        this._memory = null;
        this._degrees_mode = true;
    }

    /* Getter function for the private memory attribute.
     */
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

    /* Toggles the boolean degrees mode between true and false,
     * used only by the corresponding calculator button.
     */
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

    /* This method evaluates the given expression. Regexes first tokenize the
     * expression, then the operations are evaluated. The expressions inside
     * of the trigonometric functions are used in a recursive call to the same
     * function until a numeric value is calculated. The regex matching is set
     * to greedy to get matches that are as long as possible, to match numbers
     * consisting of multiple digits. This means that trig functions with
     * multiple trig functions cause problems because of the parentheses.
     * A solution would be to use a stack to create a tree-like structure out
     * of an expression, even allowing us to use parentheses in general.
     */
    evaluate(expression) {
        try {
            let patterns = [
                "\\d+", // Numbers
                "[+\\-*/]", // Operators
                "sin\\(.+\\)", "cos\\(.+\\)", "tan\\(.+\\)", // Trigonometric functions
                "sin⁻¹\\(.+\\)", "cos⁻¹\\(.+\\)", "tan⁻¹\\(.+\\)" // Inverse trig functions
            ]

            let allowedTokens = new RegExp(patterns.join("|"), "g");

            let tokens = expression.match(allowedTokens);

            if (tokens.join("") != expression) {
                throw new Error("Malformed expression");
            }

            /* Evaluate the inverse trig functions
             */
            for (let i = 0; i < tokens.length; i++) {
                if (tokens[i].startsWith("sin⁻¹")) {
                    tokens[i] = this.cosecant(this.evaluate(tokens[i].slice(6, -1))).toString();
                } else if (tokens[i].startsWith("cos⁻¹")) {
                    tokens[i] = this.secant(this.evaluate(tokens[i].slice(6, -1))).toString();
                } else if (tokens[i].startsWith("tan⁻¹")) {
                    tokens[i] = this.cotangent(this.evaluate(tokens[i].slice(6, -1))).toString();
                }
            }

            /* Evaluate the trig functions
             */
            for (let i = 0; i < tokens.length; i++) {
                if (tokens[i].startsWith("sin")) {
                    tokens[i] = this.sine(this.evaluate(tokens[i].slice(4, -1))).toString();
                } else if (tokens[i].startsWith("cos")) {
                    tokens[i] = this.cosine(this.evaluate(tokens[i].slice(4, -1))).toString();
                } else if (tokens[i].startsWith("tan")) {
                    tokens[i] = this.tangent(this.evaluate(tokens[i].slice(4, -1))).toString();
                }
            }

            /* This nested function is only used below, and is to make sure
             * binary operators are surrounded by numbers.
             */
            function check_binary_expression(tokens, i) {
                if (i <= 0 || i >= (tokens.length - 1)) {
                    throw new Error("Malformed expression");
                }
                let left = tokens[i-1];
                let right = tokens[i+1];

                if (!(/^[0-9]+$/.test(left)) || !(/^[0-9]+$/.test(right))) {
                    throw new Error("Malformed expression");
                }

                return [left, right]
            }

            /* Multiplication and division first (please forgive me for editing
             * the array while looping over it, I promise I've thought it through)
             */
            for (let i = 0; i < tokens.length; i++) {
                if (tokens[i] == "*") {
                    let left, right;
                    [left, right] = check_binary_expression(tokens, i);
                    let answer = this.multiplication(left, right);
                    tokens[i-1] = answer.toString();
                    tokens.splice(i, 2);
                    i -= 1;
                } else if (tokens[i] == "/") {
                    let left, right;
                    [left, right] = check_binary_expression(tokens, i);
                    let answer = this.division(left, right);
                    tokens[i-1] = answer.toString();
                    tokens.splice(i, 2);
                    i -= 1;
                }
            }

            /* Addition and subtraction
             */
            for (let i = 0; i < tokens.length; i++) {
                if (tokens[i] == "+") {
                    let left, right;
                    [left, right] = check_binary_expression(tokens, i);
                    let answer = this.addition(left, right);
                    tokens[i-1] = answer.toString();
                    tokens.splice(i, 2);
                    i -= 1;
                } else if (tokens[i] == "-") {
                    let left, right;
                    [left, right] = check_binary_expression(tokens, i);
                    let answer = this.subtraction(left, right);
                    tokens[i-1] = answer.toString();
                    tokens.splice(i, 2);
                    i -= 1;
                }
            }

            if (tokens.length != 1) {
                throw new Error("Unexpected operator in the expression");
            }

            let answer = tokens[0];

            this._memory = answer;
            return answer;
        } catch (error) {
            return "Error";
        }
    }
}

/* When the page loads, create a calculator object and define some variables.
 */
document.addEventListener("DOMContentLoaded", function() {
    const calculator = new Calculator();

    let inverted = false;
    let textOnScreen = "";
    const buttonMappings = [
        "1", "4", "7", "ANS",
        "2", "5", "8", "0",
        "3", "6", "9", "=",

        ")", "SHIFT", "+", "-",
        "clear", "deg/rad", "*", "/",
        "backspace", "sin", "cos", "tan"
    ]

    function updateScreen() {
        document.getElementById("calculation-textbox").innerHTML = textOnScreen;
    }

    /* This function gets called when the user clicks a button.
     * The id is the index in the list of all possible buttons it could be.
     * Depending on what the button is, different operations are called.
     * Most buttons just get added to the calculator screen. After each button
     * press, the screen gets updated.
     */
    function buttonClicked(id) {
        let command = buttonMappings[id];

        switch (command) {
            case "ANS":
                if (calculator.memory) {
                    textOnScreen += calculator.memory.toString();
                }
                break;
            case "=":
                textOnScreen = calculator.evaluate(textOnScreen);
                break;
            case "sin":
            case "cos":
            case "tan":
                textOnScreen += command;
                if (inverted) {
                    textOnScreen += "⁻¹";
                }
                textOnScreen += "("
                break;
            case "backspace":
                if (textOnScreen.length > 0) {
                    textOnScreen = textOnScreen.slice(0, -1);
                }
                break;
            case "SHIFT":
                ["sine", "cosine", "tangent"].forEach(function(func) {
                    text = document.getElementById(func).innerHTML;
                    if (inverted) {
                        text = text.slice(0, -2);
                    } else {
                        text = text + "⁻¹";
                    }
                    document.getElementById(func).innerHTML = text;
                })
                inverted = !inverted;
                break;
            case "clear":
                textOnScreen = "";
                break;
            case "deg/rad":
                calculator.toggleDegreesRadians();
                text = document.getElementById("deg/rad").innerHTML;
                if (text == "deg") {
                    text = "rad";
                } else {
                    text = "deg";
                }
                document.getElementById("deg/rad").innerHTML = text;
                break;
            default:
                textOnScreen += command;
        }

        updateScreen();
    }

    /* For each button, listen until it is clicked,
     * and then call the above function with its index.
     */
    let buttons = document.getElementsByClassName("button");
    for (let i = 0; i < buttons.length; i++) {
        document.getElementsByClassName("button")[i].addEventListener("click", function() {
            buttonClicked(i);
        });
    }

});
