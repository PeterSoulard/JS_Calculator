document.addEventListener("DOMContentLoaded", function() {

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
                // TODO: Add the memorized value to the text on screen.
                break;
            case "=":
                // TODO: Evaluate expression and replace the text on screen with the result.
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
