const values: Map<string, number> = new Map()

/* Event Listener Interface */
interface IButtonEventListener {
    onButtonClicked(element: HTMLElement, callback: (element: HTMLElement) => void): void;
}

/* Instantiates a button object, which in turn, stores a list of button
    and provides an event handler for the list of elements
    */
class Button implements IButtonEventListener {

    public readonly buttons: NodeListOf<HTMLElement>;

    constructor(elements: NodeListOf<HTMLElement>) {
        this.buttons = elements;
    }

    onButtonClicked(element: HTMLElement, callback: (htmlElement: HTMLElement) => void): void {
        console.log(`${element.id} was pressed`);
        callback(element);
    }
}

/* Static class containing custom methods with using existing DOM
    functions with type annotations
    */
class Utilities {

    private constructor() {} // Cannot instantiate this class, can only be used for static calls

    static addClickEventListener(element_list: NodeListOf<Element>, callback: (element: any) => void) {
        element_list.forEach(element => {
            element.addEventListener("click", button => {
                callback(button);
            });
        });
    }

    static loadDOMContent(callback: () => void) {
        document.addEventListener("DOMContentLoaded", () => {
            callback();
        })
    }
}

/* Static class for functions regarding the Calculator */
class Calculator {

    private constructor() {} // Cannot instantiate this class, can only be used for static calls

    static resetOutputContent(element: HTMLInputElement) {
        element.value = "";
    }
}

/* Instantiates a Button object which contains a field holding a list of
    button elements.
    */
const number_buttons = new Button(document.querySelectorAll(".number_buttons"));
const arithmetic_buttons = new Button(document.querySelectorAll(".arithmetic_buttons"));
const equals_button = new Button(document.querySelectorAll(".button_equals"));
const clear_button = new Button(document.querySelectorAll(".button_clear"));
const output_content: HTMLInputElement = document.querySelector("#output_screen")!;

Utilities.loadDOMContent(() => {

    Utilities.addClickEventListener(number_buttons.buttons, (element) => {
        number_buttons.onButtonClicked(element.target, (button) => {
            output_content.value += button.innerText;
        });
    });

    Utilities.addClickEventListener(arithmetic_buttons.buttons, (element) => {
        number_buttons.onButtonClicked(element.target, () => {
            values.set("first_value", Number(output_content.value));
            Calculator.resetOutputContent(output_content);
            console.log(values.get("first_value"));
        });
    });

    Utilities.addClickEventListener(equals_button.buttons, (element) => {
        equals_button.onButtonClicked(element, () => {
            values.set("last_value", Number(output_content.value));
            console.log(values.get("last_value"));
        });
    });

    Utilities.addClickEventListener(clear_button.buttons, (element) => {
        clear_button.onButtonClicked(element, () => {
            Calculator.resetOutputContent(output_content)
        });
    });
});