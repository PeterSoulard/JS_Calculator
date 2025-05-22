# JS Calculator

This is a construction using HTML, CSS and JavaScript which forms a calculator. It was created by Peter Soulard in May 2025 as an application assignment for Copernica.

## Usage
To start up the calculator, simply select the file `index.html` and open it using your browser of choice.
Using your mouse or trackpad, select the components of the expression you want to compute, and finally select the equals-sign (=). If the expression is correctly formed, the answer should appear on the screen, replacing the expression.
When using the trigonometric functions, select a function operator, fill in the expression and end with a closing parenthesis. Using the *inv* button, you can toggle between the regular trig functions and their inverses. Using the *rad/deg* button, you can switch between radian mode and degree mode.
Finally, the arrow to the left removes the previous character from the screen and *clear* clears the entire calculator screen.

## Functionality
The calculator supports the four basic binary operations **addition**, **subtraction**, **multiplication** and **division**. It also supports the trigonometric functions **sine**, **cosine**, **tangent** and the **inverse** of these three. For the trigonometric functions, the calculator can work in **degree mode** or in **radian mode**. It remembers the previously calculated numeric answer and can paste it in the next expression.

## Limitations
Although most use-cases have been thought of when creating this application, there are some functionalities that are not yet present in this version of the JS Calculator. These may be implemented in a future version.

* The trigonometric functions are the only use for parentheses, which is the reason why you only see a button for the closing bracket. The trig functions may be nested, but you cannot place two trig functions within the parentheses of a trig function. Example -> Allowed: **sin(90 × sin(90))**. Not allowed: **sin(sin(90) + sin(90))**.

* In general, parentheses are not supported outside of the trigonometric functions. To support this functionality and to solve the above limitation, the evaluation function could be written using a tree structure.
