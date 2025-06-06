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

    /* This method is called when an opening parenthesis is encountered.
     * It finds the corresponding closing parenthesis and replaces it with the
     * evaluation result of the parentheses. Argument 'func' is the function
     * that should be called on the contents of the parentheses. This is null
     * if the parentheses are not because of a trig function call.
     */
    close_parentheses(rest, func, expression) {

        let stack = 0;

        for (let i = 0; i < rest.length; i++) {
            switch (rest[i]) {
                case '(':
                    stack++;
                    break;
                case ')':
                    if (stack == 0) {
                        let result = rest.slice(0, i);
                        let endindex = i - rest.length + 1;

                        if (endindex == 0) {
                            endindex = expression.length;
                        }
                        result = this.evaluate(result);
                        let oldstring;
                        if (func) {
                            result = func(result);
                            oldstring = expression.slice(i, endindex);
                        } else {
                            oldstring = expression.slice(i - 3, endindex);
                        }
                        result = result.toString();

                        return [result, oldstring];
                    }
                    stack--;
                default:
                    continue;
            }
        }

        throw new Error("Unmatched function.");
    }

    /* This method processes the trigonometric functions and returning the
     * string without them. It does so by finding the calls to the trig
     * functions and replacing them by the result of the call. It repeats this
     * process until there are no more trig calls left.
     */
    process_trig_functions(expression) {

        let retry = false;
        let result, oldstring;

        do {
            retry = false;
            for (let i = 0; i < expression.length; i++) {

                let substring = expression.slice(i);
                let slicelength;
                let func;

                if (substring.startsWith("sin(")) {
                    func = this.sine.bind(this);
                    slicelength = 4;
                } else if (substring.startsWith("cos(")) {
                    func = this.cosine.bind(this);
                    slicelength = 4;
                } else if (substring.startsWith("tan(")) {
                    func = this.tangent.bind(this);
                    slicelength = 4;
                } else if (substring.startsWith("sin⁻¹(")) {
                    func = this.cosecant.bind(this);
                    slicelength = 6;
                } else if (substring.startsWith("cos⁻¹(")) {
                    func = this.secant.bind(this);
                    slicelength = 6;
                } else if (substring.startsWith("tan⁻¹(")) {
                    func = this.tangent.bind(this);
                    slicelength = 6;
                } else {
                    continue;
                }

                [result, oldstring] = this.close_parentheses(expression.slice(i + slicelength), func, expression);
                expression = expression.replace(oldstring, result);
                retry = true;
            }
        } while (retry);

        return expression;
    }

    /* This method handles the parentheses in the expression, and it replaces
     * them by the result of a recursive evaluation call.
     */
    process_parentheses(expression) {
        let retry = false;
        let result, oldstring;

        do {
            retry = false;
            for (let i = 0; i < expression.length; i++) {

                if (expression[i] == '(') {
                    [result, oldstring] = this.close_parentheses(expression.slice(i + 1), null, expression);
                    expression = expression.replace(oldstring, result);
                    retry = true;
                    break;
                }
            }
        } while (retry);

        return expression;
    }

    /* This method reduces the given expression using the four simple binary
     * operators; plus, minus, multiply and subtract. It does so by first
     * tokenizing the string, then applying the operations. This method throws
     * an error if the operators are malformed for example '10+'.
     */
    process_binary_operators(expression) {
        let patterns = [
            "\\d+(\\.\\d+)?", // Numbers (possibly floats)
            "[+\\-*/]" // Operators
        ]

        let allowedTokens = new RegExp(patterns.join("|"), "g");

        let tokens = expression.match(allowedTokens);

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

        return answer;
    }

    /* This method evaluates the given expression. First the trigonometric
     * functions are evaluated, then the parentheses, then the binary operators.
     * This method may be called recursively from the trigonometric functions
     * with a substring that is always smaller than the original expression.
     */
    evaluate(expression) {

        try {

            expression = this.process_trig_functions(expression);

            expression = this.process_parentheses(expression);

            let answer = this.process_binary_operators(expression);

            this._memory = answer;

            return answer;
        } catch (error) {
            console.log(error);
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
        "1", "4", "7", "ANS", "sin",
        "2", "5", "8", "0", "cos",
        "3", "6", "9", "=", "tan",

        "clear", "(", "+", "-", "SHIFT",
        "backspace", ")", "*", "/", "deg/rad"
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
