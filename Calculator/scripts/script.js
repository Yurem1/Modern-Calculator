"use strict";
/* Instantiates a button object, which in turn, stores a list of button
    and provides an event handler for the list of elements
    */
class Button {
    constructor(elements) {
        this.buttons = elements;
    }
    onButtonClicked(element, callback) {
        console.log(`${element.id} was pressed`);
        callback(element);
    }
}
/* Static class containing custom methods with using existing DOM
    functions with type annotations
    */
class Utilities {
    constructor() { } // Cannot instantiate this class, can only be used for static calls
    static addClickEventListener(element_list, callback) {
        element_list.forEach(element => {
            element.addEventListener("click", button => {
                callback(button);
            });
        });
    }
    static loadDOMContent(callback) {
        document.addEventListener("DOMContentLoaded", () => {
            callback();
        });
    }
}
/* Static class for functions regarding the Calculator */
class Calculator {
    constructor() { } // Cannot instantiate this class, can only be used for static calls
    static resetOutputContent(element) {
        element.value = "";
    }
    static getCalculationResult(first_value, operator, last_value) {
        switch (operator) {
            case "+": return first_value + last_value;
            case "-": return first_value - last_value;
        }
        return 0;
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
const values = {
    value_one: 0,
    operator: undefined,
    value_two: 0
};
/* Loads all necessary event handlers for all elements within the website
    in order to function
    */
Utilities.loadDOMContent(() => {
    // Event Handler for all Number Buttons
    Utilities.addClickEventListener(number_buttons.buttons, (element) => {
        number_buttons.onButtonClicked(element.target, (button) => {
            output_content.value += button.innerText;
        });
    });
    // Event Handler for all Arithmetic Operator Buttons
    Utilities.addClickEventListener(arithmetic_buttons.buttons, (element) => {
        number_buttons.onButtonClicked(element.target, () => {
            values.value_one = Number(output_content.value);
            Calculator.resetOutputContent(output_content);
        });
    });
    // Event Handler for the Equal Sign (=) Button
    Utilities.addClickEventListener(equals_button.buttons, (element) => {
        Calculator.resetOutputContent(output_content);
    });
    // Event Handler for the Clear (CLR) Button
    Utilities.addClickEventListener(clear_button.buttons, (element) => {
        clear_button.onButtonClicked(element, () => {
            Calculator.resetOutputContent(output_content);
        });
    });
});
