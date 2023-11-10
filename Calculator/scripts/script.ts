/* Values Interface for calculator values blueprint */
interface CalculatorValues {
    value_one: number;
    operator: string;
    value_two: number;
}

/* Instantiates a button object, which in turn, stores a list of button
    and provides an event handler for the list of elements
    */
class Button {

    public readonly buttons:
        NodeListOf<HTMLElement>;

    constructor(elements: NodeListOf<HTMLElement>) {
        this.buttons = elements;
    }
}

/* Static class containing custom methods with using existing DOM
    functions with type annotations
    */
class Utilities{

    private constructor() {} // Cannot instantiate this class, can only be used for static calls

    static addClickEventListener(element_list: NodeListOf<Element>, callback: (element: any) => void
    ): void {
        element_list.forEach(element => {
            element.addEventListener("click", () => {
                console.log(`Element ${element.id} was clicked!`)
                callback(element);
            });
        });
    }

    static loadDOMContent(callback: () => void
    ): void {
        document.addEventListener("DOMContentLoaded", () => {
            callback();
        })
    }
}

/* Static class for functions regarding the Calculator */
class Calculator {

    private constructor() {} // Cannot instantiate this class, can only be used for static calls

    static resetOutputContent(element: HTMLInputElement
    ): void {
        element.value = "";
    }

    static getCalculationResult(val_one: number, operator: string, val_two: number
    ): number {
        switch (operator) {
            case "+": return val_one + val_two
            case "-": return val_one - val_two
            case "*": return val_one * val_two
            case "/": return val_one / val_two
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
const output_content: HTMLInputElement = document.querySelector("#output_screen")!;
const values: CalculatorValues = {
    value_one: 0,
    operator: "",
    value_two: 0
}

/* Loads all necessary event handlers for all elements within the website
    in order to function
    */
Utilities.loadDOMContent(() => {

    // Event Handler for all Number Buttons
    Utilities.addClickEventListener(number_buttons.buttons, (element) => {
        output_content.value += element.innerText
    });

    // Event Handler for all Arithmetic Operator Buttons
    Utilities.addClickEventListener(arithmetic_buttons.buttons, (element) => {
        values.value_one = Number(output_content.value)
        values.operator = String(element.innerText)
        Calculator.resetOutputContent(output_content)
    });

    // Event Handler for the Clear (CLR) Button
    Utilities.addClickEventListener(clear_button.buttons, () => {
        Calculator.resetOutputContent(output_content);
    });

    // Event Handler for the Equal Sign (=) Button
    Utilities.addClickEventListener(equals_button.buttons, (element) => {
        values.value_two = Number(output_content.value)
        output_content.value = String(
            Calculator.getCalculationResult(
                values.value_one, values.operator, values.value_two
            )
        )
    });
});