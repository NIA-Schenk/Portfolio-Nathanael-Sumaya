/**
 * Utility class for DOM manipulation
 */
class DOMHelper {
    /**
     * Creates a new DOM element with optional class name
     * @param {string} tag - HTML tag name
     * @param {string} [className] - Optional CSS class name
     * @returns {HTMLElement} The created element
     */
    static createElement(tag, className) {
        const element = document.createElement(tag);
        if (className) element.classList.add(className);
        return element;
    }

    /**
     * Selects an element from the DOM
     * @param {string} selector - CSS selector
     * @returns {HTMLElement} The selected element
     */
    static getElement(selector) {
        return document.querySelector(selector);
    }

    /**
     * Removes all child elements from a parent element
     * @param {HTMLElement} element - The parent element to clear
     */
    static clearElement(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    setActiveColor(event, format) {
        this.colorFormat = format;
        this.updateIngredientsColorDisplay();

        const tablinks = document.getElementsByClassName("tablinks");
        for (let i = 0; i < tablinks.length; i++) {
            tablinks[i].classList.remove("active");
        }
        event.currentTarget.classList.add("active");
    }

    updateIngredientsColorDisplay() {
        // Update color format in existing ingredient cards
        const colorDetails = document.querySelectorAll(".ingredient-info p:nth-child(3)");
        colorDetails.forEach((colorDetail) => {
            const colorValue = colorDetail.getAttribute("data-color-hex");
            if (colorValue) {
                colorDetail.textContent = `Color: ${ColorUtils.convertColorFormat(
                    colorValue,
                    this.colorFormat
                )}`;
            }
        });
    }

    static openHall(evt, hallId) {
        const tabcontents = document.getElementsByClassName("tabcontent");
        const tablinks = document.getElementsByClassName("tablinks");

        for (let i = 0; i < tabcontents.length; i++) {
            tabcontents[i].classList.remove("show");
        }

        for (let i = 0; i < tablinks.length; i++) {
            tablinks[i].classList.remove("active");
        }

        document.getElementById(hallId).classList.add("show");
        evt.currentTarget.classList.add("active");
    }
}