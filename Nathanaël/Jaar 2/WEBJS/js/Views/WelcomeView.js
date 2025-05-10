class WelcomeView {
    constructor() {
        this.welcomeSection = DOMHelper.getElement(".welcome-container");
        const welcomeText = DOMHelper.createElement("div", "welcome-text");
        let year = new Date().getFullYear();
        let copyrightYearString = year == 2025 ? year.toString() : `2025-${year}`;
        welcomeText.innerHTML = `
            <h1 class="welcome-text">🎨 Welcome to my color mixer! 🎨</h1>
            <p>On this page, you can mix multiple paint colors together and then compare them on a grid.</p>
            <p>Use the menu on the right to switch between the different pages.</p>
            <p>Need help? Check the FAQ.</p>
            <p class="copy">&copy; ${copyrightYearString} NachoPichu<br>All rights reserved.</p>
        `;
        this.welcomeSection.append(welcomeText);
    }
}