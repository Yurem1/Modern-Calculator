"use strict";
/* Static class for functions regarding the Calculator */
class Calculator {
    constructor() { }
    static clearCalculatorHistory() {
        this.operand1 = 0;
        this.operator = "";
        this.operand2 = 0;
        this.result = 0;
        this.canType = true;
        this.isResult = false;
    }
    static clearLastCalculation() {
        this.operand1 = this.operand2;
    }
    static resetOutputContent(element) {
        element.value = "";
    }
    static getCalculationResult(callback) {
        if (!this.isResult) {
            switch (this.operator) {
                case "+":
                    this.result = this.operand1 + this.operand2;
                    break;
                case "-":
                    this.result = this.operand1 - this.operand2;
                    break;
                case "*":
                    this.result = this.operand1 * this.operand2;
                    break;
                case "/":
                    this.result = this.operand1 / this.operand2;
                    break;
                default: this.result = Number(output_content.value);
            }
            callback(this.result);
        }
    }
}
Calculator.operand1 = 0;
Calculator.operator = "";
Calculator.operand2 = 0;
Calculator.result = 0;
Calculator.canType = true;
Calculator.isResult = false;
/* Instantiates a button object, which in turn, stores a list of button
    and provides an event handler for the list of elements
    */
class Button {
    constructor(elements) {
        this.buttons = elements;
    }
}
/* Static class containing custom methods with using existing DOM
    functions with type annotations
    */
class Utilities {
    constructor() { } // Cannot instantiate this class, can only be used for static calls
    static addClickEventListener(element_list, callback) {
        element_list.forEach(element => {
            element.addEventListener("click", () => {
                console.log(`Element ${element.id} was clicked!`);
                callback(element);
            });
        });
    }
    static loadDOMContent(callback) {
        document.addEventListener("DOMContentLoaded", () => {
            callback();
        });
    }
}
/* Instantiates a Button object which contains a field holding a list of
    button elements. Also, other variables for different purposes are
    present here.
    */
const number_buttons = new Button(document.querySelectorAll(".number_buttons"));
const arithmetic_buttons = new Button(document.querySelectorAll(".arithmetic_buttons"));
const equals_button = new Button(document.querySelectorAll(".button_equals"));
const clear_button = new Button(document.querySelectorAll(".button_clear"));
const output_content = document.querySelector("#output_screen");
/* Loads all necessary event handlers for all elements within the website
    in order to function
    */
Utilities.loadDOMContent(() => {
    // Event Handler for all Number Buttons
    Utilities.addClickEventListener(number_buttons.buttons, (element) => {
        if (Calculator.canType) {
            output_content.value += element.innerHTML;
        }
    });
    // Event Handler for all Arithmetic Operator Buttons
    Utilities.addClickEventListener(arithmetic_buttons.buttons, (element) => {
        if (Calculator.canType) {
            Calculator.operand1 = Number(output_content.value);
            Calculator.operator = element.innerHTML;
            Calculator.resetOutputContent(output_content);
        }
        else if (!Calculator.canType && Calculator.isResult) {
            Calculator.operator = element.innerHTML;
            Calculator.operand2 = Number(output_content.value);
            Calculator.canType = true;
            Calculator.isResult = false;
            Calculator.clearLastCalculation();
            Calculator.resetOutputContent(output_content);
        }
    });
    // Event Handler for the Clear (CLR) Button
    Utilities.addClickEventListener(clear_button.buttons, () => {
        Calculator.resetOutputContent(output_content);
        Calculator.clearCalculatorHistory();
    });
    // Event Handler for the Equal Sign (=) Button
    Utilities.addClickEventListener(equals_button.buttons, () => {
        Calculator.operand2 = Number(output_content.value);
        Calculator.getCalculationResult((num) => {
            Calculator.canType = false;
            Calculator.isResult = true;
            output_content.value = String(num);
        });
    });
});
