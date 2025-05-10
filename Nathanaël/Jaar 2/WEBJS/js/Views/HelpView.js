class HelpView {
	constructor() {
		this.helpSection = DOMHelper.getElement(".help-container");

		const helpContent = DOMHelper.createElement("div", "help-content");

		const helpHeader = DOMHelper.createElement("div", "help-header");

		const divider = DOMHelper.createElement("hr");

		helpHeader.innerHTML = `
            <h1>FAQ (Frequently Asked Questions)</h1>
            <p class="help-header-text">What do you need help with?</p>
            <button class="tablinks" data-target="ingredients-faq">Ingredients</button>
            <button class="tablinks" data-target="pots-faq">Pots</button>
            <button class="tablinks" data-target="mixing-halls-faq">Mixing Halls</button>
            <button class="tablinks" data-target="color-test-faq">Color Tester</button>
        `;
		helpContent.append(helpHeader);

		// Add event listeners to the buttons
		helpHeader.querySelectorAll(".tablinks").forEach((button) => {
			button.addEventListener("click", () => {
				const targetId = button.getAttribute("data-target");
				const targetElement = document.getElementById(targetId);
				if (targetElement) {
					this.scrollTo(targetElement);
				}
			});
		});

		// Ingredient FAQ
		const ingredientFaq = DOMHelper.createElement("div", "ingredient-faq");
		ingredientFaq.innerHTML = `
            <h2 class="ingredient-faq-header">Ingredients</h2>
            <h3>Q: How do I create an ingredient?</h3>
            <p><b>A:</b> Follow the steps below:</p>
            <ol>
                <li>Navigate to the <code>Ingredients&nbsp;&&nbsp;Pots</code> tab using the sidebar buttons.</li>
                <li>Locate the <code>Ingredient&nbsp;Creator</code> section.</li>
                <li>Fill in the required fields:
                    <ul>
                        <li><code>Name</code>: Give your ingredient a name (e.g., <code>Red</code>).</li>
                        <li><code>Mix&nbsp;Time</code>: Enter the mix time in milliseconds.</li>
                        <li><code>Mix&nbsp;Speed</code>: Enter the mix speed as a number between 1 and 10.</li>
                        <li><code>Color</code>: Use the color picker to select the color.
                            <ul>
                                <li>Want to enter the values manually? Use the input boxes in the color picker!</li>
                            </ul>
                        </li>
                        <li><code>Texture</code>: Select the texture of the ingredient.
                            <ul>
                                <li>Pick an option from the dropdown menu.</li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li>Click the <code class="faq-create">Create&nbsp;Ingredient</code> button to save the ingredient.</li>
                <li>Once created, you can find your ingredient in the ingredient list.</li>
            </ol>
            <h3>Q: Can I delete an ingredient?</h3>
            <p><b>A:</b> Yes, you can delete an ingredient by clicking the <code class="faq-delete">Delete</code> button next to the ingredient in the ingredient list.</p>
            <h3>Q: What do the <code class="faq-button">RGB</code>, <code class="faq-button">HSL</code>, and <code class="faq-button">HEX</code> buttons do?</h3>
            <p><b>A:</b> Clicking on <code class="faq-button">RGB</code> makes the ingredients list show the <code>RGB</code> values of the colors, <code class="faq-button">HSL</code> makes the ingredients list show the <code>HSL</code> values of the colors, and <code class="faq-button">HEX</code> makes the ingredients list show the <code>HEX</code> values of the colors.</p>
            <h3>Q: How do I put an ingredient in a pot?</h3>
            <p><b>A:</b> You can put an ingredient in a pot by dragging the ingredient from the ingredient list and dropping it into the desired pot. <b>Please note</b> that you can't put ingredients with different mix speeds in the same pot. Mix Time does not matter in this instance.</p>
        `;
		ingredientFaq.id = "ingredients-faq";
		helpContent.append(ingredientFaq);

		const ingredientDivider = DOMHelper.createElement("hr");
		helpContent.append(ingredientDivider);

		// Pot FAQ
		const potFaq = DOMHelper.createElement("div", "pot-faq");
		potFaq.innerHTML = `
            <h2 class="pot-faq-header">Pots</h2>
            <h3>Q: How do I create a pot?</h3>
            <p>
                <b>A:</b> Follow the steps below:
            </p>
            <ol>
                <li>Navigate to the <code>Ingredients&nbsp;&&nbsp;Pots</code> tab using the sidebar buttons.</li>
                <li>Locate the <code>Mixing&nbsp;Pots</code> section.</li>
                <li>Fill in the required fields:</li>
                <ul>
                    <li><code>Pot&nbsp;Name</code>: Give your pot a name (e.g., <code>Red&nbsp;Pot</code>).</li>
                </ul>
                <li>Click the <code class="faq-create">Create&nbsp;Pot</code> button to save the pot.</li>
                <li>Once created, you can find your pot in the pot list.</li>
            </ol>
            <h3>Q: Can I delete a pot?</h3>
            <p>
                <b>A:</b> Yes, you can delete a pot by clicking the <code class="faq-delete">Delete</code> button next to the pot in the pot list.
            </p>
            <h3>Q: How do I mix the pot?</h3>
            <p>
                <b>A:</b> You can mix the pot by saving it to your Saved Pots.
            </p>
            <h3>Q: How do I save the pot?</h3>
            <p>
                <b>A:</b> It's super simple! Just click the <code class="faq-button">Save</code> button next to the pot in the pot list.
            </p>
            <h3>Q: Help! I put a color in the wrong pot!</h3>
            <p>
                <b>A:</b> No problem! You can simply delete the color from a pot by clicking on that instance of the color in the pot.
            </p>
        `;
		potFaq.id = "pots-faq";
		helpContent.append(potFaq);

		const potDivider = DOMHelper.createElement("hr");
		helpContent.append(potDivider);

		// Mixing Hall FAQ
		const mixingHallFaq = DOMHelper.createElement("div", "mixing-hall-faq");
		mixingHallFaq.innerHTML = `
            <h2 class="mixing-hall-faq-header">Mixing Halls</h2>
            <h3>Q: How do I use a mixing hall?</h3>
            <p><b>A:</b> Follow the steps below:</p>
            <ol>
                <li>
                    Navigate to the <code>Mixing&nbsp;Hall&nbsp;1</code> or
                    <code>Mixing&nbsp;Hall&nbsp;2</code> tab using the sidebar buttons.
                </li>
                <li>
                    On the mixing hall page, you will be able to set a location for the
                    mixing hall.
                    <ul>
                        <li>The location will be used for weather related functions.</li>
                        <li>
                            Click the <code class="faq-create">Update&nbsp;Location</code> button
                            to set a location for the mixing hall.
                        </li>
                        <li>You can set the location independently for each mixing hall.</li>
                    </ul>
                </li>
                <li>
                    If there are no machines, you will need to create one first.
                    <ol>
                        <li>
                            Give the machine a <code>Name</code> (e.g., <code>Machine 1</code>)
                            and <code>Mix&nbsp;Speed</code> (e.g., <code>5</code>).
                            <ul>
                                <li>
                                    <b>Please note:</b> You can't put a pot in a machine if the
                                    pot has a different mix speed than the machine.
                                </li>
                            </ul>
                        </li>
                        <li>
                            Click the <code class="faq-create">Create&nbsp;Mixing&nbsp;Machine</code>
                            button to create a new machine.
                        </li>
                    </ol>
                </li>
            </ol>
            <h3>Q: Can I delete a mixing machine?</h3>
            <p>
                <b>A:</b> Yes, you can delete a mixing machine by clicking the
                <code class="faq-delete">Delete&nbsp;Machine</code> button next to the machine
                in the mixing hall list.
            </p>
            <h3>Q: How do I let the mixing machine mix a pot?</h3>
            <p>
                <b>A:</b> You can let the mixing machine mix a pot by dragging the pot into
                the machine. Once you've dragged a pot into the machine, a set of two buttons
                will appear:
                <code class="faq-create">Start Mixing</code> and
                <code class="faq-orange">Remove Pot</code>.
                <ul>
                    <li>Click <code class="faq-create">Start Mixing</code> to start mixing the pot.</li>
                    <li>
                        Click <code class="faq-orange">Remove Pot</code> to remove the pot from
                        the machine.
                    </li>
                </ul>
            </p>
            <h3>Q: The mixing machine is mixing a pot, how do I stop it?</h3>
            <p>
                <b>A:</b> Unfortunately, you can't stop a mixing machine while it's mixing a pot.
            </p>
            <h3>Q: The mixing machine is done, what now?</h3>
            <p>
                <b>A:</b> Once the mixing machine has finished mixing the pot, you either
                'collect' the pot by clicking the <code class="faq-button">Collect Pot</code>
                button or throw it away by clicking the
                <code class="faq-orange">Throw Away</code> button.
            </p>
            
        `;
		mixingHallFaq.id = "mixing-halls-faq";
		helpContent.append(mixingHallFaq);

		const mixingHallDivider = DOMHelper.createElement("hr");
		helpContent.append(mixingHallDivider);

		// Color Tester FAQ
		const colorTestFaq = DOMHelper.createElement("div", "color-test-faq");
		colorTestFaq.innerHTML = `
            <h2 class="color-test-faq-header">Color Tester</h2>
            <h3>Q: What does the Color Tester do?</h3>
            <p><b>A:</b> The Color Tester allows you to put your mixed colors on a grid and compare them. You can also view more information about the mixed colors. By clicking on a color in the grid, you can see the <code>RGB</code>, <code>HSL</code> and <code>HEX</code> values of the color and the triadic colors. Triadic colors are colors that are equally spaced from each other on the color wheel. They are often used to create visually appealing color combinations. The triadic colors are calculated from the base color of the mixed color and are displayed in the color information pop-up.</p>
            <h3>Q: How do I use the Color Tester?</h3>
            <p><b>A:</b> Follow the steps below:</p>
            <ol>
                <li>Navigate to the <code>Color Tester</code> tab using the sidebar buttons.</li>
                <li>Locate the <code>Color Grid</code> section.</li>
                <li>Drag and drop the mixed colors from the ingredient list into the grid.</li>
                <li>Click on a color in the grid to view more information about it.</li>
            </ol>
            <h3>Q: Can I delete a color from the grid?</h3>
            <p><b>A:</b> Yes, you can. There are two ways to delete a color from the grid:
            <ul>
                <li>Regenerate the grid. <b>Please note</b> that this will remove <u><b>all</b></u> colors from the grid and means you will have to add the desired colors again.</li>
                <li>Drag and drop a new color into its box. This will simply overwrite the unwanted color.</li>
            </ul></p>
            <h3>Q: But there's no grid! How do I generate the grid?</h3>
            <p><b>A:</b> Follow the steps below:</p>
            <ol>
                <li>Navigate to the <code>Color&nbsp;Tester</code> tab using the sidebar buttons.</li>
                <li>Enter a grid size between <code>1</code> and <code>10</code> into the <code>Grid&nbsp;size</code> field.</li>
                <li>Click the <code class="faq-create">Generate&nbsp;grid</code> button to generate the grid.</li>
            </ol>
        `;
		colorTestFaq.id = "color-test-faq";
		helpContent.append(colorTestFaq);

		const scrollToTopButton = DOMHelper.createElement("button", "scroll-to-top");
		scrollToTopButton.textContent = "↑";
		scrollToTopButton.type = "button";
		scrollToTopButton.onclick = () => this.scrollToTop();
		helpContent.append(scrollToTopButton);

		this.helpSection.append(helpContent);
	}

	scrollToTop() {
		this.helpSection.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}

	scrollTo(element) {
		element.scrollIntoView({
			behavior: "smooth",
		});
	}
}
